import React, { useState, useEffect, useRef } from 'react';
import SkillCategory from './SkillCategory';
import SkillCircuitGraph from './SkillCircuitGraph';
import CircuitPath from '../../components/circuit/CircuitPath';
import CircuitNode from '../../components/circuit/CircuitNode';
import { skills } from '../../data/skills';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SkillsSection.scss';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const [activeView, setActiveView] = useState('categories'); // 'categories' or 'graph'
  const sectionRef = useRef(null);
  const decorationRef = useRef(null);

  // Group skills into rows for better layout
  const organizeSkillsIntoRows = () => {
    const categoryGroups = [];
    let currentRow = [];
    let currentRowWidth = 0;
    const containerWidth = 1200; // Maximum container width in pixels
    const cardWidth = 380; // Approximate width of each card including margins
    const maxCardsPerRow = Math.floor(containerWidth / cardWidth);

    skills.forEach((category, index) => {
      // Add category to current row if there's space
      if (currentRow.length < maxCardsPerRow) {
        currentRow.push(category);
        currentRowWidth += cardWidth;
      } else {
        // Start a new row
        categoryGroups.push([...currentRow]);
        currentRow = [category];
        currentRowWidth = cardWidth;
      }
    });

    // Add any remaining categories
    if (currentRow.length > 0) {
      categoryGroups.push([...currentRow]);
    }

    return categoryGroups;
  };

  const skillRows = organizeSkillsIntoRows();

  useEffect(() => {
    // Animate section title and description
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 70%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from('.section-title', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out'
    })
    .from('.section-description', {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.view-toggle', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.4');

    // Animate circuit decoration
    if (decorationRef.current) {
      gsap.fromTo(
        '.decoration-path',
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: decorationRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate decoration nodes
      gsap.from('.decoration-node', {
        scale: 0,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: decorationRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="skills" className="section skills-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Skills</h2>
        
        <div className="section-description">
          <p>My technical expertise and knowledge areas, developed through academic studies, personal projects, and professional experience.</p>
        </div>

        {/* Circuit decoration elements */}
        <div className="circuit-decoration left-decoration">
          <CircuitNode size={20} color="var(--color-accent)" className="decoration-node" />
          <CircuitPath 
            d="M20,10 L100,10 C110,10 110,20 120,20 L200,20" 
            className="decoration-path" 
            blinkEffect={true}
          />
        </div>
        
        <div className="circuit-decoration right-decoration">
          <CircuitNode size={20} color="var(--color-green)" className="decoration-node" />
          <CircuitPath 
            d="M200,50 L120,50 C110,50 110,60 100,60 L20,60" 
            className="decoration-path" 
            blinkEffect={true}
          />
        </div>

        {/* View toggle */}
        <div className="view-toggle">
          <button 
            key="categories-button"
            className={`toggle-btn ${activeView === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveView('categories')}
          >
            <span className="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </span>
            Categories
          </button>
          <button 
            key="graph-button"
            className={`toggle-btn ${activeView === 'graph' ? 'active' : ''}`}
            onClick={() => setActiveView('graph')}
          >
            <span className="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
              </svg>
            </span>
            Circuit Graph
          </button>
        </div>

        {/* Categories view */}
        {activeView === 'categories' && (
          <div className="skills-categories">
            {skillRows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="skill-row">
                {row.map((category, colIndex) => (
                  <SkillCategory
                    key={`category-${category.name}`}
                    category={category}
                    index={(rowIndex * 3) + colIndex} // Ensure unique index for color variation
                  />
                ))}
              </div>
            ))}
          </div>
        )}


        {/* Bottom circuit paths decoration */}
        <div className="bottom-decoration" ref={decorationRef}>
          <svg className="bottom-circuit-svg" viewBox="0 0 600 100" preserveAspectRatio="none">
            <path 
              d="M0,50 C100,70 200,30 300,50 C400,70 500,30 600,50" 
              className="decoration-path" 
              stroke="var(--color-circuit-path)"
              fill="none"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
            <path 
              d="M50,80 C150,60 250,100 350,80 C450,60 550,100 650,80" 
              className="decoration-path" 
              stroke="var(--color-circuit-path-dim)"
              fill="none"
              strokeWidth="1.5"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
          </svg>
          
          <div className="decoration-node-container left">
            <CircuitNode size={30} color="var(--color-accent)" className="decoration-node" />
          </div>
          
          <div className="decoration-node-container right">
            <CircuitNode size={30} color="var(--color-green)" className="decoration-node" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;