"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Code, Mail, Heart } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

const socialLinks = [
  {
    label: "GitHub",
    icon: <Code size={20} />,
    href: "https://github.com/yusufdinc974",
  },
  {
    label: "LinkedIn",
    icon: <BriefcaseBusiness size={20} />,
    href: "https://www.linkedin.com/in/dincyusuf/",
  },
  {
    label: "Instagram",
    icon: <InstagramIcon />,
    href: "https://www.instagram.com/yusuf.dinc.974/",
  },
  {
    label: "Email",
    icon: <Mail size={20} />,
    href: "mailto:dinc.yusuf974@gmail.com",
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative py-28 sm:py-36 px-6">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-4xl mx-auto text-center">
        {/* CTA section */}
        <AnimatedSection>
          <span className="text-sm font-mono text-accent tracking-wider uppercase mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Let&apos;s work{" "}
            <span className="bg-gradient-to-r from-accent to-[#d3a17a] bg-clip-text text-transparent">
              together
            </span>
          </h2>
          <p className="text-muted text-lg max-w-md mx-auto mb-10">
            Have a project in mind? I&apos;d love to hear about it. Drop me a
            message and let&apos;s create something great.
          </p>

          <motion.a
            href="mailto:dinc.yusuf974@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:shadow-[0_0_40px_rgba(139,90,60,0.35)] transition-shadow duration-300"
          >
            <Mail size={18} />
            Contact Me
          </motion.a>
        </AnimatedSection>

        {/* Social links */}
        <AnimatedSection delay={0.2} className="mt-16">
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="group p-3 rounded-xl bg-surface border border-border text-muted hover:text-foreground hover:border-accent/30 hover:bg-surface-hover transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </AnimatedSection>

        {/* Bottom info */}
        <AnimatedSection delay={0.3} className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted flex items-center justify-center gap-1.5">
            Built with <Heart size={14} className="text-accent" /> by Yusuf
            <span className="mx-2 text-border">·</span>
            © {new Date().getFullYear()}
          </p>
        </AnimatedSection>
      </div>
    </footer>
  );
}
