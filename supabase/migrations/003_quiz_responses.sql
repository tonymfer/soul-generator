-- ============================================================
-- 003_quiz_responses.sql
-- Raw quiz responses for each soul generation
-- ============================================================

create table quiz_responses (
  id uuid default gen_random_uuid() primary key,
  soul_id uuid references souls(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  phase1_data jsonb not null default '{}',
  phase2_data jsonb not null default '{}',
  phase3_text text,
  created_at timestamptz default now() not null
);

-- Index for lookups by soul or user
create index idx_quiz_responses_soul_id on quiz_responses (soul_id);
create index idx_quiz_responses_user_id on quiz_responses (user_id);

-- Enable Row Level Security
alter table quiz_responses enable row level security;

-- Users can only read their own quiz responses
create policy "Users can read own quiz responses"
  on quiz_responses for select
  using (auth.uid() = user_id);

-- Users can insert their own quiz responses
create policy "Users can insert own quiz responses"
  on quiz_responses for insert
  with check (auth.uid() = user_id);

-- Users can update their own quiz responses
create policy "Users can update own quiz responses"
  on quiz_responses for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
