import { applyCors, methodGuard, readBody, rateLimited } from './_lib/http.js';
import {
  sanitize,
  isValidEmail,
  isValidPhone,
  isTodayOrFuture,
  required,
} from './_lib/validation.js';
import { sendNotification } from './_lib/brevo.js';
import { consultationEmail } from './_lib/templates.js';

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
    service: sanitize(body.service, 120),
    date: sanitize(body.date, 20),
    time: sanitize(body.time, 60),
    message: sanitize(body.message, 3000),
  };

  const fieldErrors = {};
  if (!required(data.name)) fieldErrors.name = 'Name is required';
  if (!required(data.phone)) fieldErrors.phone = 'Phone is required';
  else if (!isValidPhone(data.phone)) fieldErrors.phone = 'Enter a valid phone number';
  if (!required(data.email)) fieldErrors.email = 'Email is required';
  else if (!isValidEmail(data.email)) fieldErrors.email = 'Enter a valid email';
  if (!required(data.service)) fieldErrors.service = 'Please choose a service';
  if (!required(data.date)) fieldErrors.date = 'Please choose a preferred date';
  // Reject past dates on the server even if the client is bypassed.
  else if (!isTodayOrFuture(data.date)) fieldErrors.date = 'Choose today or a future date';

  if (Object.keys(fieldErrors).length) {
    return res.status(400).json({ error: 'Please correct the errors and try again.', fieldErrors });
  }

  try {
    await sendNotification({
      subject: `New consultation request — ${data.name} (${data.date})`,
      html: consultationEmail(data),
      replyTo: { email: data.email, name: data.name },
    });
    return res.status(200).json({
      message: 'Thank you — we’ll reach out to confirm your consultation.',
    });
  } catch (err) {
    console.error('consultation error:', err.message);
    return res.status(502).json({
      error: 'We couldn’t submit your request right now. Please call us directly.',
    });
  }
}
