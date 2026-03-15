# matts_team

A local VS Code template for building applications with the GSD (Get Stuff Done) workflow, driven through VS Code Copilot chat with Claude.

## What This Is

This template replicates the GSD methodology — a structured planning and execution system for AI-assisted development — without the GSD-2 CLI framework. No Anthropic API key required. You interact with Claude entirely through VS Code's Copilot chat using your existing Copilot license.

## Prerequisites

- VS Code with GitHub Copilot
- Node.js 18+ (for building application code)

## Setup

1. Open this folder in VS Code.
2. In Copilot Chat, switch the model to Claude (claude-sonnet or claude-opus).
3. Start a session: `Read .gsd/state.md and tell me what's next.`

That's it. `CLAUDE.md` is automatically loaded by Copilot as project context.

## Project Structure

```
.
├── CLAUDE.md              # GSD instructions — loaded automatically by Copilot
├── GSD-WORKFLOW.md        # Full GSD methodology reference
├── agents/
│   ├── scout.md           # Codebase recon subagent definition
│   ├── researcher.md      # Web research subagent definition
│   └── worker.md          # General-purpose subagent definition
├── .gsd/
│   ├── state.md           # Current project state — read this first
│   ├── decisions.md       # Append-only decisions register
│   └── milestones/        # Milestone/slice/task plans and summaries
├── src/
│   └── index.ts           # Application source (add your code here)
├── .vscode/               # VS Code settings, launch config, tasks
├── package.json
└── tsconfig.json
```

## The GSD Workflow

Work flows through these phases:

1. **Discuss** — capture decisions on ambiguities before planning
2. **Research** — scout codebase and docs
3. **Plan** — decompose into milestones → slices → tasks
4. **Execute** — implement one task at a time
5. **Verify** — check must-haves are met
6. **Summarize** — record what happened
7. **Advance** — mark done, move to next

All state lives in `.gsd/`. Start every session by reading `.gsd/state.md`.

See `GSD-WORKFLOW.md` for the full methodology.