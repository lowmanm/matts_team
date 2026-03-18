import { copyFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = join(__dirname, '..', 'templates')

/**
 * Files synced on every `gsd sync` — shared methodology infrastructure.
 * These should never be manually edited in a project repo.
 */
const SYNC_FILES = [
  'GSD-WORKFLOW.md',
  'CLAUDE.md',
  '.github/agents/scout.agent.md',
  '.github/agents/researcher.agent.md',
  '.github/agents/worker.agent.md',
  '.github/agents/reviewer.agent.md',
  '.github/skills/gsd-plan.md',
  '.github/skills/gsd-quick.md',
  '.github/skills/gsd-summarize.md',
  '.github/skills/gsd-verify.md',
]

/**
 * Files only written when --force is passed or they don't exist yet.
 * These may have been customized per-project.
 */
const PROTECTED_FILES = [
  '.github/copilot-instructions.md',
]

/**
 * Copy a single file from the templates directory to the target project.
 * Creates parent directories as needed.
 */
async function copyTemplate(file, targetDir) {
  const src = join(TEMPLATES_DIR, file)
  const dest = join(targetDir, file)
  const destDir = dirname(dest)

  if (!existsSync(destDir)) {
    await mkdir(destDir, { recursive: true })
  }

  await copyFile(src, dest)
}

/**
 * Sync shared GSD files into the target project directory.
 *
 * @param {string} targetDir  - Absolute path to the project root.
 * @param {object} options
 * @param {boolean} options.force  - Overwrite protected files even if they exist.
 * @param {boolean} options.dryRun - Print what would happen without writing.
 * @returns {{ updated: string[], skipped: string[], errors: { file: string, error: Error }[] }}
 */
export async function sync(targetDir, { force = false, dryRun = false } = {}) {
  const updated = []
  const skipped = []
  const errors = []

  const candidates = [
    ...SYNC_FILES.map((f) => ({ file: f, protected: false })),
    ...PROTECTED_FILES.map((f) => ({ file: f, protected: true })),
  ]

  for (const { file, protected: isProtected } of candidates) {
    const dest = join(targetDir, file)
    const alreadyExists = existsSync(dest)

    if (isProtected && alreadyExists && !force) {
      skipped.push(file)
      continue
    }

    if (dryRun) {
      updated.push(file)
      continue
    }

    try {
      await copyTemplate(file, targetDir)
      updated.push(file)
    } catch (err) {
      errors.push({ file, error: err })
    }
  }

  return { updated, skipped, errors }
}
