import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CircuitNode from '../../components/circuit/CircuitNode';
import CircuitPath from '../../components/circuit/CircuitPath';
import { education, experience } from '../../data/experience';

const Timeline = () => {
  const timelineRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const timelinePathRef = useRef(null);
  
  // Combine education and experience data, sort by most recent first
  const combinedTimelineData = [...education, ...experience].sort((a, b) => {
    // Extract the end year from period string (e.g., "2019 - 2023" → 2023)
    const getEndYear = (period) => {
      const years = period.split(' - ');
      return parseInt(years[years.length - 1], 10);
    };
    
    return getEndYear(b.period) - getEndYear(a.period);
  });
  
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
        
        {combinedTimelineData.map((item, index) => {
          // Determine if it's education or experience
          const itemType = item.degree ? 'education' : 'experience';
          
          return (
            <div 
              key={item.id}
              className={`timeline-item ${itemType}`}
              ref={addToRefs}
            >
              <div className="timeline-node">
                <CircuitNode 
                  size="medium" 
                  pulseColor={itemType === 'education' ? '#2ecc71' : '#e74c3c'} 
                />
              </div>
              
              <div className="timeline-content">
                <h4>{item.degree || item.position}</h4>
                <h5>{item.institution || item.company}</h5>
                <p className="timeline-period">{item.period}</p>
                <p className="timeline-description">{item.description}</p>
                
                {/* Show achievements for experience items */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="achievements">
                    <h6>Key Achievements:</h6>
                    <ul>
                      {item.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Show relevant courses for education items */}
                {item.courses && item.courses.length > 0 && (
                  <div className="courses">
                    <h6>Relevant Courses:</h6>
                    <div className="course-tags">
                      {item.courses.map((course, i) => (
                        <span key={i} className="course-tag">{course}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Show technologies for experience items */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="technologies">
                    <h6>Technologies:</h6>
                    <div className="tech-tags">
                      {item.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Connecting path from main timeline to content */}
              <CircuitPath 
                path={`M20,${30 + index * 10} L40,${30 + index * 10}`} 
                strokeWidth={2}
                color={itemType === 'education' ? '#2ecc71' : '#e74c3c'}
                className="timeline-connector"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;