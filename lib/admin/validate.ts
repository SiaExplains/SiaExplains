import { LINK_ICONS, type LinkIcon } from "@/lib/links";

export type ActionState = { ok: boolean; message: string } | null;

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/** Only absolute http(s) URLs: blocks javascript:, data: and relative links on the public page. */
export function parseHttpUrl(raw: string): string | null {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function parseIcon(raw: string): LinkIcon {
  return LINK_ICONS.includes(raw as LinkIcon) ? (raw as LinkIcon) : "link";
}

export function parseTags(raw: string): string[] {
  return [...new Set(raw.split(",").map((t) => t.trim()).filter(Boolean))].slice(0, 10);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function isIsoDate(raw: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) && !Number.isNaN(Date.parse(raw));
}
