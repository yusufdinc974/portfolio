import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SkillBar = ({ skill, color = 'var(--color-accent)' }) => {
  const progressRef = useRef(null);
  
  useEffect(() => {
    if (!progressRef.current) return;
    
    // Animate progress bar
    gsap.fromTo(
      progressRef.current,
      { width: 0 },
      { 
        width: `${skill.level}%`,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: progressRef.current.parentNode,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Clean up
    return () => {
      const triggers = ScrollTrigger.getAll().filter(trigger => 
        trigger.vars.trigger === progressRef.current.parentNode
      );
      
      triggers.forEach(trigger => trigger.kill());
    };
  }, [skill.level]);
  
  return (
    <div className="skill-bar">
      <div className="skill-info">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-level">{skill.level}%</span>
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-bar" 
          ref={progressRef}
          style={{ 
            width: '0%', 
            backgroundColor: color 
          }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;