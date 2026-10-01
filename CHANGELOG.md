# Changelog

## 0.4.5 — 2026-10-01

### Fixed
- `git status` and `git diff` no longer crash. Two local Claude Code worktrees had been committed into the repo as links to a folder that no longer exists. They are removed from git, and `.claude/worktrees/` is now ignored.

## 0.4.4 — 2026-10-01

### Added
- Two new videos at the top of the YouTube page: "What I Learned After 6 Years Working in Germany" and "12 Free AI Tools You'll Need".
- WikiDigit carries the solo founder badge on the Projects page.

### Removed
- AI Code Review Bot, Infra Cost Analyzer and ReadingList from the Projects page.
- The Books page is hidden: gone from the navbar and sitemap, and `/books` now returns 404. The page and its data are kept, so it can come back.

## 0.4.3 — 2026-09-30

### Fixed
- Blog posts and articles returned a 500 error on the live site. Their pages were built ahead of time, but they read the request to work out the language, which Vercel rejects at runtime. They are now rendered on each request like every other page, so admin-written posts also show up the moment they're published.

## 0.4.2 — 2026-09-30

### Fixed
- `/link`: the "siaexplains.com" button points straight at `https://www.siaexplains.com` (migration `0002`, already applied to production).
- `/link`: the footer link now opens in a new tab like every button above it.

## 0.4.1 — 2026-09-30

### Fixed
- The Emojar icon on the Projects page shows again. The image file had been deleted by accident in the i18n change.
- `/links` now redirects permanently to `/link`, so the plural no longer 404s.

## 0.4.0 — 2026-09-30

### Added
- Every page, in English, Farsi and German, now has a canonical URL pointing to itself, plus `hreflang` links to its other two language versions and an `x-default` pointing to English. Search engines treat the three versions as translations of one page, not as duplicates.
- The sitemap lists the same language alternates for every entry.

### Fixed
- `/cv` and `/books` were missing from the sitemap.

## 0.3.1 — 2026-09-30

### Changed
- The sitemap, robots.txt, canonical tags, Open Graph URLs and structured data now use `https://www.siaexplains.com`, the address the apex domain redirects to. The domain is defined once, in `lib/site.ts`.

## 0.3.0 — 2026-09-30

### Added
- New look: gold + electric-violet palette, violet-tinted neutrals, Instrument Serif accents, and Vazirmatn for Farsi.
- Motion everywhere, built on Bedrock/ReactBits pieces: aurora hero, blur-in headings, rotating roles, count-up stats, scroll reveals, page transitions, spotlight and tilt cards, magnetic buttons, a cursor glow and click sparks. It all switches off for visitors who prefer reduced motion.
- Portrait of Siavash on the home and About pages.
- `siaexplains.com/link`: a mobile-first link-in-bio page (YouTube, Hampa, Iranian Tech Hub, FocusCrew, siaexplains.com).
- `/admin`: a Supabase-backed admin panel with one account (email + password) to manage the /link buttons and write blog posts with a live MDX preview.
- The blog shows admin-written posts next to the MDX files; the sitemap includes them.
- `robots.txt`: keeps `/admin` out of search engines.
- Founder badges on the project cards: solo founder of Iranian Tech Hub and Emojar, co-founder of FocusCrew. The timeline says the same, in all three languages.

### Changed
- Navbar: sliding active pill, scroll-progress bar, animated mobile menu.
- ESLint ignores local `.claude/worktrees` copies.

## 0.2.0 — 2026-09-30

### Added
- Iranian Tech Hub and FocusCrew on the Projects page.
- Iranian Tech Hub and FocusCrew on the Timeline, in English, Farsi and German.
- Timeline entries can link to a website ("Visit website", translated in all three locales).
