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
    // People type the plural; the link-in-bio page lives at /link.
    return [{ source: "/links", destination: "/link", permanent: true }];
  },
};

export default withNextIntl(nextConfig);
