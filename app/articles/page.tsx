import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Tag, BookOpen } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Long-form technical articles by Siavash on system design, distributed systems, and engineering leadership.",
};

export default function ArticlesPage() {
  const articles = getAllPosts("articles");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-brand-500 dark:text-brand-400 text-sm font-medium tracking-wide uppercase mb-3">
          Long-form
        </p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Articles</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          In-depth technical writing on system design, distributed systems,
          engineering leadership, and the craft of software. Takes more than 5
          minutes to read. Worth it.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <BookOpen size={32} className="mx-auto mb-3 opacity-30" />
          <p>No articles yet. Check back soon.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group block rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 p-6 hover:border-gray-300 dark:hover:border-white/10 hover:-translate-y-0.5 transition-all"
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {article.tags.map((tag) => (
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
                {article.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4 text-sm">
                {article.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-3 text-xs text-gray-500">
                  <span>{formatDate(article.date)}</span>
                  <span>·</span>
                  <span>{article.readingTime}</span>
                </div>
                <span className="text-xs text-brand-600 dark:text-brand-400 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read article <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
