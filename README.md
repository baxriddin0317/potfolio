# Bakhriddin Khuja — Portfolio

Personal portfolio built with Next.js, Tailwind CSS and Framer Motion, with a streaming AI chat assistant and a contact form that delivers messages to Telegram and email.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the keys
npm run dev
```

Open http://localhost:3000.

## Configuration

All personal links (Upwork, Fiverr, Telegram, Instagram), services and Fiverr gigs live in `data/site.js`.

| Variable | Purpose |
| --- | --- |
| `AI_API_KEY`, `AI_BASE_URL`, `AI_MODEL` | AI chat assistant. Any OpenAI-compatible API — Groq and Google Gemini have free tiers, OpenAI is paid. |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Contact form messages are sent to your Telegram by a bot (free). |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL` | Contact form messages are also sent to your email via Resend (free tier). |

See `.env.example` for step-by-step instructions. On Vercel, add the same variables under **Project → Settings → Environment Variables** and redeploy.
