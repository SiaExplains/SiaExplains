// llms.txt: a Markdown index of the site for AI assistants (https://llmstxt.org). Lives outside the
// locale tree; the middleware matcher skips dotted paths, so next-intl never sees it.
import { getAllPosts } from "@/lib/mdx";
import { getBlogPosts } from "@/lib/posts";
import { CHANNELS } from "@/lib/channels";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

const pages = [
  ["About", "/about", "Who Siavash is: Principal Software Engineer in Berlin, founder, and YouTuber."],
  ["CV", "/cv", "Full work history since 2007, skills, education and languages."],
  ["Projects", "/projects", "Products and side projects, live and in progress."],
  ["Timeline", "/timeline", "Milestones from Iran to Berlin."],
  ["YouTube", "/youtube", "Both channels and their most-watched videos."],
  ["Book a session", "/book", "One-to-one sessions on careers, code review, or anything else."],
  ["Newsletter", "/newsletter", "Twice-monthly newsletter on software, careers and technology."],
  ["Contact", "/contact", "How to reach Siavash: hi@siaexplains.com."],
] as const;

export async function GET() {
  const posts = await getBlogPosts();
  const articles = getAllPosts("articles");
  const list = (items: { title: string; slug: string; description: string }[], section: string) =>
    items.map((p) => `- [${p.title}](${SITE_URL}/${section}/${p.slug}): ${p.description}`).join("\n");

  const body = `# SiaExplains

> Personal site of Siavash Ghanbari ("Sia"), a Principal Software Engineer and manager at MHP in Berlin with 17+ years of experience in React, Next.js, Node.js, TypeScript and AWS. He founded the non-profits Iranian Tech Hub and Hampa, co-founded FocusCrew as CTO, built Mylper, WikiDigit and the side project Emojar, and runs two YouTube channels: SiaExplains (Persian) and Sia Barry (English).

The site is available in English (default), Persian (/fa) and German (/de).

## Pages

${pages.map(([name, path, desc]) => `- [${name}](${SITE_URL}${path}): ${desc}`).join("\n")}

## Ventures

- [Mylper](https://mylper.com) (founder, 2026): browser-based image editor for photo editing, image creation and drawing, in the spirit of Photoshop and GIMP.
- [Iranian Tech Hub](https://www.iraniantechhub.com) (solo founder & CTO, 2026, non-profit): members-only network for Iranian founders, operators and investors; 150 members onboarded from an 800+ member Telegram community.
- [FocusCrew](https://www.focus-crew.com) (co-founder & CTO, 2026): gamified Pomodoro platform where small crews focus together.
- [WikiDigit](https://wikidigit.com) (founder, 2026): tech media and news site.
- [Emojar](https://emojar.com) (side project, 2025): free emoji search and copy platform, built entirely with AI tools.
- [Hampa](https://www.instagram.com/hampa.berlin) (founder, 2024, non-profit): sports community for Iranians in Berlin.

## YouTube

- [${CHANNELS.siaexplains.name}](${CHANNELS.siaexplains.url}): tech, AI, careers and life in Germany, in Persian.
- [${CHANNELS.siabarry.name}](${CHANNELS.siabarry.url}): startups, AI tools and engineering life in Germany, in English.

## Blog

${list(posts, "blog")}

## Articles

${list(articles, "articles")}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
