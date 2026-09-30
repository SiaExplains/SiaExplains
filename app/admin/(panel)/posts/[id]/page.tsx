import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import PostForm from "../PostForm";

export const metadata: Metadata = { title: "Edit post" };

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> };

export default async function EditPostPage({ params, searchParams }: Props) {
  const admin = await requireAdmin();
  if (!admin) return null;
  const { id } = await params;
  const { created } = await searchParams;

  const { data: post } = await admin.supabase
    .from("posts")
    .select("id,slug,title,description,tags,date,body_mdx,published")
    .eq("id", id)
    .maybeSingle();
  if (!post) notFound();

  return (
    <div>
      <Link href="/admin/posts" className="link-draw mb-4 inline-block text-sm text-gray-400 hover:text-white">
        ← All posts
      </Link>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-white">Edit post</h1>
        {post.published && (
          <a href={`/blog/${post.slug}`} target="_blank" className="link-draw text-sm text-accent-300">
            View live ↗
          </a>
        )}
      </div>
      <PostForm post={{ ...post, tags: post.tags ?? [] }} notice={created ? "Post created." : undefined} />
    </div>
  );
}
