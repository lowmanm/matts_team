---
name: gsd-discuss
description: Run the Discuss phase for a slice or milestone. Asks targeted
  questions one at a time to capture user decisions on ambiguous scope before
  planning begins. Produces context.md with locked decisions, deferred ideas,
  and discretion areas. Invoke when there are genuine decision points that
  would otherwise require guessing during planning.
---

The Discuss phase captures decisions before planning — preventing mid-execution pivots and replanning waste.

## When to Use

Run before planning when:
- Technology choices aren't determined by the existing stack
- UX behavior has multiple reasonable approaches
- Scope boundaries are genuinely unclear
- Data model decisions have meaningful tradeoffs

Skip when:
- Requirements are fully specified with no ambiguity
- Decisions are already in `decisions.md` or `context.md`
- The right answer is obvious given the stack and constraints

## Protocol

1. Read the slice entry in `roadmap.md` and `requirements.md` — understand what's being built
2. Read `.gsd/decisions.md` and any existing `context.md` — don't re-ask answered questions
3. Identify genuine decision points — areas where you'd otherwise guess or assume
4. Ask **ONE question at a time**. Not a list. One question, wait for the answer, then ask the next.
5. Categorize each answer (see below)
6. After all questions are answered, write `context.md`

## What Qualifies as a Decision Point

**Ask about:**
- Technology choices: "JWT sessions or database sessions for auth?"
- UX behavior: "After login, redirect to dashboard or back to the page they came from?"
- Data modeling: "Store user preferences as JSON blob or normalized columns?"
- Scope: "Should password reset be in this slice or the next?"
- Integration: "Which email provider — Resend, Postmark, or SendGrid?"

**Don't ask about:**
- Implementation details you should just decide (naming, file structure, code style)
- Questions with an obvious answer given the existing stack
- Anything already captured in `decisions.md`
- Hypothetical future requirements ("should we support X later?")

## Answer Categories

Each user answer becomes one of three types:

- **Decision (locked):** User made a specific call → implement exactly as specified, no deviation
- **Deferred (out of scope):** User said "not now" → this idea must not appear in plans for this slice
- **Discretion (your call):** User said "use your judgment" → you decide during implementation

## Output

Write `context.md` to the active slice directory `.gsd/milestones/<M>/slices/<S>/context.md`:

```markdown
# Context: S[NN] — [Slice Title]

## Decisions (locked — implement exactly as specified)
- **Auth strategy:** JWT stored in httpOnly cookie — not localStorage
- **Post-login redirect:** Dashboard (`/dashboard`) — not back to prior page
- **Email provider:** Resend — already in stack from S01

## Deferred (out of scope for this slice — never appears in plans)
- OAuth/social login — deferred to S04
- Two-factor authentication — deferred to post-MVP

## Discretion (implementation choice — your judgment during execution)
- Error message copy — match existing app tone
- Loading state behavior — follow existing patterns
```

After writing: update `.gsd/state.md` to note "Discuss phase complete — context.md written. Ready for /agent researcher then /agent planner."

If no genuine decision points exist: state this explicitly and skip writing context.md.
