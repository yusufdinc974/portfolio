// src/sections/hero/HeroAnimation.jsx
import React, { useEffect, useRef } from 'react';

const HeroAnimation = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.style.display = 'block';
    
    // Create CPU/Microprocessor
    const cpu = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    cpu.setAttribute('x', '150');
    cpu.setAttribute('y', '150');
    cpu.setAttribute('width', '100');
    cpu.setAttribute('height', '100');
    cpu.setAttribute('rx', '5');
    cpu.setAttribute('fill', 'rgba(0, 240, 255, 0.1)');
    cpu.setAttribute('stroke', '#00f0ff');
    cpu.setAttribute('stroke-width', '2');
    cpu.setAttribute('class', 'circuit-cpu');
    
    // Create CPU inner details
    const cpuInner = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    // Add grid lines inside CPU
    for (let i = 0; i < 3; i++) {
      const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      hLine.setAttribute('x1', '155');
      hLine.setAttribute('y1', (170 + i * 30).toString());
      hLine.setAttribute('x2', '245');
      hLine.setAttribute('y2', (170 + i * 30).toString());
      hLine.setAttribute('stroke', '#00f0ff');
      hLine.setAttribute('stroke-width', '1');
      hLine.setAttribute('opacity', '0.7');
      cpuInner.appendChild(hLine);
      
      const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      vLine.setAttribute('x1', (170 + i * 30).toString());
      vLine.setAttribute('y1', '155');
      vLine.setAttribute('x2', (170 + i * 30).toString());
      vLine.setAttribute('y2', '245');
      vLine.setAttribute('stroke', '#00f0ff');
      vLine.setAttribute('stroke-width', '1');
      vLine.setAttribute('opacity', '0.7');
      cpuInner.appendChild(vLine);
    }
    
    // Create circuit traces
    const createCircuitTraces = () => {
      const traces = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      traces.setAttribute('class', 'circuit-traces');
      
      // Add paths connecting to CPU
      const paths = [
        // Left side paths
        { x1: 0, y1: 130, x2: 150, y2: 170 },
        { x1: 0, y1: 180, x2: 150, y2: 200 },
        { x1: 0, y1: 230, x2: 150, y2: 230 },
        
        // Right side paths
        { x1: 400, y1: 150, x2: 250, y2: 180 },
        { x1: 400, y1: 200, x2: 250, y2: 210 },
        { x1: 400, y1: 250, x2: 250, y2: 240 },
        
        // Top paths
        { x1: 130, y1: 0, x2: 170, y2: 150 },
        { x1: 200, y1: 0, x2: 200, y2: 150 },
        { x1: 270, y1: 0, x2: 230, y2: 150 },
        
        // Bottom paths
        { x1: 160, y1: 400, x2: 180, y2: 250 },
        { x1: 230, y1: 400, x2: 220, y2: 250 }
      ];
      
      paths.forEach((path, index) => {
        const trace = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Create corner paths with horizontal then vertical lines
        let d;
        if (path.x1 < path.x2 && path.y1 !== path.y2) { // Left to right
          const mid = path.x1 + (path.x2 - path.x1) * 0.7;
          d = `M${path.x1},${path.y1} H${mid} V${path.y2} H${path.x2}`;
        } else if (path.x1 > path.x2 && path.y1 !== path.y2) { // Right to left
          const mid = path.x1 - (path.x1 - path.x2) * 0.7;
          d = `M${path.x1},${path.y1} H${mid} V${path.y2} H${path.x2}`;
        } else if (path.y1 < path.y2) { // Top to bottom
          const mid = path.y1 + (path.y2 - path.y1) * 0.7;
          d = `M${path.x1},${path.y1} V${mid} H${path.x2} V${path.y2}`;
        } else { // Bottom to top
          const mid = path.y1 - (path.y1 - path.y2) * 0.7;
          d = `M${path.x1},${path.y1} V${mid} H${path.x2} V${path.y2}`;
        }
        
        trace.setAttribute('d', d);
        trace.setAttribute('fill', 'none');
        trace.setAttribute('stroke', '#00f0ff');
        trace.setAttribute('stroke-width', '2');
        trace.setAttribute('stroke-opacity', '0.8');
        trace.setAttribute('class', `circuit-trace trace-${index}`);
        
        // Animation properties for each path
        const length = 1000; // Approximate path length
        trace.style.strokeDasharray = length;
        trace.style.strokeDashoffset = length;
        trace.style.animation = `circuit-trace-reveal 2s forwards ${index * 0.2}s ease-out`;
        
        traces.appendChild(trace);
        
        // Add nodes at some trace intersections
        if (index % 2 === 0) {
          const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          node.setAttribute('cx', path.x2);
          node.setAttribute('cy', path.y2);
          node.setAttribute('r', '4');
          node.setAttribute('fill', '#2de2e6');
          node.setAttribute('class', `circuit-node node-${index}`);
          traces.appendChild(node);
        }
      });
      
      return traces;
    };
    
    // Add data packets that flow along the traces
    const createDataPackets = () => {
      const packets = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      packets.setAttribute('class', 'data-packets');
      
      // Add a few data packets on select paths
      const packetPaths = [0, 3, 6, 9];
      
      packetPaths.forEach((pathIndex) => {
        const packet = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        packet.setAttribute('r', '3');
        packet.setAttribute('fill', '#ffffff');
        packet.setAttribute('class', `data-packet packet-${pathIndex}`);
        packet.style.animation = `data-flow-${pathIndex} 3s infinite ${Math.random() * 2}s linear`;
        packets.appendChild(packet);
      });
      
      return packets;
    };
    
    // Append all elements to SVG
    svg.appendChild(createCircuitTraces());
    svg.appendChild(cpu);
    svg.appendChild(cpuInner);
    svg.appendChild(createDataPackets());
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes circuit-trace-reveal {
        to { 
          stroke-dashoffset: 0; 
        }
      }
      
      @keyframes data-flow-0 {
        0% { transform: translate(0, 130px); }
        100% { transform: translate(150px, 170px); }
      }
      
      @keyframes data-flow-3 {
        0% { transform: translate(400px, 150px); }
        100% { transform: translate(250px, 180px); }
      }
      
      @keyframes data-flow-6 {
        0% { transform: translate(130px, 0); }
        100% { transform: translate(170px, 150px); }
      }
      
      @keyframes data-flow-9 {
        0% { transform: translate(160px, 400px); }
        100% { transform: translate(180px, 250px); }
      }
      
      .circuit-cpu {
        animation: pulse 3s infinite;
      }
      
      .circuit-node {
        animation: node-pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% { filter: drop-shadow(0 0 3px rgba(0, 240, 255, 0.5)); }
        50% { filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.8)); }
        100% { filter: drop-shadow(0 0 3px rgba(0, 240, 255, 0.5)); }
      }
      
      @keyframes node-pulse {
        0% { r: 4; fill: #2de2e6; }
        50% { r: 6; fill: #00f0ff; }
        100% { r: 4; fill: #2de2e6; }
      }
    `;
    
    document.head.appendChild(style);
    container.appendChild(svg);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative',
        maxWidth: '500px',
        maxHeight: '400px',
        margin: '0 auto'
      }}
    />
  );
};

export default HeroAnimation;