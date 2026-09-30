import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isAdminEmail, isSupabaseConfigured } from "./env";

/** Cookie-bound client for the admin: requests carry the signed-in user's JWT, so RLS applies. */
export async function getServerClient() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component, where cookies are read-only. The middleware refreshes them.
        }
      },
    },
  });
}

/**
 * Returns the client and user only when the caller is the admin. Every admin page and server
 * action calls this: middleware alone is not an authorization boundary.
 */
export async function requireAdmin(): Promise<
  { supabase: NonNullable<Awaited<ReturnType<typeof getServerClient>>>; user: User } | null
> {
  const supabase = await getServerClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) return null;
  return { supabase, user };
}
