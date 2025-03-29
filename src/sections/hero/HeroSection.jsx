// src/sections/hero/HeroSection.jsx
import React, { useEffect, useRef } from 'react';
import HeroAnimation from './HeroAnimation';

const HeroSection = () => {
  const titleRef = useRef(null);
  
  useEffect(() => {
    if (!titleRef.current) return;
    
    const title = "Computer Engineer";
    titleRef.current.textContent = "";
    let i = 0;
    
    const typeInterval = setInterval(() => {
      if (i < title.length) {
        titleRef.current.textContent += title.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
    
    return () => clearInterval(typeInterval);
  }, []);
  
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h3 className="hero-greeting">Hello, I'm</h3>
            <h1 className="hero-name">Your Name</h1>
            <h2 className="hero-title" ref={titleRef}></h2>
            <p className="hero-subtitle">
              Building digital circuits and innovative software solutions
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn-primary">View My Work</a>
              <a href="#contact" className="btn-secondary">Contact Me</a>
            </div>
          </div>
          <div className="hero-visual">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;