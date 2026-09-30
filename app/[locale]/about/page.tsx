import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { Link } from "@/lib/navigation";
import { ArrowRight, MapPin, Code2, Globe } from "lucide-react";
import Image from "next/image";
import { YoutubeIcon } from "@/components/SocialIcons";
import PageHeader from "@/components/PageHeader";
import Magnet from "@/components/motion/Magnet";
import SpotlightCard from "@/components/motion/SpotlightCard";
import TiltedCard from "@/components/motion/TiltedCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: t("title"), description: t("subtitle"), alternates: await localeAlternates("/about") };
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
      <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr] mb-4">
        <PageHeader label={t("label")} title={t("title")} description={t("subtitle")} className="mb-0" />
        <Reveal delay={0.2} className="relative mx-auto w-full max-w-[260px]">
          <div aria-hidden className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-400/40 to-accent-500/40 blur-2xl" />
          <TiltedCard className="relative aspect-square">
            <Image
              src="/sia-portrait.webp"
              alt="Siavash Ghanbari"
              fill
              sizes="260px"
              className="rounded-[1.75rem] object-cover ring-1 ring-white/30 dark:ring-white/10"
            />
          </TiltedCard>
        </Reveal>
      </div>

      {/* Quick facts */}
      <RevealGroup className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 mb-16">
        {facts.map(({ icon: Icon, label, value }) => (
          <RevealItem key={label}>
            <SpotlightCard className="group h-full p-4">
              <Icon size={16} className="text-accent-600 dark:text-accent-300 mb-2 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="prose-custom space-y-10">
        <Reveal as="section">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-brand-400 to-accent-500" />
            {t("originTitle")}
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>{t("originP1")}</p>
            <p>{t("originP2")}</p>
            <p>{t("originP3")}</p>
          </div>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-brand-400 to-accent-500" />
            {t("engineeringTitle")}
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>{t("engineeringP1")}</p>
            <p>{t("engineeringP2")}</p>
            <p>{t("engineeringP3")}</p>
          </div>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-brand-400 to-accent-500" />
            {t("whySiaTitle")}
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>{t("whySiaP1")}</p>
            <p>{t("whySiaP2")}</p>
          </div>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-brand-400 to-accent-500" />
            {t("outsideTitle")}
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>{t("outsideP1")}</p>
            <p>{t("outsideP2")}</p>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-wrap gap-3">
        <Magnet>
          <Link href="/timeline" className="btn btn-primary">
            {t("ctaTimeline")} <ArrowRight size={14} className="rtl:rotate-180" />
          </Link>
        </Magnet>
        <Magnet>
          <Link href="/cv" className="btn btn-ghost">
            {t("ctaCv")}
          </Link>
        </Magnet>
        <Magnet>
          <Link href="/contact" className="btn btn-ghost">
            {t("ctaContact")}
          </Link>
        </Magnet>
      </Reveal>
    </div>
  );
}
