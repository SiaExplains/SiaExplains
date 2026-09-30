export default function SetupNotice() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24">
      <div className="card p-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-accent-300">Admin</p>
        <h1 className="mb-3 text-2xl font-bold text-white">Supabase isn&apos;t configured yet</h1>
        <p className="mb-5 text-sm leading-relaxed text-gray-400">
          The public site works without it: the blog shows the MDX posts and <code>/link</code> shows the built-in
          links. To turn the admin on:
        </p>
        <ol className="list-decimal space-y-2 ps-5 text-sm text-gray-300">
          <li>
            Set <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and{" "}
            <code>ADMIN_EMAIL</code> (see <code>.env.example</code>).
          </li>
          <li>
            Run <code>supabase/migrations/0001_init.sql</code> on the project.
          </li>
          <li>In Supabase Auth, disable sign-ups and add your admin user with a password.</li>
        </ol>
      </div>
    </main>
  );
}
