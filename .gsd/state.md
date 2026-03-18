# GSD State

**Project:** matts_team (GSD Template)
**Active Milestone:** M000 — Template Optimization
**Active Slice:** Complete
**Phase:** Ready

## What Was Done
Consolidated GSD original methodology with Copilot CLI GA capabilities:
- Converted agent persona files to .github/agents/*.agent.md definitions
- Added Reviewer agent (new — not in original GSD)
- Added .github/skills/ with gsd-plan, gsd-quick, gsd-summarize, gsd-verify
- Added .copilot/hooks/ for automatic post-task state management
- Updated GSD-WORKFLOW.md for Copilot CLI runtime with /fleet and autopilot sections
- Updated .github/copilot-instructions.md with cold-start protocol and CLI awareness
- Added .gsd/quick/ infrastructure for ad-hoc task tracking
- Updated README.md
- Added packages/gsd-sync/ — @matts-team/gsd package for cross-repo sync

## Key Decisions
- D-OPT-001: Primary runtime changed from Copilot Chat to Copilot CLI
- D-OPT-002: Agent definitions moved to .github/agents/ as native .agent.md format
- D-OPT-003: orchestrator.md dropped — Copilot CLI handles delegation natively
- D-OPT-004: Skills preferred over slash commands for workflow invocation
- D-OPT-005: decisions.md, Boundary Map, 4-rung verification ladder kept unchanged

## Blockers
- None

## Next Action
This template is ready for use on a new project.
Run START-HERE.md onboarding to initialize a new project from this template.
