/* Utility validators and form-level validation for the contact form */

export type ContactField = 'name' | 'email' | 'phone' | 'message' | 'service';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

/* Basic utils */
export function safeTrim(v: unknown): string {
  return (typeof v === 'string' ? v : '').trim();
}

export function normalizeWhitespace(v: string): string {
  return v.replace(/\s+/g, ' ').trim();
}

export function stripTags(v: string): string {
  // Simple tag stripper; not a full sanitizer but adequate for basic inputs
  return v.replace(/<[^>]*>/g, '');
}

/* Primitive validators */
export function isNonEmpty(v: string): boolean {
  return safeTrim(v).length > 0;
}

export function minLength(v: string, n: number): boolean {
  return safeTrim(v).length >= n;
}

export function isEmail(v: string): boolean {
  const s = safeTrim(v);
  // Reasonable, not over-strict
  const re =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(s);
}

export function isPhone(v: string): boolean {
  const s = safeTrim(v);
  if (!s) return false;
  // Allow digits, spaces, dashes, dots, parentheses, leading +
  if (!/^[+()\-.\s0-9]+$/.test(s)) return false;
  const digitCount = (s.match(/\d/g) || []).length;
  return digitCount >= 10 && digitCount <= 15;
}

export function normalizePhone(v: string): string {
  const s = safeTrim(v);
  // Keep leading + if present, strip non-digits otherwise
  const hasPlus = s.startsWith('+');
  const digits = s.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : digits;
}

/* Field-level validator returning an error message or null if valid */
export function validateField(field: ContactField, value: string): string | null {
  const val = normalizeWhitespace(stripTags(value || ''));

  switch (field) {
    case 'name': {
      if (!isNonEmpty(val)) return 'Please enter your name.';
      if (!minLength(val, 2)) return 'Name must be at least 2 characters.';
      // Allow letters, spaces, apostrophes, and hyphens
      if (!/^[a-zA-ZÀ-ÿ' -]+$/.test(val)) return 'Name contains invalid characters.';
      return null;
    }
    case 'email': {
      if (!isNonEmpty(val)) return 'Please enter your email.';
      if (!isEmail(val)) return 'Please enter a valid email address.';
      return null;
    }
    case 'phone': {
      if (!val) return null; // optional
      if (!isPhone(val)) return 'Please enter a valid phone number.';
      return null;
    }
    case 'message': {
      if (!isNonEmpty(val)) return 'Please enter a brief description of the work.';
      if (!minLength(val, 10)) return 'Message must be at least 10 characters.';
      return null;
    }
    case 'service': {
      // optional; customize if you want to require selection
      return null;
    }
    default:
      return null;
  }
}

/* Form-level validation */
export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const nameErr = validateField('name', data.name);
  if (nameErr) errors.name = nameErr;

  const emailErr = validateField('email', data.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = validateField('phone', data.phone || '');
  if (phoneErr) errors.phone = phoneErr;

  const msgErr = validateField('message', data.message);
  if (msgErr) errors.message = msgErr;

  // Service optional; validate if present
  if (data.service) {
    const svc = normalizeWhitespace(stripTags(data.service));
    if (!/^[\w\s\-&/]+$/.test(svc)) {
      errors.service = 'Service contains invalid characters.';
    }
  }

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.values(errors).some(Boolean);
}

/* Prepare clean payload for API submission */
export function buildCleanContactPayload(data: ContactFormData): ContactFormData {
  return {
    name: normalizeWhitespace(stripTags(data.name || '')),
    email: normalizeWhitespace(stripTags(data.email || '')).toLowerCase(),
    phone: data.phone ? normalizePhone(data.phone) : undefined,
    message: normalizeWhitespace(stripTags(data.message || '')),
    service: data.service ? normalizeWhitespace(stripTags(data.service)) : undefined,
  };
}

/* Grouped export (optional convenience) */
export const Validators = {
  isNonEmpty,
  minLength,
  isEmail,
  isPhone,
  normalizePhone,
  validateField,
  validateContactForm,
  hasErrors,
  buildCleanContactPayload,
};