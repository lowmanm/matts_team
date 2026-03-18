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
