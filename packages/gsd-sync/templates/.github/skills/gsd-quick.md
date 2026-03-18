---
name: gsd-quick
description: Execute a quick ad-hoc task without full slice scaffolding. Use for
  bug fixes, config changes, small one-off features, or anything that doesn't
  warrant a full milestone slice. Still writes a summary and commits atomically.
---

Quick mode protocol — for tasks that don't need full M→S→T scaffolding:

1. Ask the user: "What do you want to do?" (one sentence)
2. Clarify scope: what files are in/out of scope
3. Create `.gsd/quick/[NNN]-[slug]/PLAN.md` with:
   - Goal (one sentence)
   - Must-haves (2-3 testable truths)
   - Steps (numbered)
4. Execute the plan
5. Verify must-haves
6. Write `.gsd/quick/[NNN]-[slug]/SUMMARY.md`
7. Commit: `fix([slug]): <what was done>` or `chore([slug]): <what was done>`
8. Update `.gsd/state.md`

Quick tasks do NOT update roadmap.md or create slice/milestone artifacts.
They are tracked only in `.gsd/quick/`.

Never skip the summary. Never skip the commit. These are non-negotiable even in quick mode.
