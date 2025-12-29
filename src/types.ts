/**
 * Shared types for the Electrician one-pager
 */

/**
 * Site navigation
 */
export type NavItem = {
  label: string;
  href: string; // e.g., "#services"
};

/**
 * Services and features
 */
export type Service = {
  key: string;
  title: string;
  description: string;
  image?: string; // public path to an image (e.g., /images/img_services.jpg)
  features?: string[];
};

export type FeaturePoint = {
  icon?: string; // optional icon path
  title: string;
  description: string;
};

/**
 * Testimonials
 */
export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  rating?: number; // 1-5
  avatar?: string; // public path to an image (e.g., /images/img_portrait.jpg)
  location?: string;
  jobTitle?: string;
};

/**
 * General API result wrapper
 */
export type ApiResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; error: string; details?: unknown };

/**
 * Contact form types
 */
export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export type ContactValidationErrors = Partial<Record<keyof ContactFormData, string>> & {
  general?: string;
};

export type ContactApiRequest = {
  form: ContactFormData;
  meta?: {
    page?: string;
    timestamp?: string; // ISO string
    userAgent?: string;
    referrer?: string;
  };
};

export type ContactApiSuccess = {
  ok: true;
  status: number; // typically 200
  message: string;
  requestId: string;
};

export type ContactApiError = {
  ok: false;
  status: number; // e.g., 400/429/500
  message: string;
  errors?: ContactValidationErrors;
  requestId?: string;
};

export type ContactApiResponse = ContactApiSuccess | ContactApiError;

/**
 * Misc utilities
 */
export type Brand<K, T> = K & { __brand: T };
export type UUID = Brand<string, "uuid">;