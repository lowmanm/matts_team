#!/bin/bash
# postToolUse hook: fires after a task is marked complete
# Automatically updates state.md and commits

# Read current state
STATE_FILE=".gsd/state.md"
MILESTONE=$(grep "Active Milestone:" "$STATE_FILE" | sed 's/.*: //')
SLICE=$(grep "Active Slice:" "$STATE_FILE" | sed 's/.*: //')
TASK=$(grep "Active Task:" "$STATE_FILE" | sed 's/.*: //')

# Stage all .gsd/ changes and src/ changes
git add .gsd/ src/ --all

# Commit with GSD convention
SLUG=$(echo "$TASK" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g')
git commit -m "feat($SLICE/$TASK): task complete" --allow-empty-message 2>/dev/null || true

echo "✓ Hook: state committed for $TASK"
