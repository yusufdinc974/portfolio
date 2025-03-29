/**
 * Utility functions for form validation
 */

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  /**
   * Validates a field based on type and requirements
   * @param {string} type - The type of validation to perform
   * @param {string} value - The value to validate
   * @param {Object} options - Additional validation options
   * @returns {string|null} Error message or null if valid
   */
  export const validateField = (type, value, options = {}) => {
    switch (type) {
      case 'required':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return options.message || 'This field is required';
        }
        break;
        
      case 'email':
        if (!isValidEmail(value)) {
          return options.message || 'Please enter a valid email address';
        }
        break;
        
      case 'minLength':
        if (typeof value === 'string' && value.trim().length < options.length) {
          return options.message || `Must be at least ${options.length} characters`;
        }
        break;
        
      case 'maxLength':
        if (typeof value === 'string' && value.trim().length > options.length) {
          return options.message || `Must be ${options.length} characters or less`;
        }
        break;
        
      case 'pattern':
        if (options.regex && !options.regex.test(value)) {
          return options.message || 'Invalid format';
        }
        break;
        
      default:
        break;
    }
    
    return null;
  };
  
  /**
   * Validates a form field with multiple validation rules
   * @param {string} name - Field name
   * @param {string} value - Field value
   * @param {Array} validations - Array of validation objects
   * @returns {string|null} First error message or null if valid
   */
  export const validateFormField = (name, value, validations = []) => {
    for (const validation of validations) {
      const error = validateField(validation.type, value, validation);
      if (error) {
        return error;
      }
    }
    
    return null;
  };
  
  /**
   * Creates a circuit-themed GSAP animation for form errors
   * @param {Object} element - DOM element to animate
   * @returns {Object} GSAP animation timeline
   */
  export const createErrorAnimation = (element) => {
    return window.gsap.timeline()
      .to(element, {
        x: [-10, 10, -5, 5, 0],
        duration: 0.4,
        ease: "power2.out"
      });
  };
  
  /**
   * Creates a success animation for form submission
   * @param {Object} element - DOM element to animate
   * @returns {Object} GSAP animation timeline
   */
  export const createSuccessAnimation = (element) => {
    return window.gsap.timeline()
      .to(element, {
        scale: [1, 1.05, 1],
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
  };