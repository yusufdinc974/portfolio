import React, { useEffect, useRef, useState } from 'react';
import CircuitNode from '../../components/circuit/CircuitNode';
import CircuitPath from '../../components/circuit/CircuitPath';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactSection.scss';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!sectionRef.current) return;

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'center center',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate section title and content
    tl.from('.section-title', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      })
      .from('.contact-description', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.contact-methods', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.contact-form', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6');

    // Add entrance animations for form inputs
    gsap.from('.form-group', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Clean up
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('submitting');
    
    // Simulate form submission (replace with actual implementation)
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset form status after 5 seconds
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      } else {
        setFormStatus('error');
      }
    }, 1500);
  };

  return (
    <section id="contact" className="section contact-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Contact</h2>
        
        <div className="contact-description">
          <p>Let's connect! Whether you have a project in mind, a question about my work, or just want to say hello, I'd love to hear from you.</p>
        </div>
        
        <div className="contact-container">
          {/* Contact methods */}
          <div className="contact-sidebar">
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">
                  <CircuitNode size={36} color="var(--color-blue)" />
                  <i className="icon-email"></i>
                </div>
                <div className="method-content">
                  <h4>Email</h4>
                  <p>info@example.com</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">
                  <CircuitNode size={36} color="var(--color-green)" />
                  <i className="icon-linkedin"></i>
                </div>
                <div className="method-content">
                  <h4>LinkedIn</h4>
                  <p>linkedin.com/in/example</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">
                  <CircuitNode size={36} color="var(--color-orange)" />
                  <i className="icon-github"></i>
                </div>
                <div className="method-content">
                  <h4>GitHub</h4>
                  <p>github.com/example</p>
                </div>
              </div>
            </div>
            
            {/* Circuit decoration */}
            <svg className="circuit-decoration" viewBox="0 0 100 200" preserveAspectRatio="none">
              <CircuitPath 
                d="M20,0 C20,50 80,70 80,100 C80,130 20,150 20,200" 
                blinkEffect={true} 
              />
              <CircuitPath 
                d="M40,0 C40,40 60,60 60,100 C60,140 40,160 40,200" 
                blinkEffect={true}
                dashArray="3,3" 
              />
            </svg>
          </div>
          
          {/* Contact form */}
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
              <div className="form-header">
                <h3>Send a Message</h3>
                <div className="form-status-indicator">
                  {formStatus === 'idle' && (
                    <span className="status-idle">Ready to send</span>
                  )}
                  {formStatus === 'submitting' && (
                    <span className="status-submitting">Sending...</span>
                  )}
                  {formStatus === 'success' && (
                    <span className="status-success">Message sent!</span>
                  )}
                  {formStatus === 'error' && (
                    <span className="status-error">Error sending message</span>
                  )}
                </div>
              </div>
              
              <div className="form-body">
                {/* Name input */}
                <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    placeholder="Your name"
                  />
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>
                
                {/* Email input */}
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    placeholder="Your email address"
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                
                {/* Subject input */}
                <div className="form-group">
                  <label htmlFor="subject">Subject (Optional)</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    placeholder="What's this about?"
                  />
                </div>
                
                {/* Message input */}
                <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    placeholder="Your message"
                    rows={6}
                  ></textarea>
                  {errors.message && <div className="error-message">{errors.message}</div>}
                </div>
                
                {/* Submit button */}
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className={`submit-button ${formStatus === 'submitting' ? 'submitting' : ''} ${formStatus === 'success' ? 'success' : ''}`}
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  >
                    {formStatus === 'idle' && 'Send Message'}
                    {formStatus === 'submitting' && 'Sending...'}
                    {formStatus === 'success' && 'Sent Successfully'}
                    {formStatus === 'error' && 'Try Again'}
                  </button>
                </div>
              </div>
              
              {/* Success message */}
              {formStatus === 'success' && (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h4>Message Sent!</h4>
                  <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </div>
              )}
              
              {/* Error message */}
              {formStatus === 'error' && (
                <div className="error-summary">
                  <p>Sorry, there was a problem sending your message. Please try again or contact me directly via email.</p>
                  <button 
                    type="button" 
                    className="retry-button"
                    onClick={() => setFormStatus('idle')}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;