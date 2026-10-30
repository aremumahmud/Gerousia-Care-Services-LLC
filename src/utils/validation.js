// Shared form validation helpers (used by both client and mirrored on the server).

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value) {
  return typeof value === 'string' && EMAIL_RE.test(value.trim());
}

// Accepts international formats: optional +, country code, spaces, dashes,
// parentheses and dots. Requires 7–15 digits (E.164 range).
export function isValidPhone(value) {
  if (typeof value !== 'string') return false;
  const cleaned = value.trim();
  if (!/^[+]?[\d\s().-]{7,}$/.test(cleaned)) return false;
  const digits = cleaned.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export function isRequired(value) {
  return typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
}

// Returns true when `value` (YYYY-MM-DD) is today or a future date.
export function isTodayOrFuture(value) {
  if (!value) return false;
  const picked = new Date(`${value}T00:00:00`);
  if (Number.isNaN(picked.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return picked.getTime() >= today.getTime();
}

// Returns today's date as YYYY-MM-DD, for use as a <input type="date"> min.
export function todayISO() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

// Generic field-rule runner. `rules` is a map of field -> validator fn
// returning an error string (or empty string when valid).
export function validateForm(values, rules) {
  const errors = {};
  for (const field of Object.keys(rules)) {
    const message = rules[field](values[field], values);
    if (message) errors[field] = message;
  }
  return errors;
}
