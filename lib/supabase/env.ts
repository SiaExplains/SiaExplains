export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();

/** The public site keeps working without Supabase; only the DB-backed parts switch off. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export function isAdminEmail(email: string | null | undefined): boolean {
  return Boolean(ADMIN_EMAIL) && (email ?? "").trim().toLowerCase() === ADMIN_EMAIL;
}
