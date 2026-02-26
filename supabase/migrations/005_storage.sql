-- ============================================================
-- 005_storage.sql
-- Storage buckets for avatars and OG images
-- ============================================================

-- Create public buckets
insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('og-images', 'og-images', true);

-- ============================================================
-- Avatars bucket policies
-- ============================================================

-- Public read access for avatars
create policy "Avatars are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- Authenticated users can upload avatars
create policy "Authenticated users can upload avatars"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
  );

-- Users can update their own avatars (path starts with their user ID)
create policy "Users can update own avatars"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can delete their own avatars
create policy "Users can delete own avatars"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================================
-- OG Images bucket policies
-- ============================================================

-- Public read access for OG images
create policy "OG images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'og-images');

-- Authenticated users can upload OG images
create policy "Authenticated users can upload OG images"
  on storage.objects for insert
  with check (
    bucket_id = 'og-images'
    and auth.role() = 'authenticated'
  );

-- Users can update their own OG images
create policy "Users can update own OG images"
  on storage.objects for update
  using (
    bucket_id = 'og-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can delete their own OG images
create policy "Users can delete own OG images"
  on storage.objects for delete
  using (
    bucket_id = 'og-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
