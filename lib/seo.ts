import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

/**
 * Absolute URL of `path` in `locale`, following the `as-needed` prefix rule:
 * English lives at the root, Farsi and German under /fa and /de.
 */
export function localizedUrl(path: string, locale: string): string {
  const suffix = path === "/" ? "" : path;
  return locale === routing.defaultLocale ? `${SITE_URL}${suffix}` : `${SITE_URL}/${locale}${suffix}`;
}

/** hreflang map for every locale, plus x-default pointing at the English page. */
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(path, l)])),
    "x-default": localizedUrl(path, routing.defaultLocale),
  };
}

/** Self-referencing canonical + hreflang alternates for a page in the current request's locale. */
export async function localeAlternates(path: string): Promise<Metadata["alternates"]> {
  const locale = await getLocale();
  return { canonical: localizedUrl(path, locale), languages: languageAlternates(path) };
}
