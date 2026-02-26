-- ============================================================
-- 002_souls.sql
-- Soul definitions — the core entity of ABTI
-- ============================================================

create table souls (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  tagline text,
  personality_data jsonb not null default '{}',
  soul_md text not null,
  system_prompt text not null,
  sample_conversations jsonb default '[]',
  avatar_config jsonb not null default '{}',
  avatar_url text,
  og_image_url text,
  is_public boolean default true not null,
  forked_from uuid references souls(id) on delete set null,
  likes_count integer default 0 not null,
  forks_count integer default 0 not null,
  views_count integer default 0 not null,
  tags text[] default '{}' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Indexes for common query patterns
create index idx_souls_slug on souls (slug);
create index idx_souls_user_id on souls (user_id);
create index idx_souls_is_public on souls (is_public) where is_public = true;
create index idx_souls_created_at on souls (created_at desc);
create index idx_souls_likes_count on souls (likes_count desc);
create index idx_souls_tags on souls using gin (tags);

-- Full-text search on title + tagline
alter table souls add column fts tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(tagline, '')), 'B')
  ) stored;

create index idx_souls_fts on souls using gin (fts);

-- Enable Row Level Security
alter table souls enable row level security;

-- Public souls are readable by everyone
create policy "Public souls are readable"
  on souls for select
  using (is_public = true or auth.uid() = user_id);

-- Authenticated users can create souls
create policy "Users can create own souls"
  on souls for insert
  with check (auth.uid() = user_id);

-- Users can update their own souls
create policy "Users can update own souls"
  on souls for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Users can delete their own souls
create policy "Users can delete own souls"
  on souls for delete
  using (auth.uid() = user_id);

-- Auto-update updated_at
create trigger souls_updated_at
  before update on souls
  for each row execute procedure public.handle_updated_at();
