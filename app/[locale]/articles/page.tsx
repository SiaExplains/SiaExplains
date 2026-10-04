import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeMetadata } from "@/lib/seo";
import { Link } from "@/lib/navigation";
import { ArrowRight, Tag, BookOpen } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import PageHeader from "@/components/PageHeader";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("articles");
  return { title: t("title"), description: t("description"), ...(await localeMetadata("/articles")) };
}

export default async function ArticlesPage() {
  const t = await getTranslations("articles");
  const articles = getAllPosts("articles");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <PageHeader label={t("label")} title={t("title")} description={t("description")} />

      {articles.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <BookOpen size={32} className="mx-auto mb-3 opacity-30" />
          <p>{t("noArticles")}</p>
        </div>
      ) : (
        <RevealGroup className="space-y-4">
          {articles.map((article) => (
            <RevealItem key={article.slug}>
              <Link href={`/articles/${article.slug}`} className="group block">
                <SpotlightCard className="p-6">
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
                  <h2 dir="auto" className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-accent-700 dark:group-hover:text-accent-200 transition-colors mb-2">
                    {article.title}
                  </h2>
                  <p dir="auto" className="text-gray-500 leading-relaxed mb-4 text-sm">{article.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>{formatDate(article.date)}</span>
                      <span>·</span>
                      <span>{article.readingTime}</span>
                    </div>
                    <span className="text-xs text-accent-600 dark:text-accent-300 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t("readArticle")} <ArrowRight size={12} className="rtl:rotate-180" />
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
