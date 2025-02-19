export const FORM_MESSAGES = {
  SUCCESS: {
    CONTACT: 'Thank you for your message. We\'ll get back to you soon.',
    DEMO: 'Thank you for scheduling a demo. We\'ll confirm your time shortly.',
    PARTNERSHIP: 'Thank you for your interest. We\'ll review your application and respond within 5 business days.'
  },
  ERROR: {
    REQUIRED_FIELDS: 'Please fill in all required fields',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_DATE: 'Please select a valid date',
    INVALID_URL: 'Please enter a valid URL',
    SUBMISSION_FAILED: 'Failed to submit form. Please try again.',
    LINKEDIN_URL: 'Please enter a valid LinkedIn profile URL'
  }
} as const;

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PORTFOLIO: '/portfolio',
  STUDIO: '/studio',
  RESOURCES: '/resources',
  BLOG: '/blog',
  CONTACT: '/contact',
  APPLY: '/apply',
  DEMO: '/schedule-demo',
  GENOVATE: '/genovate'
} as const;

export const FORM_VALIDATION = {
  NAME: {
    MIN: 2,
    MAX: 100
  },
  MESSAGE: {
    MIN: 10,
    MAX: 2000
  },
  COMPANY: {
    MIN: 2,
    MAX: 100
  }
} as const;