-- ============================================================
-- 001_profiles.sql
-- User profiles linked to Supabase Auth
-- ============================================================

create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null
    constraint username_min_length check (char_length(username) >= 3),
  display_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Index for username lookups
create index idx_profiles_username on profiles (username);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Public read access
create policy "Profiles are publicly readable"
  on profiles for select
  using (true);

-- Users can insert their own profile
create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create profile on user signup via trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    -- Generate a default username from email prefix + random suffix
    coalesce(
      split_part(new.email, '@', 1),
      'user'
    ) || '_' || substr(gen_random_uuid()::text, 1, 6),
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at on row change
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on profiles
  for each row execute procedure public.handle_updated_at();
