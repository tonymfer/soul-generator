// ============================================================
// Supabase Environment Variables
// Centralized env access with runtime validation
// ============================================================

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Validate that required Supabase environment variables are set.
 * Call this at app startup (e.g., in layout or middleware) for early error detection.
 */
export function validateSupabaseEnv(): void {
  if (!supabaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL. Add it to .env.local"
    );
  }
  if (!supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Add it to .env.local"
    );
  }
}
