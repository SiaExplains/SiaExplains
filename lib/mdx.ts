import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types";
import { estimateReadingTime } from "./utils";

const contentDir = path.join(process.cwd(), "content");

export function getAllPosts(type: "blog" | "articles"): Post[] {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const filePath = path.join(dir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      return {
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        tags: data.tags ?? [],
        slug,
        readingTime: estimateReadingTime(content),
      } satisfies Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(
  type: "blog" | "articles",
  slug: string
): { frontmatter: Post; content: string } | null {
  const filePath = path.join(contentDir, type, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: {
      title: data.title ?? slug,
      date: data.date ?? "",
      description: data.description ?? "",
      tags: data.tags ?? [],
      slug,
      readingTime: estimateReadingTime(content),
    },
    content,
  };
}
