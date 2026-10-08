// schema.org structured data. Search engines and AI assistants read these as the machine copy of
// who Sia is and what each page is, so every fact here must match what the pages render.
import { CHANNELS } from "@/lib/channels";
import { SITE_URL } from "@/lib/site";
import { OG_IMAGE_URL, localizedUrl } from "@/lib/seo";
import type { Post } from "@/types";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const ventures = [
  { name: "Mylper", type: "Organization", url: "https://mylper.com", foundingDate: "2026-10", description: "A free, browser-based image editor for photo editing, image creation, and drawing, in the spirit of Photoshop and GIMP." },
  { name: "Iranian Tech Hub", type: "NGO", url: "https://www.iraniantechhub.com", foundingDate: "2026-09", description: "A non-profit, members-only network for Iranian founders, operators and investors, grown from an 800+ member Telegram community." },
  { name: "FocusCrew", type: "Organization", url: "https://www.focus-crew.com", foundingDate: "2026-08", description: "A gamified Pomodoro platform where small crews focus together." },
  { name: "WikiDigit", type: "Organization", url: "https://wikidigit.com", foundingDate: "2026-01", description: "A tech media and news website covering technology, AI, and the digital world." },
  { name: "Emojar", type: "Organization", url: "https://emojar.com", foundingDate: "2025-04", description: "A free emoji search and copy platform with 3,600+ emojis." },
  { name: "Hampa", type: "NGO", url: "https://www.instagram.com/hampa.berlin", foundingDate: "2024-02", description: "A non-profit sports community for Iranians in Berlin." },
];

export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Siavash Ghanbari",
    alternateName: ["Sia", "SiaExplains", "Sia Barry"],
    url: SITE_URL,
    image: `${SITE_URL}/sia-portrait.webp`,
    email: "mailto:hi@siaexplains.com",
    jobTitle: "Principal Software Engineer",
    worksFor: { "@type": "Organization", name: "MHP" },
    address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "Mazandaran University" }],
    knowsLanguage: ["en", "de", "fa"],
    knowsAbout: ["Software engineering", "System design", "React", "Next.js", "Node.js", "TypeScript", "AWS", "AI tools", "Startups", "Tech careers in Germany"],
    sameAs: [
      CHANNELS.siaexplains.url,
      CHANNELS.siabarry.url,
      "https://github.com/SiaExplains",
      "https://www.linkedin.com/in/siavash-ghanbari/",
      "https://twitter.com/SiaExplains",
    ],
  };
}

function ventureNodes() {
  return ventures.map(({ type, ...v }) => ({
    "@type": type,
    "@id": `${v.url}#organization`,
    ...v,
    founder: { "@id": PERSON_ID },
  }));
}

/** Site-wide graph: the person, the site, and what he founded. Rendered once in the layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(),
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: "SiaExplains",
        description: "Siavash Ghanbari's site: engineering, startups, YouTube and life in Germany.",
        inLanguage: ["en", "fa", "de"],
        publisher: { "@id": PERSON_ID },
      },
      ...ventureNodes(),
    ],
  };
}

/** For /about and /cv: the page is about the person. */
export function profilePage(path: string, locale: string, name: string) {
  const url = localizedUrl(path, locale);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#webpage`,
    url,
    name,
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

/** BlogPosting + breadcrumbs for a blog post or article. */
export function postGraph(post: Post, section: "blog" | "articles", sectionName: string, locale: string) {
  const path = `/${section}/${post.slug}`;
  const url = localizedUrl(path, locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        datePublished: post.date,
        dateModified: post.date,
        keywords: post.tags.join(", "),
        image: OG_IMAGE_URL,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SiaExplains", item: localizedUrl("/", locale) },
          { "@type": "ListItem", position: 2, name: sectionName, item: localizedUrl(`/${section}`, locale) },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}
