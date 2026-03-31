import Projects from "@/components/Projects";
import { fetchGitHubProjects } from "@/lib/github";

export default async function ProjectsSection() {
  const projects = await fetchGitHubProjects("yusufdinc974", 6);
  return <Projects projects={projects} />;
}
