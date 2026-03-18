# @matts-team/gsd

Sync shared GSD (Get Stuff Done) workflow infrastructure into any project repo. Manages the methodology reference doc, agent definitions, and Copilot instructions from a single source of truth.

## What Gets Synced

| File | Behaviour |
|------|-----------|
| `GSD-WORKFLOW.md` | Always overwritten — source of truth |
| `CLAUDE.md` | Always overwritten — source of truth |
| `agents/orchestrator.md` | Always overwritten |
| `agents/scout.md` | Always overwritten |
| `agents/researcher.md` | Always overwritten |
| `agents/worker.md` | Always overwritten |
| `.github/copilot-instructions.md` | Skipped if exists — use `--force` to overwrite |

**Never touched:** `.gsd/`, `START-HERE.md`, `src/`, project config files.

## Usage

```bash
# Update shared GSD files in the current project
npx @matts-team/gsd sync

# Also overwrite .github/copilot-instructions.md
npx @matts-team/gsd sync --force

# Preview what would change without writing
npx @matts-team/gsd sync --dry-run
```

## Install as a devDependency

Add to your project so `npm run sync` works without `npx`:

```json
{
  "devDependencies": {
    "@matts-team/gsd": "^1.0.0"
  },
  "scripts": {
    "sync": "gsd sync"
  }
}
```

Then:
```bash
npm install
npm run sync
```

## Publishing (GitHub Packages)

```bash
# Authenticate with GitHub Packages
npm login --registry=https://npm.pkg.github.com

# Publish
npm publish
```

Requires a GitHub Personal Access Token with `write:packages` scope.

## Updating the Shared Files

1. Edit files in `templates/` in this repo.
2. Bump the version in `package.json`.
3. Publish: `npm publish`.
4. In each project: `npm run sync` to pull the update.
