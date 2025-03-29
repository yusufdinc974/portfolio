import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircuitBackground from '../../components/circuit/CircuitBackground';
import Bio from './bio'; // Ensure this matches the actual filename (case-sensitive)
import Timeline from './Timeline';
import Interests from './Interests';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Animation for the entire section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    
    // Adjust scroll behavior to account for fixed header
    const headerHeight = 80; // Adjust based on your header height
    
    // Add scroll-margin-top to account for fixed header
    sectionRef.current.style.scrollMarginTop = `${headerHeight}px`;
    
    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="section-content">
          <Bio />
          <Timeline />
          <Interests />
        </div>
      </div>
      <CircuitBackground variant="about" />
    </section>
  );
};

export default AboutSection;