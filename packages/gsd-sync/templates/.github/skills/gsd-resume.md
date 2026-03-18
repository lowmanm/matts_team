# gsd-resume

Read and delete `continue.md`, then pick up from "Next Action".

## When to invoke

- Starting a new session after a pause
- User says "resume", "continue", or "pick up where we left off"
- `continue.md` exists in the active slice directory

## Protocol

1. Read `.gsd/state.md` — identify the active milestone and slice
2. Check for `continue.md` at `.gsd/milestones/<M>/slices/<S>/continue.md`
3. If `continue.md` does not exist — report "No pause point found" and read `state.md` for next action instead
4. If `continue.md` exists:
   a. Read it fully — load all context (Completed Work, Remaining Work, Decisions Made, Next Action)
   b. Delete `continue.md`
   c. Re-read `.gsd/decisions.md` — respect any decisions recorded during the paused session
   d. Re-read the active task's `T[NN]-plan.md` for full context
   e. Execute "Next Action" immediately — no recap, no preamble

## Important

- Delete `continue.md` BEFORE starting work — prevents stale resume loops
- Do not ask the user what to do next — the "Next Action" field is the answer
- If the next action is ambiguous, read the task plan to resolve it; only ask the user if genuinely unresolvable
