// Blog posts come from two places: MDX files in content/blog (in git) and posts written in the
// admin (Supabase). This module merges them; an MDX file wins if both use the same slug.
import { getAllPosts, getPost } from "@/lib/mdx";
import { getPublicClient } from "@/lib/supabase/public";
import { estimateReadingTime } from "@/lib/utils";
import type { Post } from "@/types";

type DbPostRow = {
  slug: string;
  title: string;
  description: string;
  tags: string[] | null;
  date: string;
  body_mdx: string;
};

function toPost(row: DbPostRow): Post {
  return {
    title: row.title,
    date: row.date,
    description: row.description,
    tags: row.tags ?? [],
    slug: row.slug,
    readingTime: estimateReadingTime(row.body_mdx),
  };
}

async function getPublishedDbPosts(): Promise<DbPostRow[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("posts")
    .select("slug,title,description,tags,date,body_mdx")
    .eq("published", true)
    .order("date", { ascending: false });
  if (error) {
    console.error("[posts] Supabase read failed, showing MDX posts only:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getBlogPosts(): Promise<Post[]> {
  const mdx = getAllPosts("blog");
  const taken = new Set(mdx.map((p) => p.slug));
  const db = (await getPublishedDbPosts()).filter((row) => !taken.has(row.slug)).map(toPost);
  return [...mdx, ...db].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<{ frontmatter: Post; content: string } | null> {
  const fromFile = getPost("blog", slug);
  if (fromFile) return fromFile;

  const supabase = getPublicClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("posts")
    .select("slug,title,description,tags,date,body_mdx")
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return { frontmatter: toPost(data), content: data.body_mdx };
}

/** Slugs already owned by MDX files; the admin refuses to reuse them. */
export function getMdxBlogSlugs(): string[] {
  return getAllPosts("blog").map((p) => p.slug);
}
