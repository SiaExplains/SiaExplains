import Link from "next/link";
import { ArrowRight, FileText, Link2 } from "lucide-react";
import { requireAdmin } from "@/lib/supabase/server";
import { getMdxBlogSlugs } from "@/lib/posts";

export default async function AdminDashboard() {
  const admin = await requireAdmin();
  if (!admin) return null;
  const { supabase } = admin;

  // Both tables are tiny, so fetching one flag column and counting here is simpler than count queries.
  const [{ data: links }, { data: posts }] = await Promise.all([
    supabase.from("links").select("visible"),
    supabase.from("posts").select("published"),
  ]);

  const cards = [
    {
      href: "/admin/links",
      icon: Link2,
      title: "Links",
      value: links?.length ?? 0,
      detail: `${links?.filter((l) => l.visible).length ?? 0} visible on /link`,
    },
    {
      href: "/admin/posts",
      icon: FileText,
      title: "Blog posts",
      value: posts?.length ?? 0,
      detail: `${posts?.filter((p) => p.published).length ?? 0} published · ${getMdxBlogSlugs().length} more from MDX files`,
    },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-white">Dashboard</h1>
      <p className="mb-8 text-sm text-gray-400">Everything here is live on siaexplains.com within a minute of saving.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map(({ href, icon: Icon, title, value, detail }) => (
          <Link key={href} href={href} className="card card-interactive group block p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400/20 to-accent-500/25 text-accent-300">
                <Icon size={18} />
              </span>
              <ArrowRight size={16} className="text-gray-500 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="mt-1 text-xs text-gray-500">{detail}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
