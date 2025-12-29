import { handle as contactHandle } from '../server/handlers/contact';

function withCORS(res: Response, origin?: string): Response {
  const headers = new Headers(res.headers);
  headers.set('Access-Control-Allow-Origin', origin || '*');
  headers.set('Vary', 'Origin');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
}

async function core(req: Request): Promise<Response> {
  const origin = req.headers.get('Origin') || undefined;

  if (req.method === 'OPTIONS') {
    return withCORS(
      new Response(null, {
        status: 204,
      }),
      origin
    );
  }

  if (req.method !== 'POST') {
    return withCORS(
      new Response(JSON.stringify({ ok: false, error: 'Method Not Allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }),
      origin
    );
  }

  try {
    const res = await contactHandle(req);
    return withCORS(res, origin);
  } catch (err) {
    return withCORS(
      new Response(JSON.stringify({ ok: false, error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }),
      origin
    );
  }
}

// Default export for platforms expecting a single handler (e.g., Vercel Edge style)
export default async function handler(req: Request): Promise<Response> {
  return core(req);
}

// Named exports for runtimes that use method-specific handlers
export async function POST(req: Request): Promise<Response> {
  return core(req);
}

export async function OPTIONS(req: Request): Promise<Response> {
  return core(req);
}

// Generic handle export to match potential adapters
export async function handle(req: Request): Promise<Response> {
  return core(req);
}