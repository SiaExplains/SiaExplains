import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { Link } from "@/lib/navigation";
import { ArrowRight, Tag } from "lucide-react";
import { getBlogPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import PageHeader from "@/components/PageHeader";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return { title: t("title"), description: t("description"), alternates: await localeAlternates("/blog") };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const posts = await getBlogPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <PageHeader label={t("label")} title={t("title")} description={t("description")} />

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>{t("noPosts")}</p>
        </div>
      ) : (
        <RevealGroup className="divide-y divide-gray-200 dark:divide-white/5">
          {posts.map((post) => (
            <RevealItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group relative block py-7 ps-0 transition-[padding] duration-300 hover:ps-5"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-5 start-0 w-1 origin-top scale-y-0 rounded-full bg-gradient-to-b from-brand-400 to-accent-500 transition-transform duration-300 group-hover:scale-y-100"
                />
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full transition-colors group-hover:bg-accent-500/10 group-hover:text-accent-700 dark:group-hover:text-accent-300"
                    >
                      <Tag size={9} />
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 dir="auto" className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-accent-700 dark:group-hover:text-accent-200 transition-colors mb-2">
                  {post.title}
                </h2>
                <p dir="auto" className="text-gray-500 leading-relaxed mb-3 text-sm">{post.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <span className="text-xs text-accent-600 dark:text-accent-300 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t("read")} <ArrowRight size={12} className="rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
