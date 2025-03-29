// src/components/circuit/CircuitBackground.jsx
import React, { useEffect, useRef } from 'react';

const CircuitBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    
    // Clear canvas
    ctx.fillStyle = '#0a1942';
    ctx.fillRect(0, 0, width, height);
    
    // Draw circuit lines
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1;
    
    // Draw some random circuit paths
    for (let i = 0; i < 15; i++) {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const endX = Math.random() * width;
      const endY = Math.random() * height;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      
      // Add node at the end of some paths
      if (Math.random() > 0.5) {
        ctx.beginPath();
        ctx.arc(endX, endY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#2de2e6';
        ctx.fill();
      }
    }
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="circuit-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.2
      }}
    />
  );
};

export default CircuitBackground;