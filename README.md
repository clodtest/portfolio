# Clod Salvador — AI-Powered Portfolio

An interactive portfolio website with an AI avatar that answers questions about Clod's skills, projects, and experience in real-time. Built in the spirit of [toukoum.fr](https://www.toukoum.fr/).

## Features

- Streaming AI chat powered by Groq (Llama 3.1 70B) or OpenAI GPT-4o-mini
- Animated SVG avatar with blinking, breathing, and thinking states
- Rainbow/liquid gradient that follows your mouse cursor
- Click ripple splash effect
- Light / dark mode toggle
- Inline project cards triggered by conversation
- Suggestion chips for common questions
- Framer Motion animations throughout
- Deploy-ready for Vercel

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **AI**: Vercel AI SDK + Groq (Llama 3.1 70B) / OpenAI fallback
- **Styling**: Tailwind CSS v3
- **Animation**: Framer Motion
- **Icons**: Phosphor Icons
- **Font**: Outfit (sans) + JetBrains Mono

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add your API key

Copy the example env file:

```bash
cp .env.example .env.local
```

Then open `.env.local` and add your key:

```
# Recommended — free tier, very fast
GROQ_API_KEY=your_groq_api_key_here
```

Get a free Groq key at [console.groq.com](https://console.groq.com).

If you prefer OpenAI, set `OPENAI_API_KEY` instead and leave `GROQ_API_KEY` empty.

### 3. (Optional) Add real project screenshots

Drop your screenshots into `public/screenshots/`:

- `public/screenshots/project-1.svg` (or `.png` / `.jpg`)
- `public/screenshots/project-2.svg`
- `public/screenshots/project-3.svg`

The cards show a styled placeholder gradient if no image is found.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add `GROQ_API_KEY` (or `OPENAI_API_KEY`) in **Environment Variables**
4. Deploy — done

## Customisation

| What to change | File |
|---|---|
| AI personality & resume content | `lib/prompt.ts` |
| Project cards (title, metrics, stack) | `components/ProjectCards.tsx` |
| Suggestion chips | `components/SuggestionChips.tsx` |
| Color tokens (accent, bg, surface) | `app/globals.css` |
| Avatar SVG face | `components/Avatar.tsx` |
| AI model selection | `app/api/chat/route.ts` |

## Contact

**Clod Salvador** — clodsalvador520@gmail.com · +63 976 157 0144
