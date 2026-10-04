import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Vazirmatn } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import MotionProvider from "@/components/motion/MotionProvider";
import JsonLd from "@/components/JsonLd";
import { siteGraph } from "@/lib/jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | SiaExplains",
    default: "SiaExplains — Siavash · Principal Engineer & YouTuber",
  },
  description:
    "Principal Software Engineer & Tech Lead based in Berlin. Building software, sharing knowledge, and documenting the journey on YouTube.",
  keywords: ["software engineering", "tech", "AI", "YouTube", "Berlin", "SiaExplains"],
  authors: [{ name: "Siavash Ghanbari", url: `${SITE_URL}/about` }],
  creator: "Siavash Ghanbari",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  openGraph: {
    siteName: "SiaExplains",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SiaExplains",
    creator: "@SiaExplains",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale as "en" | "fa" | "de")) {
    notFound();
  }

  const messages = await getMessages();

  // Farsi is RTL
  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${vazirmatn.variable} antialiased min-h-screen flex flex-col`}
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <JsonLd data={siteGraph()} />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <MotionProvider>
              <Navbar />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
