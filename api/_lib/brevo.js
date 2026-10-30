// Thin Brevo (Sendinblue) API client. Runs server-side only.
const BREVO_BASE = 'https://api.brevo.com/v3';

function cfg() {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || 'Gerousia Care Services';
  const notifyEmail = process.env.BUSINESS_NOTIFICATION_EMAIL;
  if (!apiKey || !senderEmail || !notifyEmail) {
    throw new Error('Brevo environment variables are not configured.');
  }
  return { apiKey, senderEmail, senderName, notifyEmail };
}

/**
 * Sends a transactional email to the business notification inbox.
 * @param {{subject:string, html:string, replyTo?:{email:string,name?:string}}} opts
 */
export async function sendNotification({ subject, html, replyTo }) {
  const { apiKey, senderEmail, senderName, notifyEmail } = cfg();

  const res = await fetch(`${BREVO_BASE}/smtp/email`, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: senderName },
      to: [{ email: notifyEmail }],
      ...(replyTo ? { replyTo } : {}),
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Brevo email failed (${res.status}): ${detail}`);
  }
  return res.json().catch(() => ({}));
}

/**
 * Adds or updates a contact in a Brevo list (idempotent — updateEnabled).
 * @param {{email:string, attributes?:object, listId?:number}} opts
 */
export async function upsertContact({ email, attributes = {}, listId }) {
  const { apiKey } = cfg();
  const list = listId || Number(process.env.BREVO_NEWSLETTER_LIST_ID) || undefined;

  const res = await fetch(`${BREVO_BASE}/contacts`, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      attributes,
      updateEnabled: true, // avoids duplicate-contact errors
      ...(list ? { listIds: [list] } : {}),
    }),
  });

  // 201 created, 204 updated. Treat "already exists" as success.
  if (res.ok) return { ok: true };
  const detail = await res.json().catch(() => ({}));
  if (detail?.code === 'duplicate_parameter') return { ok: true };
  throw new Error(`Brevo contact failed (${res.status}): ${JSON.stringify(detail)}`);
}
