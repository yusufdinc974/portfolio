import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import CircuitPath from '../../components/circuit/CircuitPath';
import CircuitNode from '../../components/circuit/CircuitNode';
import './ContactSection.scss';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null); // null, 'submitting', 'success', 'error'
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Track if fields have been touched
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if the field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Mark field as touched when blurred
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // Validate individual field
  const validateField = (name, value) => {
    let errors = { ...formErrors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Name is required';
        } else {
          delete errors.name;
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          errors.email = 'Invalid email address';
        } else {
          delete errors.email;
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          errors.message = 'Message is required';
        } else if (value.trim().length < 10) {
          errors.message = 'Message must be at least 10 characters';
        } else {
          delete errors.message;
        }
        break;
        
      default:
        break;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate all fields
  const validateForm = () => {
    const nameValid = validateField('name', formState.name);
    const emailValid = validateField('email', formState.email);
    const messageValid = validateField('message', formState.message);
    
    return nameValid && emailValid && messageValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true,
    });
    
    if (!validateForm()) {
      // Animate the form shake if validation fails
      gsap.to(formRef.current, {
        x: [-10, 10, -5, 5, 0],
        duration: 0.4,
        ease: "power2.out"
      });
      return;
    }
    
    setFormStatus('submitting');
    
    try {
      // Simulate form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setFormStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      
      // Reset to null after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      
      // Reset to null after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  // Animations on mount
  useEffect(() => {
    const section = sectionRef.current;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate section elements when they come into view
          gsap.fromTo(
            section.querySelectorAll('.form-group, .contact-title, .contact-subtitle, .circuit-node, .circuit-path'),
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              stagger: 0.1, 
              duration: 0.6, 
              ease: 'power2.out' 
            }
          );
          
          // Stop observing after animation
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    
    if (section) {
      observer.observe(section);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="container">
        <h2 className="contact-title">Let's Connect</h2>
        <p className="contact-subtitle">Send me a message and I'll respond as soon as possible</p>
        
        <div className="contact-container">
          <div className="circuit-decoration">
            <CircuitNode position="top-left" active={true} />
            <CircuitPath 
              start={{ x: 5, y: 5 }} 
              path="h 100 v 50 h 80" 
              animated={true}
              duration={1.5}
            />
            <CircuitNode position="mid-right" active={formStatus === 'success'} />
            <CircuitPath 
              start={{ x: 185, y: 55 }} 
              path="v 100 h -80 v 70" 
              animated={formStatus !== null}
              duration={1}
            />
            <CircuitNode position="bottom-left" active={formStatus === 'submitting'} />
          </div>
          
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="circuit-label">
                Name
                <CircuitNode position="label-node" small active={touched.name && !formErrors.name} />
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`circuit-input ${touched.name && formErrors.name ? 'error' : ''}`}
                disabled={formStatus === 'submitting' || formStatus === 'success'}
              />
              {touched.name && formErrors.name && (
                <span className="error-message">{formErrors.name}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="circuit-label">
                Email
                <CircuitNode position="label-node" small active={touched.email && !formErrors.email} />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`circuit-input ${touched.email && formErrors.email ? 'error' : ''}`}
                disabled={formStatus === 'submitting' || formStatus === 'success'}
              />
              {touched.email && formErrors.email && (
                <span className="error-message">{formErrors.email}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="circuit-label">
                Message
                <CircuitNode position="label-node" small active={touched.message && !formErrors.message} />
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`circuit-input ${touched.message && formErrors.message ? 'error' : ''}`}
                rows="5"
                disabled={formStatus === 'submitting' || formStatus === 'success'}
              ></textarea>
              {touched.message && formErrors.message && (
                <span className="error-message">{formErrors.message}</span>
              )}
            </div>
            
            <div className="form-submit">
              <button 
                type="submit" 
                className={`submit-button ${formStatus ? formStatus : ''}`}
                disabled={formStatus === 'submitting' || formStatus === 'success'}
              >
                {formStatus === 'submitting' ? (
                  <span className="button-text">
                    <span className="loading-dots">Sending</span>
                  </span>
                ) : formStatus === 'success' ? (
                  <span className="button-text">Message Sent!</span>
                ) : formStatus === 'error' ? (
                  <span className="button-text">Try Again</span>
                ) : (
                  <span className="button-text">Send Message</span>
                )}
                <CircuitNode position="button-node" active={formStatus === 'success'} />
              </button>
            </div>
            
            {formStatus === 'success' && (
              <div className="success-message">
                <CircuitNode position="success-node" active />
                <p>Thank you for reaching out! I'll get back to you soon.</p>
              </div>
            )}
            
            {formStatus === 'error' && (
              <div className="error-message-container">
                <CircuitNode position="error-node" active />
                <p>Something went wrong. Please try again later.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;