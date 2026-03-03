"use client";

// ============================================================
// Auth Button Client Component
// Handles login/logout actions with pixel-button styling
// ============================================================

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { TerminalButton } from "@/components/ui";
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
      provider: "github",
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
      <TerminalButton variant="primary" size="sm" onClick={handleLogin}>
        <LogIn className="w-3 h-3 mr-1.5" />
        Login
      </TerminalButton>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* User avatar — links to profile */}
      <Link href="/profile" className="shrink-0">
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.display_name ?? profile.username}
            className="w-7 h-7 terminal-border-sm rounded-full hover:brightness-110 transition-all"
            style={{ imageRendering: "pixelated" }}
          />
        ) : (
          <div className="w-7 h-7 bg-accent-primary terminal-border-sm rounded-full flex items-center justify-center text-[8px] text-white font-pixel hover:brightness-110 transition-all">
            {(profile?.display_name ?? profile?.username ?? user.email)?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}
      </Link>

      {/* Display name — links to profile */}
      <Link
        href="/profile"
        className="text-[10px] font-pixel text-text-primary hidden sm:inline hover:text-accent-primary transition-colors"
      >
        {profile?.display_name ?? profile?.username ?? user.email}
      </Link>

      {/* Logout button */}
      <TerminalButton variant="ghost" size="sm" onClick={handleLogout}>
        <LogOut className="w-3 h-3 mr-1" />
        <span className="hidden sm:inline">Logout</span>
      </TerminalButton>
    </div>
  );
}
