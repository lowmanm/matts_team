---
name: gsd-verify
description: Run the GSD verification ladder on completed work. Use after task
  execution or when asked to verify. Applies all four rungs in order.
---

The GSD Verification Ladder — run in order, do not skip rungs:

**Rung 1 — Static**

- Do all required files exist? (from must-haves artifacts)
- Are all required exports/functions present?
- Are all files fully implemented? (ZERO stubs, ZERO `// TODO`, ZERO placeholder returns)
- Is wiring connected? (imports resolve, routes registered, etc.)

**Rung 2 — Command**

- Run the test suite. Do tests pass?
- Run the build. Does it succeed?
- Run the linter. Is it clean?
- Report exact output for any failures.

**Rung 3 — Behavioral**

- Trace the key user flow through the code
- Verify API responses match expected format
- Check error paths are handled (not just happy path)

**Rung 4 — Human (only when you genuinely cannot verify yourself)**

- Ask the user to test a specific, observable action
- Provide exact steps: "Navigate to X, do Y, expect Z"

Verification rule: "All steps done" is NOT verification. Check actual outcomes.
If any rung fails: document failures, do not mark the task done, create fix tasks.
