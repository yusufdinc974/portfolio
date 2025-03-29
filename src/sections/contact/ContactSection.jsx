import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';
import CircuitPath from '../../components/circuit/CircuitPath';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'New Portfolio Contact Form Message'
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null); // null, 'submitting', 'success', 'error'
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Track if fields have been touched
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  // EmailJS configuration constants
  // These will need to be replaced with your actual EmailJS details
  const EMAILJS_SERVICE_ID = 'service_4usss6b'; // Replace with your Service ID
  const EMAILJS_TEMPLATE_ID = 'template_xng2tve'; // Replace with your Template ID
  const EMAILJS_PUBLIC_KEY = 'n1DCLgBQnMnhtY92Q'; // Replace with your Public Key

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

  // Initialize EmailJS
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

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
      // Send the email using EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('Email successfully sent!', result.text);
      
      // Success
      setFormStatus('success');
      setFormState({ 
        name: '', 
        email: '', 
        message: '',
        subject: 'New Portfolio Contact Form Message'
      });
      setTouched({ name: false, email: false, message: false });
      
      // Reset to null after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
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
            section.querySelectorAll('.form-group, .contact-title, .contact-subtitle, .circuit-path'),
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
            <CircuitPath 
              d="M5,5 H 100 V 50 H 180" 
              animated={true}
              duration={1.5}
            />
            <CircuitPath 
              d="M185,55 V 155 H 100 V 225" 
              animated={formStatus !== null}
              duration={1}
            />
          </div>
          
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="form-group">
              <label htmlFor="name" className="circuit-label">
                Name
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
            
            {/* Email field */}
            <div className="form-group">
              <label htmlFor="email" className="circuit-label">
                Email
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
            
            {/* Hidden subject field for email template */}
            <input 
              type="hidden" 
              name="subject" 
              value={formState.subject} 
            />
            
            {/* Message field */}
            <div className="form-group">
              <label htmlFor="message" className="circuit-label">
                Message
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
            
            {/* Submit button */}
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
              </button>
            </div>
            
            {/* Success message */}
            {formStatus === 'success' && (
              <div className="success-message">
                <p>Thank you for reaching out! I'll get back to you soon.</p>
              </div>
            )}
            
            {/* Error message */}
            {formStatus === 'error' && (
              <div className="error-message-container">
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