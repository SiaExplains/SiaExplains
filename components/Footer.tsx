import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { YoutubeIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/SocialIcons";

const socials = [
  { label: "YouTube", href: "https://youtube.com/@SiaExplains", icon: YoutubeIcon },
  { label: "GitHub", href: "https://github.com/SiaExplains", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/siavash-ghanbari/", icon: LinkedinIcon },
  { label: "Twitter", href: "https://twitter.com/SiaExplains", icon: TwitterIcon },
];

export default async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  const footerLinks = [
    { href: "/blog" as const, label: nav("blog") },
    { href: "/articles" as const, label: nav("articles") },
    { href: "/projects" as const, label: nav("projects") },
    { href: "/newsletter" as const, label: "Newsletter" },
    { href: "/contact" as const, label: nav("contact") },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#14110a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-gray-900 dark:text-white font-semibold text-lg tracking-tight"
            >
              <span className="text-brand-700 dark:text-brand-400">Sia</span>Explains
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-4">
              {t("explore")}
            </p>
            <ul className="space-y-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-4">
              {t("findMeOn")}
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-gray-500 hover:text-accent-600 dark:hover:text-accent-300 hover:bg-accent-300/10 dark:hover:bg-accent-300/10 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500 dark:text-gray-600">
            {t("copyright", { year })}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-700">
            {t("builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
