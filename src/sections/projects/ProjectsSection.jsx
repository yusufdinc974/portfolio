import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircuitBackground from '../../components/circuit/CircuitBackground';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects, projectCategories } from '../../data/projects';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const filtersRef = useRef(null);
  
  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.category.includes(selectedCategory))
      );
    }
    
    // Animate new cards entering
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out'
        }
      );
    }
  }, [selectedCategory]);
  
  // Initialize animations
  useEffect(() => {
    // Animate section title
    gsap.fromTo(
      sectionRef.current.querySelector('.section-title'),
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    
    // Adjust scroll behavior to account for fixed header
    const headerHeight = 80; // Adjust based on your header height
    
    // Add scroll-margin-top to account for fixed header
    sectionRef.current.style.scrollMarginTop = `${headerHeight}px`;
    
    // Animate filters
    gsap.fromTo(
      filtersRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: filtersRef.current,
          start: 'top 80%',
          end: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    
    // Animate project cards
    gsap.fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          end: 'center 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    
    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };
  
  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        
        {/* Project Filters */}
        <div className="project-filters" ref={filtersRef}>
          {projectCategories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Project Grid */}
        <div className="projects-grid" ref={cardsRef}>
          {/* Render featured projects first for better grid alignment */}
          {filteredProjects
            .filter(project => project.featured)
            .map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleProjectClick(project)}
              />
          ))}
          
          {/* Then render non-featured projects */}
          {filteredProjects
            .filter(project => !project.featured)
            .map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleProjectClick(project)}
              />
          ))}
        </div>
        
        {/* Fallback message if no projects match filter */}
        {filteredProjects.length === 0 && (
          <div className="no-projects-message">
            <p>No projects found in this category. Try selecting a different filter.</p>
          </div>
        )}
      </div>
      
      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
      
      <CircuitBackground variant="projects" />
    </section>
  );
};

export default ProjectsSection;