import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircuitNode from '../../components/circuit/CircuitNode';
import CircuitPath from '../../components/circuit/CircuitPath';
import './SkillCircuitGraph.scss';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SkillCircuitGraph = ({ skills }) => {
  const graphRef = useRef(null);
  const centerNodeRef = useRef(null);
  const nodeRefs = useRef({});
  const pathRefs = useRef({});
  const [activeSkill, setActiveSkill] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize node refs
  useEffect(() => {
    skills.forEach(category => {
      category.items.forEach(skill => {
        nodeRefs.current[skill.id] = React.createRef();
        pathRefs.current[skill.id] = React.createRef();
      });
    });
  }, [skills]);

  // Calculate positions for nodes
  const calculateNodePositions = () => {
    // Get container dimensions
    const container = graphRef.current;
    if (!container) return {};
    
    const { width, height } = container.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;
    
    const positions = {};
    const totalCategories = skills.length;
    let currentSkillIndex = 0;
    let totalSkills = 0;
    
    // Count total skills
    skills.forEach(category => {
      totalSkills += category.items.length;
    });
    
    // Calculate positions for each skill node
    skills.forEach((category, categoryIndex) => {
      // Calculate category angle slice
      const categoryAngleStart = (categoryIndex / totalCategories) * 2 * Math.PI;
      const categoryAngleEnd = ((categoryIndex + 1) / totalCategories) * 2 * Math.PI;
      
      category.items.forEach((skill, skillIndex) => {
        // Calculate radius based on skill level
        const baseRadius = Math.min(width, height) * 0.35;
        const levelFactor = skill.level / 100;
        const radius = baseRadius * (0.5 + levelFactor * 0.5);
        
        // Calculate angle within category slice
        const angleStep = (categoryAngleEnd - categoryAngleStart) / category.items.length;
        const angle = categoryAngleStart + angleStep * (skillIndex + 0.5);
        
        // Calculate position
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        positions[skill.id] = { x, y, categoryIndex, currentSkillIndex };
        currentSkillIndex++;
      });
    });
    
    return { positions, centerX, centerY };
  };

  // Generate SVG paths between center and nodes
  const generatePaths = (positions, centerX, centerY) => {
    return Object.entries(positions).map(([skillId, pos]) => {
      // Calculate control points for curved lines
      const dx = pos.x - centerX;
      const dy = pos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Adjust curve intensity based on distance
      const curveIntensity = distance * 0.3;
      
      // Calculate control points perpendicular to the direct line
      const angle = Math.atan2(dy, dx);
      const perpAngle = angle + Math.PI / 2;
      
      const ctrl1x = centerX + distance * 0.33 * Math.cos(angle) + curveIntensity * Math.cos(perpAngle);
      const ctrl1y = centerY + distance * 0.33 * Math.sin(angle) + curveIntensity * Math.sin(perpAngle);
      
      const ctrl2x = centerX + distance * 0.66 * Math.cos(angle) - curveIntensity * Math.cos(perpAngle);
      const ctrl2y = centerY + distance * 0.66 * Math.sin(angle) - curveIntensity * Math.sin(perpAngle);
      
      return {
        id: skillId,
        d: `M ${centerX} ${centerY} C ${ctrl1x} ${ctrl1y}, ${ctrl2x} ${ctrl2y}, ${pos.x} ${pos.y}`,
        ref: pathRefs.current[skillId]
      };
    });
  };

  // Set up animations
  useEffect(() => {
    if (!graphRef.current) return;

    const { positions, centerX, centerY } = calculateNodePositions();
    const paths = generatePaths(positions, centerX, centerY);
    
    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: graphRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate center node
    tl.fromTo(
      centerNodeRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      0
    );
    
    // Animate paths and nodes
    Object.entries(positions).forEach(([skillId, pos], index) => {
      const node = nodeRefs.current[skillId].current;
      const path = pathRefs.current[skillId].current;
      
      if (node && path) {
        // Set initial positions
        gsap.set(node, { x: pos.x, y: pos.y, opacity: 0, scale: 0 });
        
        // Animate path drawing
        tl.fromTo(
          path,
          { strokeDashoffset: path.getTotalLength() },
          { 
            strokeDashoffset: 0, 
            duration: 0.8, 
            ease: "power2.inOut",
            delay: index * 0.05
          },
          0.3
        );
        
        // Animate node appearance
        tl.to(
          node,
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.5, 
            ease: "back.out(1.7)" 
          },
          0.5 + index * 0.07
        );
      }
    });
    
    // Clean up animations
    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, [skills, windowSize]);

  // Handle node hover
  const handleNodeHover = (skill) => {
    setActiveSkill(skill);
    
    // Highlight the active node and its path
    Object.entries(nodeRefs.current).forEach(([id, ref]) => {
      const node = ref.current;
      const path = pathRefs.current[id].current;
      
      if (node && path) {
        if (id === skill.id) {
          gsap.to(node, { scale: 1.3, duration: 0.3 });
          gsap.to(path, { 
            stroke: 'var(--color-accent)', 
            strokeWidth: 3, 
            duration: 0.3 
          });
        } else {
          gsap.to(node, { scale: 0.8, opacity: 0.5, duration: 0.3 });
          gsap.to(path, { 
            stroke: 'var(--color-circuit-path-dim)', 
            strokeWidth: 1.5, 
            duration: 0.3 
          });
        }
      }
    });
  };

  // Handle node unhover
  const handleNodeUnhover = () => {
    setActiveSkill(null);
    
    // Reset all nodes and paths
    Object.entries(nodeRefs.current).forEach(([id, ref]) => {
      const node = ref.current;
      const path = pathRefs.current[id].current;
      
      if (node && path) {
        gsap.to(node, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(path, { 
          stroke: 'var(--color-circuit-path)', 
          strokeWidth: 2, 
          duration: 0.3 
        });
      }
    });
  };

  // Find skill info by ID
  const findSkillById = (skillId) => {
    let foundSkill = null;
    skills.forEach(category => {
      category.items.forEach(skill => {
        if (skill.id === skillId) {
          foundSkill = { ...skill, category: category.name };
        }
      });
    });
    return foundSkill;
  };

  const { positions, centerX, centerY } = calculateNodePositions();
  const paths = generatePaths(positions, centerX, centerY);

  return (
    <div className="skill-circuit-graph" ref={graphRef}>
      {/* Center node */}
      <div 
        className="center-node" 
        ref={centerNodeRef} 
        style={{ left: '50%', top: '50%' }}
      >
        <div className="center-node-inner">
          <span>Core</span>
        </div>
      </div>
      
      {/* SVG layer for paths */}
      <svg className="circuit-paths">
        {paths.map(path => (
          <CircuitPath
            key={path.id}
            id={`path-${path.id}`}
            d={path.d}
            ref={path.ref}
            className="skill-path"
          />
        ))}
      </svg>
      
      {/* Skill nodes */}
      {skills.flatMap(category => 
        category.items.map(skill => {
          const position = positions[skill.id];
          return position ? (
            <div
              key={skill.id}
              className="skill-node-wrapper"
              style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseEnter={() => handleNodeHover(skill)}
              onMouseLeave={handleNodeUnhover}
            >
              <CircuitNode
                ref={nodeRefs.current[skill.id]}
                value={skill.level}
                label={skill.name}
                size={40 + (skill.level / 20)}
                color={`var(--color-category-${position.categoryIndex % 5})`}
              />
            </div>
          ) : null;
        })
      )}
      
      {/* Skill info tooltip */}
      {activeSkill && (
        <div className="skill-tooltip">
          <h4>{activeSkill.name}</h4>
          <p className="skill-category">{findSkillById(activeSkill.id)?.category}</p>
          <div className="skill-level">
            <div className="skill-level-bar">
              <div 
                className="skill-level-fill" 
                style={{ width: `${activeSkill.level}%` }}
              ></div>
            </div>
            <span>{activeSkill.level}%</span>
          </div>
          {activeSkill.description && (
            <p className="skill-description">{activeSkill.description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillCircuitGraph;