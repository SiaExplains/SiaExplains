import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // People type the plural; the link-in-bio page lives at /link.
      { source: "/links", destination: "/link", permanent: true },
      // English lives at the root. next-intl would strip /en with a temporary 307; make it
      // permanent so search engines consolidate on the unprefixed URL.
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
