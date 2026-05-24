import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://siaexplains.com";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts("blog").flatMap((post) =>
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

  return [...staticRoutes, ...blogPosts, ...articles];
}
