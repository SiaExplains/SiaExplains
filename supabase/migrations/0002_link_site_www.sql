-- The apex domain redirects to www, so point the /link "siaexplains.com" button straight at it.
update public.links
set url = 'https://www.siaexplains.com'
where url in ('https://siaexplains.com', 'https://siaexplains.com/');
