import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 underline underline-offset-2 transition-colors"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-gray-100 dark:bg-white/5 text-brand-600 dark:text-brand-300 px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-gray-100 dark:bg-[#111118] border border-gray-200 dark:border-white/10 rounded-xl p-4 overflow-x-auto my-6 text-sm"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-brand-500/50 pl-4 my-4 text-gray-600 dark:text-gray-400 italic"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1.5 mb-4"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1.5 mb-4"
      {...props}
    />
  ),
  hr: () => <hr className="border-gray-200 dark:border-white/10 my-8" />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table
        className="w-full text-sm border-collapse border border-gray-200 dark:border-white/10"
        {...props}
      />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-gray-200 dark:border-white/10 px-3 py-2 text-left text-gray-900 dark:text-white font-semibold bg-gray-50 dark:bg-white/5"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border border-gray-200 dark:border-white/10 px-3 py-2 text-gray-600 dark:text-gray-400"
      {...props}
    />
  ),
};

export default function MdxContent({ source }: { source: string }) {
  return (
    <div className="max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
