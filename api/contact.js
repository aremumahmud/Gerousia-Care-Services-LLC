import { applyCors, methodGuard, readBody, rateLimited } from './_lib/http.js';
import {
  sanitize,
  isValidEmail,
  isValidPhone,
  required,
} from './_lib/validation.js';
import { sendNotification } from './_lib/brevo.js';
import { contactEmail } from './_lib/templates.js';

export default async function handler(req, res) {
  applyCors(req, res);
  if (!methodGuard(req, res)) return;
  if (rateLimited(req)) {
    return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
  }

  const body = readBody(req);

  // Honeypot — silently accept to avoid tipping off bots.
  if (body._gotcha) return res.status(200).json({ message: 'Thank you.' });

  const data = {
    name: sanitize(body.name, 120),
    phone: sanitize(body.phone, 40),
    email: sanitize(body.email, 160),
    service: sanitize(body.service, 120),
    message: sanitize(body.message, 3000),
  };

  const fieldErrors = {};
  if (!required(data.name)) fieldErrors.name = 'Name is required';
  if (!required(data.phone)) fieldErrors.phone = 'Phone is required';
  else if (!isValidPhone(data.phone)) fieldErrors.phone = 'Enter a valid phone number';
  if (data.email && !isValidEmail(data.email)) fieldErrors.email = 'Enter a valid email';

  if (Object.keys(fieldErrors).length) {
    return res.status(400).json({ error: 'Please correct the errors and try again.', fieldErrors });
  }

  try {
    await sendNotification({
      subject: `New contact inquiry — ${data.name}`,
      html: contactEmail(data),
      replyTo: data.email ? { email: data.email, name: data.name } : undefined,
    });
    return res.status(200).json({ message: 'Thank you — we’ll be in touch soon.' });
  } catch (err) {
    console.error('contact error:', err.message);
    return res.status(502).json({
      error: 'We couldn’t send your message right now. Please call us directly.',
    });
  }
}
