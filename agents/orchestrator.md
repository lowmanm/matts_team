# Orchestrator — Agent Coordination

This file defines how to invoke agents in GitHub Copilot. There is no native subagent spawning — agents are simulated by operating in a named mode within the same context window, following the target agent's instructions and output format.

## Invocation Protocol

1. Announce entry: `→ [AgentName]: [task description]`
2. Operate strictly under that agent's rules and output format (defined in `agents/<agent>.md`).
3. Announce exit: `← [AgentName] complete`
4. Return to orchestration mode and continue the GSD phase.

To attach an agent definition explicitly in Copilot Chat:
```
#file:agents/scout.md
#file:agents/researcher.md
#file:agents/worker.md
```

---

## When to Use Each Agent

### Scout (`agents/scout.md`)
Use when:
- Starting a task that touches unfamiliar code
- Need to understand existing patterns, types, or import chains before building
- Verifying what files/exports already exist before creating new ones

Invoke at: **Research phase**, or at the start of Execute when the codebase is unknown.

### Researcher (`agents/researcher.md`)
Use when:
- Choosing between libraries or third-party services
- Need current API documentation, version info, or migration guides
- External knowledge is required that may be beyond the training cutoff

Invoke at: **Research phase**, or mid-Execute when an external dependency decision arises.

### Worker (`agents/worker.md`)
Use when:
- Executing a bounded, well-defined task (T-level unit of work)
- The task plan (`TNN-plan.md`) is complete and execution can proceed independently
- Isolating execution context to avoid polluting orchestration state

Invoke at: **Execute phase**, once per task.

---

## Parallel Work Pattern

When multiple independent tasks can proceed simultaneously, announce them together:

```
→ Scout: map auth module exports
→ Researcher: find current version of zod schema API
```

Run each mode sequentially (Copilot is single-threaded), but frame them as logically parallel units. Return both results before advancing.

---

## Handoff Format

When exiting an agent mode, always provide:

```
← [AgentName] complete

**Result:** [concise summary of what was found/built]
**Key files:** [paths, if applicable]
**Passes to:** [next phase or agent]
```

This keeps the orchestration state legible across long sessions.
