-- Sia Barry, the English channel, sits right after SiaExplains on /link.
insert into public.links (label, url, description, icon, sort)
select 'YouTube — Sia Barry', 'https://www.youtube.com/@SiaBarry', 'Startups, AI tools & engineering life in Germany (English)', 'youtube', 15
where not exists (
  select 1 from public.links where url in ('https://www.youtube.com/@SiaBarry', 'https://youtube.com/@SiaBarry')
);
