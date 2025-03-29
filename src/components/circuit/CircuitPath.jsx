import React, { forwardRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './CircuitPath.scss';

const CircuitPath = forwardRef(({
  id,
  d,
  animated = true,
  className = '',
  color = 'var(--color-circuit-path)',
  strokeWidth = 2,
  blinkEffect = false,
  dashArray = '',
  dashOffset = ''
}, ref) => {
  const pathRef = useRef(null);
  const combinedRef = (node) => {
    pathRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  useEffect(() => {
    // Only run animation setup if:
    // 1. pathRef is valid
    // 2. Animation is enabled
    // 3. The path is actually an SVG path element with getTotalLength
    if (pathRef.current && animated && pathRef.current.getTotalLength) {
      try {
        // Get the total length of the path for animation
        const pathLength = pathRef.current.getTotalLength();
        // Set initial dasharray and dashoffset for drawing animation
        pathRef.current.style.strokeDasharray = dashArray || `${pathLength}`;
        pathRef.current.style.strokeDashoffset = dashOffset || `${pathLength}`;
      } catch (error) {
        console.warn('Error setting up path animation:', error);
      }
    }
  }, [d, animated, dashArray, dashOffset]);

  // If d prop is missing, don't render the path
  if (!d) {
    return null;
  }

  return (
    <svg className="circuit-path-svg" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
      <path
        id={id}
        ref={combinedRef}
        d={d}
        className={`circuit-path ${className} ${blinkEffect ? 'blink-effect' : ''}`}
        stroke={color}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
    </svg>
  );
});

CircuitPath.propTypes = {
  id: PropTypes.string,
  d: PropTypes.string.isRequired,
  animated: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  blinkEffect: PropTypes.bool,
  dashArray: PropTypes.string,
  dashOffset: PropTypes.string
};

CircuitPath.displayName = 'CircuitPath';

export default CircuitPath;