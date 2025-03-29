import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Circuit path animation that illuminates a path
 * @param {string} selector - CSS selector for the path
 * @param {Object} options - Animation options
 */
export const illuminatePath = (selector, options = {}) => {
  const defaults = {
    duration: 1.5,
    delay: 0,
    ease: 'power2.out',
    repeat: 0,
    scrollTrigger: null,
  };
  
  const config = { ...defaults, ...options };
  
  return gsap.fromTo(
    selector,
    {
      strokeDashoffset: '100%',
      opacity: 0.3,
    },
    {
      strokeDashoffset: '0%',
      opacity: 1,
      duration: config.duration,
      delay: config.delay,
      ease: config.ease,
      repeat: config.repeat,
      scrollTrigger: config.scrollTrigger,
    }
  );
};

/**
 * Data packet animation that moves along a path
 * @param {string} selector - CSS selector for the data packet
 * @param {string} pathSelector - CSS selector for the path
 * @param {Object} options - Animation options
 */
export const animateDataPacket = (selector, pathSelector, options = {}) => {
  const defaults = {
    duration: 2,
    delay: 0,
    easing: 'linear',
    loop: false,
  };
  
  const config = { ...defaults, ...options };
  
  const path = document.querySelector(pathSelector);
  
  if (!path) return null;
  
  return anime({
    targets: selector,
    translateX: (el) => {
      return anime.setDashoffset(path) - path.getTotalLength();
    },
    translateY: (el) => {
      return anime.setDashoffset(path) - path.getTotalLength();
    },
    easing: config.easing,
    duration: config.duration,
    delay: config.delay,
    loop: config.loop,
    autoplay: true,
  });
};

/**
 * Circuit node pulse animation
 * @param {string} selector - CSS selector for the node
 * @param {Object} options - Animation options
 */
export const pulseNode = (selector, options = {}) => {
  const defaults = {
    scale: 1.3,
    duration: 0.5,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true,
  };
  
  const config = { ...defaults, ...options };
  
  return gsap.to(selector, {
    scale: config.scale,
    boxShadow: `0 0 10px ${config.glowColor || '#00f0ff'}`,
    duration: config.duration,
    ease: config.ease,
    repeat: config.repeat,
    yoyo: config.yoyo,
  });
};

/**
 * Type-writer text animation
 * @param {string} selector - CSS selector for the text element
 * @param {string} text - Text to type
 * @param {Object} options - Animation options
 */
export const typeText = (selector, text, options = {}) => {
  const defaults = {
    duration: 50, // per character
    delay: 0,
    cursor: true,
  };
  
  const config = { ...defaults, ...options };
  const element = document.querySelector(selector);
  
  if (!element) return null;
  
  // Clear existing text
  element.textContent = '';
  
  // Create cursor element if needed
  let cursor;
  if (config.cursor) {
    cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');
    cursor.textContent = '|';
    element.appendChild(cursor);
    
    // Animate cursor blink
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
    });
  }
  
  // Type text animation
  return new Promise((resolve) => {
    let charIndex = 0;
    const typeNextChar = () => {
      if (charIndex < text.length) {
        const char = text.charAt(charIndex);
        const charElement = document.createElement('span');
        charElement.textContent = char;
        element.insertBefore(charElement, cursor || null);
        
        charIndex++;
        setTimeout(typeNextChar, config.duration);
      } else {
        resolve();
      }
    };
    
    setTimeout(typeNextChar, config.delay);
  });
};

/**
 * Fade in animation triggered by scroll
 * @param {string} selector - CSS selector
 * @param {Object} options - Animation options
 */
export const fadeInOnScroll = (selector, options = {}) => {
  const defaults = {
    y: 50,
    duration: 0.8,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out',
    start: 'top 80%',
    markers: false,
  };
  
  const config = { ...defaults, ...options };
  
  return gsap.from(selector, {
    y: config.y,
    duration: config.duration,
    opacity: config.opacity,
    stagger: config.stagger,
    ease: config.ease,
    scrollTrigger: {
      trigger: selector,
      start: config.start,
      markers: config.markers,
    },
  });
};

/**
 * Initialize all page animations
 */
export const initPageAnimations = () => {
  // Fade in sections on scroll
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    fadeInOnScroll(section, {
      y: 30,
      opacity: 0,
      duration: 1,
    });
  });
  
  // Illuminate circuit paths
  const circuitPaths = document.querySelectorAll('.circuit-path');
  circuitPaths.forEach((path, index) => {
    illuminatePath(path, {
      duration: 2,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: path,
        start: 'top 80%',
      },
    });
  });
  
  // Pulse circuit nodes
  const circuitNodes = document.querySelectorAll('.circuit-node');
  circuitNodes.forEach((node, index) => {
    pulseNode(node, {
      delay: index * 0.2,
      glowColor: index % 2 === 0 ? '#00f0ff' : '#2de2e6',
    });
  });
};

export default {
  illuminatePath,
  animateDataPacket,
  pulseNode,
  typeText,
  fadeInOnScroll,
  initPageAnimations,
};