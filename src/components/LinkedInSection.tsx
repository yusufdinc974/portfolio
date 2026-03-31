"use client";

import {
  Briefcase,
  GraduationCap,
  ExternalLink,
  MapPin,
  Sparkles,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { linkedInProfile } from "@/data/linkedin";

export default function LinkedInSection() {
  const {
    name,
    profileUrl,
    headline,
    location,
    summary,
    experience,
    education,
    skills,
  } = linkedInProfile;

  const hasExperience = experience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills = skills.length > 0;
  const hasHighlights = hasExperience || hasEducation || hasSkills;

  const summaryText = summary?.trim()
    ? summary
    : "Connect with me on LinkedIn for the full background, experience, and updates.";

  return (
    <section id="linkedin" className="py-24 sm:py-32 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[420px] h-[420px] bg-accent/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <AnimatedSection className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-sm font-mono text-accent tracking-wider uppercase">
              LinkedIn Snapshot
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Career, straight from{" "}
            <span className="bg-gradient-to-r from-accent to-[#d3a17a] bg-clip-text text-transparent">
              LinkedIn
            </span>
          </h2>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2">
          <AnimatedSection className="rounded-2xl border border-border bg-surface/80 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-mono uppercase text-accent mb-4">
              <Sparkles size={14} />
              Profile
            </div>
            <h3 className="text-2xl font-semibold text-foreground">{name}</h3>
            {headline && (
              <p className="text-muted mt-2 text-sm">{headline}</p>
            )}
            {location && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                <MapPin size={12} />
                <span>{location}</span>
              </div>
            )}
            <p className="text-sm text-muted mt-4 leading-relaxed">{summaryText}</p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent mt-6"
            >
              Visit LinkedIn profile
              <ExternalLink size={14} />
            </a>
          </AnimatedSection>

          <AnimatedSection className="rounded-2xl border border-border bg-surface/80 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-mono uppercase text-accent mb-4">
              <Briefcase size={14} />
              Highlights
            </div>

            {!hasHighlights && (
              <p className="text-sm text-muted leading-relaxed">
                LinkedIn highlights will appear here once the profile data is
                synced.
              </p>
            )}

            {hasExperience && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Briefcase size={14} />
                  Experience
                </div>
                <div className="space-y-3">
                  {experience.slice(0, 3).map((role) => (
                    <div key={`${role.title}-${role.company}`} className="text-sm">
                      <p className="font-medium text-foreground">
                        {role.title} · {role.company}
                      </p>
                      <p className="text-xs text-muted">{role.timeframe}</p>
                      {role.description && (
                        <p className="text-xs text-muted mt-1">{role.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasEducation && (
              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <GraduationCap size={14} />
                  Education
                </div>
                <div className="space-y-3">
                  {education.slice(0, 2).map((school) => (
                    <div key={`${school.school}-${school.degree}`} className="text-sm">
                      <p className="font-medium text-foreground">{school.school}</p>
                      {school.degree && (
                        <p className="text-xs text-muted">{school.degree}</p>
                      )}
                      {school.timeframe && (
                        <p className="text-xs text-muted">{school.timeframe}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasSkills && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-foreground mb-3">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface border border-border text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center">
            <div className="w-full max-w-[504px] overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-sm">
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:share:7156322849404641280"
                height="649"
                width="504"
                frameBorder="0"
                allowFullScreen
                title="Gömülü gönderi"
                className="w-full"
              />
            </div>
            <div className="w-full max-w-[504px] overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-sm">
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:share:7317576246635151362"
                height="1636"
                width="504"
                frameBorder="0"
                allowFullScreen
                title="Gömülü gönderi"
                className="w-full"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
