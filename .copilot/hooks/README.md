# Copilot CLI Hooks

These hooks fire automatically at task lifecycle points.

## post-task-complete.sh
Fires via postToolUse when a task is marked done.
- Stages .gsd/ and src/ changes
- Commits with GSD naming convention
- Keeps git history clean and atomic

## Configuration
Register in `.copilot/config` or reference in your agent skill files.
Hooks must be executable: `chmod +x .copilot/hooks/*.sh`
