import { getPublicClient } from "@/lib/supabase/public";
import { LINK_ICONS, type LinkIcon } from "@/lib/link-icons";

export { LINK_ICONS, type LinkIcon };

export type LinkItem = {
  id: string;
  label: string;
  url: string;
  description: string | null;
  icon: LinkIcon;
  sort: number;
  visible: boolean;
};

/** Shown when Supabase isn't configured yet or can't be reached — mirrors the migration seed. */
export const FALLBACK_LINKS: LinkItem[] = [
  { id: "yt", label: "YouTube — SiaExplains", url: "https://www.youtube.com/@SiaExplains", description: "Tech, AI, career & life in Germany (Farsi)", icon: "youtube", sort: 10, visible: true },
  { id: "ytb", label: "YouTube — Sia Barry", url: "https://www.youtube.com/@SiaBarry", description: "Startups, AI tools & engineering life in Germany (English)", icon: "youtube", sort: 15, visible: true },
  { id: "hampa", label: "Hampa on Instagram", url: "https://www.instagram.com/hampa.berlin", description: "Community in Berlin", icon: "instagram", sort: 20, visible: true },
  { id: "ith", label: "Iranian Tech Hub", url: "https://www.iraniantechhub.com", description: "Members-only home for the Iranian Startup Community", icon: "users", sort: 30, visible: true },
  { id: "fc", label: "FocusCrew", url: "https://www.focus-crew.com", description: "Focus together — Pomodoro with a crew", icon: "timer", sort: 40, visible: true },
  { id: "site", label: "siaexplains.com", url: "https://www.siaexplains.com", description: "Blog, projects, CV and more", icon: "globe", sort: 50, visible: true },
];

export function toLinkIcon(value: string | null | undefined): LinkIcon {
  return LINK_ICONS.includes(value as LinkIcon) ? (value as LinkIcon) : "link";
}

export async function getVisibleLinks(): Promise<LinkItem[]> {
  const supabase = getPublicClient();
  if (!supabase) return FALLBACK_LINKS;

  const { data, error } = await supabase
    .from("links")
    .select("id,label,url,description,icon,sort,visible")
    .eq("visible", true)
    .order("sort", { ascending: true });

  if (error) {
    console.error("[links] falling back to built-in list:", error.message);
    return FALLBACK_LINKS;
  }
  // An empty result is respected: hiding every link in the admin really does empty the page.
  return (data ?? []).map((row) => ({ ...row, icon: toLinkIcon(row.icon) }));
}
