import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Calendar, Clock, MessageSquare, Video } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("book");
  return { title: t("title"), description: t("description") };
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
      <div className="text-center mb-12">
        <div className="inline-flex p-4 rounded-2xl bg-brand-400/10 border border-brand-400/20 mb-6">
          <Calendar size={28} className="text-brand-700 dark:text-brand-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("title")}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {sessionTypes.map(({ icon: Icon, title, duration, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-brand-400/20 bg-brand-400/10 p-5"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-brand-400/10 shrink-0">
                <Icon size={18} className="text-brand-700 dark:text-brand-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                  <span className="text-xs font-medium text-brand-700 dark:text-brand-400">
                    {duration}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-white/5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-1">{t("pickTime")}</h2>
          <p className="text-sm text-gray-500">{t("conductedVia")}</p>
        </div>

        <div className="aspect-[4/3] flex flex-col items-center justify-center bg-gray-100 dark:bg-[#111118] p-8 text-center">
          <Calendar size={40} className="text-gray-400 dark:text-gray-700 mb-4" />
          <p className="text-gray-500 text-sm mb-2">{t("calendlyWidget")}</p>
          <p className="text-gray-400 dark:text-gray-700 text-xs max-w-xs">{t("calendlyInfo")}</p>
          <a
            href="mailto:siaexplains@gmail.com?subject=Book a Call"
            className="mt-5 px-5 py-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-900 font-medium text-sm transition-colors"
          >
            {t("emailToSchedule")}
          </a>
        </div>
      </div>

      <div className="mt-8 p-5 rounded-xl border border-gray-200 dark:border-white/5 text-sm text-gray-500 space-y-1.5">
        <p>{t("noteTime")}</p>
        <p>{t("noteConfidential")}</p>
        <p>{t("notePrepare")}</p>
      </div>
    </div>
  );
}
