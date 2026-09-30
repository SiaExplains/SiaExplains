import type { Metadata } from "next";
import Link from "next/link";
import PostForm from "../PostForm";

export const metadata: Metadata = { title: "New post" };

export default function NewPostPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div>
      <Link href="/admin/posts" className="link-draw mb-4 inline-block text-sm text-gray-400 hover:text-white">
        ← All posts
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-white">New post</h1>
      <PostForm post={{ title: "", slug: "", description: "", tags: [], date: today, body_mdx: "", published: false }} />
    </div>
  );
}
