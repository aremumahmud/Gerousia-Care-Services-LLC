import { applyCors, methodGuard, readBody, rateLimited } from './_lib/http.js';
import { sanitize, isValidEmail } from './_lib/validation.js';
import { upsertContact, sendNotification } from './_lib/brevo.js';
import { newsletterEmail } from './_lib/templates.js';

export default async function handler(req, res) {
  applyCors(req, res);
  if (!methodGuard(req, res)) return;
  if (rateLimited(req)) {
    return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
  }

  const body = readBody(req);
  if (body._gotcha) return res.status(200).json({ message: 'Thank you.' });

  const email = sanitize(body.email, 160);
  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: 'Please enter a valid email.',
      fieldErrors: { email: 'Enter a valid email' },
    });
  }

  try {
    // Add/update in the newsletter list (consent implied by opt-in form).
    await upsertContact({
      email,
      attributes: { SOURCE: 'website', OPT_IN: true },
    });

    // Best-effort internal notification; don't fail the request if it errors.
    try {
      await sendNotification({
        subject: `New newsletter subscriber — ${email}`,
        html: newsletterEmail({ email }),
      });
    } catch (e) {
      console.error('newsletter notify (non-fatal):', e.message);
    }

    return res.status(200).json({ message: 'You’re subscribed — thank you!' });
  } catch (err) {
    console.error('newsletter error:', err.message);
    return res.status(502).json({
      error: 'We couldn’t subscribe you right now. Please try again later.',
    });
  }
}
