"use server";

import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/env";
import { str, type ActionState } from "@/lib/admin/validate";

export async function signIn(_prev: ActionState, form: FormData): Promise<ActionState> {
  const supabase = await getServerClient();
  if (!supabase) return { ok: false, message: "Supabase is not configured." };

  const email = str(form, "email");
  const password = typeof form.get("password") === "string" ? (form.get("password") as string) : "";
  if (!email || !password) return { ok: false, message: "Email and password are required." };

  // Same message for every failure, so the form doesn't reveal which emails exist.
  const denied = { ok: false, message: "Those credentials don't match the admin account." };
  if (!isAdminEmail(email)) return denied;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return denied;

  redirect("/admin");
}

export async function signOut() {
  const supabase = await getServerClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}
