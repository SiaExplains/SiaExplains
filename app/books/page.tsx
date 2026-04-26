import type { Metadata } from "next";
import { Book } from "@/types";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Books I've read and recommend — from system design to psychology to fiction.",
};

const books: (Book & { emoji: string })[] = [
  {
    emoji: "🏗️",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    year: 2022,
    category: "Engineering",
    rating: 5,
    notes: "The single best book on distributed systems. Required reading for any senior engineer. I've re-read it three times.",
  },
  {
    emoji: "🧠",
    title: "Thinking in Systems",
    author: "Donella H. Meadows",
    year: 2021,
    category: "Systems Thinking",
    rating: 5,
    notes: "Changed how I think about everything — not just software. The mental models here apply from code architecture to organizations.",
  },
  {
    emoji: "📐",
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    year: 2023,
    category: "Engineering",
    rating: 5,
    notes: "The best book on software complexity I've read. Short, dense, and directly applicable. Every chapter changed how I write code.",
  },
  {
    emoji: "🚀",
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    year: 2020,
    category: "Leadership",
    rating: 4,
    notes: "Honest about the struggles of running a company in a way most startup books aren't. Particularly good on layoffs and hard decisions.",
  },
  {
    emoji: "🔬",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    year: 2019,
    category: "Engineering",
    rating: 4,
    notes: "Timeless advice that still holds 25 years later. Not about any specific technology — about how to think as a developer.",
  },
  {
    emoji: "🌍",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    year: 2021,
    category: "Non-fiction",
    rating: 5,
    notes: "Gave me a completely different lens on human society and history. Highly recommended regardless of field.",
  },
  {
    emoji: "⚙️",
    title: "Staff Engineer",
    author: "Will Larson",
    year: 2023,
    category: "Career",
    rating: 4,
    notes: "The best guide to the Principal/Staff engineer role. Helped me understand what the job actually is versus what people think it is.",
  },
  {
    emoji: "📖",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    year: 2022,
    category: "Fiction",
    rating: 5,
    notes: "The best fantasy novel I've ever read. The prose is extraordinary. I think about it often.",
  },
];

const categories = [...new Set(books.map((b) => b.category))];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "text-amber-400" : "text-gray-700"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function BooksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-brand-400 text-sm font-medium tracking-wide uppercase mb-3">
          Reading list
        </p>
        <h1 className="text-4xl font-bold text-white mb-4">Books</h1>
        <p className="text-gray-400 text-lg">
          Books that shaped how I think about engineering, leadership, and the
          world. Only ones I&apos;d actually recommend.
        </p>
      </div>

      {/* Category filters (static for now) */}
      <div className="flex flex-wrap gap-2 mb-10">
        <span className="text-xs px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400">
          All ({books.length})
        </span>
        {categories.map((cat) => (
          <span
            key={cat}
            className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gray-500"
          >
            {cat} ({books.filter((b) => b.category === cat).length})
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {books.map((book) => (
          <div
            key={book.title}
            className="rounded-2xl border border-white/5 bg-white/2 p-5 hover:border-white/10 transition-colors"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl shrink-0">{book.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm leading-snug mb-0.5">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-500">{book.author}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500">
                {book.category}
              </span>
              <StarRating rating={book.rating} />
            </div>

            {book.notes && (
              <p className="text-xs text-gray-500 leading-relaxed border-t border-white/5 pt-3">
                {book.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
