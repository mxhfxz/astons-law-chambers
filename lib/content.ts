// Server-side reader for the ported prototype HTML fragments.
// Fragments live in /content and are injected verbatim (the markup is the
// approved design — see SESSION-HANDOFF 2026-05-17). Runs at build time for
// the statically generated routes.
import fs from 'fs'
import path from 'path'

function read(rel: string): string {
  return fs.readFileSync(path.join(process.cwd(), 'content', rel), 'utf-8')
}

export function readSection(name: string): string {
  return read(`sections/${name}.html`)
}

export function readChrome(name: string): string {
  return read(`chrome/${name}.html`)
}
