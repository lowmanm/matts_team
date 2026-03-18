# Decisions Register

<!-- Append-only. Never edit or remove existing rows.
     To reverse a decision, add a new row that supersedes it.
     Read this file at the start of any planning or research phase. -->

| # | When | Scope | Decision | Choice | Rationale | Revisable? |
|---|------|-------|----------|--------|-----------|------------|
| D-OPT-001 | Template | runtime | Primary runtime | Copilot CLI | Closes parallelism + autopilot gaps vs Copilot Chat | No — unless CLI deprecated |
| D-OPT-002 | Template | agents | Agent format | .agent.md in .github/agents/ | Native Copilot CLI format, auto-delegated | No |
| D-OPT-003 | Template | agents | Orchestrator | Dropped | Copilot CLI orchestrates natively via /fleet | N/A |
| D-OPT-004 | Template | workflow | Workflow invocation | Skills over slash commands | Skills auto-load; slash commands require explicit call | Yes — if slash commands mature |
| D-OPT-005 | Template | state | decisions.md | Keep as-is | Better design than GSD original — immutable audit trail | No |
| D-OPT-006 | Template | agents | Agent count | 15 agents (all GSD original except user-profiler) | user-profiler is a meta-tool for personalizing Claude, not a project workflow agent | Yes — add if persona adaptation becomes valuable |
| D-OPT-007 | Template | agents | gsd-plan skill | Removed — replaced by planner agent | Full planner agent has dependency graphs, execution waves, goal-backward derivation that a skill cannot provide | No |
| D-OPT-008 | Template | agents | Roadmapper | Included (was initially skipped) | Roadmapper creates STATE.md — the project dashboard. Without it, new project initialization has no agent support. User correctly identified this gap. | No |
| D-OPT-009 | Template | agents | Research synthesizer | Included (was initially skipped) | Makes parallel /fleet research pattern work — Scout + Researcher outputs need consolidation before roadmapper runs | No |
| D-OPT-010 | Template | execution | Fresh context execution | Explicit per-task fresh context via /fleet or & | Context rot silently degrades quality; each Worker invocation gets a fresh window | No |
| D-OPT-011 | Template | state | requirements.md | Standalone traceability table per milestone | Enables plan-checker requirement coverage validation and reviewer coverage reporting | No |
| D-OPT-012 | Template | workflow | Discuss phase | gsd-discuss skill, one-question-at-a-time protocol | Captures locked decisions before planning prevents mid-execution pivots | No |
| D-OPT-013 | Template | config | config.json | .gsd/config.json with workflow feature flags | Allows per-project enable/disable of nyquist_validation and ui_safety_gate | No |
| D-OPT-014 | Template | verification | Verification output | VERIFICATION.md with YAML gaps frontmatter | Structured gaps list enables targeted re-execution of failed tasks via /agent planner --gaps | No |
| D-OPT-015 | Template | workflow | Pause/resume skills | gsd-pause + gsd-resume skills | Explicit continue.md writer/reader pair — prevents context loss mid-task and makes fresh-context resumption deterministic | No |
| D-OPT-016 | Template | agents | Boundary Map integration | IntegrationChecker uses Boundary Map as primary source | Declared → delivered → consumed contract validation catches integration failures that individual task verification misses | No |
| D-OPT-017 | Template | agents | Planner gap-closure mode | --gaps flag reads VERIFICATION.md YAML and creates fix tasks | Closes the replanning loop: Reviewer finds gaps → Planner creates targeted fix tasks → Worker closes them | No |
| D-OPT-018 | Template | state | File locations | PROJECT.md at root; requirements.md and codebase/ and research/ per milestone | PROJECT.md is top-level vision all agents load; codebase/ separates Scout outputs from slice research | No |
| D-OPT-019 | Template | agents | Planner interfaces blocks | Planner embeds `<interfaces>` sections in task plans by extracting actual type defs from codebase | Workers use embedded interfaces directly — no codebase exploration needed for cross-task data contracts | No |
| D-OPT-020 | Template | agents | Planner TDD mode | --tdd flag: T01 writes tests, T02+ implements, I/O contract embedded in T01 | Test-first planning for features with stable, pre-defined interfaces | Yes — skip if interface is uncertain |
| D-OPT-021 | Template | agents | Planner revision mode | --revise flag: targeted plan updates based on PlanChecker FAIL output | Closes PlanChecker→Planner feedback loop without full rewrite | No |
| D-OPT-022 | Template | agents | Reviewer re-verification | Step 0: load previous VERIFICATION.md, track gap closure across re-runs | Prevents re-opening closed gaps; shows verification progress | No |
| D-OPT-023 | Template | agents | Worker context loading | Worker loads PROJECT.md and codebase/CONVENTIONS.md at startup | Project vision and conventions inform implementation quality; prevents drift from established patterns | No |
