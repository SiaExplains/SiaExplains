"use client";

import { useActionState, useEffect, useRef } from "react";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import type { LinkItem } from "@/lib/links";
import { cn } from "@/lib/utils";
import { inputClass, labelClass } from "../../ui";
import { createLink, deleteLink, moveLink, updateLink } from "./actions";
import IconPicker from "./IconPicker";

type Props = { link?: LinkItem; isFirst?: boolean; isLast?: boolean };

/** Edits one link, or creates a new one when `link` is omitted. */
export default function LinkEditor({ link, isFirst, isLast }: Props) {
  const isNew = !link;
  const [state, action, pending] = useActionState(isNew ? createLink : updateLink, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isNew && state?.ok) formRef.current?.reset();
  }, [isNew, state]);

  const id = link?.id ?? "new";

  return (
    <div className={cn("card p-4", link && !link.visible && "opacity-60")}>
      <form ref={formRef} action={action} className="grid gap-3 sm:grid-cols-[1fr_1.4fr]">
        {link && <input type="hidden" name="id" value={link.id} />}
        <div>
          <label htmlFor={`label-${id}`} className={labelClass}>
            Label
          </label>
          <input id={`label-${id}`} name="label" defaultValue={link?.label} required maxLength={80} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`url-${id}`} className={labelClass}>
            URL
          </label>
          <input
            id={`url-${id}`}
            name="url"
            type="url"
            defaultValue={link?.url}
            required
            placeholder="https://"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <div>
            <label htmlFor={`desc-${id}`} className={labelClass}>
              Description (optional)
            </label>
            <input
              id={`desc-${id}`}
              name="description"
              defaultValue={link?.description ?? ""}
              maxLength={140}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`icon-${id}`} className={labelClass}>
              Icon
            </label>
            <IconPicker id={`icon-${id}`} name="icon" defaultValue={link?.icon ?? "link"} />
          </div>
          <label className="flex items-end gap-2 pb-2 text-sm text-gray-300">
            <input
              type="checkbox"
              name="visible"
              defaultChecked={link?.visible ?? true}
              className="h-4 w-4 accent-violet-500"
            />
            Visible
          </label>
        </div>
        <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
          <button type="submit" disabled={pending} className="btn btn-primary !py-1.5 disabled:opacity-60">
            {pending ? "Saving…" : isNew ? "Add link" : "Save"}
          </button>
          {state && (
            <span role="status" className={cn("text-xs", state.ok ? "text-emerald-400" : "text-red-300")}>
              {state.message}
            </span>
          )}
        </div>
      </form>

      {link && (
        <div className="mt-3 flex items-center gap-1 border-t border-white/5 pt-3">
          <form action={moveLink}>
            <input type="hidden" name="id" value={link.id} />
            <input type="hidden" name="direction" value="up" />
            <button type="submit" disabled={isFirst} aria-label="Move up" className="rounded-md p-1.5 text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-30">
              <ArrowUp size={15} />
            </button>
          </form>
          <form action={moveLink}>
            <input type="hidden" name="id" value={link.id} />
            <input type="hidden" name="direction" value="down" />
            <button type="submit" disabled={isLast} aria-label="Move down" className="rounded-md p-1.5 text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-30">
              <ArrowDown size={15} />
            </button>
          </form>
          <form
            action={deleteLink}
            className="ms-auto"
            onSubmit={(e) => {
              if (!window.confirm(`Delete “${link.label}”?`)) e.preventDefault();
            }}
          >
            <input type="hidden" name="id" value={link.id} />
            <button type="submit" className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-red-300/80 hover:bg-red-500/10 hover:text-red-300">
              <Trash2 size={13} /> Delete
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
