import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/supabase/server";
import { getMdxBlogSlugs } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { togglePublished } from "./actions";

export const metadata: Metadata = { title: "Blog posts" };

export default async function AdminPostsPage() {
  const admin = await requireAdmin();
  if (!admin) return null;

  const { data: posts, error } = await admin.supabase
    .from("posts")
    .select("id,slug,title,date,published,updated_at")
    .order("date", { ascending: false });
  const mdxSlugs = getMdxBlogSlugs();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white">Blog posts</h1>
          <p className="text-sm text-gray-400">Posts written here appear on /blog next to the MDX files.</p>
        </div>
        <Link href="/admin/posts/new" className="btn btn-primary">
          <Plus size={15} /> New post
        </Link>
      </div>

      {error && (
        <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          Couldn&apos;t load posts: {error.message}
        </p>
      )}

      <div className="card divide-y divide-white/5 overflow-hidden">
        {(posts ?? []).map((post) => (
          <div key={post.id} className="flex flex-wrap items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.03]">
            <div className="min-w-0 flex-1">
              <Link href={`/admin/posts/${post.id}`} className="link-draw font-medium text-white">
                {post.title}
              </Link>
              <p className="text-xs text-gray-500">
                {formatDate(post.date)} · /blog/{post.slug}
              </p>
            </div>
            <form action={togglePublished}>
              <input type="hidden" name="id" value={post.id} />
              <input type="hidden" name="published" value={String(!post.published)} />
              <button
                type="submit"
                className={
                  post.published
                    ? "rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300 hover:bg-emerald-500/25"
                    : "rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-400 hover:bg-white/10"
                }
                title={post.published ? "Click to unpublish" : "Click to publish"}
              >
                {post.published ? "Published" : "Draft"}
              </button>
            </form>
            {post.published && (
              <a href={`/blog/${post.slug}`} target="_blank" aria-label="View on site" className="p-1 text-gray-500 hover:text-white">
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        ))}
        {!posts?.length && !error && (
          <p className="px-4 py-6 text-sm text-gray-500">No admin posts yet. Write the first one.</p>
        )}
      </div>

      {mdxSlugs.length > 0 && (
        <p className="mt-6 text-xs text-gray-500">
          Also on the blog from <code>content/blog</code> (edit those in the repo): {mdxSlugs.join(", ")}
        </p>
      )}
    </div>
  );
}
