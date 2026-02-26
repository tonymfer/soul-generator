"use client";

// ============================================================
// Auth Button Client Component
// Handles login/logout actions with pixel-button styling
// ============================================================

import { createClient } from "@/lib/supabase/client";
import { PixelButton } from "@/components/ui";
import { LogIn, LogOut } from "lucide-react";

interface AuthButtonClientProps {
  user: { id: string; email: string } | null;
  profile: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

export function AuthButtonClient({ user, profile }: AuthButtonClientProps) {
  const supabase = createClient();

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (!user) {
    return (
      <PixelButton variant="primary" size="sm" onClick={handleLogin}>
        <LogIn className="w-3 h-3 mr-1.5" />
        Login
      </PixelButton>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* User avatar */}
      {profile?.avatar_url ? (
        <img
          src={profile.avatar_url}
          alt={profile.display_name ?? profile.username}
          className="w-7 h-7 pixel-border-sm"
          style={{ imageRendering: "pixelated" }}
        />
      ) : (
        <div className="w-7 h-7 bg-accent-primary pixel-border-sm flex items-center justify-center text-[8px] text-white font-pixel">
          {(profile?.display_name ?? profile?.username ?? user.email)?.[0]?.toUpperCase() ?? "?"}
        </div>
      )}

      {/* Display name */}
      <span className="text-[10px] font-pixel text-text-primary hidden sm:inline">
        {profile?.display_name ?? profile?.username ?? user.email}
      </span>

      {/* Logout button */}
      <PixelButton variant="ghost" size="sm" onClick={handleLogout}>
        <LogOut className="w-3 h-3 mr-1" />
        Logout
      </PixelButton>
    </div>
  );
}
