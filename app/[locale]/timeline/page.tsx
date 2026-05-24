import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Timeline from "@/components/Timeline";
import { TimelineEvent } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("timeline");
  return { title: t("title"), description: t("description") };
}

export default async function TimelinePage() {
  const t = await getTranslations("timeline");

  const timelineEvents: TimelineEvent[] = (
    t.raw("events") as Array<{
      year: string;
      title: string;
      category: string;
      description: string;
      location: string;
    }>
  ).map((e) => ({
    year: e.year,
    title: e.title,
    category: e.category as TimelineEvent["category"],
    description: e.description,
    location: e.location,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <p className="text-accent-600 dark:text-accent-300 text-sm font-medium tracking-wide uppercase mb-3">
          {t("label")}
        </p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("title")}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto">{t("description")}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-16 text-sm">
        {[
          { label: t("education"), color: "bg-brand-300" },
          { label: t("career"), color: "bg-brand-500" },
          { label: t("company"), color: "bg-brand-400" },
          { label: t("life"), color: "bg-brand-400" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2 text-gray-500">
            <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
            {label}
          </div>
        ))}
      </div>

      <Timeline
        events={timelineEvents}
        categoryLabels={{
          Education: t("education"),
          Career: t("career"),
          Company: t("company"),
          Life: t("life"),
        }}
      />
    </div>
  );
}
