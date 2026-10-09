"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { ICON_GROUPS, LINK_ICON_REGISTRY, LINK_ICONS, type LinkIcon } from "@/lib/link-icons";
import { cn } from "@/lib/utils";

type Props = { id: string; name: string; defaultValue: LinkIcon };

/** Icon field for the link form: a button that opens a searchable grid; the value posts via a hidden input. */
export default function IconPicker({ id, name, defaultValue }: Props) {
  const [value, setValue] = useState<LinkIcon>(defaultValue);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // The "Add link" form calls form.reset() after saving; follow it back to the default.
  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;
    const onReset = () => setValue(defaultValue);
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [defaultValue]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LINK_ICONS;
    return LINK_ICONS.filter((key) => {
      const def = LINK_ICON_REGISTRY[key];
      return `${key} ${def.label} ${def.keywords} ${def.group}`.toLowerCase().includes(q);
    });
  }, [query]);

  const open = () => {
    setQuery("");
    dialogRef.current?.showModal();
    searchRef.current?.focus();
  };
  const close = () => dialogRef.current?.close();
  const choose = (key: LinkIcon) => {
    setValue(key);
    close();
  };

  const Current = LINK_ICON_REGISTRY[value].Icon;

  return (
    <>
      <input ref={inputRef} type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="flex w-full min-w-40 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-all hover:border-accent-500/40 focus:border-accent-500/60 focus:outline-none focus:ring-4 focus:ring-accent-500/15"
      >
        <span className="grid h-5 w-5 place-items-center text-accent-300">
          <Current size={16} />
        </span>
        <span className="flex-1 truncate text-start">{LINK_ICON_REGISTRY[value].label}</span>
        <ChevronDown size={14} className="text-gray-500" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Choose an icon"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[min(92vw,720px)] rounded-2xl border border-white/10 bg-surface-900 p-0 text-white shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-[min(80vh,640px)] flex-col">
          <div className="flex items-center gap-2 border-b border-white/10 p-3">
            <Search size={16} className="ms-1 shrink-0 text-gray-500" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                // Enter would submit the surrounding link form; pick the first match instead.
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (matches[0]) choose(matches[0]);
                }
              }}
              placeholder={`Search ${LINK_ICONS.length} icons — e.g. telegram, shop, ai`}
              aria-label="Search icons"
              className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-white placeholder:text-gray-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="rounded-md p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {matches.length === 0 && (
              <p className="py-10 text-center text-sm text-gray-500">No icon matches “{query}”.</p>
            )}
            {ICON_GROUPS.map((group) => {
              const keys = matches.filter((key) => LINK_ICON_REGISTRY[key].group === group);
              if (keys.length === 0) return null;
              return (
                <section key={group} className="mb-4 last:mb-0">
                  <h3 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">{group}</h3>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-1.5">
                    {keys.map((key) => {
                      const { Icon, label } = LINK_ICON_REGISTRY[key];
                      const selected = key === value;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => choose(key)}
                          title={label}
                          aria-pressed={selected}
                          className={cn(
                            "flex flex-col items-center gap-1.5 rounded-lg border px-1 py-2.5 text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60",
                            selected
                              ? "border-accent-500/60 bg-accent-500/15 text-white"
                              : "border-transparent hover:border-white/10 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <Icon size={20} />
                          <span className="w-full truncate text-center text-[11px] leading-tight">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </dialog>
    </>
  );
}
