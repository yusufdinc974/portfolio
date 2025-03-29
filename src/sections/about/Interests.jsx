import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CircuitNode from '../../components/circuit/CircuitNode';
import CircuitPath from '../../components/circuit/CircuitPath';
import { aboutMe } from '../../data/experience';
import './Interests.scss'; // Make sure you have this file

const Interests = () => {
  const interestsRef = useRef(null);
  const interestItemsRef = useRef([]);
  const languagesRef = useRef(null);
  
  // Map interests from data file to component format
  const interestsData = aboutMe.interests.map((interest, index) => ({
    id: index + 1,
    title: interest,
    description: getInterestDescription(interest),
    icon: getInterestIcon(interest)
  }));
  
  // Helper function to get descriptions (you can customize these)
  function getInterestDescription(interest) {
    const descriptions = {
      'Embedded Systems': 'Building and programming microcontroller-based projects.',
      'Web Development': 'Creating responsive and intuitive web applications.',
      'Electronics': 'Designing and building electronic circuits and hardware.',
      'Open Source': 'Contributing to and maintaining open source projects.',
      'Language Learning': 'Acquiring new languages and understanding different cultures.'
    };
    return descriptions[interest] || `Exploring and developing skills in ${interest}.`;
  }
  
  // Helper function to get icons (you can customize these)
  function getInterestIcon(interest) {
    const icons = {
      'Embedded Systems': '🔌',
      'Web Development': '💻',
      'Electronics': '⚡',
      'Open Source': '🌐',
      'Language Learning': '🗣️'
    };
    return icons[interest] || '🔍';
  }
  
  // Function to get color based on language proficiency level
  function getLanguageColor(level) {
    if (level >= 90) return '#2ecc71'; // Native/Fluent - Green
    if (level >= 70) return '#3498db'; // Advanced/Intermediate - Blue
    if (level >= 40) return '#f39c12'; // Intermediate/Basic - Orange
    return '#e74c3c'; // Beginner - Red
  }
  
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
    
    // Animate languages section
    if (languagesRef.current) {
      gsap.fromTo(
        languagesRef.current.querySelectorAll('.language-item'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: languagesRef.current,
            start: 'top 80%',
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
    <>
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
      
      {/* Languages Section */}
      {aboutMe.languages && aboutMe.languages.length > 0 && (
        <div className="languages-section" ref={languagesRef}>
          <h3>Languages</h3>
          
          <div className="languages-container">
            {aboutMe.languages.map((language, index) => (
              <div key={index} className="language-item">
                <div className="language-flag">
                  {/* Using flag emoji based on ISO code */}
                  <img 
                    src={`https://flagcdn.com/32x24/${language.iso}.png`} 
                    alt={`${language.name} flag`}
                    width="32"
                    height="24"
                  />
                </div>
                
                <div className="language-details">
                  <h4>{language.name}</h4>
                  <p className="language-proficiency">{language.proficiency}</p>
                  
                  {/* Progress bar for language level */}
                  <div className="language-progress-container">
                    <div 
                      className="language-progress" 
                      style={{
                        width: `${language.level}%`,
                        backgroundColor: getLanguageColor(language.level)
                      }}
                    ></div>
                  </div>
                  
                  <p className="language-description">{language.description}</p>
                </div>
                
                {/* Circuit decoration for language item */}
                <CircuitNode 
                  size="tiny" 
                  pulseColor={getLanguageColor(language.level)} 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-5px',
                    transform: 'translateY(-50%)'
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Circuit connecting language items */}
          <div className="languages-circuit">
            <CircuitPath 
              path="M10,50 H100 V100 H300 V50 H400" 
              strokeWidth={2}
              color="#3498db"
              className="languages-path"
            />
            <CircuitNode size="small" position="start" pulseColor="#3498db" />
            <CircuitNode size="small" position="end" pulseColor="#3498db" />
          </div>
        </div>
      )}
    </>
  );
};

export default Interests;