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
  pulseEffect = true,
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

  // Ensure size is a number
  const nodeSize = typeof size === 'string' ? parseInt(size, 10) || 40 : size;
  
  // Calculate inner sizes based on the provided size prop
  const innerSize = nodeSize * 0.7;
  const coreSize = nodeSize * 0.4;
  
  // Ensure value is between 0 and 100
  const safeValue = Math.min(Math.max(parseInt(value, 10) || 0, 0), 100);
  
  // Calculate brightness based on value (0-100)
  const brightness = 0.5 + (safeValue / 100) * 0.5;
  
  return (
    <div 
      ref={combinedRef}
      className={`circuit-node ${className} ${pulseEffect ? 'with-pulse' : ''}`} 
      style={{ 
        width: `${nodeSize}px`, 
        height: `${nodeSize}px`,
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease'
      }}
      onClick={onClick}
    >
      {/* Outer ring */}
      <div 
        className="node-outer"
        style={{ 
          backgroundColor: color,
          opacity: brightness * 0.7
        }}
      ></div>
      
      {/* Inner circle */}
      <div 
        className="node-inner"
        style={{ 
          width: `${innerSize}px`, 
          height: `${innerSize}px`,
          backgroundColor: color,
          opacity: brightness * 0.9
        }}
      >
        {/* Core */}
        <div 
          className="node-core"
          style={{ 
            width: `${coreSize}px`, 
            height: `${coreSize}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${nodeSize/5}px ${color}`
          }}
        ></div>
      </div>
      
      {/* Pulse effect */}
      {pulseEffect && (
        <div 
          className="node-pulse"
          style={{ 
            backgroundColor: color,
            animationDuration: `${3 - (safeValue / 50)}s`
          }}
        ></div>
      )}
      
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
  pulseEffect: PropTypes.bool,
  animateIn: PropTypes.bool
};

CircuitNode.displayName = 'CircuitNode';

export default CircuitNode;