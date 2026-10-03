export type ChannelId = "siaexplains" | "siabarry";

export type Video = {
  id: string;
  /** Title as published, in the channel's language. */
  title: string;
  /** English subtitle, for channels that don't publish in English. */
  titleEn?: string;
  views: string;
  date: string;
  topPick?: boolean;
};

export type Channel = {
  id: ChannelId;
  name: string;
  handle: string;
  url: string;
  /** Language the videos are in: drives text direction on the cards. */
  lang: "fa" | "en";
  videos: Video[];
};

export const CHANNELS: Record<ChannelId, Channel> = {
  siaexplains: {
    id: "siaexplains",
    name: "SiaExplains",
    handle: "@SiaExplains",
    url: "https://www.youtube.com/@SiaExplains",
    lang: "fa",
    videos: [
      { id: "rfbg5Q4bscY", title: "بعد از ۶ سال کار در آلمان اینو فهمیدم...", titleEn: "What I Learned After 6 Years Working in Germany", views: "30K", date: "Sep 2026" },
      { id: "_4prPkpDiN8", title: "دوازده ابزار رایگان هوش مصنوعی که لازمت میشه!", titleEn: "12 Free AI Tools You'll Need", views: "526", date: "Aug 2026" },
      { id: "oGQxFNgn6BY", title: "پنج سال زندگی در آلمان", titleEn: "Five Years Living in Germany", views: "40K", date: "Apr 2025", topPick: true },
      { id: "BwWjT-IKZWU", title: "چطور شهروندی آلمان رو گرفتم؟", titleEn: "How I Got German Citizenship", views: "10K", date: "Sep 2025" },
      { id: "pO4iPZNygNI", title: "شهروندی آلمان، اخراج‌ها و عمل جراحی", titleEn: "German Citizenship, Layoffs & Surgery", views: "6.7K", date: "Aug 2025" },
      { id: "WmshwR6kIzo", title: "خلاصه ۱۷ سال تجربه من در ۱۴ نکته", titleEn: "17 Years of Experience: 14 Key Lessons", views: "6.4K", date: "Oct 2025" },
      { id: "Qq3JshLIJ-U", title: "۴ باور غلط درباره مهاجرت", titleEn: "4 Wrong Beliefs About Immigration", views: "6.4K", date: "May 2025" },
      { id: "qg9UakuAJm0", title: "صدای مردم ایران در برلین", titleEn: "Voice of Iranians in Berlin", views: "4.6K", date: "Jan 2026" },
      { id: "ux8V6ESAI4Y", title: "هفت مدرک مربوط به هوش مصنوعی", titleEn: "7 AI Certifications Worth Getting", views: "3.3K", date: "Mar 2025" },
      { id: "DPkxSF_IF_s", title: "داستان من از درآمدزایی از یوتوب", titleEn: "My YouTube Monetization Story", views: "767", date: "Nov 2025" },
    ],
  },
  siabarry: {
    id: "siabarry",
    name: "Sia Barry",
    handle: "@SiaBarry",
    url: "https://www.youtube.com/@SiaBarry",
    lang: "en",
    videos: [
      { id: "wDZ_sP5_s30", title: "6 Years Working in Germany: What Nobody Tells You", views: "106", date: "Oct 2026" },
      { id: "gqMzRJKQvuU", title: "My 2026 Startup Tech Stack 🚀", views: "276", date: "Sep 2026" },
      { id: "Vz0ilD8wKic", title: "12 GitHub Repository Every AI Developer should know", views: "454", date: "Aug 2026" },
      { id: "IVMtYpAIZoM", title: "A Software Engineer in Germany", views: "134", date: "Jul 2026" },
    ],
  },
};

/** Both channels, always. Persian visitors see SiaExplains first, everyone else Sia Barry. */
export function orderedChannels(locale: string): Channel[] {
  return locale === "fa"
    ? [CHANNELS.siaexplains, CHANNELS.siabarry]
    : [CHANNELS.siabarry, CHANNELS.siaexplains];
}
