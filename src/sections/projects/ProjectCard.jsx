import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import CircuitPath from '../../components/circuit/CircuitPath';
import CircuitNode from '../../components/circuit/CircuitNode';

const ProjectCard = ({ project, onClick }) => {
  const cardRef = useRef(null);
  const circuitPathRef = useRef(null);
  
  useEffect(() => {
    // Create hover effect for card
    if (cardRef.current) {
      // Circuit animation on hover
      cardRef.current.addEventListener('mouseenter', () => {
        if (circuitPathRef.current) {
          gsap.to(circuitPathRef.current, {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
      
      cardRef.current.addEventListener('mouseleave', () => {
        if (circuitPathRef.current) {
          gsap.to(circuitPathRef.current, {
            strokeDashoffset: 100,
            duration: 0.5,
            ease: 'power2.in'
          });
        }
      });
    }
    
    // Cleanup
    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mouseenter', () => {});
        cardRef.current.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);
  
  // Derive a color from the project ID for variety
  const generateColor = (id) => {
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f39c12', '#1abc9c'];
    return colors[id % colors.length];
  };
  
  const circuitColor = generateColor(project.id);
  
  return (
    <div 
      className={`project-card ${project.featured ? 'featured' : ''}`}
      ref={cardRef}
      onClick={onClick}
    >
      <div className="project-thumbnail">
        {/* Placeholder for project image - in real implementation, use actual images */}
        <div className="image-placeholder" style={{ backgroundColor: `${circuitColor}30` }}>
          {project.title.charAt(0)}
        </div>
        
        {/* Featured badge */}
        {project.featured && (
          <div className="featured-badge">Featured</div>
        )}
      </div>
      
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-tech">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
          {project.technologies.length > 3 && (
            <span className="tech-tag">+{project.technologies.length - 3} more</span>
          )}
        </div>
        
        <div className="card-footer">
          <button className="view-details-btn">View Details</button>
          
          {/* Links */}
          <div className="project-links">
            {project.github && (
              <a 
                href={project.github} 
                className="github-link"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}
            
            {project.live && (
              <a 
                href={project.live} 
                className="live-link"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Circuit decorations */}
      <div className="card-circuit">
        <CircuitPath
          ref={circuitPathRef}
          path="M5,5 L50,5 L50,30 L95,30"
          strokeWidth={2}
          color={circuitColor}
          strokeDasharray="100"
          strokeDashoffset="100"
          className="card-circuit-path"
        />
        <CircuitNode
          size="tiny"
          position="top-left"
          pulseColor={circuitColor}
        />
        <CircuitNode
          size="tiny"
          position="bottom-right"
          pulseColor={circuitColor}
        />
      </div>
    </div>
  );
};

export default ProjectCard;