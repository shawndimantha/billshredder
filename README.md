# BillShredder

AI-powered medical bill auditor that finds billing errors, benchmarks prices, identifies legal protections, and generates dispute letters.

80% of hospital bills contain errors. BillShredder uses Claude to audit every charge and build your case.

## How It Works

1. **Parse** — Extracts line items, CPT codes, and charges from your bill
2. **Audit** — Finds duplicate charges, upcoding, unbundling, phantom charges
3. **Benchmark** — Compares prices against Medicare rates and fair market value
4. **Legal Rights** — Identifies applicable protections (No Surprises Act, 501(r) charity care, state laws, FDCPA)
5. **Strategy** — Builds a step-by-step negotiation playbook with talking points
6. **Documents** — Generates ready-to-send dispute and negotiation letters

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

Or use URL params: `?demo=er`, `?demo=baby`, `?demo=collections`

## Architecture

```
src/
├── app/
│   ├── api/audit/route.ts    # 6-stage SSE streaming pipeline
│   ├── page.tsx               # Single-column dashboard layout
│   └── globals.css            # Dark theme, animations
├── components/
│   ├── StickyHeader.tsx       # Logo, status, demo toggle
│   ├── ProgressStepper.tsx    # 6-step visual progress
│   ├── SavingsHero.tsx        # Bill vs fair value comparison
│   ├── DocumentCards.tsx      # Generated letter cards
│   ├── FindingsDashboard.tsx  # Collapsible findings sections
│   ├── CollapsibleSection.tsx # Reusable collapse/expand
│   ├── AnimatedNumber.tsx     # Count-up animation
│   └── ...                    # ErrorsSection, BenchmarkSection, etc.
├── hooks/
│   └── useAuditStream.ts     # SSE consumer with reducer state
└── lib/
    ├── agent/                 # System prompts and tool definitions
    ├── types.ts               # Shared TypeScript types
    └── demo-scripts/          # Pre-scripted demo event streams
```

## Testing

```bash
npm test
```

## License

MIT
