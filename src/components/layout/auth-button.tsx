// ============================================================
// Auth Button (Server Component)
// Shows login/logout state with pixel styling
// ============================================================

import { createClient } from "@/lib/supabase/server";
import { AuthButtonClient } from "./auth-button-client";

export async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch profile for avatar + display name (if logged in)
  let profile: { username: string; display_name: string | null; avatar_url: string | null } | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("username, display_name, avatar_url")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  return (
    <AuthButtonClient
      user={user ? { id: user.id, email: user.email ?? "" } : null}
      profile={profile}
    />
  );
}
