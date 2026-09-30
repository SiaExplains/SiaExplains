import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { requireAdmin } from "@/lib/supabase/server";
import SetupNotice from "../SetupNotice";
import { signOut } from "../actions";
import AdminNav from "./AdminNav";

// Always rendered per request: it depends on the signed-in session.
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) return <SetupNotice />;

  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
      <aside className="md:w-52 md:shrink-0">
        <div className="card sticky top-8 p-4">
          <p className="mb-4 px-2 text-lg font-semibold text-white">
            <span className="text-brand-400">Sia</span>Explains
            <span className="ms-2 rounded-full bg-accent-500/15 px-2 py-0.5 align-middle text-[10px] font-medium uppercase tracking-wider text-accent-300">
              Admin
            </span>
          </p>
          <AdminNav />
          <div className="mt-6 border-t border-white/5 pt-4 px-2">
            <p className="mb-2 truncate text-xs text-gray-500" title={admin.user.email}>
              {admin.user.email}
            </p>
            <div className="flex items-center gap-3 text-xs">
              <a href="/" target="_blank" className="link-draw text-gray-400 hover:text-white">
                View site
              </a>
              <form action={signOut}>
                <button type="submit" className="link-draw text-gray-400 hover:text-white">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
