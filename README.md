# matts_team

A VS Code template for building applications with the GSD (Get Stuff Done) workflow, driven through GitHub Copilot CLI with Claude.

## What This Is

This template implements the GSD methodology — a structured planning and execution system for AI-assisted development. Work flows through Milestones → Slices → Tasks. All state lives in `.gsd/`. Agents handle reconnaissance, research, execution, and review.

## Prerequisites

- VS Code with GitHub Copilot and GitHub Copilot Chat extensions
- GitHub Copilot CLI: `npm install -g @github/copilot`
- Node.js 18+

## Setup

1. Clone or fork this repo.
2. Open in VS Code.
3. Install recommended extensions when prompted (`github.copilot`, `github.copilot-chat`).
4. Install Copilot CLI: `npm install -g @github/copilot`
5. Start a CLI session in the project root: `copilot`
6. Cold start: `Read .gsd/state.md and tell me what's next.`

`.github/copilot-instructions.md` is automatically loaded by Copilot as workspace context.

## Project Structure

```
.
├── .github/
│   ├── copilot-instructions.md   # GSD instructions — auto-loaded by Copilot
│   ├── agents/                   # Copilot CLI agent definitions (.agent.md)
│   │   ├── scout.agent.md        # Codebase recon — runs before planning
│   │   ├── researcher.agent.md   # External research brief
│   │   ├── worker.agent.md       # Task execution — one task per invocation
│   │   └── reviewer.agent.md     # Post-slice review and verification
│   └── skills/                   # Auto-loaded workflow skills
│       ├── gsd-plan.md           # Slice planning skill
│       ├── gsd-quick.md          # Ad-hoc task skill
│       ├── gsd-summarize.md      # Summary writing skill
│       └── gsd-verify.md         # Verification ladder skill
├── .copilot/
│   └── hooks/
│       └── post-task-complete.sh # Auto-commits after task completion
├── CLAUDE.md                     # GSD instructions for Claude Code sessions
├── GSD-WORKFLOW.md               # Full GSD methodology reference
├── .gsd/
│   ├── state.md                  # Current project state — read this first
│   ├── decisions.md              # Append-only decisions register
│   ├── quick/                    # Ad-hoc tasks (no M→S→T scaffolding needed)
│   └── milestones/               # Milestone/slice/task plans and summaries
├── src/
│   └── index.ts                  # Application source (add your code here)
├── packages/
│   └── gsd-sync/                 # @matts-team/gsd — sync shared GSD files across repos
├── .vscode/                      # VS Code settings, launch config, tasks
├── package.json
└── tsconfig.json
```

## Using Agents

Agents are defined in `.github/agents/` as `.agent.md` files — Copilot CLI picks them up automatically.

```bash
/agent scout        # Codebase recon before planning a slice
/agent researcher   # External research brief for a slice
/agent worker       # Execute a task from the verified plan
/agent reviewer     # Review a completed slice against must-haves
```

For parallel execution:
```bash
/fleet Run scout and researcher concurrently for S01
/fleet Execute T01 and T02 in parallel — they are independent
```

## Skills

Skills in `.github/skills/` load automatically when the context is relevant:

| Skill | Activates when |
|-------|----------------|
| `gsd-plan` | Asked to plan a slice |
| `gsd-quick` | Ad-hoc task without full scaffolding |
| `gsd-summarize` | Asked to summarize completed work |
| `gsd-verify` | Asked to verify or after task execution |

## Quick Tasks

For ad-hoc work that doesn't warrant a full milestone slice:

```
Quick task: fix the broken auth redirect on login
```

The `gsd-quick` skill handles scaffolding, execution, summary, and commit automatically. Quick task artifacts land in `.gsd/quick/`.

## The GSD Workflow

Work flows through these phases:

1. **Discuss** — capture decisions on ambiguities before planning
2. **Research** — scout codebase and docs (`/agent scout`, `/agent researcher`)
3. **Plan** — decompose into milestones → slices → tasks (`/plan`, `gsd-plan` skill)
4. **Execute** — implement one task at a time (`/agent worker`, `/fleet` for parallel)
5. **Verify** — check must-haves are met (`gsd-verify` skill, `/agent reviewer`)
6. **Summarize** — record what happened (`gsd-summarize` skill)
7. **Advance** — mark done, move to next

All state lives in `.gsd/`. Start every session by reading `.gsd/state.md`.

See `GSD-WORKFLOW.md` for the full methodology.

## Keeping GSD Files Current

This template uses `@matts-team/gsd` to sync shared infrastructure files from a central source:

```bash
npm run sync        # Update GSD-WORKFLOW.md, CLAUDE.md, agents, skills
npm run sync --force  # Also overwrite .github/copilot-instructions.md
```

See `packages/gsd-sync/README.md` for publishing and setup details.
