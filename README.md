# BillShredder

Your bill is wrong. Let's shred it.

AI-powered medical bill auditor that finds billing errors, benchmarks prices, identifies legal protections, and coaches you through every phone call.

## The Full Journey

BillShredder doesn't just analyze your bill — it coaches you through the entire process:

1. **Get Your Itemized Bill** — Simulated call coaching: how to request the UB-04 form, invoke HIPAA, and get it in writing
2. **Analyze & Build Your Case** — 6-stage AI audit (parse, errors, benchmarks, legal rights, strategy, letters)
3. **Negotiate Your Bill Down** — Simulated negotiation coaching: dispute errors, cite Medicare rates, invoke charity care

Demo result: $47,283 ER bill reduced to $4,100 (91% savings).

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **Claude API** — Sonnet 4.5 for parsing/analysis, Opus 4.6 for legal reasoning and letter drafting
- **Framer Motion** for animations
- **Tailwind CSS v4** with custom dark theme
- **Server-Sent Events** for real-time streaming

## Getting Started

```bash
npm install
```

Create a `.env.local` file:

```
ANTHROPIC_API_KEY=your-key-here
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No API key? The app falls back to demo mode automatically.

## Demo Mode

Try it without an API key using built-in demo scenarios:

- **ER Visit** ($47K) — Broken arm with duplicate CT scans & upcoding
- **Childbirth** ($32K) — Out-of-network balance billing
- **Collections** ($8.5K) — Urgent care debt with FDCPA violations

URL params: `?demo=er`, `?demo=baby`, `?demo=collections`

In demo mode, the full journey plays automatically: Call 1 (get itemized bill) -> Audit (6 stages) -> Call 2 (negotiate). Default speed is 1.5x. Override with `?speed=2`.

## Architecture

```
src/
├── app/
│   ├── api/audit/route.ts        # 6-stage SSE streaming pipeline
│   ├── page.tsx                   # Main page with journey orchestration
│   └── globals.css                # Dark theme, animations
├── components/
│   ├── JourneyController.tsx      # 5-phase journey state machine
│   ├── JourneyPhaseIndicator.tsx  # Top-level 3-phase progress bar
│   ├── CallCoach.tsx              # Split-screen call simulation
│   ├── CallTranscript.tsx         # Left: phone call transcript
│   ├── CoachingSidebar.tsx        # Right: real-time coaching cards
│   ├── CoachingCard.tsx           # Individual coaching card
│   ├── PhaseTransition.tsx        # Interstitial animations
│   ├── ResultsCelebration.tsx     # Final results with savings
│   ├── StickyHeader.tsx           # Logo, status, demo toggle
│   ├── ProgressStepper.tsx        # 6-step audit sub-stepper
│   ├── SavingsHero.tsx            # Bill vs fair value comparison
│   ├── DocumentCards.tsx          # Generated letter cards
│   ├── FindingsDashboard.tsx      # Collapsible findings sections
│   └── ...                        # ErrorsSection, BenchmarkSection, etc.
├── hooks/
│   └── useAuditStream.ts         # SSE consumer with reducer state
└── lib/
    ├── agent/                     # System prompts and tool definitions
    ├── call-scripts/              # Call 1 & Call 2 simulation scripts
    ├── types.ts                   # Shared TypeScript types
    └── demo-scripts/              # Pre-scripted audit event streams
```

## Testing

```bash
npm test
```

## License

MIT
