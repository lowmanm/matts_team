---
name: gsd-plan
description: Plan a GSD slice. Use when the user asks to plan a slice, start
  planning, or when a new slice is ready to begin. Produces plan.md and
  individual task plan files.
---

When planning a slice:

1. Read the slice entry in `roadmap.md` — understand goal, demo, dependencies
2. Read the Boundary Map — what does this slice consume from prior slices?
3. Read `context.md` for this slice if it exists (locked user decisions)
4. Read `research.md` if Scout/Researcher agents have already run
5. Read `.gsd/decisions.md` — respect all prior decisions

Decompose the slice into tasks. Each task must:
- Fit in one context window (if unsure, split it)
- Have a clear, observable goal
- List must-haves as testable truths + required artifacts
- Specify files likely touched
- Not duplicate work done in prior tasks (check summaries)

Write `plan.md` for the slice using this format:

```markdown
# S[N]: Slice Title

**Goal:** What this slice achieves in one sentence.
**Demo:** What the user can see/do when this slice is complete.

## Must-Haves
- [ ] Observable outcome 1
- [ ] Observable outcome 2

## Tasks
- [ ] **T01: Task Title** — one-line description
- [ ] **T02: Task Title** — one-line description

## Files Likely Touched
- path/to/file.ext
```

Then write individual `T[NN]-plan.md` files for each task.

After writing: update `.gsd/state.md` to Phase: Planning Complete, next action is Execute.
