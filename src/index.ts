import { ClaudeAgent } from '@anthropic-ai/claude-agent-sdk'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

// ---------------------------------------------------------------------------
// GSD Agent — entry point for local VS Code development
//
// This is a thin wrapper around the Claude Agent SDK. The GSD methodology
// lives in CLAUDE.md (loaded automatically by the SDK) and GSD-WORKFLOW.md.
//
// Usage:
//   npm run build && node dist/index.js "your prompt here"
//   Or via VS Code launch config: Run Agent
// ---------------------------------------------------------------------------

const projectRoot = new URL('..', import.meta.url).pathname

function loadSystemPrompt(): string {
  const claudeMd = join(projectRoot, 'CLAUDE.md')
  const workflowMd = join(projectRoot, 'GSD-WORKFLOW.md')

  const parts: string[] = []

  if (existsSync(claudeMd)) {
    parts.push(readFileSync(claudeMd, 'utf-8'))
  }

  if (existsSync(workflowMd)) {
    parts.push('\n\n---\n\n')
    parts.push(readFileSync(workflowMd, 'utf-8'))
  }

  return parts.join('')
}

async function main() {
  const prompt = process.argv.slice(2).join(' ')

  if (!prompt) {
    console.error('Usage: node dist/index.js "your prompt here"')
    process.exit(1)
  }

  const agent = new ClaudeAgent({
    systemPrompt: loadSystemPrompt(),
    cwd: projectRoot,
  })

  const result = await agent.run(prompt)
  console.log(result)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
