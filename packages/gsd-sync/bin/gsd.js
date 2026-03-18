#!/usr/bin/env node
import { sync } from '../src/sync.js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'))

const USAGE = `
gsd — GSD workflow sync tool v${pkg.version}

USAGE
  gsd sync [options]

COMMANDS
  sync          Copy shared GSD files into the current project.
                Syncs: GSD-WORKFLOW.md, CLAUDE.md, agents/
                Skips: .github/copilot-instructions.md (unless --force)

OPTIONS
  --force       Also overwrite .github/copilot-instructions.md even if it
                already exists (may overwrite project customisations).
  --dry-run     Print what would be written without making changes.
  --version     Print version and exit.
  --help        Print this message and exit.

EXAMPLES
  npx @matts-team/gsd sync
  npx @matts-team/gsd sync --force
  npx @matts-team/gsd sync --dry-run
`.trim()

const args = process.argv.slice(2)
const command = args.find((a) => !a.startsWith('-'))
const flags = {
  force: args.includes('--force'),
  dryRun: args.includes('--dry-run'),
  help: args.includes('--help') || args.includes('-h'),
  version: args.includes('--version') || args.includes('-v'),
}

if (flags.version) {
  console.log(pkg.version)
  process.exit(0)
}

if (flags.help || !command) {
  console.log(USAGE)
  process.exit(0)
}

if (command !== 'sync') {
  console.error(`Unknown command: ${command}`)
  console.error(`Run 'gsd --help' for usage.`)
  process.exit(1)
}

const targetDir = process.cwd()

console.log(`GSD sync → ${targetDir}${flags.dryRun ? ' (dry run)' : ''}`)
console.log()

const { updated, skipped, errors } = await sync(targetDir, {
  force: flags.force,
  dryRun: flags.dryRun,
})

for (const file of updated) {
  console.log(`  ${flags.dryRun ? '[would update]' : '[updated]'}  ${file}`)
}

for (const file of skipped) {
  console.log(`  [skipped]   ${file}  (already exists — use --force to overwrite)`)
}

for (const { file, error } of errors) {
  console.error(`  [error]     ${file}  ${error.message}`)
}

console.log()

if (errors.length > 0) {
  console.error(`Sync completed with ${errors.length} error(s).`)
  process.exit(1)
}

const action = flags.dryRun ? 'Would update' : 'Updated'
console.log(`${action} ${updated.length} file(s). ${skipped.length > 0 ? `Skipped ${skipped.length} protected file(s).` : ''}`)
