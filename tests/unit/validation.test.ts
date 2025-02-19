import { describe, it, expect } from 'vitest';
import { validateEmail, validatePhone, validateMessage } from '../../src/lib/validation';

describe('Form Validation', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should validate correct phone numbers', () => {
      expect(validatePhone('+1234567890')).toBe(true);
      expect(validatePhone('(123) 456-7890')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('123')).toBe(false);
      expect(validatePhone('abc')).toBe(false);
    });
  });

  describe('validateMessage', () => {
    it('should validate messages within length limits', () => {
      expect(validateMessage('Valid message')).toBe(true);
      expect(validateMessage('a'.repeat(2000))).toBe(true);
    });

    it('should reject messages outside length limits', () => {
      expect(validateMessage('short')).toBe(false);
      expect(validateMessage('a'.repeat(2001))).toBe(false);
    });
  });
});