# New Project Onboarding

> **This file is a one-time onboarding trigger.**
> When this file exists, run the intake sequence below before doing anything else.
> Delete this file when onboarding is complete.

---

## Onboarding Sequence

You are starting a brand new project from this template. This repo (`matts_team`) is a template only — it must be detached from its git history and repointed to the user's own repository. Follow these steps in order.

---

### Step 1 — Intake

Ask the user the following questions. Ask them all at once, not one at a time:

1. **Project name** — What should this project be called? (used for folder names, package.json, README)
2. **What are you building?** — One or two sentences. What is it, and who is it for?
3. **Tech stack** — What language, framework, and runtime? (e.g. TypeScript + Next.js, Python + FastAPI, etc.) If unsure, recommend the simplest stack that fits and ask for confirmation.
4. **Core features** — List the 3-5 most important things this app must do in version 1. These will become the first milestone's slices.
5. **Constraints** — Any hard requirements? (deployment target, must integrate with X, must run offline, specific performance requirements, etc.) Say "none" if not applicable.
6. **New repo URL** — Have you already created an empty repo on GitHub/GitLab/etc. for this project? If yes, paste the URL. If no, say "not yet" and you'll add it later.

Wait for the user's answers before proceeding.

---

### Step 2 — Detach from the template repo

This folder was cloned from a template. Strip the template's git history and start fresh.

Run these commands:
```
rm -rf .git
git init
git add .gitignore
git commit -m "chore: initial commit from gsd-template"
```

Do not stage all files yet — just `.gitignore` first so build artifacts and secrets are excluded from the start.

If the user provided a new repo URL, set it as the remote:
```
git remote add origin <url>
```

If they said "not yet", tell them: "When your repo is ready, run: `git remote add origin <your-repo-url>`"

---

### Step 3 — Scaffold the project

Based on the intake answers, create the project structure. Write the actual files — do not ask the user to do it.

**Always create or update:**
- `README.md` — project name, one-line description, setup and run instructions
- `package.json` (or stack equivalent) — correct name, description, and dependencies
- `tsconfig.json` (if TypeScript) — appropriate for the chosen framework
- `.gitignore` — appropriate for the stack (replace the template's .gitignore)
- `src/` — entry point file for the chosen stack
- Any framework-required config files

**Stack scaffolding guidance:**

| Stack | Entry point | Key files |
|-------|-------------|-----------|
| TypeScript (Node) | `src/index.ts` | `package.json`, `tsconfig.json` |
| Next.js | `src/app/page.tsx` | `next.config.ts`, `src/app/layout.tsx` |
| Python | `src/main.py` | `pyproject.toml` or `requirements.txt` |
| React (Vite) | `src/main.tsx` | `vite.config.ts`, `index.html` |

If the stack isn't in this table, use your best judgment and document the decision in `.gsd/decisions.md`.

---

### Step 4 — Initialize GSD state with Roadmapper

First, record tech stack decisions in `.gsd/decisions.md`:
```
| D001 | M001 | stack | Language | [chosen language] | [rationale] | No |
| D002 | M001 | stack | Framework | [chosen framework] | [rationale] | Yes — if requirements change |
```

Then run the Roadmapper agent to generate the full project foundation:

```
/agent roadmapper
```

The Roadmapper will produce four artifacts and commit them atomically:
1. `PROJECT.md` — top-level vision document all agents load at the start of every session
2. `.gsd/milestones/M001/requirements.md` — requirement traceability table (R001, R002...)
3. `.gsd/milestones/M001/roadmap.md` — slices from core features with Boundary Map
4. `.gsd/state.md` — dashboard with active milestone and next action

Each feature becomes one slice (or is split if complex). Highest-risk slices come first.

---

### Step 5 — Initial commit of the new project

Stage all scaffolded files and commit:
```
git add .
git commit -m "chore: scaffold [project name] from gsd-template"
```

If a remote was set, push:
```
git push -u origin main
```

---

### Step 6 — Confirm and hand off

Tell the user:
- What was scaffolded (list the files created)
- What M001 slices were created in `roadmap.md`
- What requirements are in `requirements.md` (list the R-IDs and their descriptions)
- Git status: whether they're connected to a remote or still need to add one
- What to do next: "Say 'start planning' to begin the first slice, or 'discuss' to review the roadmap first."

Then delete this file (`START-HERE.md`). Onboarding is complete.
