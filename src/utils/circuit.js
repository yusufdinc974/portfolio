/**
 * Utility functions for generating and manipulating circuit elements
 */

/**
 * Creates SVG path data for a circuit line
 * @param {number} startX - Start X coordinate
 * @param {number} startY - Start Y coordinate
 * @param {number} endX - End X coordinate
 * @param {number} endY - End Y coordinate
 * @param {boolean} hasCorners - Whether the path has 90° corners
 * @returns {string} SVG path data
 */
export const createCircuitPath = (startX, startY, endX, endY, hasCorners = true) => {
    if (!hasCorners) {
      // Direct line
      return `M${startX},${startY} L${endX},${endY}`;
    }
    
    // Line with corners (horizontal then vertical)
    return `M${startX},${startY} H${endX} V${endY}`;
  };
  
  /**
   * Generates a random circuit board pattern
   * @param {number} width - Width of the container
   * @param {number} height - Height of the container
   * @param {number} density - Number of paths to generate (1-10)
   * @param {boolean} randomStart - Whether to randomize starting points
   * @returns {Array} Array of path objects
   */
  export const generateCircuitPattern = (width, height, density = 5, randomStart = true) => {
    const paths = [];
    const nodes = [];
    const numPaths = Math.min(Math.max(density, 1), 10); // Clamp between 1-10
    
    // Create nodes
    const numNodes = numPaths * 2;
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
      });
    }
    
    // Create paths that connect nodes
    for (let i = 0; i < numPaths; i++) {
      const startIndex = i * 2;
      const endIndex = i * 2 + 1;
      
      const startX = randomStart ? nodes[startIndex].x : 0;
      const startY = randomStart ? nodes[startIndex].y : (height / numPaths) * i + height / (numPaths * 2);
      
      const endX = nodes[endIndex].x;
      const endY = nodes[endIndex].y;
      
      // Decide if path has corners (80% chance)
      const hasCorners = Math.random() < 0.8;
      
      // Add path, node data, and random ID
      paths.push({
        id: `circuit-path-${Math.random().toString(36).substr(2, 9)}`,
        d: createCircuitPath(startX, startY, endX, endY, hasCorners),
        hasNode: Math.random() < 0.7, // 70% chance of having a node
        nodeX: endX,
        nodeY: endY,
      });
    }
    
    return paths;
  };
  
  /**
   * Creates a circuit board SVG
   * @param {string} containerId - ID of the container element
   * @param {Object} options - Configuration options
   * @returns {SVGElement} The created SVG element
   */
  export const createCircuitBoard = (containerId, options = {}) => {
    const defaults = {
      width: 800,
      height: 600,
      density: 5,
      lineColor: '#00f0ff',
      nodeColor: '#2de2e6',
      backgroundColor: 'transparent',
      lineWidth: 2,
      nodeSize: 6,
    };
    
    const config = { ...defaults, ...options };
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`Container with ID "${containerId}" not found.`);
      return null;
    }
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', config.width);
    svg.setAttribute('height', config.height);
    svg.setAttribute('viewBox', `0 0 ${config.width} ${config.height}`);
    svg.setAttribute('class', 'circuit-board');
    
    // Add background if specified
    if (config.backgroundColor !== 'transparent') {
      const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      background.setAttribute('width', config.width);
      background.setAttribute('height', config.height);
      background.setAttribute('fill', config.backgroundColor);
      svg.appendChild(background);
    }
    
    // Generate circuit paths
    const circuitPaths = generateCircuitPattern(
      config.width,
      config.height,
      config.density,
      true
    );
    
    // Add paths to SVG
    circuitPaths.forEach((pathData) => {
      // Create path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData.d);
      path.setAttribute('stroke', config.lineColor);
      path.setAttribute('stroke-width', config.lineWidth);
      path.setAttribute('fill', 'none');
      path.setAttribute('id', pathData.id);
      path.setAttribute('class', 'circuit-path');
      
      // Calculate path length for animations
      path.style.strokeDasharray = path.getTotalLength();
      path.style.strokeDashoffset = path.getTotalLength();
      
      svg.appendChild(path);
      
      // Add node if needed
      if (pathData.hasNode) {
        const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        node.setAttribute('cx', pathData.nodeX);
        node.setAttribute('cy', pathData.nodeY);
        node.setAttribute('r', config.nodeSize);
        node.setAttribute('fill', config.nodeColor);
        node.setAttribute('class', 'circuit-node');
        svg.appendChild(node);
      }
    });
    
    // Add to container
    container.appendChild(svg);
    
    return svg;
  };
  
  /**
   * Creates a circuit line between two DOM elements
   * @param {string} startElementId - ID of the starting element
   * @param {string} endElementId - ID of the ending element
   * @param {Object} options - Configuration options
   */
  export const connectElementsWithCircuit = (startElementId, endElementId, options = {}) => {
    const defaults = {
      svgContainerId: 'circuit-connections',
      lineColor: '#00f0ff',
      lineWidth: 2,
      animate: true,
      animationDuration: 1.5,
    };
    
    const config = { ...defaults, ...options };
    
    // Get elements
    const startElement = document.getElementById(startElementId);
    const endElement = document.getElementById(endElementId);
    
    if (!startElement || !endElement) {
      console.error('Start or end element not found');
      return null;
    }
    
    // Get positions
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    
    // Calculate center points
    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    const endX = endRect.left + endRect.width / 2;
    const endY = endRect.top + endRect.height / 2;
    
    // Get or create SVG container
    let svgContainer = document.getElementById(config.svgContainerId);
    
    if (!svgContainer) {
      // Create full-page SVG overlay
      svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgContainer.setAttribute('id', config.svgContainerId);
      svgContainer.setAttribute('class', 'circuit-connections');
      svgContainer.style.position = 'absolute';
      svgContainer.style.top = '0';
      svgContainer.style.left = '0';
      svgContainer.style.width = '100%';
      svgContainer.style.height = '100%';
      svgContainer.style.pointerEvents = 'none';
      svgContainer.style.zIndex = '10';
      document.body.appendChild(svgContainer);
    }
    
    // Create circuit path
    const pathData = createCircuitPath(startX, startY, endX, endY, true);
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', config.lineColor);
    path.setAttribute('stroke-width', config.lineWidth);
    path.setAttribute('fill', 'none');
    path.setAttribute('class', 'circuit-connection');
    
    // Add animation properties if needed
    if (config.animate) {
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;
      path.style.transition = `stroke-dashoffset ${config.animationDuration}s ease`;
      
      // Trigger animation after a short delay
      setTimeout(() => {
        path.style.strokeDashoffset = '0';
      }, 100);
    }
    
    svgContainer.appendChild(path);
    
    return path;
  };
  
  export default {
    createCircuitPath,
    generateCircuitPattern,
    createCircuitBoard,
    connectElementsWithCircuit,
  };