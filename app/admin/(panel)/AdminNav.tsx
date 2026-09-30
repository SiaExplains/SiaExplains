"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, LayoutDashboard, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MICRO } from "@/lib/motion";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/links", label: "Links", icon: Link2 },
  { href: "/admin/posts", label: "Blog posts", icon: FileText },
];

export default function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <nav className="space-y-1">
      {items.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "relative flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors",
            isActive(href) ? "text-white" : "text-gray-400 hover:text-white"
          )}
        >
          {isActive(href) && (
            <motion.span
              layoutId="admin-nav"
              className="absolute inset-0 -z-10 rounded-lg bg-accent-500/15 ring-1 ring-accent-500/25"
              transition={MICRO}
            />
          )}
          <Icon size={16} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
