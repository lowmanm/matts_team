# New Project Onboarding

> **This file is a one-time onboarding trigger.**
> When this file exists, run the intake sequence below before doing anything else.
> Delete this file when onboarding is complete.

---

## Onboarding Sequence

You are starting a brand new project from this template. Before writing any code or creating any plans, you need to understand what's being built. Follow these steps in order.

### Step 1 — Intake

Ask the user the following questions. Ask them all at once, not one at a time:

1. **Project name** — What should this project be called? (used for folder names, package.json, README)
2. **What are you building?** — One or two sentences. What is it, and who is it for?
3. **Tech stack** — What language, framework, and runtime? (e.g. TypeScript + Next.js, Python + FastAPI, etc.) If unsure, recommend the simplest stack that fits and ask for confirmation.
4. **Core features** — List the 3-5 most important things this app must do in version 1. These will become the first milestone's slices.
5. **Constraints** — Any hard requirements? (deployment target, must integrate with X, must run offline, specific performance requirements, etc.) Say "none" if not applicable.

Wait for the user's answers before proceeding.

---

### Step 2 — Scaffold the project

Based on the answers, create the project structure. This means actually writing the files — not asking the user to do it.

**Always create:**
- `README.md` — project name, one-line description, setup instructions (update the existing one)
- `package.json` (or equivalent for the stack) — correct name, description, and dependencies for the chosen stack
- `tsconfig.json` (if TypeScript) — appropriate config for the chosen framework
- `.gitignore` — appropriate for the stack
- `src/` — entry point file appropriate for the stack (e.g. `src/index.ts`, `src/main.py`, `src/app/page.tsx`)
- Any framework-required config files (e.g. `next.config.ts`, `vite.config.ts`)

**Stack scaffolding guidance:**

| Stack | Entry point | Key files |
|-------|-------------|-----------|
| TypeScript (Node) | `src/index.ts` | `package.json`, `tsconfig.json` |
| Next.js | `src/app/page.tsx` | `next.config.ts`, `src/app/layout.tsx` |
| Python | `src/main.py` | `pyproject.toml` or `requirements.txt` |
| React (Vite) | `src/main.tsx` | `vite.config.ts`, `index.html` |

Use the appropriate scaffold for the chosen stack. If the stack isn't in this table, use your best judgment and document the choices in `.gsd/decisions.md`.

---

### Step 3 — Initialize GSD state

1. Update `.gsd/state.md`:
   - Set **Active Milestone** to `M001 — [project name] v1`
   - Set **Phase** to `Planning`
   - Set **Next Action** to `Create the M001 roadmap based on the core features: [list them]`

2. Update `.gsd/decisions.md` with initial tech stack decisions:
   ```
   | D001 | M001 | stack | Language | [chosen language] | [rationale] | No |
   | D002 | M001 | stack | Framework | [chosen framework] | [rationale] | Yes — if requirements change |
   ```

3. Create `.gsd/milestones/M001/roadmap.md` with slices derived from the core features the user listed. Follow the roadmap format from `GSD-WORKFLOW.md`. Write a boundary map. Each feature becomes one slice (or is split if complex). Order by risk — highest risk first.

---

### Step 4 — Confirm and hand off

Tell the user:
- What was scaffolded (list the files created)
- What M001 slices were created
- What to do next: "Say 'start planning' to begin the first slice, or 'discuss' to review the roadmap first."

Then delete this file (`START-HERE.md`). Onboarding is complete.
