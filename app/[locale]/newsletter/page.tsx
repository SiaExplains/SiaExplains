import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, Zap, BookOpen, Wrench } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("newsletter");
  return { title: t("title"), description: t("description") };
}

export default async function NewsletterPage() {
  const t = await getTranslations("newsletter");

  const perks = [
    { icon: Zap, title: t("buildingTitle"), description: t("buildingDesc") },
    { icon: BookOpen, title: t("readingTitle"), description: t("readingDesc") },
    { icon: Wrench, title: t("toolsTitle"), description: t("toolsDesc") },
    { icon: Mail, title: t("noSpamTitle"), description: t("noSpamDesc") },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 rounded-2xl bg-brand-400/10 border border-brand-400/20 mb-6">
          <Mail size={28} className="text-brand-700 dark:text-brand-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("title")}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {perks.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 p-4"
          >
            <Icon size={16} className="text-brand-700 dark:text-brand-400 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      <NewsletterForm />
    </div>
  );
}
