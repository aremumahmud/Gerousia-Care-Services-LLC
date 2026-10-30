// Shared HTTP helpers for serverless handlers: method guard, body parsing,
// a simple in-memory rate limiter, and CORS.

export function applyCors(req, res) {
  const allowed = process.env.ALLOWED_ORIGIN || '';
  const origin = req.headers.origin;
  if (allowed && origin === allowed) {
    res.setHeader('Access-Control-Allow-Origin', allowed);
  } else if (!allowed) {
    // Same-origin by default on Vercel; reflect origin only when configured.
    res.setHeader('Access-Control-Allow-Origin', origin || '');
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export function readBody(req) {
  // Vercel parses JSON bodies automatically for application/json.
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

// --- Naive in-memory rate limiter (per warm instance). Good enough as a
// practical first line of defense; pair with platform protection for scale. ---
const hits = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 5;

export function rateLimited(req) {
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  const now = Date.now();
  const entry = hits.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  hits.set(ip, entry);
  return entry.count > MAX_PER_WINDOW;
}

export function methodGuard(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return false;
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed.' });
    return false;
  }
  return true;
}
