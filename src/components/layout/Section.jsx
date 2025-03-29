import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Section.scss';

const Section = forwardRef(({ 
  id, 
  className = '', 
  title, 
  subtitle,
  children,
  fullHeight = false
}, ref) => {
  return (
    <section 
      id={id} 
      ref={ref}
      className={`section ${className} ${fullHeight ? 'full-height' : ''}`}
    >
      <div className="container">
        {title && (
          <div className="section-header">
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="section-content">
          {children}
        </div>
      </div>
    </section>
  );
});

Section.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  fullHeight: PropTypes.bool
};

Section.displayName = 'Section';

export default Section;