import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, Zap, BookOpen, Wrench } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import PageHeader from "@/components/PageHeader";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

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
      <PageHeader
        center
        icon={<Mail size={28} className="text-accent-700 dark:text-accent-300" />}
        title={t("title")}
        description={t("description")}
      />

      <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {perks.map(({ icon: Icon, title, description }) => (
          <RevealItem key={title}>
            <SpotlightCard className="group h-full p-4">
              <Icon size={16} className="text-accent-600 dark:text-accent-300 mb-2 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
              <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal>
        <NewsletterForm />
      </Reveal>
    </div>
  );
}
