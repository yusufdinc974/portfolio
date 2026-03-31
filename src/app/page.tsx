import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LinkedInSection from "@/components/LinkedInSection";
import ProjectsSection from "@/components/ProjectsSection";
import LanguagesSection from "@/components/LanguagesSection";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <LinkedInSection />
        <ProjectsSection />
        <LanguagesSection />
        <Products />
      </main>
      <Footer />
    </>
  );
}
