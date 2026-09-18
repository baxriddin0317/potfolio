// Contact form endpoint. Delivers each message to every configured channel:
//   - Telegram (free): TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
//   - Email via Resend (free tier): RESEND_API_KEY + CONTACT_TO_EMAIL
// See .env.example for setup steps.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const sendTelegram = async ({ name, email, subject, message }) => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  const text = [
    '<b>📩 New message from your portfolio</b>',
    '',
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>Subject:</b> ${escapeHtml(subject || '—')}`,
    '',
    escapeHtml(message),
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
  });
  if (!response.ok) {
    throw new Error(`Telegram ${response.status}: ${await response.text()}`);
  }
};

const sendEmail = async ({ name, email, subject, message }) => {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  const html = `
    <h2>New message from your portfolio</h2>
    <p><b>Name:</b> ${escapeHtml(name)}<br/>
    <b>Email:</b> ${escapeHtml(email)}<br/>
    <b>Subject:</b> ${escapeHtml(subject || '—')}</p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
      to: CONTACT_TO_EMAIL.split(',').map((e) => e.trim()),
      reply_to: email,
      subject: `Portfolio: ${subject || `message from ${name}`}`,
      html,
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${await response.text()}`);
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, RESEND_API_KEY, CONTACT_TO_EMAIL } = process.env;
  const channels = [];
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) channels.push(sendTelegram);
  if (RESEND_API_KEY && CONTACT_TO_EMAIL) channels.push(sendEmail);

  if (!channels.length) {
    console.error('Contact form: no delivery channel configured. See .env.example.');
    return res.status(503).json({ error: 'Contact form is not configured.' });
  }

  const { name = '', email = '', subject = '', message = '', website = '' } = req.body || {};

  // honeypot field — bots fill it, humans don't see it
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if ([name, email, subject, message].some((f) => typeof f !== 'string')) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  const data = {
    name: name.trim().slice(0, 100),
    email: email.trim().slice(0, 200),
    subject: subject.trim().slice(0, 200),
    message: message.trim().slice(0, 3000),
  };

  if (!data.name || !data.message || !EMAIL_RE.test(data.email)) {
    return res.status(400).json({ error: 'Please fill in your name, a valid email and a message.' });
  }

  const results = await Promise.allSettled(channels.map((send) => send(data)));
  results
    .filter((r) => r.status === 'rejected')
    .forEach((r) => console.error('Contact delivery failed:', r.reason));

  // succeed if at least one channel delivered the message
  if (results.some((r) => r.status === 'fulfilled')) {
    return res.status(200).json({ ok: true });
  }
  return res.status(502).json({ error: 'Could not send the message.' });
}
