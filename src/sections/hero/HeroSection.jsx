// src/sections/hero/HeroSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import HeroAnimation from './HeroAnimation';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Array of tech terms for rotation in subtitle
  const techTerms = [
    "digital circuits",
    "my own projects",
    "innovative software",
    "hardware solutions",
    "cutting-edge tech"
  ];
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Initialize typewriter animation once component mounts
  useEffect(() => {
    if (!titleRef.current || hasAnimated) return;
    
    const tl = gsap.timeline({ 
      defaults: { ease: "power2.out" },
      onComplete: () => setHasAnimated(true)
    });
    
    // Animate greeting appearing
    tl.fromTo(greetingRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );
    
    // Animate name appearing
    tl.fromTo(nameRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      "-=0.4"
    );
    
    // Typing effect for title
    tl.fromTo(titleRef.current,
      { text: "", opacity: 1 },
      { 
        text: "Computer Engineering Student", 
        duration: 1.2, 
        ease: "none"
      },
      "+=0.3"
    );
    
    // Fade in subtitle
    tl.fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      "+=0.2"
    );
    
    // Staggered buttons appearance
    tl.fromTo(buttonsRef.current.children,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2, 
        duration: 0.5
      },
      "-=0.3"
    );
    
    // Set up tech terms rotation after initial animation
    let termIndex = 0;
    const rotateTerms = () => {
      const termElements = document.querySelectorAll('.rotating-term');
      if (termElements.length === 0) return;
      
      // Fade out current term
      gsap.to(termElements[0], {
        opacity: 0,
        y: -10,
        duration: 0.5,
        onComplete: () => {
          // Update term and fade in
          termIndex = (termIndex + 1) % techTerms.length;
          termElements[0].textContent = techTerms[termIndex];
          gsap.to(termElements[0], {
            opacity: 1,
            y: 0,
            duration: 0.5
          });
        }
      });
    };
    
    // Start rotation after initial animation
    const rotationInterval = setInterval(rotateTerms, 3000);
    
    return () => clearInterval(rotationInterval);
  }, [hasAnimated]);
  
  // Handle parallax effect on scroll
  useEffect(() => {
    if (!sectionRef.current || isMobile) return;
    
    const section = sectionRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Only apply parallax effect when section is in view
      if (scrollPosition >= sectionTop - window.innerHeight && 
          scrollPosition <= sectionTop + sectionHeight) {
        
        const parallaxOffset = (scrollPosition - sectionTop) * 0.4;
        
        // Apply subtle parallax to text elements
        gsap.to(greetingRef.current, { y: parallaxOffset * 0.1, duration: 0.2 });
        gsap.to(nameRef.current, { y: parallaxOffset * 0.15, duration: 0.2 });
        gsap.to(titleRef.current, { y: parallaxOffset * 0.2, duration: 0.2 });
        gsap.to(subtitleRef.current, { y: parallaxOffset * 0.25, duration: 0.2 });
        gsap.to(buttonsRef.current, { y: parallaxOffset * 0.3, duration: 0.2 });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  return (
    <section id="home" className="hero-section" ref={sectionRef}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h3 className="hero-greeting" ref={greetingRef}>Hello, I'm</h3>
            <h1 className="hero-name" ref={nameRef}>Yusuf</h1>
            <h2 className="hero-title" ref={titleRef}></h2>
            <p className="hero-subtitle" ref={subtitleRef}>
              Building <span className="rotating-term text-electric">{techTerms[0]}</span> with innovative ideas!
            </p>
            <div className="hero-buttons" ref={buttonsRef}>
              <a href="#projects" className="btn-primary">
                View My Work
                <span className="btn-glow"></span>
              </a>
              <a href="#contact" className="btn-secondary">
                Contact Me
              </a>
            </div>
          </div>
          <div className="hero-visual">
            {!isMobile && <HeroAnimation />}
            {isMobile && (
              <div className="mobile-hero-placeholder">
                {/* Mobile view - animation removed */}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Adding a subtle scroll indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="scroll-arrows">
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;