"use client";

export default function ContactForm() {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label className="block text-xs text-gray-500 mb-1.5" htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="Your name"
          className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm focus:outline-none focus:border-accent-500/60 focus:ring-4 focus:ring-accent-500/15 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1.5" htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm focus:outline-none focus:border-accent-500/60 focus:ring-4 focus:ring-accent-500/15 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1.5" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="What's on your mind?"
          className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm focus:outline-none focus:border-accent-500/60 focus:ring-4 focus:ring-accent-500/15 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200 resize-none"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full justify-center !py-3"
      >
        Send message
      </button>
      <p className="text-xs text-gray-400 dark:text-gray-700 text-center">
        Form not connected yet — coming soon. Or reach out directly below.
      </p>
    </form>
  );
}
