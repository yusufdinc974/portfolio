export interface GitHubProject {
  id: number | string;
  title: string;
  description: string;
  techStack: string[];
  gradient: string;
  emoji: string;
  link?: string;
  github?: string;
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

export async function fetchGitHubProjects(
  username: string,
  count = 6
): Promise<GitHubProject[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "yusufdinc-portfolio",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const repos = (await response.json()) as GitHubRepo[];
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
  } catch {
    return [];
  }
}
