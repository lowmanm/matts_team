# GSD Workflow — Manual Bootstrap Protocol

> This document teaches you how to operate the GSD planning methodology.
>
> **When to read this:** At the start of any session working on GSD-managed work.
>
> **After reading this, always read `.gsd/state.md` to find out what's next.**
> If the milestone has a `context.md`, read that too — it contains project-specific decisions,
> reference paths, and implementation guidance that this generic methodology doc does not.

---

## Quick Start: "What's next?"

Read these files in order and act on what they say:

1. **`.gsd/state.md`** — Where are we? What's the next action?
2. **`.gsd/milestones/<active>/roadmap.md`** — What's the plan? Which slices are done?
3. **`.gsd/milestones/<active>/context.md`** — Project-specific decisions and constraints.
4. If a slice is active, read its **`plan.md`** — Which tasks exist? Which are done?
5. If a task was interrupted, check for **`continue.md`** in the active slice directory.

Then do the thing `state.md` says to do next.

---

## The Hierarchy

```
Milestone  →  a shippable version (4-10 slices)
  Slice    →  one demoable vertical capability (1-7 tasks)
    Task   →  one context-window-sized unit of work
```

**The iron rule:** A task MUST fit in one context window. If it can't, it's two tasks.

---

## File Locations

```
.gsd/
  state.md                                  # Dashboard — always read first
  decisions.md                              # Append-only decisions register
  milestones/
    M001/
      roadmap.md                            # Milestone plan (checkboxes = state)
      context.md                            # Optional: user decisions from discuss phase
      research.md                           # Optional: codebase/tech research
      summary.md                            # Milestone rollup (updated as slices complete)
      slices/
        S01/
          plan.md                           # Task decomposition for this slice
          context.md                        # Optional: slice-level user decisions
          research.md                       # Optional: slice-level research
          summary.md                        # Slice summary (written on completion)
          uat.md                            # Non-blocking human test script
          continue.md                       # Ephemeral: resume point if interrupted
          tasks/
            T01-plan.md                     # Individual task plan
            T01-summary.md                  # Task summary with frontmatter
```

---

## File Format Reference

### `roadmap.md`

```markdown
# M001: Title of the Milestone

**Vision:** One paragraph describing what this milestone delivers.

**Success Criteria:**
- Observable outcome 1
- Observable outcome 2

---

## Slices

- [ ] **S01: Slice Title** `risk:low` `depends:[]`
  > After this: what the user can demo when this slice is done.

- [ ] **S02: Another Slice** `risk:medium` `depends:[S01]`
  > After this: demo sentence.

- [x] **S03: Completed Slice** `risk:low` `depends:[S01]`
  > After this: demo sentence.

## Boundary Map

### S01 → S02
Produces:
  types.ts → User, Session (interfaces)
  auth.ts  → generateToken(), verifyToken()

Consumes: nothing (leaf node)
```

### `plan.md` (slice-level)

```markdown
# S01: Slice Title

**Goal:** What this slice achieves.
**Demo:** What the user can see/do when this is done.

## Must-Haves
- Observable outcome 1 (used for verification)
- Observable outcome 2

## Tasks

- [ ] **T01: Task Title**
  Description of what this task does.

- [ ] **T02: Another Task**
  Description.

## Files Likely Touched
- path/to/file.ts
```

### `TNN-plan.md` (task-level)

```markdown
# T01: Task Title

**Slice:** S01
**Milestone:** M001

## Goal
What this task accomplishes in one sentence.

## Must-Haves

### Truths
Observable behaviors that must be true when this task is done:
- "User can sign up with email and password"

### Artifacts
Files that must exist with real implementation (not stubs):
- `src/lib/auth.ts` — JWT helpers (exports: generateToken, verifyToken)

### Key Links
- `login/route.ts` → `auth.ts` via import of `generateToken`

## Steps
1. First thing to do
2. Second thing to do

## Context
- Relevant prior decisions or patterns to follow
```

### `state.md`

```markdown
# GSD State

**Active Milestone:** M001 — Title
**Active Slice:** S02 — Slice Title
**Active Task:** T01 — Task Title
**Phase:** Executing

## Recent Decisions
- Decision 1

## Blockers
- None

## Next Action
Exact next thing to do.
```

### `decisions.md` (append-only register)

```markdown
# Decisions Register

| # | When | Scope | Decision | Choice | Rationale | Revisable? |
|---|------|-------|----------|--------|-----------|------------|
| D001 | M001/S01 | library | Validation library | Zod | Type inference, already in deps | No |
```

**Rules:** Append-only. To reverse a decision, add a new row that supersedes it.

---

## The Phases

### Phase 1: Discuss (Optional)
**Purpose:** Capture user decisions on gray areas before planning.
**Produces:** `context.md`
**When to use:** When the scope has ambiguities the user should weigh in on.

### Phase 2: Research (Optional)
**Purpose:** Scout the codebase and relevant docs before planning.
**Produces:** `research.md`
**When to use:** When working in unfamiliar code or with unfamiliar libraries.

### Phase 3: Plan
**Purpose:** Decompose work into context-window-sized tasks with must-haves.
**Produces:** `roadmap.md`, `plan.md`, individual `TNN-plan.md` files.

### Phase 4: Execute
**Purpose:** Do the work for one task.
**Produces:** Code changes.

Steps:
1. Read the task's `TNN-plan.md`.
2. Read relevant summaries from prior tasks.
3. Execute each step. Mark progress with `[DONE:n]` in responses.
4. If you made an architectural decision, append it to `.gsd/decisions.md`.

### Phase 5: Verify
**Purpose:** Check that the task's must-haves are actually met.

Verification ladder:
1. **Static:** Files exist, exports present, wiring connected, not stubs.
2. **Command:** Tests pass, build succeeds, lint clean.
3. **Behavioral:** Browser flows work, API responses correct.
4. **Human:** Ask the user only when you genuinely can't verify yourself.

**The rule:** "All steps done" is NOT verification. Check the actual outcomes.

### Phase 6: Summarize
**Purpose:** Record what happened for downstream tasks.
**Produces:** `TNN-summary.md`, and when slice completes, `summary.md`.

Task summary format:
```markdown
---
id: T01
parent: S01
milestone: M001
provides:
  - What this task built
key_files:
  - path/to/important/file.ts
duration: 15min
verification_result: pass
completed_at: 2026-01-01T16:00:00Z
---

# T01: Task Title

**Substantive one-liner — what actually shipped**

## What Happened
Concise prose narrative of what was built and key decisions made.

## Deviations
What differed from the plan and why (or "None").

## Files Created/Modified
- `path/to/file.ts` — What it does
```

### Phase 7: Advance
**Purpose:** Mark work done and move to the next thing.

After a task completes:
1. Mark the task done in `plan.md` (checkbox).
2. Check if there's a next task → execute it.
3. If slice complete → write slice summary, mark slice done in `roadmap.md`.

After a slice completes:
1. Write slice `summary.md`.
2. Write `uat.md` — a human test script (non-blocking).
3. Mark the slice `[x]` in `roadmap.md`.
4. Update `state.md`.
5. Continue to next slice immediately.

---

## Continue-Here Protocol

**When to write `continue.md`:** Before losing context (session end, context pressure).

```markdown
---
milestone: M001
slice: S01
task: T02
step: 3
total_steps: 7
saved_at: 2026-01-01T15:30:00Z
---

## Completed Work
- What's already done.

## Remaining Work
- What steps remain.

## Decisions Made
- Key decisions and WHY.

## Next Action
The EXACT first thing to do when resuming.
```

**How to resume:** Read `continue.md`, delete it, pick up from "Next Action".

---

## Git Strategy: Branch-Per-Slice with Squash Merge

1. **Slice starts** → create branch `gsd/M001/S01` from main
2. **Per-task commits** on the branch
3. **Slice completes** → squash merge to main as one clean commit
4. **Branch deleted**

Commit conventions:
| When | Format |
|------|--------|
| After task verified | `feat(S01/T02): <what was built>` |
| Plan/docs committed | `docs(S01): add slice plan` |
| Slice squash to main | `feat(M001/S01): <slice title>` |

---

## Checklist for a Fresh Session

1. Read `.gsd/state.md` — what's the next action?
2. Check for `continue.md` in the active slice — interrupted work?
3. If resuming: read `continue.md`, delete it, pick up from "Next Action".
4. If starting fresh: read the active slice's `plan.md`, find the next incomplete task.
5. Read `.gsd/decisions.md` — respect existing decisions.
6. Read relevant summaries from prior tasks/slices for context.
7. Do the work.
8. Verify the must-haves.
9. Write the summary.
10. Mark done, update `state.md`, advance.
