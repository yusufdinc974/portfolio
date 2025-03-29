import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CircuitNode from '../../components/circuit/CircuitNode';
import CircuitPath from '../../components/circuit/CircuitPath';
import { aboutMe } from '../../data/experience';
import './Bio.scss';

const Bio = () => {
  const bioRef = useRef(null);
  const circuitPathRef = useRef(null);
  
  useEffect(() => {
    // Animate bio text
    gsap.fromTo(
      bioRef.current.querySelectorAll('p'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: bioRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    
    // Animate circuit path
    if (circuitPathRef.current) {
      gsap.fromTo(
        circuitPathRef.current,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);
  
  // Function to handle node click
  const handleNodeClick = (position) => {
    // Add your click handler functionality here
    console.log(`Node clicked: ${position}`);
    
    // Example: show a tooltip or highlight related content
    const bioContent = bioRef.current;
    if (bioContent) {
      gsap.to(bioContent.querySelectorAll('p'), {
        color: 'var(--color-accent)',
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });
    }
  };
  
  // Function to format bio text into paragraphs
  const formatBio = (bioText) => {
    if (!bioText) return [];
    
    // Split the bio into paragraphs (if it's one long string)
    const paragraphs = bioText.includes('\n') 
      ? bioText.split('\n').filter(p => p.trim() !== '')
      : [bioText];
      
    return paragraphs;
  };
  
  const bioParagraphs = formatBio(aboutMe.bio);
  
  return (
    <div className="bio-container" ref={bioRef}>
      <div className="bio-content">
        <h3 className="bio-header">Who I Am</h3>
        {bioParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      <div className="bio-circuit">
        <div className="top-left-node">
          <CircuitNode 
            value={75}
            size={40} 
            color="#3498db" 
            onClick={() => handleNodeClick('top-left')}
          />
        </div>
        
        <CircuitPath 
          d="M10,10 L50,10 L50,50 L90,50 L90,90 L130,90 L130,130" 
          strokeWidth={2}
          color="#3498db"
          className="bio-circuit-path"
          ref={circuitPathRef}
        />
        
        <div className="bottom-right-node">
          <CircuitNode 
            value={75}
            size={40} 
            color="#3498db" 
            onClick={() => handleNodeClick('bottom-right')}
          />
        </div>
      </div>
    </div>
  );
};

export default Bio;