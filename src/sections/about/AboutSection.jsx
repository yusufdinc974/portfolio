import React, { useEffect, useRef } from 'react';
import Bio from './bio';
import Timeline from './Timeline';
import Interests from './Interests';
import CircuitPath from '../../components/circuit/CircuitPath';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.scss';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Create timeline for section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'center center',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate section title
    tl.from('.about-title', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out'
    });

    // Clean up animation
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section id="about" className="section about-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title about-title">About Me</h2>
        
        <div className="about-content">
          <Bio />
          
          <div className="about-divider">
            <CircuitPath 
              d="M0,0 C100,0 100,50 200,50 C300,50 300,0 400,0"
              strokeWidth={2}
              color="var(--color-accent)"
              className="divider-path"
            />
          </div>
          
          <Timeline />
          
          <div className="about-divider">
            <CircuitPath 
              d="M400,0 C300,0 300,50 200,50 C100,50 100,0 0,0"
              strokeWidth={2}
              color="var(--color-accent)"
              className="divider-path"
            />
          </div>
          
          <Interests />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;