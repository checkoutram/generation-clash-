# Generation Clash — India Edition 🇮🇳

A viral mobile-first quiz web app: enter your birth year, answer 10 random India-nostalgia questions, and discover whether your **official generation** matches your **Generation Vibe**. Built for WhatsApp sharing.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- No backend — everything runs locally in the browser (no login, no data collection)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
```

## Deploy (GitHub Pages)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys on every push to `main`.

One-time setup in your repo: **Settings → Pages → Source: GitHub Actions**.

## Customize the game

All game content lives in **`src/config.ts`**:
- Generation boundaries (Millennial / Gen Z / Gen Alpha / Gen Beta)
- Question pool (a random 10 are drawn each game)
- Answer weights → hidden generation scores
- Result messages per official/vibe combination

Add new editions (Tamil Nadu, Bollywood, Office, Couples…) as new question data — no UI changes needed.
