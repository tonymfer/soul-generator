"use server";

import { createClient } from "@/lib/supabase/server";

// ============================================================
// Like Server Actions — toggle & check likes via Supabase
// ============================================================

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Toggle like on a soul. Uses insert-first approach to avoid race conditions.
 * If insert succeeds, user liked. If unique constraint violation (23505),
 * user already liked so we delete instead.
 * The DB trigger automatically updates souls.likes_count.
 */
export async function toggleLike(
  soulId: string
): Promise<{ liked: boolean; likesCount: number; error?: string }> {
  // Validate soulId format
  if (!UUID_RE.test(soulId)) {
    return { liked: false, likesCount: 0, error: "잘못된 소울 ID입니다." };
  }

  const supabase = await createClient();

  // Check auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { liked: false, likesCount: 0, error: "로그인이 필요합니다" };
  }

  // Verify the soul exists and is public before allowing the like
  const { data: targetSoul } = await supabase
    .from("souls")
    .select("id")
    .eq("id", soulId)
    .eq("is_public", true)
    .maybeSingle();

  if (!targetSoul) {
    return { liked: false, likesCount: 0, error: "소울을 찾을 수 없습니다." };
  }

  // Try to insert (optimistic: assume user wants to like)
  const { error: insertError } = await supabase
    .from("soul_likes")
    .insert({ user_id: user.id, soul_id: soulId });

  let liked: boolean;

  if (!insertError) {
    // Insert succeeded — user liked
    liked = true;
  } else if (insertError.code === "23505") {
    // Already exists — user wants to unlike, so delete
    await supabase
      .from("soul_likes")
      .delete()
      .eq("user_id", user.id)
      .eq("soul_id", soulId);
    liked = false;
  } else {
    return { liked: false, likesCount: 0, error: insertError.message };
  }

  // Fetch fresh likes count
  const { data: soul } = await supabase
    .from("souls")
    .select("likes_count")
    .eq("id", soulId)
    .single();

  return { liked, likesCount: soul?.likes_count ?? 0 };
}

/**
 * Check if the current user has liked a soul.
 * Returns false if not authenticated.
 */
export async function checkUserLike(soulId: string): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("soul_likes")
    .select("user_id")
    .eq("user_id", user.id)
    .eq("soul_id", soulId)
    .maybeSingle();

  return !!data;
}
