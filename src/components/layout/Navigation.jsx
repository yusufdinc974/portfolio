import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__container">
          <a href="#" className="header__logo">
            <div className="circuit-icon">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="14" stroke="#00f0ff" strokeWidth="2" />
                <circle cx="15" cy="15" r="5" fill="#2de2e6" />
                <path d="M15 1V5" stroke="#00f0ff" strokeWidth="2" />
                <path d="M15 25V29" stroke="#00f0ff" strokeWidth="2" />
                <path d="M29 15H25" stroke="#00f0ff" strokeWidth="2" />
                <path d="M5 15H1" stroke="#00f0ff" strokeWidth="2" />
              </svg>
            </div>
            <span>Yusuf Dinç</span>
          </a>

          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#home" className="nav__link nav__link--active">Home</a>
              </li>
              <li className="nav__item">
                <a href="#about" className="nav__link">About</a>
              </li>
              <li className="nav__item">
                <a href="#projects" className="nav__link">Projects</a>
              </li>
              <li className="nav__item">
                <a href="#skills" className="nav__link">Skills</a>
              </li>
              <li className="nav__item">
                <a href="#contact" className="nav__link">Contact</a>
              </li>
            </ul>
          </nav>

          <button 
            className={`mobile-nav-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="mobile-nav-toggle__line"></span>
            <span className="mobile-nav-toggle__line"></span>
            <span className="mobile-nav-toggle__line"></span>
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav__list">
          <li className="mobile-nav__item">
            <a href="#home" className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          </li>
          <li className="mobile-nav__item">
            <a href="#about" className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          </li>
          <li className="mobile-nav__item">
            <a href="#projects" className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
          </li>
          <li className="mobile-nav__item">
            <a href="#skills" className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
          </li>
          <li className="mobile-nav__item">
            <a href="#contact" className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navigation;