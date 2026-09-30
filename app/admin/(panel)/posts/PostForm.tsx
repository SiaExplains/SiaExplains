"use client";

import { useActionState, useState, useTransition, type ReactNode } from "react";
import { cn, estimateReadingTime } from "@/lib/utils";
import { inputClass, labelClass } from "../../ui";
import { deletePost, previewMdx, savePost } from "./actions";

export type PostDraft = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  date: string;
  body_mdx: string;
  published: boolean;
};

export default function PostForm({ post, notice }: { post: PostDraft; notice?: string }) {
  const [state, action, pending] = useActionState(savePost, notice ? { ok: true, message: notice } : null);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [body, setBody] = useState(post.body_mdx);
  const [preview, setPreview] = useState<ReactNode>(null);
  const [previewing, startPreview] = useTransition();

  const showPreview = () => {
    setTab("preview");
    startPreview(async () => {
      try {
        setPreview(await previewMdx(body));
      } catch {
        setPreview(<p className="text-sm text-red-300">This MDX doesn&apos;t compile yet — check for unclosed tags.</p>);
      }
    });
  };

  return (
    <div className="space-y-4">
      <form action={action} className="card space-y-4 p-5">
        {post.id && <input type="hidden" name="id" value={post.id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className={labelClass}>
              Title
            </label>
            <input id="title" name="title" defaultValue={post.title} required maxLength={200} className={cn(inputClass, "text-base")} />
          </div>
          <div>
            <label htmlFor="slug" className={labelClass}>
              Slug (blank = from title)
            </label>
            <input id="slug" name="slug" defaultValue={post.slug} placeholder="my-new-post" className={cn(inputClass, "font-mono")} />
          </div>
          <div>
            <label htmlFor="date" className={labelClass}>
              Date
            </label>
            <input id="date" name="date" type="date" defaultValue={post.date} required className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className={labelClass}>
              Description (shown in lists and search results)
            </label>
            <input id="description" name="description" defaultValue={post.description} maxLength={300} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="tags" className={labelClass}>
              Tags (comma-separated)
            </label>
            <input id="tags" name="tags" defaultValue={post.tags.join(", ")} placeholder="AI, Career" className={inputClass} />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-1">
            {(["write", "preview"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => (t === "preview" ? showPreview() : setTab("write"))}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors",
                  tab === t ? "bg-accent-500/20 text-accent-200" : "text-gray-400 hover:text-white"
                )}
              >
                {t}
              </button>
            ))}
            <span className="ms-auto text-xs text-gray-500">{estimateReadingTime(body)} · MDX</span>
          </div>
          {/* The textarea stays mounted so its value is always submitted. */}
          <textarea
            name="body_mdx"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={22}
            className={cn(inputClass, "font-mono text-[13px] leading-relaxed", tab !== "write" && "hidden")}
            placeholder={"## Heading\n\nWrite in Markdown/MDX…"}
          />
          {tab === "preview" && (
            <div className="min-h-[300px] rounded-lg border border-white/10 bg-white/[0.02] p-5">
              {previewing ? <p className="text-sm text-gray-500">Rendering…</p> : preview}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-white/5 pt-4">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" name="published" defaultChecked={post.published} className="h-4 w-4 accent-violet-500" />
            Published
          </label>
          <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
            {pending ? "Saving…" : "Save"}
          </button>
          {state && (
            <span role="status" className={cn("text-sm", state.ok ? "text-emerald-400" : "text-red-300")}>
              {state.message}
            </span>
          )}
        </div>
      </form>

      {post.id && (
        <form
          action={deletePost}
          onSubmit={(e) => {
            if (!window.confirm("Delete this post permanently?")) e.preventDefault();
          }}
        >
          <input type="hidden" name="id" value={post.id} />
          <button type="submit" className="text-xs text-red-300/80 hover:text-red-300">
            Delete post
          </button>
        </form>
      )}
    </div>
  );
}
