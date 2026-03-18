---
name: gsd-summarize
description: Write a GSD task or slice summary. Use after completing a task or
  when prompted to summarize work. Produces correctly formatted summary files
  with YAML frontmatter.
---

Task summary format (write to `T[NN]-summary.md`):

```yaml
---
id: T[NN]
parent: S[NN]
milestone: M[NNN]
provides:
  - Description of what this task built
key_files:
  - path/to/important/file.ext
duration: [estimate]
verification_result: pass | fail
completed_at: [ISO timestamp]
---
```

# T[NN]: Task Title

**One-line summary of what actually shipped.**

## What Happened

Concise prose (3-6 sentences) describing what was built and key implementation decisions.

## Deviations

What differed from the plan and why. Write "None" if nothing deviated.

## Files Created/Modified

- `path/to/file.ext` — what it does

---

Slice summary format (write to `summary.md` when all tasks in a slice are done):

# S[NN]: Slice Title — Complete

**What shipped:** One paragraph describing the demoable capability delivered.

## Tasks Completed

- T01: [title] — [one-liner]
- T02: [title] — [one-liner]

## Key Decisions Made

- Decision and rationale (if not already in decisions.md)

## What's Available Now

What the user can actually do/see now that this slice is done.
