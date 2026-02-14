# BillShredder

Your bill is wrong. Let's shred it.

AI-powered medical bill auditor that finds billing errors, benchmarks prices, identifies legal protections, and fights for you — with vision-powered bill scanning and live AI-vs-AI negotiation.

## The Full Journey

BillShredder doesn't just analyze your bill — it coaches you through the entire process:

1. **Scan Your Bill** — Take a photo or upload a PDF; Opus 4.6 vision extracts every line item and billing code
2. **Get Your Itemized Bill** — Simulated call coaching: how to request the UB-04 form, invoke HIPAA, and get it in writing
3. **Analyze & Build Your Case** — 6-stage AI audit (parse, errors, benchmarks, legal rights, strategy, letters)
4. **Negotiate Your Bill Down** — Live AI-vs-AI adversarial negotiation (Opus vs Opus) or guided coaching mode

Demo result: $47,283 ER bill reduced to $4,100 (91% savings).

## Frontier Features

### Vision-Powered Bill Scanning
Upload a photo or PDF of your hospital bill. Opus 4.6 vision extracts structured data — hospital name, line items, CPT codes, charges — with confidence scoring. Review extracted data before analysis begins.

### Live Adversarial Negotiation (AI vs AI)
Watch two Opus 4.6 instances negotiate your bill in real-time via SSE streaming. One advocates for you (citing errors, Medicare rates, legal protections), the other plays the hospital billing rep. Real-time coaching cards explain each tactic as it happens. Falls back to demo negotiation script without an API key.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **Claude API** — Sonnet 4.5 for parsing/analysis, Opus 4.6 for vision extraction, legal reasoning, letter drafting, and adversarial negotiation
- **Framer Motion** for animations
- **Tailwind CSS v4** with custom dark theme
- **Server-Sent Events** for real-time streaming (audit pipeline + live negotiation)

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

In demo mode, the full journey plays automatically: Call 1 (get itemized bill) -> Audit (6 stages) -> Call 2 (negotiate). Default speed is 1.5x. Override with `?speed=2`. Add `?live=true` for live AI negotiation demo.

## Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── audit/route.ts          # 6-stage SSE streaming pipeline
│   │   ├── extract-bill/route.ts   # Vision-powered bill extraction (Opus 4.6)
│   │   └── negotiate/route.ts      # Live AI-vs-AI negotiation SSE endpoint
│   ├── page.tsx                     # Main page with journey orchestration
│   └── globals.css                  # Dark theme, animations
├── components/
│   ├── JourneyController.tsx        # 5-phase journey state machine
│   ├── JourneyPhaseIndicator.tsx    # Top-level 3-phase progress bar
│   ├── BillUploader.tsx             # Image/PDF/text upload with vision extraction
│   ├── ExtractionVerification.tsx   # Review extracted bill data before analysis
│   ├── CallCoach.tsx                # Split-screen scripted call simulation
│   ├── LiveNegotiation.tsx          # Live AI-vs-AI negotiation UI
│   ├── CallTranscript.tsx           # Left: phone call transcript
│   ├── CoachingSidebar.tsx          # Right: real-time coaching cards
│   ├── CoachingCard.tsx             # Individual coaching card
│   ├── PhaseTransition.tsx          # Interstitial animations
│   ├── ResultsCelebration.tsx       # Final results with savings
│   ├── StickyHeader.tsx             # Logo, status, demo toggle
│   ├── ProgressStepper.tsx          # 6-step audit sub-stepper
│   ├── SavingsHero.tsx              # Bill vs fair value comparison
│   ├── DocumentCards.tsx            # Generated letter cards
│   ├── FindingsDashboard.tsx        # Collapsible findings sections
│   └── ...                          # ErrorsSection, BenchmarkSection, etc.
├── hooks/
│   └── useAuditStream.ts           # SSE consumer with reducer state
└── lib/
    ├── agent/
    │   ├── system-prompts.ts        # Audit stage system prompts
    │   ├── tools.ts                 # Claude tool definitions
    │   ├── negotiator-prompt.ts     # AI negotiator system prompt builder
    │   ├── billing-rep-prompt.ts    # AI billing rep system prompt builder
    │   └── negotiation-helpers.ts   # Turn parsing, coaching generation
    ├── call-scripts/                # Call 1 & Call 2 simulation scripts
    ├── types.ts                     # Shared TypeScript types
    └── demo-scripts/
        ├── demo-runner.ts           # Audit demo event streamer
        ├── negotiate-demo.ts        # Pre-scripted negotiation demo
        ├── er-demo.ts               # ER visit demo events
        ├── baby-demo.ts             # Childbirth demo events
        └── collections-demo.ts      # Collections demo events
```

## Testing

```bash
npm test
```

## License

MIT
