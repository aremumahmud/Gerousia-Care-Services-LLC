// Server-side validation + sanitization (mirrors client rules).

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(v) {
  return typeof v === 'string' && EMAIL_RE.test(v.trim());
}

export function isValidPhone(v) {
  if (typeof v !== 'string') return false;
  const cleaned = v.trim();
  if (!/^[+]?[\d\s().-]{7,}$/.test(cleaned)) return false;
  const digits = cleaned.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export function isTodayOrFuture(v) {
  if (!v) return false;
  const picked = new Date(`${v}T00:00:00`);
  if (Number.isNaN(picked.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return picked.getTime() >= today.getTime();
}

// Strips tags/control chars and trims; caps length to prevent abuse.
export function sanitize(v, max = 2000) {
  if (v == null) return '';
  return String(v)
    .replace(/<[^>]*>/g, '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, max);
}

// Escapes a value for safe interpolation into HTML email bodies.
export function escapeHtml(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function required(v) {
  return typeof v === 'string' ? v.trim().length > 0 : Boolean(v);
}
