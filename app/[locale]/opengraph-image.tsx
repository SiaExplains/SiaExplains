import { ImageResponse } from "next/og";

// Default share card for every page. English-only on purpose: the built-in font has no Persian
// glyphs, and a name card reads the same in every language.
export const alt = "Siavash Ghanbari — SiaExplains";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0a0913 0%, #1a1233 60%, #2a1a4a 100%)",
          color: "#faf8ff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, color: "#f5b82e", fontWeight: 600 }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, background: "#f5b82e" }} />
          siaexplains.com
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>Siavash Ghanbari</div>
          <div style={{ fontSize: 40, color: "#c4b5fd" }}>Principal Software Engineer · Founder · YouTuber</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>
          Engineering, startups, AI tools and life in Germany — Berlin
        </div>
      </div>
    ),
    size
  );
}
