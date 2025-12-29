import type { AbortSignal } from 'abort-controller';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiResponse<T = unknown> {
  success: boolean;
  status: number;
  data?: T | null;
  message?: string;
  error?: string;
  errors?: Record<string, string>;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  service?: string;
  message: string;
}

export type ContactResponse = {
  id?: string;
  message?: string;
  [key: string]: unknown;
};

const DEFAULT_TIMEOUT_MS = 15000;

function createTimeoutSignal(timeoutMs: number = DEFAULT_TIMEOUT_MS, externalSignal?: AbortSignal) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const clear = () => clearTimeout(timeoutId);

  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    externalSignal.addEventListener('abort', () => controller.abort(), { once: true });
  }

  return { signal: controller.signal, clear };
}

async function safeParseJSON<T>(res: Response): Promise<T | null> {
  const text = await res.text().catch(() => '');
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function requestJSON<TRes = unknown, TReq = unknown>(
  url: string,
  options: {
    method?: HttpMethod;
    body?: TReq;
    headers?: Record<string, string>;
    timeoutMs?: number;
    signal?: AbortSignal;
  } = {}
): Promise<ApiResponse<TRes>> {
  const { method = 'GET', body, headers = {}, timeoutMs = DEFAULT_TIMEOUT_MS, signal } = options;

  const { signal: timeoutSignal, clear } = createTimeoutSignal(timeoutMs, signal);

  try {
    const res = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: 'same-origin',
      signal: timeoutSignal,
    });

    const parsed = await safeParseJSON<any>(res);

    const response: ApiResponse<TRes> = {
      success: res.ok && (parsed?.success !== false),
      status: res.status,
      data: (parsed?.data ?? parsed ?? null) as TRes | null,
      message: parsed?.message ?? (res.ok ? 'OK' : res.statusText || 'Request failed'),
      error: !res.ok ? (parsed?.error || parsed?.message || res.statusText || 'Request failed') : undefined,
      errors: parsed?.errors,
    };

    return response;
  } catch (err: any) {
    const aborted = err?.name === 'AbortError';
    return {
      success: false,
      status: aborted ? 408 : 0,
      data: null,
      message: aborted ? 'Request timed out' : 'Network error',
      error: aborted ? 'Request timed out' : (err?.message || 'Network error'),
    };
  } finally {
    clear();
  }
}

export function postJSON<TRes = unknown, TReq = unknown>(
  url: string,
  payload: TReq,
  options?: { headers?: Record<string, string>; timeoutMs?: number; signal?: AbortSignal }
): Promise<ApiResponse<TRes>> {
  return requestJSON<TRes, TReq>(url, { method: 'POST', body: payload, ...options });
}

export function getJSON<TRes = unknown>(
  url: string,
  options?: { headers?: Record<string, string>; timeoutMs?: number; signal?: AbortSignal }
): Promise<ApiResponse<TRes>> {
  return requestJSON<TRes>(url, { method: 'GET', ...options });
}

export async function sendContact(
  form: ContactFormPayload,
  options?: { timeoutMs?: number; signal?: AbortSignal }
): Promise<ApiResponse<ContactResponse>> {
  return postJSON<ContactResponse, ContactFormPayload>('/api/contact', form, options);
}