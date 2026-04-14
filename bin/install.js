#!/usr/bin/env node
/**
 * forja-landing installer
 * Copies the landing scaffolding + Claude Code skill into the current project.
 *
 * Usage:
 *   npx forja-landing init
 */

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const SKILL_NAME = 'forja-landing'
const VERSION = '0.1.0'

const args = process.argv.slice(2)
const cmd = args[0] ?? 'init'

if (cmd === '--version' || cmd === '-v') {
  console.log(VERSION)
  process.exit(0)
}

if (cmd !== 'init') {
  console.log(`Usage: npx forja-landing init`)
  process.exit(0)
}

// ── Resolve paths ─────────────────────────────────────────────────────────────

const pkgRoot = resolve(__dirname, '..')
const skillSrc = join(pkgRoot, 'skill')
const projectRoot = process.cwd()
const skillTarget = join(projectRoot, '.claude', 'skills', SKILL_NAME)

console.log(`\n🔨 forja-landing v${VERSION}`)
console.log(`   The landing skill made by Carlos Domínguez\n`)
console.log(`   → https://carlosdominguez.com.mx\n`)

// ── Pre-flight: detect Next.js project ────────────────────────────────────────

const pkgJsonPath = join(projectRoot, 'package.json')
if (!existsSync(pkgJsonPath)) {
  console.error('✗ No package.json found in current directory.')
  console.error('  Run this inside a Next.js project (App Router).')
  process.exit(1)
}

const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'))
const hasNext = pkgJson.dependencies?.next || pkgJson.devDependencies?.next
if (!hasNext) {
  console.error('✗ Next.js not found in dependencies.')
  console.error('  Bootstrap a Next.js project first: npx create-next-app@latest')
  process.exit(1)
}

// ── Install skill into .claude/skills/ ────────────────────────────────────────

console.log(`  Installing skill to .claude/skills/${SKILL_NAME}/...`)
mkdirSync(skillTarget, { recursive: true })
cpSync(skillSrc, skillTarget, { recursive: true })
console.log(`  ✓ Skill files copied.`)

// ── Update skills-lock.json ───────────────────────────────────────────────────

const lockPath = join(projectRoot, 'skills-lock.json')
let lock = { version: 1, skills: {} }
if (existsSync(lockPath)) {
  try {
    lock = JSON.parse(readFileSync(lockPath, 'utf8'))
  } catch {
    /* start fresh */
  }
}
lock.skills = lock.skills ?? {}
lock.skills[SKILL_NAME] = {
  source: `Carlos-Dominguez-faber/${SKILL_NAME}`,
  sourceType: 'github',
  version: VERSION,
}
writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n', 'utf8')
console.log(`  ✓ skills-lock.json updated.`)

// ── Done ──────────────────────────────────────────────────────────────────────

console.log(`
🔨 Done! forja-landing ${VERSION} is installed.

Next steps:
  1. Open this project in Claude Code
  2. Run:  /forja build
  3. Then: /forja critique
  4. Then: /forja audit

Optional — for the Seedance hero video:
  Add MUAPI_API_KEY to .env.local (get a key at https://muapi.ai)

Questions? https://github.com/Carlos-Dominguez-faber/forja-landing/issues
`)
