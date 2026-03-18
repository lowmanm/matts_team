# gsd-pause

Write a `continue.md` resume point in the active slice directory, then stop.

## When to invoke

- Context window is approaching its limit mid-task
- Session is ending before the current task is complete
- User says "pause", "save progress", or "I need to stop"

## Protocol

1. Read `.gsd/state.md` — identify the active milestone, slice, and task
2. Review what has been completed in this session and what remains
3. Identify the exact next action to resume from
4. Write `continue.md` to `.gsd/milestones/<M>/slices/<S>/continue.md`
5. Confirm the file was written and state the resume command

## `continue.md` format

```markdown
---
milestone: M001
slice: S01
task: T02
step: 3
total_steps: 7
saved_at: <ISO timestamp>
---

## Completed Work
- Bullet list of what was finished this session.

## Remaining Work
- Bullet list of steps still to do.

## Decisions Made
- Any architectural decisions and the rationale (if none, write "None").

## Next Action
The EXACT first thing to do when resuming — specific enough that a cold-start agent can execute it without ambiguity.
```

## After writing

Output one line:
`Paused. Resume with: /skill gsd-resume`
