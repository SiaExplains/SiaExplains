"use client";

export default function NewsletterForm() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/2 p-8">
      <h2 className="text-xl font-semibold text-white mb-2">
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
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand-500/50 transition-colors"
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
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand-500/50 transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-colors"
        >
          Subscribe — it&apos;s free
        </button>
      </form>

      <p className="text-xs text-gray-700 text-center mt-4">
        Newsletter service not connected yet. Coming soon.
      </p>
    </div>
  );
}
