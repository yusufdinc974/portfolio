import React, { useEffect, useRef } from 'react';
import SkillBar from './SkillBar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SkillCategory = ({ category, index }) => {
  const categoryRef = useRef(null);
  
  useEffect(() => {
    if (!categoryRef.current) return;
    
    // Animate category entrance
    gsap.fromTo(
      categoryRef.current,
      { 
        y: 30,
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: 0.1 * (index % 3), // Stagger based on position in row
        ease: 'power3.out',
        scrollTrigger: {
          trigger: categoryRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Clean up
    return () => {
      const triggers = ScrollTrigger.getAll().filter(trigger => 
        trigger.vars.trigger === categoryRef.current
      );
      
      triggers.forEach(trigger => trigger.kill());
    };
  }, [index]);
  
  // Generate a different circuit pattern for each category
  const getCircuitSvg = (categoryIndex) => {
    const patterns = [
      // Pattern 1
      <svg className="circuit-svg" width="150" height="150" viewBox="0 0 150 150">
        <path d="M10,10 L50,10 L50,50 L90,50 L90,90 L130,90 L130,130" stroke="currentColor" fill="none" strokeWidth="2" />
        <circle cx="10" cy="10" r="3" fill="currentColor" />
        <circle cx="50" cy="10" r="3" fill="currentColor" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
        <circle cx="90" cy="50" r="3" fill="currentColor" />
        <circle cx="90" cy="90" r="3" fill="currentColor" />
        <circle cx="130" cy="90" r="3" fill="currentColor" />
        <circle cx="130" cy="130" r="3" fill="currentColor" />
      </svg>,
      
      // Pattern 2
      <svg className="circuit-svg" width="150" height="150" viewBox="0 0 150 150">
        <path d="M130,10 L90,10 L90,50 L50,50 L50,90 L10,90 L10,130" stroke="currentColor" fill="none" strokeWidth="2" />
        <circle cx="130" cy="10" r="3" fill="currentColor" />
        <circle cx="90" cy="10" r="3" fill="currentColor" />
        <circle cx="90" cy="50" r="3" fill="currentColor" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
        <circle cx="50" cy="90" r="3" fill="currentColor" />
        <circle cx="10" cy="90" r="3" fill="currentColor" />
        <circle cx="10" cy="130" r="3" fill="currentColor" />
      </svg>,
      
      // Pattern 3
      <svg className="circuit-svg" width="150" height="150" viewBox="0 0 150 150">
        <path d="M10,75 C40,75 40,40 75,40 L75,10" stroke="currentColor" fill="none" strokeWidth="2" />
        <path d="M75,140 L75,110 C75,75 110,75 140,75" stroke="currentColor" fill="none" strokeWidth="2" />
        <circle cx="10" cy="75" r="3" fill="currentColor" />
        <circle cx="75" cy="40" r="3" fill="currentColor" />
        <circle cx="75" cy="10" r="3" fill="currentColor" />
        <circle cx="75" cy="140" r="3" fill="currentColor" />
        <circle cx="75" cy="110" r="3" fill="currentColor" />
        <circle cx="140" cy="75" r="3" fill="currentColor" />
      </svg>,
      
      // Pattern 4
      <svg className="circuit-svg" width="150" height="150" viewBox="0 0 150 150">
        <path d="M75,10 L75,40 C40,40 40,75 40,75 C40,110 75,110 75,110 L75,140" stroke="currentColor" fill="none" strokeWidth="2" />
        <circle cx="75" cy="10" r="3" fill="currentColor" />
        <circle cx="75" cy="40" r="3" fill="currentColor" />
        <circle cx="40" cy="75" r="3" fill="currentColor" />
        <circle cx="75" cy="110" r="3" fill="currentColor" />
        <circle cx="75" cy="140" r="3" fill="currentColor" />
      </svg>,
      
      // Pattern 5
      <svg className="circuit-svg" width="150" height="150" viewBox="0 0 150 150">
        <path d="M10,10 L140,10" stroke="currentColor" fill="none" strokeWidth="2" />
        <path d="M10,50 L140,50" stroke="currentColor" fill="none" strokeWidth="2" />
        <path d="M10,90 L140,90" stroke="currentColor" fill="none" strokeWidth="2" />
        <path d="M10,130 L140,130" stroke="currentColor" fill="none" strokeWidth="2" />
        <path d="M75,10 L75,130" stroke="currentColor" fill="none" strokeWidth="2" />
        <circle cx="75" cy="10" r="3" fill="currentColor" />
        <circle cx="75" cy="50" r="3" fill="currentColor" />
        <circle cx="75" cy="90" r="3" fill="currentColor" />
        <circle cx="75" cy="130" r="3" fill="currentColor" />
        <circle cx="10" cy="50" r="3" fill="currentColor" />
        <circle cx="10" cy="90" r="3" fill="currentColor" />
        <circle cx="140" cy="50" r="3" fill="currentColor" />
        <circle cx="140" cy="90" r="3" fill="currentColor" />
      </svg>
    ];
    
    return patterns[categoryIndex % patterns.length];
  };

  // Get category color based on index
  const getCategoryColor = (index) => {
    const colors = [
      'var(--color-blue, #4bcffa)',     // Blue
      'var(--color-green, #26de81)',    // Green
      'var(--color-orange, #fd9644)',   // Orange
      'var(--color-purple, #a55eea)',   // Purple
      'var(--color-teal, #2bcbba)'      // Teal
    ];
    
    return colors[index % colors.length];
  };

  const categoryColor = getCategoryColor(index);

  return (
    <div 
      className="skill-category" 
      ref={categoryRef}
      style={{
        '--category-color': categoryColor
      }}
    >
      <div className="category-header" style={{ borderColor: categoryColor }}>
        <h3>{category.name}</h3>
      </div>
      
      <div className="category-skills">
        {category.items.map((skill) => (
          <SkillBar 
            key={skill.id} 
            skill={skill}
            color={categoryColor}
          />
        ))}
      </div>
      
      <div className="background-circuit" style={{ color: categoryColor }}>
        {getCircuitSvg(index)}
      </div>
    </div>
  );
};

export default SkillCategory;