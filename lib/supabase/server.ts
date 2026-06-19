import "server-only"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Server-only client using the service role key.
// Bypasses RLS for trusted server actions (inserts/updates/deletes).
export function createServiceClient() {
  return createSupabaseClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  )
}
