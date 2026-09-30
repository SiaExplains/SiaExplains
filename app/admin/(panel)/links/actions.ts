"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/server";
import { parseHttpUrl, parseIcon, str, type ActionState } from "@/lib/admin/validate";

const DENIED: ActionState = { ok: false, message: "Not signed in as the admin." };

function refresh() {
  revalidatePath("/link");
  revalidatePath("/admin/links");
}

type LinkInput = { label: string; url: string; description: string | null; icon: string; visible: boolean };

function readLink(form: FormData): { error: string } | { value: LinkInput } {
  const label = str(form, "label");
  const url = parseHttpUrl(str(form, "url"));
  const description = str(form, "description") || null;
  if (!label || label.length > 80) return { error: "Label is required (max 80 characters)." };
  if (!url) return { error: "URL must start with http:// or https://." };
  if (description && description.length > 140) return { error: "Description is max 140 characters." };
  return {
    value: {
      label,
      url,
      description,
      icon: parseIcon(str(form, "icon")),
      visible: form.get("visible") === "on",
    },
  };
}

export async function createLink(_prev: ActionState, form: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  if (!admin) return DENIED;
  const parsed = readLink(form);
  if ("error" in parsed) return { ok: false, message: parsed.error };

  const { data: last } = await admin.supabase
    .from("links")
    .select("sort")
    .order("sort", { ascending: false })
    .limit(1)
    .maybeSingle();
  const { error } = await admin.supabase.from("links").insert({ ...parsed.value, sort: (last?.sort ?? 0) + 10 });
  if (error) return { ok: false, message: error.message };
  refresh();
  return { ok: true, message: "Link added." };
}

export async function updateLink(_prev: ActionState, form: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  if (!admin) return DENIED;
  const id = str(form, "id");
  const parsed = readLink(form);
  if (!id) return { ok: false, message: "Missing link id." };
  if ("error" in parsed) return { ok: false, message: parsed.error };

  const { error } = await admin.supabase.from("links").update(parsed.value).eq("id", id);
  if (error) return { ok: false, message: error.message };
  refresh();
  return { ok: true, message: "Saved." };
}

export async function deleteLink(form: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const id = str(form, "id");
  if (!id) return;
  await admin.supabase.from("links").delete().eq("id", id);
  refresh();
}

/** Swaps sort order with the neighbour above or below. */
export async function moveLink(form: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const id = str(form, "id");
  const direction = str(form, "direction");

  const { data: rows } = await admin.supabase.from("links").select("id,sort").order("sort", { ascending: true });
  if (!rows) return;
  const i = rows.findIndex((r) => r.id === id);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= rows.length) return;

  // Re-space every row so equal sort values can't make a swap a no-op.
  const order = rows.map((r) => r.id);
  [order[i], order[j]] = [order[j], order[i]];
  await Promise.all(
    order.map((rowId, index) => admin.supabase.from("links").update({ sort: (index + 1) * 10 }).eq("id", rowId))
  );
  refresh();
}
