# Hey, I'm Siavash 👋

Principal Software Engineer and Tech Lead based in Berlin. Originally from Iran — been writing code professionally since 2007, which feels like both forever and yesterday at the same time.

I run **[SiaExplains](https://siaexplains.com)** — a YouTube channel, blog, and collection of side projects where I share what I've learned about engineering, AI, career growth, and navigating the tech world as an international professional.

---

## What I'm up to

- 🏢 Leading engineering at **MHP** in Berlin — working on tooling for Volkswagen Group
- 📺 Creating content on **[YouTube @SiaExplains](https://youtube.com/@SiaExplains)** about tech, AI, and engineering careers
- 🫙 Running **[Emojar.com](https://emojar.com)** — an emoji search and copy tool (built entirely with AI, zero lines of hand-written code)
- 📰 Building **[WikiDigit.com](https://wikidigit.com)** — a tech media and news site for engineers who want signal over noise
- ✍️ Writing about system design, AI tools, and the realities of a software career at [siaexplains.com/blog](https://siaexplains.com/blog)

---

## This repo

This is the source code for **siaexplains.com** — my personal site, built with:

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **MDX** for blog posts and articles
- **Framer Motion** + [Bedrock](https://github.com/Jacknelson6/bedrock)/ReactBits components for the animation
- **Supabase** for the `/admin` panel (the `/link` buttons and admin-written blog posts)

### Running it locally

```bash
npm install
npm run dev
```

The site runs without Supabase: the blog shows only the MDX posts, `/link` uses its built-in links, and `/admin` shows a setup screen. To work on the admin:

1. `supabase start`: local stack on ports 55xxx (see `supabase/config.toml`); it applies `supabase/migrations/`.
2. Copy `.env.example` to `.env.local`, then fill in the URL and anon key from `supabase status`.
3. Create the admin user in the local Auth (Studio is off, so use the Auth admin API). Only `ADMIN_EMAIL` can sign in.

For production, run `0001_init.sql` on the hosted project, set the three env vars in Vercel, turn **off** "Allow new users to sign up" (keep the Email provider on), and add your admin user in Auth → Users.

It's open source. Feel free to look around, take inspiration, or open an issue if something is broken.

---

## Tech I work with

```
ReactJS · Next.js · Node.js · TypeScript · AWS · PostgreSQL
MongoDB · GraphQL · Docker · Terraform · Python
```

---

## Find me

- 🌐 [siaexplains.com](https://siaexplains.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/siavash-ghanbari/)
- 🐙 [GitHub @SiaExplains](https://github.com/SiaExplains)
- 📺 [YouTube @SiaExplains](https://youtube.com/@SiaExplains)

---

*Iran → Sydney → Berlin. Loving the journey.*
