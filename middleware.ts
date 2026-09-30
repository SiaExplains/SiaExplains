import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { adminMiddleware } from "./lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin: English-only, outside the locale tree, guarded by the Supabase session.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return adminMiddleware(request);
  }

  // Link-in-bio page: its own minimal layout, never locale-prefixed.
  if (pathname === "/link") {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all routes except Next.js internals, static files, and API routes
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
