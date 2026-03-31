"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";

export interface Project {
  id: number | string;
  title: string;
  description: string;
  techStack: string[];
  gradient: string;
  emoji: string;
  link?: string;
  github?: string;
}

interface ProjectsProps {
  projects: Project[];
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

const gradients = [
  "from-sky-500/15 to-blue-500/20",
  "from-emerald-500/15 to-teal-500/20",
  "from-indigo-500/15 to-purple-500/20",
  "from-rose-500/15 to-pink-500/20",
  "from-amber-500/15 to-orange-500/20",
  "from-cyan-500/15 to-sky-500/20",
];

const emojis = ["⚡", "🧠", "🧩", "✨", "🛠️", "📦", "🎮", "🛰️"];

const formatTitle = (name: string) =>
  name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const normalizeLink = (value?: string | null) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

const buildTechStack = (repo: GitHubRepo) => {
  const topics = Array.isArray(repo.topics) ? repo.topics : [];
  const stack = [...topics, ...(repo.language ? [repo.language] : [])]
    .filter(Boolean)
    .slice(0, 4);
  return stack.length ? stack : ["GitHub"];
};

const mapReposToProjects = (repos: GitHubRepo[], count: number) => {
  const filtered = repos.filter((repo) => !repo.fork && !repo.archived);
  const sorted = filtered.sort((a, b) => {
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return sorted.slice(0, count).map((repo, index) => ({
    id: repo.id,
    title: formatTitle(repo.name),
    description: repo.description ?? "No description yet.",
    techStack: buildTechStack(repo),
    gradient: gradients[index % gradients.length],
    emoji: emojis[index % emojis.length],
    link: normalizeLink(repo.homepage),
    github: repo.html_url,
  }));
};

const easeStandard: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeStandard },
  },
};

export default function Projects({ projects }: ProjectsProps) {
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [status, setStatus] = useState<"idle" | "loading" | "error">(
    projects.length > 0 ? "idle" : "loading"
  );

  useEffect(() => {
    if (projects.length > 0) {
      setProjectList(projects);
      setStatus("idle");
      return;
    }

    let isMounted = true;

    const fetchClientProjects = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/yusufdinc974/repos?per_page=100&sort=updated",
          {
            headers: {
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        if (!response.ok) {
          throw new Error("GitHub request failed");
        }

        const repos = (await response.json()) as GitHubRepo[];
        const mapped = mapReposToProjects(repos, 6);

        if (isMounted) {
          setProjectList(mapped);
          setStatus(mapped.length > 0 ? "idle" : "error");
        }
      } catch {
        if (isMounted) {
          setStatus("error");
        }
      }
    };

    fetchClientProjects();

    return () => {
      isMounted = false;
    };
  }, [projects.length]);

  const hasProjects = projectList.length > 0;

  return (
    <section id="projects" className="py-28 sm:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <AnimatedSection className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-sm font-mono text-accent tracking-wider uppercase">
              Selected Work
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Things I&apos;ve{" "}
            <span className="bg-gradient-to-r from-accent to-[#d3a17a] bg-clip-text text-transparent">
              built
            </span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl">
            Pulled live from my GitHub — recent work, experiments, and shipped
            projects.
          </p>
        </AnimatedSection>

        {!hasProjects && (
          <div className="rounded-2xl border border-border bg-surface/70 p-10 text-center">
            {status === "loading" ? (
              <p className="text-muted mb-4">Loading GitHub projects...</p>
            ) : (
              <p className="text-muted mb-4">
                GitHub projects couldn&apos;t load right now.
              </p>
            )}
            <a
              href="https://github.com/yusufdinc974"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent"
            >
              View all projects on GitHub
              <ExternalLink size={14} />
            </a>
          </div>
        )}

        {hasProjects && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projectList.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="group relative rounded-2xl border border-border bg-surface/50 overflow-hidden hover:border-accent/30 transition-all duration-500"
              >
                {/* Card gradient header */}
                <div
                  className={`h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-background/40" />
                  <motion.span
                    className="text-6xl relative z-10"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.emoji}
                  </motion.span>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Card body */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-all duration-300"
                          aria-label={`${project.title} GitHub`}
                        >
                          <Code size={16} />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-all duration-300"
                          aria-label={`${project.title} live link`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface border border-border text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
