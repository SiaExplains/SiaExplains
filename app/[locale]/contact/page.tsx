import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { Mail } from "lucide-react";
import { YoutubeIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/SocialIcons";
import ContactForm from "@/components/ContactForm";
import { orderedChannels } from "@/lib/channels";
import PageHeader from "@/components/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return { title: t("title"), description: t("description"), alternates: await localeAlternates("/contact") };
}

const otherSocials = [
  {
    label: "GitHub",
    handle: "github.com/SiaExplains",
    href: "https://github.com/SiaExplains",
    icon: GithubIcon,
    color: "text-gray-600 dark:text-gray-300",
    bg: "bg-gray-100 dark:bg-white/5",
    border: "border-gray-200 dark:border-white/10",
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/siavash-ghanbari",
    href: "https://www.linkedin.com/in/siavash-ghanbari/",
    icon: LinkedinIcon,
    color: "text-brand-700 dark:text-brand-400",
    bg: "bg-brand-400/10",
    border: "border-brand-400/20",
  },
  {
    label: "Twitter / X",
    handle: "@SiaExplains",
    href: "https://twitter.com/SiaExplains",
    icon: TwitterIcon,
    color: "text-gray-600 dark:text-gray-300",
    bg: "bg-gray-100 dark:bg-white/5",
    border: "border-gray-200 dark:border-white/10",
  },
];

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const socials = [
    ...orderedChannels(await getLocale()).map((c) => ({
      label: `YouTube — ${c.name}`,
      handle: c.handle,
      href: c.url,
      icon: YoutubeIcon,
      color: "text-brand-700 dark:text-brand-400",
      bg: "bg-brand-400/10",
      border: "border-brand-400/20",
    })),
    ...otherSocials,
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <PageHeader label={t("label")} title={t("title")} description={t("description")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Reveal>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
            {t("sendMessage")}
          </h2>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
            {t("findMeOn")}
          </h2>
          <RevealGroup className="space-y-3">
            {socials.map(({ label, handle, href, icon: Icon, color, bg, border }) => (
              <RevealItem key={label}>
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 p-4 rounded-xl border ${bg} ${border} transition-all duration-300 hover:-translate-y-0.5 hover:ps-5 hover:border-accent-500/40 hover:shadow-[0_14px_30px_-16px_rgba(139,92,246,0.55)]`}
                >
                  <div className={`p-2 rounded-lg ${bg} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                    <Icon size={18} className={color} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                    <p className="text-xs text-gray-500">{handle}</p>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-6 p-4 rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5">
            <div className="flex items-center gap-2 mb-1">
              <Mail size={14} className="text-brand-700 dark:text-brand-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">{t("email")}</span>
            </div>
            <a href="mailto:hi@siaexplains.com" className="link-draw text-sm text-gray-500 hover:text-accent-700 dark:hover:text-accent-300">hi@siaexplains.com</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
