# Pooja Kailash Pansare — Portfolio v3

A production-oriented Next.js portfolio for an AI Solutions Engineer focused on Generative AI, Agentic AI, Intelligent Automation and solution engineering.

## v3 positioning

- Mature, international-facing professional structure with less visual noise and tighter information density.
- No project screenshots or decorative project imagery. Projects are explained through **problem → solution → execution → engineering value → stack**.
- CampusSyntra and Persynta receive the deepest treatment as the two major independent systems.
- AI Operations Automation and AI Revenue Intelligence are presented as focused system patterns rather than overstated production claims.
- Industry events are a compact swipeable evidence section with short descriptions and restrained thumbnails.
- Resume is available from the navigation, hero, education section and contact section at `/Pooja_Pansare_AI_Engineer_Resume.pdf`.
- IBM SkillsBuild Artificial Intelligence Fundamentals is listed as a written credential with a Credly verification link; no certificate image is displayed.
- Portfolio assistant uses a controlled public knowledge base and can optionally use the OpenAI Responses API.
- Contact options remain Email, protected WhatsApp routing and LinkedIn. The phone number is not printed on the site.
- Server-side contact endpoint includes validation, honeypot protection, basic rate limiting and optional Resend delivery.
- Next.js remains on 15.5.24 to avoid an unnecessary major-version migration in this build.

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local`.

- `RESEND_API_KEY` — server-side Resend API key.
- `CONTACT_TO_EMAIL` — destination for portfolio enquiries.
- `CONTACT_FROM_EMAIL` — verified sender identity.
- `OPENAI_API_KEY` — optional. If absent, the assistant uses a controlled server-side fallback.
- `OPENAI_MODEL` — optional model name; defaults to `gpt-5.6-luna`.
- `WHATSAPP_DESTINATION_URL` — recommended WhatsApp Business short link or approved destination.
- `NEXT_PUBLIC_SITE_URL` — production site URL for metadata.

Never put secret keys in `NEXT_PUBLIC_*` variables.

## Production checks

Before deployment:

```bash
npm run build
```

Then test:

- `/api/contact`
- `/api/assistant`
- `/go/whatsapp`
- Resume download / open link
- Credly credential link
- Mobile layout and event swipe controls
- Keyboard navigation
- Metadata / social preview
- All external links

## Important launch note

The supplied white-dress profile portrait was not available in the current uploaded asset set. v3 deliberately does not substitute an event photograph into the hero. The hero is therefore designed to work professionally without a portrait rather than exposing a broken placeholder.
