-- ============================================================
-- 004_soul_likes.sql
-- Like/unlike system for souls
-- ============================================================

create table soul_likes (
  user_id uuid references profiles(id) on delete cascade not null,
  soul_id uuid references souls(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  primary key (user_id, soul_id)
);

-- Index for "souls liked by user" queries
create index idx_soul_likes_user_id on soul_likes (user_id);
-- Index for "users who liked soul" queries
create index idx_soul_likes_soul_id on soul_likes (soul_id);

-- Enable Row Level Security
alter table soul_likes enable row level security;

-- Likes are publicly readable (so we can show like counts / "liked by")
create policy "Soul likes are publicly readable"
  on soul_likes for select
  using (true);

-- Authenticated users can like (insert)
create policy "Users can like souls"
  on soul_likes for insert
  with check (auth.uid() = user_id);

-- Users can unlike (delete) their own likes
create policy "Users can unlike souls"
  on soul_likes for delete
  using (auth.uid() = user_id);

-- ============================================================
-- Trigger: auto-update souls.likes_count on like/unlike
-- ============================================================

create or replace function public.handle_soul_like()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    update public.souls
      set likes_count = likes_count + 1
      where id = new.soul_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.souls
      set likes_count = likes_count - 1
      where id = old.soul_id;
    return old;
  end if;
  return null;
end;
$$;

create trigger on_soul_like_change
  after insert or delete on soul_likes
  for each row execute procedure public.handle_soul_like();
