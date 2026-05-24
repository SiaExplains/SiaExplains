import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fa", "de"],
  defaultLocale: "en",
  localePrefix: "as-needed", // English at root (/), Farsi at /fa, German at /de
});
