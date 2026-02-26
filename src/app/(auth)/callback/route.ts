// ============================================================
// Auth Callback Route Handler
// Handles OAuth callback from social login (Google, GitHub, etc.)
// Exchanges the auth code for a session then redirects.
// ============================================================

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // "next" param allows the OAuth flow to redirect to a specific page after login
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Construct redirect URL relative to the origin
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // In development, redirect to origin (localhost)
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // In production behind a load balancer / reverse proxy
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // If code exchange failed or no code present, redirect to an error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
