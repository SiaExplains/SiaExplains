import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { Calendar, Clock, MessageSquare, Video } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Magnet from "@/components/motion/Magnet";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("book");
  return { title: t("title"), description: t("description"), alternates: await localeAlternates("/book") };
}

export default async function BookPage() {
  const t = await getTranslations("book");

  const sessionTypes = [
    {
      icon: MessageSquare,
      title: t("careerTitle"),
      duration: t("min30"),
      description: t("careerDesc"),
    },
    {
      icon: Video,
      title: t("codeReviewTitle"),
      duration: t("min45"),
      description: t("codeReviewDesc"),
    },
    {
      icon: Clock,
      title: t("openSessionTitle"),
      duration: t("min30"),
      description: t("openSessionDesc"),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <PageHeader
        center
        icon={<Calendar size={28} className="text-accent-700 dark:text-accent-300" />}
        title={t("title")}
        description={t("description")}
      />

      <RevealGroup className="space-y-4 mb-10">
        {sessionTypes.map(({ icon: Icon, title, duration, description }) => (
          <RevealItem key={title}>
            <SpotlightCard className="group p-5">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-400/20 to-accent-500/20 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon size={18} className="text-accent-700 dark:text-accent-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <span className="text-xs font-medium text-brand-700 dark:text-brand-300 bg-brand-400/15 rounded-full px-2 py-0.5">
                      {duration}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
                </div>
              </div>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="card overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-white/5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-1">{t("pickTime")}</h2>
          <p className="text-sm text-gray-500">{t("conductedVia")}</p>
        </div>

        <div className="aspect-[4/3] flex flex-col items-center justify-center bg-gradient-to-br from-brand-400/5 via-transparent to-accent-500/10 p-8 text-center">
          <Calendar size={40} className="animate-float text-accent-500/60 mb-4" />
          <p className="text-gray-500 text-sm mb-2">{t("calendlyWidget")}</p>
          <p className="text-gray-400 dark:text-gray-700 text-xs max-w-xs">{t("calendlyInfo")}</p>
          <Magnet className="mt-5">
            <a href="mailto:hi@siaexplains.com?subject=Book a Call" className="btn btn-primary">
              {t("emailToSchedule")}
            </a>
          </Magnet>
        </div>
      </Reveal>

      <Reveal className="mt-8 p-5 rounded-xl border border-gray-200 dark:border-white/5 text-sm text-gray-500 space-y-1.5">
        <p>{t("noteTime")}</p>
        <p>{t("noteConfidential")}</p>
        <p>{t("notePrepare")}</p>
      </Reveal>
    </div>
  );
}
