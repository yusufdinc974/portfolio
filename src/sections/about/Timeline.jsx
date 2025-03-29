import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CircuitNode from '../../components/circuit/CircuitNode';
import CircuitPath from '../../components/circuit/CircuitPath';

// Sample timeline data (should eventually come from data file)
const timelineData = [
  {
    id: 1,
    type: 'education',
    title: 'Bachelor of Computer Engineering',
    organization: 'University of Technology',
    period: '2019 - 2023',
    description: 'Specialized in embedded systems and computer architecture with a minor in software engineering.',
  },
  {
    id: 2,
    type: 'experience',
    title: 'Software Engineering Intern',
    organization: 'TechCorp Inc.',
    period: 'Summer 2022',
    description: "Developed firmware for IoT devices and contributed to the company's cloud infrastructure.",
  },
  {
    id: 3,
    type: 'education',
    title: 'Advanced Certification in AI',
    organization: 'AI Institute',
    period: 'Fall 2022',
    description: 'Completed specialized training in machine learning algorithms and neural networks.',
  },
  {
    id: 4,
    type: 'experience',
    title: 'Research Assistant',
    organization: 'University Research Lab',
    period: '2022 - 2023',
    description: 'Assisted in research on new computer architectures for efficient AI computation.',
  },
];

const Timeline = () => {
  const timelineRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const timelinePathRef = useRef(null);
  
  useEffect(() => {
    // Reset refs array on each render
    timelineItemsRef.current = [];
    
    // Animate timeline items one by one
    if (timelineItemsRef.current.length > 0) {
      gsap.fromTo(
        timelineItemsRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
    
    // Animate the main timeline path
    if (timelinePathRef.current) {
      gsap.fromTo(
        timelinePathRef.current,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: timelineRef.current,
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
    if (el && !timelineItemsRef.current.includes(el)) {
      timelineItemsRef.current.push(el);
    }
  };
  
  return (
    <div className="timeline-container" ref={timelineRef}>
      <h3>Education & Experience</h3>
      
      <div className="timeline">
        <div className="timeline-track">
          <CircuitPath 
            ref={timelinePathRef}
            path="M20,0 L20,800" 
            strokeWidth={3}
            color="#2ecc71"
            strokeDasharray="5,5"
            className="timeline-main-path"
          />
        </div>
        
        {timelineData.map((item, index) => (
          <div 
            key={item.id}
            className={`timeline-item ${item.type}`}
            ref={addToRefs}
          >
            <div className="timeline-node">
              <CircuitNode 
                size="medium" 
                pulseColor={item.type === 'education' ? '#2ecc71' : '#e74c3c'} 
              />
            </div>
            
            <div className="timeline-content">
              <h4>{item.title}</h4>
              <h5>{item.organization}</h5>
              <p className="timeline-period">{item.period}</p>
              <p className="timeline-description">{item.description}</p>
            </div>
            
            {/* Connecting path from main timeline to content */}
            <CircuitPath 
              path={`M20,${30 + index * 10} L40,${30 + index * 10}`} 
              strokeWidth={2}
              color={item.type === 'education' ? '#2ecc71' : '#e74c3c'}
              className="timeline-connector"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;