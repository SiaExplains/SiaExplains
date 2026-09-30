# Changelog

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
