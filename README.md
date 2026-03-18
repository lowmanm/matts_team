# matts_team

A VS Code template for building applications with the GSD (Get Stuff Done) workflow, driven through GitHub Copilot Chat with Claude.

## What This Is

This template replicates the GSD methodology — a structured planning and execution system for AI-assisted development. No Anthropic API key required. You interact with Claude entirely through VS Code's Copilot Chat using your existing Copilot license.

## Prerequisites

- VS Code with GitHub Copilot and GitHub Copilot Chat extensions
- Node.js 18+ (for building application code)

## Setup

1. Open this folder in VS Code.
2. Install recommended extensions when prompted (`github.copilot`, `github.copilot-chat`).
3. In Copilot Chat, switch the model to Claude (claude-sonnet or claude-opus).
4. Start a session: `Read .gsd/state.md and tell me what's next.`

`.github/copilot-instructions.md` is automatically loaded by Copilot as workspace context. No manual attachment needed.

## Project Structure

```
.
├── .github/
│   └── copilot-instructions.md  # GSD instructions — auto-loaded by Copilot
├── CLAUDE.md                    # Supplementary GSD reference (attach with #file: if needed)
├── GSD-WORKFLOW.md              # Full GSD methodology reference
├── agents/
│   ├── orchestrator.md          # Agent coordination — how to invoke agents in Copilot
│   ├── scout.md                 # Codebase recon agent definition
│   ├── researcher.md            # Web research agent definition
│   └── worker.md                # Task execution agent definition
├── .gsd/
│   ├── state.md                 # Current project state — read this first
│   ├── decisions.md             # Append-only decisions register
│   └── milestones/              # Milestone/slice/task plans and summaries
├── src/
│   └── index.ts                 # Application source (add your code here)
├── .vscode/                     # VS Code settings, launch config, tasks
├── package.json
└── tsconfig.json
```

## Using Agents in Copilot

Copilot doesn't spawn subagents natively. Instead, Claude operates in a named agent mode within the chat session. The `agents/orchestrator.md` file defines when and how each agent is invoked.

To explicitly attach an agent definition to a chat:
```
#file:agents/scout.md
#file:agents/researcher.md
#file:agents/worker.md
```

See `agents/orchestrator.md` for the full coordination pattern.

## The GSD Workflow

Work flows through these phases:

1. **Discuss** — capture decisions on ambiguities before planning
2. **Research** — scout codebase and docs (uses Scout / Researcher agents)
3. **Plan** — decompose into milestones → slices → tasks
4. **Execute** — implement one task at a time (uses Worker agent)
5. **Verify** — check must-haves are met
6. **Summarize** — record what happened
7. **Advance** — mark done, move to next

All state lives in `.gsd/`. Start every session by reading `.gsd/state.md`.

See `GSD-WORKFLOW.md` for the full methodology.
