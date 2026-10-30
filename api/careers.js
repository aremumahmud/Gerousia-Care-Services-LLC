import { applyCors, methodGuard, readBody, rateLimited } from './_lib/http.js';
import {
  sanitize,
  isValidEmail,
  isValidPhone,
  required,
} from './_lib/validation.js';
import { sendNotification } from './_lib/brevo.js';
import { careersEmail } from './_lib/templates.js';

export default async function handler(req, res) {
  applyCors(req, res);
  if (!methodGuard(req, res)) return;
  if (rateLimited(req)) {
    return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
  }

  const body = readBody(req);
  if (body._gotcha) return res.status(200).json({ message: 'Thank you.' });

  const data = {
    name: sanitize(body.name, 120),
    phone: sanitize(body.phone, 40),
    email: sanitize(body.email, 160),
    position: sanitize(body.position, 120),
    availability: sanitize(body.availability, 60),
    experience: sanitize(body.experience, 60),
    message: sanitize(body.message, 4000),
  };

  const fieldErrors = {};
  if (!required(data.name)) fieldErrors.name = 'Name is required';
  if (!required(data.phone)) fieldErrors.phone = 'Phone is required';
  else if (!isValidPhone(data.phone)) fieldErrors.phone = 'Enter a valid phone number';
  if (!required(data.email)) fieldErrors.email = 'Email is required';
  else if (!isValidEmail(data.email)) fieldErrors.email = 'Enter a valid email';

  if (Object.keys(fieldErrors).length) {
    return res.status(400).json({ error: 'Please correct the errors and try again.', fieldErrors });
  }

  try {
    await sendNotification({
      subject: `New careers application — ${data.name}`,
      html: careersEmail(data),
      replyTo: { email: data.email, name: data.name },
    });
    return res.status(200).json({
      message: 'Thank you for applying — we’ll review your details and be in touch.',
    });
  } catch (err) {
    console.error('careers error:', err.message);
    return res.status(502).json({
      error: 'We couldn’t submit your application right now. Please call us directly.',
    });
  }
}
