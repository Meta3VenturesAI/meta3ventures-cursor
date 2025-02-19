import { FORM_MESSAGES, FORM_VALIDATION } from './constants';
import { validateEmail, validatePhone, validateURL, validateLinkedIn } from './validation';

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(formData: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Required fields
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const message = formData.get('message')?.toString();

  if (!name || name.length < FORM_VALIDATION.NAME.MIN) {
    errors.name = FORM_MESSAGES.ERROR.REQUIRED_FIELDS;
  }

  if (!email) {
    errors.email = FORM_MESSAGES.ERROR.REQUIRED_FIELDS;
  } else if (!validateEmail(email)) {
    errors.email = FORM_MESSAGES.ERROR.INVALID_EMAIL;
  }

  if (!message || message.length < FORM_VALIDATION.MESSAGE.MIN) {
    errors.message = FORM_MESSAGES.ERROR.REQUIRED_FIELDS;
  }

  // Optional fields
  const phone = formData.get('phone')?.toString();
  if (phone && !validatePhone(phone)) {
    errors.phone = FORM_MESSAGES.ERROR.INVALID_PHONE;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateApplicationForm(formData: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Required fields
  const name = formData.get('founder_name')?.toString();
  const email = formData.get('email')?.toString();
  const company = formData.get('company_name')?.toString();
  const linkedin = formData.get('linkedin')?.toString();
  const pitch = formData.get('pitch')?.toString();

  if (!name || name.length < FORM_VALIDATION.NAME.MIN) {
    errors.founder_name = FORM_MESSAGES.ERROR.REQUIRED_FIELDS;
  }

  if (!email) {
    errors.email = FORM_MESSAGES.ERROR.REQUIRED_FIELDS;
  } else if (!validateEmail(email)) {
    errors.email = FORM_MESSAGES.ERROR.INVALID_EMAIL;
  }

  if (!company || company.length < FORM_VALIDATION.COMPANY.MIN) {
    errors.company_name = FORM_MESSAGES.ERROR.REQUIRED_FIELDS;
  }

  if (!linkedin) {
    errors.linkedin = FORM_MESSAGES.ERROR.REQUIRED_FIELDS;
  } else if (!validateLinkedIn(linkedin)) {
    errors.linkedin = FORM_MESSAGES.ERROR.LINKEDIN_URL;
  }

  if (!pitch || pitch.length < FORM_VALIDATION.MESSAGE.MIN) {
    errors.pitch = FORM_MESSAGES.ERROR.REQUIRED_FIELDS;
  }

  // Optional fields
  const website = formData.get('website')?.toString();
  if (website && !validateURL(website)) {
    errors.website = FORM_MESSAGES.ERROR.INVALID_URL;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateDemoForm(formData: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Required fields
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const company = formData.get('company')?.toString();
  const useCase = formData.get('use-case')?.toString();

  if (!name || name.length < FORM_VALIDATION.NAME.MIN) {
    errors.name = FORM_MESSAGES.ERROR.REQUIRED_FIELDS;
  }

  if (!email) {
    errors.email = FORM_MESSAGES.ERROR.REQUIRED_FIELDS;
  } else if (!validateEmail(email)) {
    errors.email = FORM_MESSAGES.ERROR.INVALID_EMAIL;
  }

  if (!company || company.length < FORM_VALIDATION.COMPANY.MIN) {
    errors.company = FORM_MESSAGES.ERROR.REQUIRED_FIELDS;
  }

  if (!useCase) {
    errors.use_case = FORM_MESSAGES.ERROR.REQUIRED_FIELDS;
  }

  // Optional fields
  const phone = formData.get('phone')?.toString();
  if (phone && !validatePhone(phone)) {
    errors.phone = FORM_MESSAGES.ERROR.INVALID_PHONE;
  }

  const preferredDate = formData.get('preferred-date')?.toString();
  if (preferredDate) {
    const date = new Date(preferredDate);
    const today = new Date();
    if (date < today) {
      errors.preferred_date = FORM_MESSAGES.ERROR.INVALID_DATE;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}