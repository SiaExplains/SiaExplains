import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import Timeline from "@/components/Timeline";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { TimelineEvent } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("timeline");
  return { title: t("title"), description: t("description"), alternates: await localeAlternates("/timeline") };
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
      url?: string;
    }>
  ).map((e) => ({
    year: e.year,
    title: e.title,
    category: e.category as TimelineEvent["category"],
    description: e.description,
    location: e.location,
    url: e.url,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <PageHeader center label={t("label")} title={t("title")} description={t("description")} />

      <Reveal className="flex flex-wrap justify-center gap-4 mb-16 text-sm">
        {[
          { label: t("education"), color: "bg-accent-400" },
          { label: t("career"), color: "bg-brand-400" },
          { label: t("company"), color: "bg-orange-400" },
          { label: t("life"), color: "bg-accent-600" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2 text-gray-500">
            <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
            {label}
          </div>
        ))}
      </Reveal>

      <Timeline
        events={timelineEvents}
        categoryLabels={{
          Education: t("education"),
          Career: t("career"),
          Company: t("company"),
          Life: t("life"),
        }}
        visitLabel={t("visitWebsite")}
      />
    </div>
  );
}
