import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { YoutubeIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/SocialIcons";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Siavash — for collaborations, speaking, or just saying hi.",
};

const socials = [
  {
    label: "YouTube",
    handle: "@SiaExplains",
    href: "https://youtube.com/@SiaExplains",
    icon: YoutubeIcon,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    label: "GitHub",
    handle: "github.com/siavash",
    href: "https://github.com/siavash",
    icon: GithubIcon,
    color: "text-gray-300",
    bg: "bg-white/5",
    border: "border-white/10",
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/siavash",
    href: "https://linkedin.com/in/siavash",
    icon: LinkedinIcon,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  {
    label: "Twitter / X",
    handle: "@SiaExplains",
    href: "https://twitter.com/SiaExplains",
    icon: TwitterIcon,
    color: "text-gray-300",
    bg: "bg-white/5",
    border: "border-white/10",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-brand-400 text-sm font-medium tracking-wide uppercase mb-3">
          Get in touch
        </p>
        <h1 className="text-4xl font-bold text-white mb-4">Contact</h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
          I&apos;m open to interesting conversations — collaborations, speaking
          invitations, feedback on my content, or just saying hello. I read
          everything, though I can&apos;t always reply quickly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact form */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-5">
            Send a message
          </h2>
          <ContactForm />
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-5">Find me on</h2>
          <div className="space-y-3">
            {socials.map(({ label, handle, href, icon: Icon, color, bg, border }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-4 rounded-xl border ${bg} ${border} hover:border-white/20 transition-colors`}
              >
                <div className={`p-2 rounded-lg ${bg}`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-gray-500">{handle}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl border border-white/5 bg-white/2">
            <div className="flex items-center gap-2 mb-1">
              <Mail size={14} className="text-brand-400" />
              <span className="text-sm font-medium text-white">Email</span>
            </div>
            <p className="text-sm text-gray-500">siavash@siaexplains.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
