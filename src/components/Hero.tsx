"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { ArrowDown, Sparkles } from "lucide-react";

const spritePets = [
  { src: "/nichitomo/pets/cat.gif", alt: "NichiTomo cat sprite" },
  { src: "/nichitomo/pets/rabbit.gif", alt: "NichiTomo rabbit sprite" },
  { src: "/nichitomo/pets/fox.gif", alt: "NichiTomo fox sprite" },
  { src: "/nichitomo/pets/dragon.gif", alt: "NichiTomo dragon sprite" },
  { src: "/nichitomo/pets/unicorn.gif", alt: "NichiTomo unicorn sprite" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
      style={{
        backgroundImage:
          "radial-gradient(circle at 18% 12%, rgba(176,144,128,0.35), transparent 55%), radial-gradient(circle at 82% 18%, rgba(144,112,80,0.25), transparent 50%), radial-gradient(circle at 70% 82%, rgba(128,96,64,0.2), transparent 55%)",
      }}
    >
      {/* Radiant orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] bg-[#b09080]/25 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-[#907050]/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(144,112,80,0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(144,112,80,0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-sm text-muted mb-8"
            >
              <Sparkles size={14} className="text-accent" />
              <span>Open to opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Hi, I&apos;m{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-accent via-[#b07a52] to-[#d3a17a] bg-clip-text text-transparent">
                  Yusuf
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-accent to-[#b07a52] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                />
              </span>
              <span className="text-accent">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-lg sm:text-xl text-muted leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
            >
              A Computer Engineering senior specializing in software development,
              pixel art, and engaging user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-medium text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,90,60,0.35)] hover:scale-105"
              >
                <span className="relative z-10">View My Work</span>
                <ArrowDown
                  size={16}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-y-0.5"
                />
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-[#a36f4f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground font-medium text-sm hover:bg-surface-hover hover:border-accent/30 transition-all duration-300"
              >
                Check out my Apps
              </a>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl border border-border bg-surface/90 p-6 sm:p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] overflow-visible">
              <div className="relative z-10">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto">
                  <img
                    src="/profilephoto.jpeg"
                    alt="Yusuf Dinc"
                    className="relative z-10 w-full h-full rounded-full object-cover border-4 border-background shadow-[0_12px_24px_rgba(15,23,42,0.2)]"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div
                    className="absolute -inset-3 rounded-full border border-accent/20"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -inset-8 rounded-full border border-accent/10"
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs font-mono uppercase tracking-widest text-muted">
                    NichiTomo Crew
                  </p>
                  <h3 className="text-xl font-semibold text-foreground mt-2">
                    Pixel Companions
                  </h3>
                  <p className="text-sm text-muted mt-2">
                    Hand-crafted sprites from NichiTomo, circling the studio.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-10 -right-8 w-32 h-32 bg-accent/10 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -top-10 -left-8 w-24 h-24 bg-indigo-300/30 rounded-full blur-3xl"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>

      {/* Walking pets */}
      <div className="hero-pets" aria-hidden="true">
        {spritePets.map((pet, index) => (
          <div
            key={pet.src}
            className="hero-pet"
            style={
              {
                ["--walk-delay" as string]: `${index * 1.6}s`,
                ["--walk-duration" as string]: `${18 + index * 1.4}s`,
                ["--walk-top" as string]: `${6 + (index % 3) * 18}px`,
                ["--walk-scale" as string]: `${0.9 + (index % 2) * 0.08}`,
              } as CSSProperties
            }
          >
            <img src={pet.src} alt={pet.alt} className="hero-pet-sprite" />
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-muted/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-muted/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
