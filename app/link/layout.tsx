import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://siaexplains.com"),
  title: "Siavash Ghanbari — Links",
  description:
    "All of Sia's links in one place: the SiaExplains YouTube channel, Hampa, Iranian Tech Hub, FocusCrew and siaexplains.com.",
  alternates: { canonical: "/link" },
  openGraph: {
    type: "profile",
    url: "/link",
    siteName: "SiaExplains",
    title: "Siavash Ghanbari — Links",
    description: "YouTube, Hampa, Iranian Tech Hub, FocusCrew and more.",
    images: [{ url: "/sia-portrait.webp", width: 1254, height: 1254, alt: "Siavash Ghanbari" }],
  },
  twitter: { card: "summary", site: "@SiaExplains", images: ["/sia-portrait.webp"] },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0913",
  width: "device-width",
  initialScale: 1,
};

/** Standalone shell: no site navbar/footer. Always dark, so it matches the Instagram in-app browser. */
export default function LinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${instrumentSerif.variable} antialiased min-h-dvh`}
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        {children}
      </body>
    </html>
  );
}
