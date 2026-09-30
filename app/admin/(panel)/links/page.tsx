import type { Metadata } from "next";
import { requireAdmin } from "@/lib/supabase/server";
import { toLinkIcon, type LinkItem } from "@/lib/links";
import LinkEditor from "./LinkEditor";

export const metadata: Metadata = { title: "Links" };

export default async function AdminLinksPage() {
  const admin = await requireAdmin();
  if (!admin) return null;

  const { data, error } = await admin.supabase
    .from("links")
    .select("id,label,url,description,icon,sort,visible")
    .order("sort", { ascending: true });

  const links: LinkItem[] = (data ?? []).map((row) => ({ ...row, icon: toLinkIcon(row.icon) }));

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white">Links</h1>
          <p className="text-sm text-gray-400">
            The buttons on{" "}
            <a href="/link" target="_blank" className="link-draw text-accent-300">
              siaexplains.com/link
            </a>
            , top to bottom.
          </p>
        </div>
      </div>

      {error && (
        <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          Couldn&apos;t load links: {error.message}
        </p>
      )}

      <div className="space-y-3">
        {links.map((link, i) => (
          <LinkEditor key={link.id} link={link} isFirst={i === 0} isLast={i === links.length - 1} />
        ))}
        {links.length === 0 && !error && <p className="text-sm text-gray-500">No links yet — add the first one below.</p>}
      </div>

      <h2 className="mb-3 mt-10 text-sm font-semibold uppercase tracking-wider text-gray-400">Add a link</h2>
      <LinkEditor />
    </div>
  );
}
