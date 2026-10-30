# Gerousia Care Services — Website

Marketing website for **Gerousia Care Services LLC**, a non-medical in-home care
provider serving **Austin and San Antonio, Texas**.

Built with **Vite + React + React Router**, with **Vercel serverless functions**
powering form delivery through the **Brevo** API.

---

## Tech stack

- **Vite** (build tool) + **React 18**
- **React Router v6** (client-side routing)
- **react-helmet-async** (per-page SEO + JSON-LD structured data)
- **Vercel Serverless Functions** (`/api/*`) for form handling
- **Brevo** for transactional email + newsletter contacts
- Self-hosted fonts (Cormorant + Karla), hand-built design system in `src/styles`

## Project structure

```
├── api/                  # Vercel serverless functions
│   ├── _lib/             # shared validation, http, brevo client, email templates
│   ├── contact.js
│   ├── consultation.js
│   ├── careers.js
│   └── newsletter.js
├── public/
│   ├── images/           # all site imagery (served at /images/*)
│   ├── fonts/            # self-hosted woff2
│   ├── favicon.png, apple-touch-icon.png, site.webmanifest
│   ├── robots.txt, sitemap.xml
├── src/
│   ├── components/       # UI, forms, sections, Navbar, Footer, Seo, Icon
│   ├── data/             # business.js, services.js, posts.js, pages.js, …
│   ├── hooks/            # useForm
│   ├── layouts/          # MainLayout
│   ├── pages/            # route pages
│   ├── styles/           # global.css (ported design system) + app.css
│   ├── utils/            # validation, structuredData, submitForm, format
│   ├── App.jsx           # routes
│   └── main.jsx          # entry
├── vercel.json
└── .env.example
```

## Routes

`/` · `/about` · `/services` · `/services/:slug` (7 services) · `/careers` ·
`/request-consultation` · `/contact` · `/blog` · `/blog/:slug` (10 posts) ·
`/privacy-policy` · `/terms-and-conditions` · 404 fallback.

---

## Local development

```bash
npm install
npm run dev          # Vite dev server (frontend only)
```

> `npm run dev` serves the React app but **not** the `/api` functions.
> To run the serverless functions locally, use the Vercel CLI (below).

### Running the API locally

```bash
npm i -g vercel
vercel dev           # serves both the Vite app and /api/* functions
```

Create a `.env` file (copy from `.env.example`) before running `vercel dev`.

---

## Environment variables

Copy `.env.example` → `.env` and fill in:

| Variable | Description |
|---|---|
| `BREVO_API_KEY` | Brevo API key (**secret** — never prefix with `VITE_`) |
| `BREVO_SENDER_EMAIL` | Verified Brevo sender address |
| `BREVO_SENDER_NAME` | Sender display name (defaults to Gerousia Care Services) |
| `BUSINESS_NOTIFICATION_EMAIL` | Inbox that receives form submissions |
| `BREVO_NEWSLETTER_LIST_ID` | (optional) Brevo list id for newsletter sign-ups |
| `ALLOWED_ORIGIN` | (optional) restrict API CORS to this origin |

### 1. Obtain Brevo credentials
1. Create a free account at [brevo.com](https://www.brevo.com).
2. **SMTP & API → API Keys** → create a key → set as `BREVO_API_KEY`.
3. **Senders, Domains & Dedicated IPs → Senders** → add & verify a sender →
   use that address as `BREVO_SENDER_EMAIL`.
4. (Newsletter) **Contacts → Lists** → create a list → copy its id into
   `BREVO_NEWSLETTER_LIST_ID`.

### 2. Test the API locally
With `vercel dev` running:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","phone":"(512) 555-0100","email":"test@example.com","message":"Hello"}'
```

---

## Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **New Project → Import** the repo. Framework preset: **Vite**
   (build `vite build`, output `dist`). `vercel.json` already configures this.
3. **Project Settings → Environment Variables** → add every variable from
   `.env.example` (Production + Preview). Do **not** add a real `.env` to Git.
4. Deploy.

`vercel.json` rewrites all non-`/api` paths to `index.html` so React Router
works on direct visits and refreshes, while `/api/*` stays on the serverless
runtime. Static assets, fonts and images get long-lived cache headers.

### After deployment — verify
- Visit each route directly (e.g. `/services/personal-care`) and refresh — no 404.
- Submit each form (contact, consultation, careers, newsletter) and confirm the
  notification arrives in `BUSINESS_NOTIFICATION_EMAIL` and the subscriber
  appears in the Brevo list.
- Confirm no secrets appear in the browser bundle (search the deployed JS for
  your API key — it must not be there; it only lives server-side).

---

## Production build

```bash
npm run build        # outputs to dist/
npm run preview      # preview the production build locally
```

## Notes
- Office hours are currently shown as a general placeholder in `src/data/business.js`
  (`hours`). Update once confirmed by the client.
- No social profiles are configured yet — add them to `business.social` in
  `src/data/business.js` and they’ll appear automatically.
