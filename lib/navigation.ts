// Locale-aware navigation utilities (wraps next-intl/navigation)
// Use these instead of next/navigation throughout the app for locale-aware routing.
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
