import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all routes except Next.js internals, static files, and API routes
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
