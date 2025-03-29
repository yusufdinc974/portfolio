import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CircuitLoader.scss';

/**
 * A circuit-themed loading animation component
 * @param {Object} props - Component props
 * @param {string} [props.size='medium'] - Size of the loader (small, medium, large)
 * @param {string} [props.color] - Custom color (defaults to primary color)
 * @param {boolean} [props.inline=false] - Whether to display inline or as a block
 * @returns {JSX.Element} CircuitLoader component
 */
const CircuitLoader = ({ size = 'medium', color, inline = false }) => {
  const loaderRef = useRef(null);
  const nodesRef = useRef([]);
  const pathsRef = useRef([]);
  
  // Reset refs arrays
  nodesRef.current = [];
  pathsRef.current = [];
  
  // Add elements to refs
  const addNodeRef = (el) => el && nodesRef.current.push(el);
  const addPathRef = (el) => el && pathsRef.current.push(el);
  
  // Animation setup
  useEffect(() => {
    if (!loaderRef.current) return;
    
    // Create the animation timeline
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { duration: 0.4, ease: "power1.inOut" }
    });
    
    // Animate each node and path in sequence
    nodesRef.current.forEach((node, index) => {
      // First node starts illuminated
      if (index === 0) {
        gsap.set(node, { opacity: 1 });
      }
      
      // Find the connecting path
      const path = pathsRef.current[index];
      const nextNode = nodesRef.current[index + 1];
      
      if (path && nextNode) {
        // Animate the path
        tl.to(path, { 
          strokeDashoffset: 0, 
          duration: 0.7,
          ease: "power1.inOut" 
        }, index * 0.3);
        
        // Then animate the next node
        tl.to(nextNode, { 
          opacity: 1,
          scale: 1.2,
          duration: 0.2,
          ease: "back.out(1.5)" 
        }, index * 0.3 + 0.6);
        
        // Return node to normal size
        tl.to(nextNode, { 
          scale: 1,
          duration: 0.2 
        }, index * 0.3 + 0.8);
      }
    });
    
    // Animate back to initial state for looping
    tl.to(nodesRef.current, { 
      opacity: 0.3,
      stagger: 0.1
    }, "reset");
    
    tl.to(pathsRef.current, { 
      strokeDashoffset: function(i) {
        return this.targets()[i].getTotalLength();
      },
      stagger: 0.1
    }, "reset");
    
    // Set initial opacity for first node higher than others
    tl.set(nodesRef.current[0], { opacity: 1 }, "reset+=0.5");
    
    return () => {
      tl.kill();
    };
  }, []);
  
  // Determine size class
  const sizeClass = `circuit-loader--${size}`;
  
  // Custom style for color
  const customStyle = color ? { '--loader-color': color } : {};
  
  return (
    <div 
      ref={loaderRef} 
      className={`circuit-loader ${sizeClass} ${inline ? 'circuit-loader--inline' : ''}`}
      style={customStyle}
    >
      <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
        {/* First node */}
        <circle 
          ref={addNodeRef} 
          className="circuit-loader__node" 
          cx="10" 
          cy="20" 
          r="4" 
        />
        
        {/* Path 1 */}
        <path 
          ref={addPathRef}
          className="circuit-loader__path" 
          d="M14 20 H 40"
          pathLength="1"
        />
        
        {/* Node 2 */}
        <circle 
          ref={addNodeRef} 
          className="circuit-loader__node" 
          cx="40" 
          cy="20" 
          r="4" 
        />
        
        {/* Path 2 */}
        <path 
          ref={addPathRef}
          className="circuit-loader__path" 
          d="M44 20 H 70"
          pathLength="1"
        />
        
        {/* Node 3 */}
        <circle 
          ref={addNodeRef} 
          className="circuit-loader__node" 
          cx="70" 
          cy="20" 
          r="4" 
        />
        
        {/* Path 3 */}
        <path 
          ref={addPathRef}
          className="circuit-loader__path" 
          d="M74 20 H 100"
          pathLength="1"
        />
        
        {/* Node 4 */}
        <circle 
          ref={addNodeRef} 
          className="circuit-loader__node" 
          cx="100" 
          cy="20" 
          r="4" 
        />
      </svg>
    </div>
  );
};

export default CircuitLoader;