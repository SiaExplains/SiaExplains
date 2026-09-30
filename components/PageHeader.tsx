import BlurText from "@/components/motion/BlurText";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
  icon?: React.ReactNode;
  className?: string;
};

/** Shared page intro: small label, blur-in title, fading description, dotted glow behind. */
export default function PageHeader({ label, title, description, center, icon, className }: Props) {
  return (
    <header className={cn("relative mb-14", center && "text-center", className)}>
      <div aria-hidden className="bg-dots pointer-events-none absolute -inset-x-10 -top-16 h-56" />
      {icon && (
        <Reveal y={10} className="relative mb-6 inline-flex">
          <div className="animate-float rounded-2xl border border-brand-400/30 bg-gradient-to-br from-brand-400/15 to-accent-500/15 p-4">
            {icon}
          </div>
        </Reveal>
      )}
      {label && (
        <Reveal y={10} className="relative">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-accent-600 dark:text-accent-300">
            <span className="h-px w-6 bg-gradient-to-r from-brand-400 to-accent-500" />
            {label}
          </p>
        </Reveal>
      )}
      <BlurText
        as="h1"
        text={title}
        className={cn(
          "relative mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl",
          center && "justify-center"
        )}
      />
      {description && (
        <Reveal delay={0.15} className="relative">
          <p
            className={cn(
              "max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400",
              center && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </header>
  );
}
