export type Post = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
  readingTime?: string;
};

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  category: "Education" | "Career" | "Company" | "Life";
  location?: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  status: "live" | "building" | "concept";
  url?: string;
  repo?: string;
};

export type Book = {
  title: string;
  author: string;
  year: number;
  category: string;
  rating: number;
  notes?: string;
};
