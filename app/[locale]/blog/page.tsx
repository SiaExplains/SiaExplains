import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { ArrowRight, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return { title: t("title"), description: t("description") };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const posts = getAllPosts("blog");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-accent-600 dark:text-accent-300 text-sm font-medium tracking-wide uppercase mb-3">
          {t("label")}
        </p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("title")}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">{t("description")}</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>{t("noPosts")}</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-white/5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block py-7 hover:py-8 transition-all"
            >
              <div className="flex flex-wrap gap-1.5 mb-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full"
                  >
                    <Tag size={9} />
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-3 text-sm">{post.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-3 text-xs text-gray-500">
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <span className="text-xs text-accent-600 dark:text-accent-300 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t("read")} <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
