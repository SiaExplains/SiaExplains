"use client";

export default function NewsletterForm() {
  return (
    <div className="card p-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Join the newsletter
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Free. No spam. Unsubscribe any time.
      </p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-xs text-gray-500 mb-1.5" htmlFor="nl-name">
            First name
          </label>
          <input
            id="nl-name"
            type="text"
            placeholder="Siavash"
            className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm focus:outline-none focus:border-accent-500/60 focus:ring-4 focus:ring-accent-500/15 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1.5" htmlFor="nl-email">
            Email address
          </label>
          <input
            id="nl-email"
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm focus:outline-none focus:border-accent-500/60 focus:ring-4 focus:ring-accent-500/15 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full justify-center !py-3"
        >
          Subscribe — it&apos;s free
        </button>
      </form>

      <p className="text-xs text-gray-400 dark:text-gray-700 text-center mt-4">
        Newsletter service not connected yet. Coming soon.
      </p>
    </div>
  );
}
