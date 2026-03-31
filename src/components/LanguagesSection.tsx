"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

interface Language {
  name: string;
  level: string;
  value: number;
  gradient: string;
  flag: React.ReactNode;
}

const FlagTurkey = () => (
  <svg
    viewBox="0 0 24 16"
    aria-hidden="true"
    focusable="false"
    className="w-full h-full"
  >
    <rect width="24" height="16" fill="#e11d48" />
    <circle cx="9" cy="8" r="5" fill="#ffffff" />
    <circle cx="10.5" cy="8" r="4" fill="#e11d48" />
    <polygon
      fill="#ffffff"
      points="15.5,8 16.9,8.5 17.4,7 17.9,8.5 19.3,8 18.1,8.9 18.6,10.4 17.4,9.4 16.2,10.4 16.6,8.9"
    />
  </svg>
);

const FlagUK = () => (
  <svg
    viewBox="0 0 24 16"
    aria-hidden="true"
    focusable="false"
    className="w-full h-full"
  >
    <rect width="24" height="16" fill="#1e3a8a" />
    <rect y="6" width="24" height="4" fill="#ffffff" />
    <rect x="10" width="4" height="16" fill="#ffffff" />
    <rect y="7" width="24" height="2" fill="#ef4444" />
    <rect x="11" width="2" height="16" fill="#ef4444" />
  </svg>
);

const FlagJapan = () => (
  <svg
    viewBox="0 0 24 16"
    aria-hidden="true"
    focusable="false"
    className="w-full h-full"
  >
    <rect width="24" height="16" fill="#ffffff" />
    <circle cx="12" cy="8" r="4.5" fill="#ef4444" />
  </svg>
);

const FlagSpain = () => (
  <svg
    viewBox="0 0 24 16"
    aria-hidden="true"
    focusable="false"
    className="w-full h-full"
  >
    <rect width="24" height="16" fill="#dc2626" />
    <rect y="4" width="24" height="8" fill="#f59e0b" />
  </svg>
);

const languages: Language[] = [
  {
    name: "Turkish",
    level: "Native",
    value: 100,
    gradient: "from-emerald-500/80 via-emerald-400/80 to-lime-300/80",
    flag: <FlagTurkey />,
  },
  {
    name: "English",
    level: "C1",
    value: 85,
    gradient: "from-sky-500/80 via-blue-400/80 to-indigo-400/80",
    flag: <FlagUK />,
  },
  {
    name: "Japanese",
    level: "N3",
    value: 55,
    gradient: "from-rose-500/80 via-pink-400/80 to-amber-300/80",
    flag: <FlagJapan />,
  },
  {
    name: "Spanish",
    level: "A2",
    value: 32,
    gradient: "from-amber-500/80 via-orange-400/80 to-yellow-300/80",
    flag: <FlagSpain />,
  },
];

export default function LanguagesSection() {
  return (
    <section id="languages" className="py-28 sm:py-36 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 right-16 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-8 left-10 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection className="mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-sm font-mono text-accent tracking-wider uppercase">
              Languages
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            How I
            {" "}
            <span className="bg-gradient-to-r from-accent to-[#d3a17a] bg-clip-text text-transparent">
              communicate
            </span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            A quick snapshot of the languages I use across work, study, and
            creative projects.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative rounded-3xl border border-border bg-surface/70 p-8 sm:p-10 overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(139,90,60,0.18) 1px, transparent 1px), linear-gradient(rgba(139,90,60,0.14) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            <div className="relative space-y-6">
              {languages.map((language) => (
                <div
                  key={language.name}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
                >
                  <div className="flex items-center gap-3 sm:w-44">
                    <div className="w-10 h-7 rounded-md overflow-hidden border border-border/60 bg-background/80 shadow-[0_6px_16px_rgba(15,23,42,0.12)]">
                      {language.flag}
                    </div>
                    <span className="text-base font-semibold text-foreground">
                      {language.name}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="relative h-3 rounded-full bg-background/80 border border-border/60 overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-4">
                        <div className="border-r border-border/40" />
                        <div className="border-r border-border/40" />
                        <div className="border-r border-border/40" />
                        <div />
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${language.value}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          ease: [0.25, 0.4, 0.25, 1],
                        }}
                        className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${language.gradient}`}
                      />
                    </div>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-widest text-muted px-3 py-1 rounded-full border border-border/60 bg-background/80 self-start sm:self-auto">
                    {language.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
