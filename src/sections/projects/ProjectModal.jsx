import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CircuitPath from '../../components/circuit/CircuitPath';
import CircuitNode from '../../components/circuit/CircuitNode';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  
  useEffect(() => {
    // Animation for modal opening
    if (isOpen && modalRef.current) {
      // Animate overlay
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      
      // Animate content
      gsap.fromTo(
        contentRef.current,
        { 
          opacity: 0, 
          y: 20,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.4,
          delay: 0.1,
          ease: 'power2.out'
        }
      );
      
      // Ensure modal is positioned properly to account for fixed header
      contentRef.current.style.marginTop = '80px';
    }
    
    // Add escape key listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handleClose = () => {
    // Animate closing
    gsap.to(overlayRef.current, { 
      opacity: 0, 
      duration: 0.3 
    });
    
    gsap.to(contentRef.current, { 
      opacity: 0, 
      y: 20, 
      scale: 0.95, 
      duration: 0.3,
      onComplete: onClose 
    });
  };
  
  // Prevent clicks inside the modal from closing it
  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  
  // Generate a color based on project ID
  const generateColor = (id) => {
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f39c12', '#1abc9c'];
    return colors[id % colors.length];
  };
  
  const circuitColor = generateColor(project.id);
  
  return (
    <div className="project-modal-container" ref={modalRef} onClick={handleClose}>
      <div className="modal-overlay" ref={overlayRef}></div>
      
      <div className="modal-content" ref={contentRef} onClick={handleContentClick}>
        <button className="modal-close-btn" onClick={handleClose}>×</button>
        
        <div className="modal-header">
          <h2 className="modal-title">{project.title}</h2>
          
          {/* Circuit decoration */}
          <div className="modal-circuit-header">
            <CircuitPath
              path="M10,10 L100,10 L100,30"
              strokeWidth={2}
              color={circuitColor}
              className="modal-circuit-path"
            />
            <CircuitNode size="small" position="header-node" pulseColor={circuitColor} />
          </div>
        </div>
        
        <div className="modal-body">
          {/* Project images carousel - simplified version */}
          <div className="project-images">
            {/* For demo, just showing one image with a placeholder */}
            <div className="project-image-placeholder" style={{ backgroundColor: `${circuitColor}30` }}>
              {project.title.charAt(0)}
            </div>
          </div>
          
          <div className="project-details">
            <div className="details-section">
              <h3>About this Project</h3>
              <p>{project.description}</p>
            </div>
            
            <div className="details-section">
              <h3>The Challenge</h3>
              <p>{project.details.challenge}</p>
            </div>
            
            <div className="details-section">
              <h3>My Solution</h3>
              <p>{project.details.solution}</p>
            </div>
            
            <div className="details-section">
              <h3>Outcome</h3>
              <p>{project.details.outcome}</p>
            </div>
            
            <div className="details-section">
              <h3>Technologies Used</h3>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <div className="project-links">
            {project.github && (
              <a 
                href={project.github} 
                className="github-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            )}
            
            {project.live && (
              <a 
                href={project.live} 
                className="live-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Live Demo
              </a>
            )}
          </div>
          
          {/* Circuit decoration */}
          <div className="modal-circuit-footer">
            <CircuitPath
              path="M10,10 L50,10 L50,30 L90,30"
              strokeWidth={2}
              color={circuitColor}
              className="modal-circuit-path"
            />
            <CircuitNode size="small" position="footer-node" pulseColor={circuitColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;