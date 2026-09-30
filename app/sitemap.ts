import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { getBlogPosts } from "@/lib/posts";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

const BASE_URL = SITE_URL;

const staticPaths = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/articles", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/projects", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/youtube", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/timeline", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/newsletter", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/book", priority: 0.5, changeFrequency: "monthly" as const },
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = (await getBlogPosts()).flatMap((post) =>
    routing.locales.map((locale) => ({
      url: locale === routing.defaultLocale
        ? `${BASE_URL}/blog/${post.slug}`
        : `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const articles = getAllPosts("articles").flatMap((post) =>
    routing.locales.map((locale) => ({
      url: locale === routing.defaultLocale
        ? `${BASE_URL}/articles/${post.slug}`
        : `${BASE_URL}/${locale}/articles/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: locale === routing.defaultLocale
        ? `${BASE_URL}${path}`
        : `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  );

  // /link is a single English page outside the locale tree.
  const linkPage: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/link`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  return [...staticRoutes, ...linkPage, ...blogPosts, ...articles];
}
