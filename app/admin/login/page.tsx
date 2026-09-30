import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import SetupNotice from "../SetupNotice";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  if (!isSupabaseConfigured) return <SetupNotice />;

  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center px-4">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-72 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-400/25 to-accent-600/30 blur-3xl" />
      </div>
      <div className="card w-full max-w-sm p-8">
        <p className="mb-1 text-lg font-semibold text-white">
          <span className="text-brand-400">Sia</span>Explains
        </p>
        <p className="mb-6 text-sm text-gray-400">Admin sign-in</p>
        <LoginForm />
      </div>
    </main>
  );
}
