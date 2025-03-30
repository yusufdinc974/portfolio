// src/sections/hero/HeroAnimation.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroAnimation = () => {
  const containerRef = useRef(null);
  const cpuRef = useRef(null);
  const pathRefs = useRef([]);
  const packetRefs = useRef([]);
  const [hoveredElement, setHoveredElement] = useState(null);
  const timelineRef = useRef(null);
  
  // Reset refs on each render
  pathRefs.current = [];
  packetRefs.current = [];
  
  // Helper to add refs to arrays
  const addPathRef = (el) => el && pathRefs.current.push(el);
  const addPacketRef = (el) => el && packetRefs.current.push(el);
  
  // Create paths that connect to the CPU
  const circuitPaths = [
    // Left side paths - connect to exact corners
    { id: "path-left-1", d: "M0,190 H180 V220 H210", animDelay: 0.2 },
    { id: "path-left-2", d: "M0,240 H170 V260 H210", animDelay: 0.6 },
    { id: "path-left-3", d: "M0,280 H190 V270 H210", animDelay: 0.4 },
    
    // Right side paths - connect to exact corners
    { id: "path-right-1", d: "M500,190 H320 V220 H290", animDelay: 0.3 },
    { id: "path-right-2", d: "M500,240 H330 V260 H290", animDelay: 0.7 },
    { id: "path-right-3", d: "M500,280 H310 V270 H290", animDelay: 0.5 },
    
    // Top paths - symmetrically positioned
    { id: "path-top-1", d: "M225,0 V120 H225 V210", animDelay: 0.2 },
    { id: "path-top-2", d: "M250,0 V100 H250 V210", animDelay: 0.6 },
    { id: "path-top-3", d: "M275,0 V80 H275 V210", animDelay: 0.4 },
    
    // Bottom paths - symmetrically positioned
    { id: "path-bottom-1", d: "M225,500 V360 H225 V290", animDelay: 0.3 },
    { id: "path-bottom-2", d: "M250,500 V380 H250 V290", animDelay: 0.5 },
    { id: "path-bottom-3", d: "M275,500 V350 H275 V290", animDelay: 0.7 }
  ];
  
  // Data packets that flow along the traces
  const dataPackets = [
    { pathId: "path-left-1", size: 4, color: "#ffffff", speed: 3 },
    { pathId: "path-right-1", size: 4, color: "#ffffff", speed: 4 },
    { pathId: "path-top-2", size: 4, color: "#ffffff", speed: 5 },
    { pathId: "path-bottom-2", size: 4, color: "#ffffff", speed: 3.5 }
  ];
  
  // CPU grid pattern - for the inner grid of the CPU
  const gridLines = [];
  // Use the exact center for calculations
  const cpuLeft = 250 - 40; // center - half width
  const cpuRight = 250 + 40; // center + half width
  
  for (let i = 0; i < 3; i++) {
    // Horizontal grid lines
    gridLines.push({
      id: `h-grid-${i}`,
      d: `M${cpuLeft},${210 + i * 20} H${cpuRight}`,
      strokeWidth: 1,
      color: "rgba(0, 240, 255, 0.5)"
    });
    
    // Vertical grid lines - evenly spaced within CPU
    gridLines.push({
      id: `v-grid-${i}`,
      d: `M${cpuLeft + 20 + i * 20},210 V290`,
      strokeWidth: 1,
      color: "rgba(0, 240, 255, 0.5)"
    });
  }
  
  // Handle CPU hover effect
  const handleCpuHover = (isHovering) => {
    if (isHovering) {
      setHoveredElement('cpu');
      gsap.to(cpuRef.current, { 
        boxShadow: '0 0 15px rgba(0, 240, 255, 0.8)',
        backgroundColor: 'rgba(0, 240, 255, 0.15)',
        duration: 0.3 
      });
      gsap.to('.cpu-corner', { opacity: 0.9, duration: 0.3 });
      
      // Make all connected paths glow
      pathRefs.current.forEach(path => {
        gsap.to(path, { 
          stroke: '#00ffff', 
          strokeWidth: 2.5, 
          filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))',
          duration: 0.3 
        });
      });
    } else {
      setHoveredElement(null);
      gsap.to(cpuRef.current, { 
        boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
        backgroundColor: 'rgba(0, 240, 255, 0.08)',
        duration: 0.3 
      });
      gsap.to('.cpu-corner', { opacity: 0.7, duration: 0.3 });
      
      // Reset path styling
      pathRefs.current.forEach(path => {
        gsap.to(path, { 
          stroke: '#00f0ff', 
          strokeWidth: 2, 
          filter: 'drop-shadow(0 0 3px rgba(0, 240, 255, 0.5))',
          duration: 0.3 
        });
      });
    }
  };
  
  // Initialize animation when component mounts
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create the main animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    timelineRef.current = tl;
    
    // Initialize CPU with scale 0
    tl.set(cpuRef.current, { scale: 0, opacity: 0 });
    
    // Initialize all paths with dash offset
    pathRefs.current.forEach(path => {
      const length = path.getTotalLength ? path.getTotalLength() : 1000;
      gsap.set(path, { 
        strokeDasharray: length,
        strokeDashoffset: length
      });
    });
    
    // Initialize all packets as invisible
    packetRefs.current.forEach(packet => {
      gsap.set(packet, { opacity: 0 });
    });
    
    // Animate CPU appearing
    tl.to(cpuRef.current, { 
      scale: 1, 
      opacity: 1, 
      duration: 0.8, 
      ease: "elastic.out(1, 0.5)" 
    });
    
    // Animate grid lines appearing (staggered)
    tl.to('.grid-line', { 
      opacity: 0.7, 
      duration: 0.5, 
      stagger: 0.05 
    }, "-=0.4");
    
    // Animate CPU corners
    tl.to('.cpu-corner', { 
      scale: 1, 
      opacity: 0.7, 
      duration: 0.5, 
      stagger: 0.1 
    }, "-=0.3");
    
    // Animate paths drawing in (staggered by their delay values)
    circuitPaths.forEach((path, index) => {
      const pathElement = document.getElementById(path.id);
      if (pathElement && pathElement.getTotalLength) {
        const length = pathElement.getTotalLength();
        tl.to(pathElement, { 
          strokeDashoffset: 0, 
          duration: 1.2, 
          ease: "power2.inOut" 
        }, 0.7 + path.animDelay);
      }
    });
    
    // Animate data packets
    setTimeout(() => {
      packetRefs.current.forEach((packet, index) => {
        const speed = dataPackets[index].speed;
        const pathElement = document.getElementById(dataPackets[index].pathId);
        
        if (pathElement && pathElement.getTotalLength) {
          // Use fallback animation method (linear animation)
          gsap.set(packet, { 
            opacity: 1,
            x: 0,
            y: 0
          });
          
          // Extract start and end points from the path
          const pathData = circuitPaths.find(p => p.id === dataPackets[index].pathId)?.d;
          if (pathData) {
            const segments = pathData.split(' ');
            // Get start point (after 'M')
            const startSegment = segments[0].replace('M', '').split(',');
            // Get end point (last segment)
            const endSegment = segments[segments.length - 1].split(',');
            
            if (startSegment.length === 2 && endSegment.length === 2) {
              const startX = parseFloat(startSegment[0]);
              const startY = parseFloat(startSegment[1]);
              const endX = parseFloat(endSegment[0]);
              const endY = parseFloat(endSegment[1]);
              
              // Position packet at start point
              gsap.set(packet, {
                x: startX,
                y: startY
              });
              
              // Animate to end point and repeat
              gsap.to(packet, {
                x: endX,
                y: endY,
                duration: speed,
                repeat: -1,
                yoyo: true,
                ease: "none"
              });
            }
          }
        }
      });
    }, 2500);
    
    // Add permanent animations
    gsap.to(cpuRef.current, {
      boxShadow: "0 0 15px rgba(0, 240, 255, 0.8)",
      repeat: -1,
      yoyo: true,
      duration: 2
    });
    
    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      gsap.killTweensOf(cpuRef.current);
      gsap.killTweensOf(pathRefs.current);
      gsap.killTweensOf(packetRefs.current);
    };
  }, []);
  
  // Render data packets function
  const renderDataPackets = () => {
    return dataPackets.map((packet, index) => (
      <div
        key={`packet-${index}`}
        ref={addPacketRef}
        className="data-packet"
        style={{
          position: 'absolute',
          width: `${packet.size}px`,
          height: `${packet.size}px`,
          backgroundColor: packet.color,
          borderRadius: '50%',
          boxShadow: `0 0 8px ${packet.color}`,
          zIndex: 10
        }}
      />
    ));
  };
  
  return (
    <div 
      ref={containerRef} 
      className="hero-animation"
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative',
        maxWidth: '600px',
        maxHeight: '500px',
        margin: '0 auto',
        overflow: 'visible'
      }}
    >
      {/* SVG Layer for Paths */}
      <svg 
        className="circuit-paths-svg" 
        width="100%" 
        height="100%" 
        viewBox="0 0 500 500" 
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Render all circuit paths */}
        {circuitPaths.map((path, index) => (
          <path
            key={path.id}
            id={path.id}
            ref={addPathRef}
            d={path.d}
            stroke="#00f0ff"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 3px rgba(0, 240, 255, 0.5))'
            }}
          />
        ))}
        
        {/* Grid lines inside CPU */}
        {gridLines.map((line) => (
          <path
            key={line.id}
            id={line.id}
            className="grid-line"
            d={line.d}
            stroke={line.color}
            strokeWidth={line.strokeWidth}
            fill="none"
            opacity={0}
          />
        ))}
      </svg>
      
      {/* CPU Rectangle */}
      <div
        ref={cpuRef}
        className="cpu-component"
        style={{
          position: 'absolute',
          top: '210px',
          left: 'calc(50% - 40px)',  // Center precisely (50% - half of width)
          width: '80px',
          height: '80px',
          borderRadius: '3px',
          backgroundColor: 'rgba(0, 240, 255, 0.08)',
          border: '1.5px solid #00f0ff',
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
          zIndex: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          transformOrigin: 'center center'
        }}
        onMouseEnter={() => handleCpuHover(true)}
        onMouseLeave={() => handleCpuHover(false)}
      >
        {/* CPU Text */}
        <div style={{ 
          fontSize: '16px', 
          fontWeight: 'bold', 
          color: '#00f0ff',
          textShadow: '0 0 5px rgba(0, 240, 255, 0.8)'
        }}>
          CPU
        </div>
        
        {/* CPU Corners */}
        <div className="cpu-corner" style={{
          position: 'absolute',
          top: '-5px',
          left: '-5px',
          width: '10px',
          height: '10px',
          borderTop: '2px solid #00f0ff',
          borderLeft: '2px solid #00f0ff',
          opacity: 0,
          transform: 'scale(0)'
        }}></div>
        <div className="cpu-corner" style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          width: '10px',
          height: '10px',
          borderTop: '2px solid #00f0ff',
          borderRight: '2px solid #00f0ff',
          opacity: 0,
          transform: 'scale(0)'
        }}></div>
        <div className="cpu-corner" style={{
          position: 'absolute',
          bottom: '-5px',
          left: '-5px',
          width: '10px',
          height: '10px',
          borderBottom: '2px solid #00f0ff',
          borderLeft: '2px solid #00f0ff',
          opacity: 0,
          transform: 'scale(0)'
        }}></div>
        <div className="cpu-corner" style={{
          position: 'absolute',
          bottom: '-5px',
          right: '-5px',
          width: '10px',
          height: '10px',
          borderBottom: '2px solid #00f0ff',
          borderRight: '2px solid #00f0ff',
          opacity: 0,
          transform: 'scale(0)'
        }}></div>
      </div>
      
      {/* Data Packets */}
      {renderDataPackets()}
    </div>
  );
};

export default HeroAnimation;