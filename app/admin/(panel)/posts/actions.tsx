"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { getMdxBlogSlugs } from "@/lib/posts";
import MdxContent from "@/components/MdxContent";
import { SLUG_RE, isIsoDate, parseTags, slugify, str, type ActionState } from "@/lib/admin/validate";

const DENIED: ActionState = { ok: false, message: "Not signed in as the admin." };
const UNSAFE_TAG_RE = /<\s*\/?\s*(script|iframe|object|embed|style)\b/i;

function refreshBlog(slug?: string) {
  // Blog list, post page, home "recent writing" and the sitemap all read posts.
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/blog", "page");
  if (slug) revalidatePath("/[locale]/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/posts");
}

export async function savePost(_prev: ActionState, form: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  if (!admin) return DENIED;

  const id = str(form, "id");
  const title = str(form, "title");
  const slug = slugify(str(form, "slug") || title);
  const description = str(form, "description");
  const date = str(form, "date");
  const body = typeof form.get("body_mdx") === "string" ? (form.get("body_mdx") as string) : "";
  const published = form.get("published") === "on";

  if (!title || title.length > 200) return { ok: false, message: "Title is required (max 200 characters)." };
  if (!SLUG_RE.test(slug)) return { ok: false, message: "Slug may only contain a–z, 0–9 and dashes." };
  if (getMdxBlogSlugs().includes(slug)) {
    return { ok: false, message: `“${slug}” is already used by an MDX post in content/blog.` };
  }
  if (!isIsoDate(date)) return { ok: false, message: "Date must be YYYY-MM-DD." };
  // MDX already strips JS expressions (blockJS); literal tags like these would still render
  // server-side and run, so a stolen admin session can't turn a post into stored XSS.
  if (UNSAFE_TAG_RE.test(body)) {
    return { ok: false, message: "Posts can't contain <script>, <iframe>, <object>, <embed> or <style> tags." };
  }

  const row = { title, slug, description, date, body_mdx: body, tags: parseTags(str(form, "tags")), published };

  if (id) {
    const { error } = await admin.supabase.from("posts").update(row).eq("id", id);
    if (error) return { ok: false, message: error.code === "23505" ? "That slug is taken." : error.message };
    refreshBlog(slug);
    return { ok: true, message: published ? "Saved and live." : "Saved as draft." };
  }

  const { data, error } = await admin.supabase.from("posts").insert(row).select("id").single();
  if (error) return { ok: false, message: error.code === "23505" ? "That slug is taken." : error.message };
  refreshBlog(slug);
  redirect(`/admin/posts/${data.id}?created=1`);
}

export async function deletePost(form: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const id = str(form, "id");
  if (!id) return;
  await admin.supabase.from("posts").delete().eq("id", id);
  refreshBlog();
  redirect("/admin/posts");
}

export async function togglePublished(form: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const id = str(form, "id");
  const next = str(form, "published") === "true";
  if (!id) return;
  await admin.supabase.from("posts").update({ published: next }).eq("id", id);
  refreshBlog();
}

/** Renders MDX exactly as the blog will, so the preview can't drift from production. */
export async function previewMdx(source: string) {
  const admin = await requireAdmin();
  if (!admin) return null;
  if (UNSAFE_TAG_RE.test(source)) {
    return <p className="text-sm text-red-300">Remove &lt;script&gt;, &lt;iframe&gt;, &lt;object&gt;, &lt;embed&gt; and &lt;style&gt; tags.</p>;
  }
  return <MdxContent source={source} />;
}
