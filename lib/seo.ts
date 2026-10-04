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

/** Served by app/[locale]/opengraph-image.tsx; the unprefixed path resolves to the English route. */
export const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;

const OG_LOCALES: Record<string, string> = { en: "en_US", de: "de_DE", fa: "fa_IR" };

type PageSeo = { type?: "website" | "article" | "profile"; publishedTime?: string; tags?: string[] };

/**
 * Canonical, hreflang and Open Graph for a page in the current request's locale. A page's
 * openGraph replaces the layout's rather than merging, so siteName is repeated here. It also drops
 * the file-based image from app/[locale]/opengraph-image.tsx, so that is linked explicitly.
 * og:title and og:description are filled in by Next from the page's title and description.
 */
export async function localeMetadata(path: string, seo: PageSeo = {}): Promise<Pick<Metadata, "alternates" | "openGraph">> {
  const locale = await getLocale();
  const url = localizedUrl(path, locale);
  const common = {
    url,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: "Siavash Ghanbari — SiaExplains" }],
    siteName: "SiaExplains",
    locale: OG_LOCALES[locale],
    alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
  };
  return {
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph:
      seo.type === "article"
        ? { ...common, type: "article", publishedTime: seo.publishedTime, authors: [SITE_URL + "/about"], tags: seo.tags }
        : { ...common, type: seo.type ?? "website" },
  };
}
