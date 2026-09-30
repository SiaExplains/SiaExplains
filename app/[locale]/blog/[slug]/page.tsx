import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { Link } from "@/lib/navigation";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import MdxContent from "@/components/MdxContent";
import BlurText from "@/components/motion/BlurText";
import { Reveal } from "@/components/motion/Reveal";

type Props = { params: Promise<{ slug: string; locale: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getBlogPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlogPost(slug);
  if (!result) return {};
  return {
    title: result.frontmatter.title,
    description: result.frontmatter.description,
    alternates: await localeAlternates(`/blog/${slug}`),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranslations("postDetail");
  const result = await getBlogPost(slug);
  if (!result) notFound();

  const { frontmatter, content } = result;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent-700 dark:hover:text-accent-300 transition-colors mb-10"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
        {t("backToBlog")}
      </Link>

      <Reveal as="div" y={16} className="mb-10 pb-8 border-b border-gray-200 dark:border-white/5">
        <header>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs text-accent-700 dark:text-accent-300 bg-accent-500/10 border border-accent-500/25 px-2.5 py-0.5 rounded-full transition-transform hover:-translate-y-0.5"
              >
                <Tag size={9} />
                {tag}
              </span>
            ))}
          </div>
  
          <BlurText
            as="h1"
            text={frontmatter.title}
            delay={40}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4"
          />
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
      </Reveal>

      <Reveal as="div" delay={0.15}>
        <article>
          <MdxContent source={content} />
        </article>
      </Reveal>

      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/5">
        <Link
          href="/blog"
          className="btn btn-ghost"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          {t("allBlogPosts")}
        </Link>
      </div>
    </div>
  );
}
