-- SiaExplains: /link buttons and admin-written blog posts.
-- Run once in the Supabase SQL editor (or `supabase db push`).
--
-- Access model: anyone may READ visible links and published posts; only the single admin
-- account may write. The admin is identified by email in public.is_admin(). If you change
-- ADMIN_EMAIL in the app, change it here too.

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(lower(auth.jwt() ->> 'email') = 'siaexplains@gmail.com', false)
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- /link buttons -----------------------------------------------------------------------------

create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  label text not null check (char_length(label) between 1 and 80),
  url text not null check (url ~* '^https?://'),
  description text check (description is null or char_length(description) <= 140),
  icon text not null default 'link',
  sort integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists links_sort_idx on public.links (sort);

drop trigger if exists links_touch on public.links;
create trigger links_touch before update on public.links
  for each row execute function public.touch_updated_at();

alter table public.links enable row level security;

drop policy if exists "links: public reads visible" on public.links;
create policy "links: public reads visible" on public.links
  for select using (visible or public.is_admin());

drop policy if exists "links: admin writes" on public.links;
create policy "links: admin writes" on public.links
  for all using (public.is_admin()) with check (public.is_admin());

-- Blog posts ---------------------------------------------------------------------------------

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 200),
  description text not null default '',
  tags text[] not null default '{}',
  date date not null default current_date,
  body_mdx text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_date_idx on public.posts (published, date desc);

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts
  for each row execute function public.touch_updated_at();

alter table public.posts enable row level security;

drop policy if exists "posts: public reads published" on public.posts;
create policy "posts: public reads published" on public.posts
  for select using (published or public.is_admin());

drop policy if exists "posts: admin writes" on public.posts;
create policy "posts: admin writes" on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

-- Seed the /link page with the current buttons (only on an empty table) ---------------------

insert into public.links (label, url, description, icon, sort)
select * from (values
  ('YouTube — SiaExplains', 'https://www.youtube.com/@SiaExplains', 'Tech, AI, career & life in Germany (Farsi)', 'youtube', 10),
  ('Hampa on Instagram', 'https://www.instagram.com/hampa.berlin', 'Community in Berlin', 'instagram', 20),
  ('Iranian Tech Hub', 'https://www.iraniantechhub.com', 'Members-only home for the Iranian Startup Community', 'users', 30),
  ('FocusCrew', 'https://www.focus-crew.com', 'Focus together — Pomodoro with a crew', 'timer', 40),
  ('siaexplains.com', 'https://siaexplains.com', 'Blog, projects, CV and more', 'globe', 50)
) as seed(label, url, description, icon, sort)
where not exists (select 1 from public.links);
