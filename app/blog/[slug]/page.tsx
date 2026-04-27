import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getPost, getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import MdxContent from "@/components/MdxContent";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts("blog").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = getPost("blog", slug);
  if (!result) return {};
  return {
    title: result.frontmatter.title,
    description: result.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const result = getPost("blog", slug);
  if (!result) notFound();

  const { frontmatter, content } = result;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors mb-10"
      >
        <ArrowLeft size={14} />
        Back to Blog
      </Link>

      <header className="mb-10 pb-8 border-b border-gray-200 dark:border-white/5">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-0.5 rounded-full"
            >
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
          {frontmatter.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-5">
          {frontmatter.description}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {formatDate(frontmatter.date)}
          </span>
          {frontmatter.readingTime && (
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {frontmatter.readingTime}
            </span>
          )}
        </div>
      </header>

      <article>
        <MdxContent source={content} />
      </article>

      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/5">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 transition-colors"
        >
          <ArrowLeft size={14} />
          All blog posts
        </Link>
      </div>
    </div>
  );
}
