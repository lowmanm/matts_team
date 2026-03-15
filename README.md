# matts_team

A local VS Code template for building applications with the GSD (Get Stuff Done) workflow and the Claude Agent SDK.

## What This Is

This template replicates the GSD methodology — a structured planning and execution system for AI-assisted development — without the GSD-2 CLI framework (`@gsd/pi-coding-agent`). It runs locally in VS Code using the Claude Agent SDK directly.

## Prerequisites

- Node.js 18+
- An Anthropic API key

## Setup

```bash
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npm run build
```

## Usage

**From the terminal:**
```bash
node dist/index.js "your prompt here"
```

**From VS Code:** Use the `Run Agent` launch config (F5).

**With Claude Code:** Open this folder in VS Code with the Claude Code extension. `CLAUDE.md` is automatically loaded as the system context.

## Project Structure

```
.
├── CLAUDE.md              # GSD agent instructions (loaded by Claude Code)
├── GSD-WORKFLOW.md        # Full GSD methodology reference
├── agents/
│   ├── scout.md           # Codebase recon subagent
│   ├── researcher.md      # Web research subagent
│   └── worker.md          # General-purpose subagent
├── .gsd/
│   ├── state.md           # Current project state — read this first
│   ├── decisions.md       # Append-only decisions register
│   └── milestones/        # Milestone/slice/task plans and summaries
├── src/
│   └── index.ts           # Agent entry point (Claude Agent SDK)
├── .vscode/               # VS Code settings, launch configs, tasks
├── package.json
└── tsconfig.json
```

## The GSD Workflow

Work flows through these phases:

1. **Discuss** — capture user decisions on ambiguities
2. **Research** — scout codebase and docs
3. **Plan** — decompose into milestones → slices → tasks
4. **Execute** — implement one task at a time
5. **Verify** — check must-haves are met
6. **Summarize** — record what happened
7. **Advance** — mark done, move to next

All state lives in `.gsd/`. Start every session by reading `.gsd/state.md`.

See `GSD-WORKFLOW.md` for the full methodology.

## Environment Variables

Create a `.env` file:

```env
ANTHROPIC_API_KEY=sk-ant-...
```