import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { getBlogPosts } from "@/lib/posts";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { languageAlternates, localizedUrl } from "@/lib/seo";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const staticPaths: { path: string; priority: number; changeFrequency: ChangeFrequency }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/articles", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cv", priority: 0.7, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.7, changeFrequency: "monthly" },
  { path: "/youtube", priority: 0.7, changeFrequency: "weekly" },
  { path: "/timeline", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/newsletter", priority: 0.5, changeFrequency: "yearly" },
  { path: "/book", priority: 0.5, changeFrequency: "monthly" },
];

export const revalidate = 3600;

/** One entry per locale, each listing every language version (hreflang) of the same page. */
function localizedEntries(
  path: string,
  opts: { lastModified?: Date; changeFrequency: ChangeFrequency; priority: number }
): MetadataRoute.Sitemap {
  const languages = languageAlternates(path);
  return routing.locales.map((locale) => ({
    url: localizedUrl(path, locale),
    ...opts,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages carry no lastmod: stamping them with "now" on every request tells Google the
  // dates are noise, and it then ignores the real ones on posts too.
  const staticRoutes = staticPaths.flatMap(({ path, priority, changeFrequency }) =>
    localizedEntries(path, { changeFrequency, priority })
  );

  const blogPosts = (await getBlogPosts()).flatMap((post) =>
    localizedEntries(`/blog/${post.slug}`, {
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const articles = getAllPosts("articles").flatMap((post) =>
    localizedEntries(`/articles/${post.slug}`, {
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  // /link is a single English page outside the locale tree, so it has no language alternates.
  const linkPage: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/link`, changeFrequency: "monthly", priority: 0.6 },
  ];

  return [...staticRoutes, ...linkPage, ...blogPosts, ...articles];
}
