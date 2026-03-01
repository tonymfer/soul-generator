"use server";

import { createClient } from "@/lib/supabase/server";
import { getLocale } from "@/lib/i18n/get-locale";
import { messages } from "@/lib/i18n/messages";

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
  const locale = await getLocale();
  const m = messages[locale].profileErrors;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: m.loginRequired };
  }

  // Validate display name length
  const displayName = data.displayName?.trim();
  if (displayName && displayName.length > 50) {
    return { error: m.displayNameLimit };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return { error: m.updateFailed };
  }

  return {};
}
