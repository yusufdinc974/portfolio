import React, { useEffect, useRef } from 'react';

const CircuitBoard = ({ width = '100%', height = '100%', density = 5, className = '', style = {} }) => {
  const boardRef = useRef(null);
  
  useEffect(() => {
    if (!boardRef.current) return;
    
    const container = boardRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);
    svg.setAttribute('class', 'circuit-board-svg');
    
    // Function to create circuit paths
    const createCircuitPath = (startX, startY, endX, endY, hasCorners = true) => {
      // Direct line
      if (!hasCorners) {
        return `M${startX},${startY} L${endX},${endY}`;
      }
      
      // Line with corners (horizontal then vertical)
      return `M${startX},${startY} H${endX} V${endY}`;
    };
    
    // Generate random circuit paths
    const numPaths = Math.min(Math.max(density, 1), 10); // Clamp between 1-10
    const pathLength = Math.min(containerWidth, containerHeight) * 0.7;
    
    for (let i = 0; i < numPaths; i++) {
      // Create nodes
      const nodes = [];
      const numNodes = 2 + Math.floor(Math.random() * 3); // 2-4 nodes per path
      
      for (let j = 0; j < numNodes; j++) {
        nodes.push({
          x: Math.floor(Math.random() * containerWidth),
          y: Math.floor(Math.random() * containerHeight)
        });
      }
      
      // Connect nodes with paths
      for (let j = 0; j < nodes.length - 1; j++) {
        const startX = nodes[j].x;
        const startY = nodes[j].y;
        const endX = nodes[j + 1].x;
        const endY = nodes[j + 1].y;
        
        // Decide if path has corners (80% chance)
        const hasCorners = Math.random() < 0.8;
        
        // Create path element
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', createCircuitPath(startX, startY, endX, endY, hasCorners));
        path.setAttribute('stroke', '#00f0ff');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('class', 'circuit-path');
        
        // Animation properties
        const pathLength = path.getTotalLength ? path.getTotalLength() : 500;
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        path.style.animation = `circuit-reveal ${1 + Math.random()}s ease forwards ${Math.random() * 2}s`;
        
        svg.appendChild(path);
      }
      
      // Add nodes
      nodes.forEach((node, j) => {
        if (Math.random() < 0.7) { // 70% chance of having a node
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('cx', node.x);
          circle.setAttribute('cy', node.y);
          circle.setAttribute('r', '4');
          circle.setAttribute('fill', '#2de2e6');
          circle.setAttribute('class', 'circuit-node');
          
          svg.appendChild(circle);
        }
      });
    }
    
    // Add to container
    container.appendChild(svg);
    
    // Add animation keyframes
    if (!document.getElementById('circuit-keyframes')) {
      const style = document.createElement('style');
      style.id = 'circuit-keyframes';
      style.textContent = `
        @keyframes circuit-reveal {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes node-pulse {
          0% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(0, 240, 255, 0.5)); }
          50% { transform: scale(1.3); filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.8)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(0, 240, 255, 0.5)); }
        }
        
        .circuit-node {
          animation: node-pulse 3s infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      if (container.contains(svg)) {
        container.removeChild(svg);
      }
    };
  }, [density]);
  
  return (
    <div
      ref={boardRef}
      className={`circuit-board ${className}`}
      style={{ width, height, overflow: 'hidden', position: 'relative', ...style }}
    />
  );
};

export default CircuitBoard;