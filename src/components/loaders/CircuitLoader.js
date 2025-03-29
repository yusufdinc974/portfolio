import React from 'react';
import './CircuitLoader.scss';

const CircuitLoader = () => {
  return (
    <div className="circuit-loader">
      <div className="loader-center"></div>
      <div className="loader-ring ring-1"></div>
      <div className="loader-ring ring-2"></div>
      <div className="loader-ring ring-3"></div>
      <div className="loader-node node-1"></div>
      <div className="loader-node node-2"></div>
      <div className="loader-node node-3"></div>
      <div className="loader-node node-4"></div>
      <div className="loader-pulse"></div>
    </div>
  );
};

export default CircuitLoader;