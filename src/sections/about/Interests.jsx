import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CircuitNode from '../../components/circuit/CircuitNode';
import CircuitPath from '../../components/circuit/CircuitPath';

// Sample interests data (should eventually come from data file)
const interestsData = [
  {
    id: 1,
    title: 'Embedded Systems',
    description: 'Building and programming microcontroller-based projects.',
    icon: '🔌', // Replace with actual SVG icons later
  },
  {
    id: 2,
    title: 'AI & Machine Learning',
    description: 'Exploring neural networks and developing smart algorithms.',
    icon: '🧠',
  },
  {
    id: 3,
    title: 'PCB Design',
    description: 'Creating custom circuit boards for electronic projects.',
    icon: '🔧',
  },
  {
    id: 4,
    title: 'Open Source Development',
    description: 'Contributing to the global community of developers.',
    icon: '🌐',
  },
];

const Interests = () => {
  const interestsRef = useRef(null);
  const interestItemsRef = useRef([]);
  
  useEffect(() => {
    // Reset refs array on each render
    interestItemsRef.current = [];
    
    // Animate interest items with a staggered effect
    if (interestItemsRef.current.length > 0) {
      gsap.fromTo(
        interestItemsRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: interestsRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);
  
  // Add to refs array
  const addToRefs = (el) => {
    if (el && !interestItemsRef.current.includes(el)) {
      interestItemsRef.current.push(el);
    }
  };
  
  return (
    <div className="interests-container" ref={interestsRef}>
      <h3>Interests & Passions</h3>
      
      <div className="interests-grid">
        {interestsData.map((interest) => (
          <div 
            key={interest.id} 
            className="interest-item"
            ref={addToRefs}
          >
            <div className="interest-icon">
              <span className="icon">{interest.icon}</span>
              <CircuitNode size="small" pulseColor="#9b59b6" />
            </div>
            <h4>{interest.title}</h4>
            <p>{interest.description}</p>
            <CircuitPath 
              path="M5,5 L20,5 L20,20" 
              strokeWidth={1.5}
              color="#9b59b6"
              className="interest-circuit-path"
            />
          </div>
        ))}
      </div>
      
      {/* Circuit connecting all interest items */}
      <div className="interests-circuit-connector">
        <CircuitPath 
          path="M50,10 L250,10 L250,150 L450,150 L450,10 L650,10" 
          strokeWidth={2}
          color="#9b59b6"
          className="connector-path"
        />
        <CircuitNode size="small" position="connector-start" pulseColor="#9b59b6" />
        <CircuitNode size="small" position="connector-end" pulseColor="#9b59b6" />
      </div>
    </div>
  );
};

export default Interests;