import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { ArrowRight, MapPin, Code2, Globe } from "lucide-react";
import { YoutubeIcon } from "@/components/SocialIcons";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: t("title"), description: t("subtitle") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  const facts = [
    { icon: MapPin, label: t("factLocation"), value: "Berlin, Germany" },
    { icon: Code2, label: t("factRole"), value: "Principal Software Engineer & Tech Lead" },
    { icon: YoutubeIcon, label: t("factYoutube"), value: "SiaExplains" },
    { icon: Globe, label: t("factFrom"), value: "Tehran, Iran" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-accent-600 dark:text-accent-300 text-sm font-medium tracking-wide uppercase mb-3">
          {t("label")}
        </p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("title")}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl">
          {t("subtitle")}
        </p>
      </div>

      {/* Quick facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {facts.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 p-4"
          >
            <Icon size={16} className="text-brand-700 dark:text-brand-400 mb-2" />
            <p className="text-xs text-gray-500 dark:text-gray-600 mb-1">{label}</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="prose-custom space-y-10">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("originTitle")}</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>{t("originP1")}</p>
            <p>{t("originP2")}</p>
            <p>{t("originP3")}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("engineeringTitle")}</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>{t("engineeringP1")}</p>
            <p>{t("engineeringP2")}</p>
            <p>{t("engineeringP3")}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("whySiaTitle")}</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>{t("whySiaP1")}</p>
            <p>{t("whySiaP2")}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("outsideTitle")}</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>{t("outsideP1")}</p>
            <p>{t("outsideP2")}</p>
          </div>
        </section>
      </div>

      <div className="mt-14 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-wrap gap-4">
        <Link
          href="/timeline"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-900 font-medium transition-colors text-sm"
        >
          {t("ctaTimeline")} <ArrowRight size={14} />
        </Link>
        <Link
          href="/cv"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm"
        >
          {t("ctaCv")}
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm"
        >
          {t("ctaContact")}
        </Link>
      </div>
    </div>
  );
}
