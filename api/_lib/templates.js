import { escapeHtml } from './validation.js';

const BRAND = '#0E3156';

function shell(title, rows, intro) {
  const body = rows
    .filter((r) => r && r[1])
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #ECE6DB;vertical-align:top;width:170px;color:#566474;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #ECE6DB;color:#1C2836;font-size:15px;">${String(value).replace(/\n/g, '<br>')}</td>
        </tr>`
    )
    .join('');

  return `<!doctype html><html><body style="margin:0;background:#F5F2EC;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F2EC;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(14,49,86,.08);">
        <tr><td style="background:${BRAND};padding:24px 32px;">
          <span style="color:#fff;font-size:20px;font-weight:700;">Gerousia Care Services</span>
          <div style="color:#D9B97A;font-size:13px;margin-top:4px;">${escapeHtml(title)}</div>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          ${intro ? `<p style="margin:0 0 18px;color:#566474;font-size:15px;">${escapeHtml(intro)}</p>` : ''}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${body}</table>
        </td></tr>
        <tr><td style="padding:18px 32px;background:#FBFAF7;border-top:1px solid #ECE6DB;color:#8696a8;font-size:12px;">
          This message was sent from the Gerousia Care Services website.
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

export function contactEmail(d) {
  return shell(
    'New contact inquiry',
    [
      ['Name', escapeHtml(d.name)],
      ['Phone', escapeHtml(d.phone)],
      ['Email', d.email ? escapeHtml(d.email) : '—'],
      ['Care needed', d.service ? escapeHtml(d.service) : '—'],
      ['Message', d.message ? escapeHtml(d.message) : '—'],
    ],
    'You have a new inquiry from the contact form.'
  );
}

export function consultationEmail(d) {
  return shell(
    'New consultation request',
    [
      ['Name', escapeHtml(d.name)],
      ['Phone', escapeHtml(d.phone)],
      ['Email', escapeHtml(d.email)],
      ['Service', escapeHtml(d.service)],
      ['Preferred date', escapeHtml(d.date)],
      ['Preferred time', d.time ? escapeHtml(d.time) : '—'],
      ['Notes', d.message ? escapeHtml(d.message) : '—'],
    ],
    'A family has requested a consultation.'
  );
}

export function careersEmail(d) {
  return shell(
    'New careers application',
    [
      ['Name', escapeHtml(d.name)],
      ['Phone', escapeHtml(d.phone)],
      ['Email', escapeHtml(d.email)],
      ['Position', d.position ? escapeHtml(d.position) : '—'],
      ['Availability', d.availability ? escapeHtml(d.availability) : '—'],
      ['Experience', d.experience ? escapeHtml(d.experience) : '—'],
      ['About', d.message ? escapeHtml(d.message) : '—'],
    ],
    'A new caregiver application was submitted.'
  );
}

export function newsletterEmail(d) {
  return shell(
    'New newsletter subscriber',
    [['Email', escapeHtml(d.email)]],
    'A new subscriber joined the newsletter.'
  );
}
