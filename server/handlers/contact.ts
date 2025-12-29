/* eslint-disable no-console */

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  service?: string;
  // Optional/hidden fields for spam protection
  website?: string;
  company?: string;
  nickname?: string;
};

type ErrorMap = Record<string, string>;

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per window per IP

const rateLimiter = new Map<string, { count: number; windowStart: number }>();

export async function handle(req: Request): Promise<Response> {
  const origin = req.headers.get('origin') || '*';
  const corsHeaders = buildCorsHeaders(origin);

  try {
    // CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Only allow POST
    if (req.method !== 'POST') {
      return jsonResponse(
        { ok: false, message: 'Method not allowed' },
        405,
        corsHeaders
      );
    }

    // Rate limit per IP
    const ip = getClientIp(req);
    if (!allowRequest(ip)) {
      return jsonResponse(
        { ok: false, message: 'Too many requests. Please try again shortly.' },
        429,
        corsHeaders
      );
    }

    // Validate content type
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return jsonResponse(
        { ok: false, message: 'Unsupported content type. Use application/json.' },
        415,
        corsHeaders
      );
    }

    // Parse body
    let payload: ContactPayload;
    try {
      payload = await req.json();
    } catch {
      return jsonResponse(
        { ok: false, message: 'Invalid JSON payload.' },
        400,
        corsHeaders
      );
    }

    // Validation
    const { data, errors } = validatePayload(payload);
    if (Object.keys(errors).length > 0) {
      return jsonResponse(
        { ok: false, message: 'Validation failed.', errors },
        400,
        corsHeaders
      );
    }

    // Spam check via honeypots (already validated but double guard)
    if (isHoneypotTripped(payload)) {
      // Pretend success to not signal spammers, but do not process further.
      console.warn('Honeypot triggered for IP:', ip);
      return jsonResponse(
        { ok: true, message: 'Thanks! Your message has been received.' },
        200,
        corsHeaders
      );
    }

    // Compose message
    const submission = composeSubmission(data, req);

    // Try to deliver via Resend if configured; otherwise, log and return success.
    const delivered = await trySendViaResend(submission);

    if (!delivered) {
      // Fallback: log to server. In real deployments, integrate with your email provider or queue.
      console.info('Contact form submission (no email provider configured):', submission);
    }

    return jsonResponse(
      { ok: true, message: 'Thanks! Your message has been received.' },
      200,
      corsHeaders
    );
  } catch (err) {
    console.error('Contact handler error:', err);
    return jsonResponse(
      { ok: false, message: 'Unexpected server error. Please try again later.' },
      500,
      buildCorsHeaders(origin)
    );
  }
}

function buildCorsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json; charset=utf-8',
  };
}

function jsonResponse(body: unknown, status = 200, headers?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: headers ?? { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function getClientIp(req: Request): string {
  // Common proxy headers
  const xf = req.headers.get('x-forwarded-for') || '';
  const ip =
    xf.split(',').map(s => s.trim())[0] ||
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-real-ip') ||
    'unknown';
  return ip;
}

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const rec = rateLimiter.get(ip);
  if (!rec) {
    rateLimiter.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (now - rec.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimiter.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (rec.count >= RATE_LIMIT_MAX) {
    return false;
  }
  rec.count += 1;
  rateLimiter.set(ip, rec);
  return true;
}

function validatePayload(payload: ContactPayload): {
  data: Required<Pick<ContactPayload, 'name' | 'email' | 'message'>> & Partial<ContactPayload>;
  errors: ErrorMap;
} {
  const errors: ErrorMap = {};

  // Honeypot fields should be empty if present
  if (isHoneypotTripped(payload)) {
    errors.form = 'Spam detected.';
  }

  const name = (payload.name ?? '').toString().trim();
  const email = (payload.email ?? '').toString().trim();
  const phone = (payload.phone ?? '').toString().trim();
  const message = (payload.message ?? '').toString().trim();
  const service = (payload.service ?? '').toString().trim();

  // Name
  if (name.length < 2 || name.length > 80) {
    errors.name = 'Name must be between 2 and 80 characters.';
  }

  // Email
  if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Phone (optional)
  if (phone) {
    const digits = phone.replace(/[^\d+]/g, '');
    const numeric = digits.replace(/\D/g, '');
    if (numeric.length < 7 || numeric.length > 20) {
      errors.phone = 'Please enter a valid phone number.';
    }
  }

  // Message
  if (message.length < 10 || message.length > 2000) {
    errors.message = 'Message must be between 10 and 2000 characters.';
  }

  // Service (optional)
  if (service && service.length > 100) {
    errors.service = 'Service description is too long.';
  }

  return {
    data: { name, email, phone, message, service },
    errors,
  };
}

function isValidEmail(email: string): boolean {
  // Simple and pragmatic email check
  const re =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
}

function isHoneypotTripped(p: ContactPayload): boolean {
  return Boolean(
    (p.website && p.website.trim().length > 0) ||
    (p.company && p.company.trim().length > 0) ||
    (p.nickname && p.nickname.trim().length > 0)
  );
}

function composeSubmission(
  data: Required<Pick<ContactPayload, 'name' | 'email' | 'message'>> & Partial<ContactPayload>,
  req: Request
) {
  const ip = getClientIp(req);
  const ua = req.headers.get('user-agent') || 'unknown';
  const receivedAt = new Date().toISOString();

  const lines: string[] = [
    `New contact form submission`,
    `----------------------------------------`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : undefined,
    data.service ? `Service: ${data.service}` : undefined,
    `----------------------------------------`,
    `Message:`,
    data.message,
    `----------------------------------------`,
    `Meta:`,
    `IP: ${ip}`,
    `User-Agent: ${ua}`,
    `Received At: ${receivedAt}`,
  ].filter(Boolean) as string[];

  return {
    subject: `New inquiry from ${data.name}`,
    text: lines.join('\n'),
    html: textToHtml(lines.join('\n')),
    ip,
    ua,
    receivedAt,
    data,
  };
}

function textToHtml(text: string): string {
  const esc = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  const safe = esc(text)
    .split('\n')
    .map(line => (line.startsWith('----') ? '<hr />' : line))
    .join('<br />');
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;white-space:normal;line-height:1.5">${safe}</div>`;
}

async function trySendViaResend(submission: {
  subject: string;
  text: string;
  html: string;
  data: any;
}): Promise<boolean> {
  // Attempt to read environment variables in multiple runtimes
  const env =
    (globalThis as any)?.process?.env ??
    (globalThis as any)?.ENV ??
    {};

  const apiKey = env.RESEND_API_KEY as string | undefined;
  const toEmail = env.CONTACT_TO_EMAIL as string | undefined;
  const fromEmail = (env.CONTACT_FROM_EMAIL as string | undefined) || 'no-reply@example.com';

  if (!apiKey || !toEmail) {
    return false;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: submission.subject,
        text: submission.text,
        html: submission.html,
      }),
    });

    if (!res.ok) {
      const errText = await safeText(res);
      console.warn('Resend delivery failed:', res.status, errText);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Resend delivery exception:', e);
    return false;
  }
}

async function safeText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return '';
  }
}