"use server";

import { createClient } from "@/lib/supabase/server";

// ============================================================
// Profile Server Actions — update user profile data
// ============================================================

/**
 * Update the current user's display name.
 * Returns an error string if something goes wrong.
 */
export async function updateProfile(data: {
  displayName?: string;
}): Promise<{ error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  // Validate display name length
  const displayName = data.displayName?.trim();
  if (displayName && displayName.length > 50) {
    return { error: "표시 이름은 50자 이내로 입력해주세요." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return { error: "프로필 업데이트에 실패했습니다." };
  }

  return {};
}
