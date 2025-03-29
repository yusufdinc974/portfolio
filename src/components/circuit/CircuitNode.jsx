import React, { forwardRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './CircuitNode.scss';

const CircuitNode = forwardRef(({ 
  value = 0,
  label = '',
  size = 40,
  color = 'var(--color-accent)',
  className = '',
  onClick,
  animateIn = true
}, ref) => {
  const nodeRef = useRef(null);
  const combinedRef = (node) => {
    nodeRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  // Animate node on initial render
  useEffect(() => {
    if (animateIn && nodeRef.current) {
      nodeRef.current.style.transform = 'scale(0)';
      nodeRef.current.style.opacity = '0';
      
      setTimeout(() => {
        nodeRef.current.style.transform = 'scale(1)';
        nodeRef.current.style.opacity = '1';
      }, 100);
    }
  }, [animateIn]);

  // Handle click with a ripple effect
  const handleNodeClick = (e) => {
    // Create ripple effect
    if (nodeRef.current) {
      // Create a ripple element
      const ripple = document.createElement('div');
      ripple.className = 'node-ripple';
      nodeRef.current.appendChild(ripple);
      
      // Set ripple style from center
      const rect = nodeRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${(rect.width - size) / 2}px`;
      ripple.style.top = `${(rect.height - size) / 2}px`;
      ripple.style.backgroundColor = color;
      
      // Remove the ripple after animation completes
      setTimeout(() => {
        if (ripple && ripple.parentNode === nodeRef.current) {
          nodeRef.current.removeChild(ripple);
        }
      }, 800);
    }
    
    // Call the provided onClick handler
    if (onClick) {
      onClick(e);
    }
  };

  // Ensure size is a number
  const nodeSize = typeof size === 'string' ? parseInt(size, 10) || 40 : size;
  
  // Calculate inner size based on the provided size prop
  const innerSize = nodeSize * 0.8;
  
  // Ensure value is between 0 and 100
  const safeValue = Math.min(Math.max(parseInt(value, 10) || 0, 0), 100);
  
  // Calculate brightness based on value (0-100)
  const brightness = 0.6 + (safeValue / 100) * 0.4;
  
  return (
    <div 
      ref={combinedRef}
      className={`circuit-node ${className}`} 
      style={{ 
        width: `${nodeSize}px`, 
        height: `${nodeSize}px`,
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease',
        boxShadow: `0 0 ${nodeSize/5}px ${color}`
      }}
      onClick={handleNodeClick}
    >
      {/* Main circle */}
      <div 
        className="node-inner"
        style={{ 
          width: `${innerSize}px`, 
          height: `${innerSize}px`,
          backgroundColor: color,
          opacity: brightness,
          boxShadow: `0 0 ${nodeSize/8}px ${color}`
        }}
      >
        {/* Core glow for emphasis */}
        <div 
          className="node-core-glow"
          style={{
            backgroundColor: color,
            opacity: 0.6
          }}
        ></div>
      </div>
      
      {/* Label */}
      {label && (
        <div 
          className="node-label"
          style={{
            fontSize: `${nodeSize/4}px`,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
});

CircuitNode.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  animateIn: PropTypes.bool
};

CircuitNode.displayName = 'CircuitNode';

export default CircuitNode;