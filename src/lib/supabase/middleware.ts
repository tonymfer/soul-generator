// ============================================================
// Supabase Middleware Helper
// Refreshes auth session on every request via Next.js middleware
// ============================================================

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseUrl, supabaseAnonKey } from "./env";
import type { Database } from "./types";

/**
 * Refresh the Supabase auth session by reading/writing cookies
 * on the Next.js middleware request/response boundary.
 *
 * This must run on every matched request so that expired tokens
 * are refreshed before they reach Server Components.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Set cookies on the request (for downstream Server Components)
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        // Create a new response that carries the updated request cookies forward
        supabaseResponse = NextResponse.next({
          request,
        });

        // Set cookies on the response (for the browser)
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  // IMPORTANT: Do NOT use supabase.auth.getSession() here.
  // getUser() sends a request to the Supabase Auth server every time
  // to revalidate the Auth token, while getSession() reads from local storage.
  // Using getUser() is critical for security in server-side code.
  await supabase.auth.getUser();

  return supabaseResponse;
}
