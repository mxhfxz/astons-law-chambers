# Specification: Evaluate Penpot + Claude Code Workflow

**Issue**: workflow-eval
**Status**: review

## Overview

A workflow document was produced (Claude Web, 2026-05-13) describing a Penpot + Claude Code development system: token conventions, layer naming, CLAUDE.md discipline, subagents, hooks, and session rhythm.

The goal is to evaluate that document against the specific constraints of the Astons Law Chambers rebuild — a barrister practice site with static content, strict copy rules, 10 practice areas, and conversion paths limited to phone + WhatsApp + cal.com. Determine what to adopt as-is, what to adjust, and what to drop before any scaffolding begins.

## Requirements

### Must Have
- [ ] Every element of the document evaluated against this project's constraints
- [ ] CMS references explicitly removed (user confirmed static; content in lib/ TypeScript)
- [ ] CLAUDE.md contract includes both dev-workflow rules AND content rules (no marketing speak, entity-first, no fabricated facts, no portraits, conversion paths)
- [ ] Hook coverage mapped: which rules are enforceable at session start vs. runtime vs. neither
- [ ] Subagent roles confirmed: design-reader, code-reviewer, component-builder — with this-project-specific prompts noted
- [ ] GSAP prefers-reduced-motion assigned to a hook, not just a convention
- [ ] All gaps flagged where the document is silent on barrister-site-specific concerns

### Should Have
- [ ] Recommended CLAUDE.md structure (sections and rough line count) before any writing begins
- [ ] Hook triggers and rejection conditions for each proposed hook
- [ ] Penpot setup checklist the user can follow independently (Claude cannot access their Penpot account)

### Won't Have
- Any CMS integration (Sanity or otherwise)
- Email capture, lead magnets, or nurture sequences
- Practitioner portrait anywhere in the design or code
- Raw hex values in Penpot (token-only)

## Acceptance Criteria

- [ ] findings.md documents a clear adopt / adjust / drop verdict for each major document section
- [ ] At least one gap identified per area where the document was silent on barrister-site concerns
- [ ] Recommended CLAUDE.md outline returned for user approval before any file is written
- [ ] User explicitly approves findings before Step 2 (scaffolding) begins

## Edge Cases

| Case | Handling |
|------|----------|
| Document summary is incomplete | Flag what's missing; note it as a gap; do not invent content |
| A convention conflicts with a memory rule | Memory rule wins; flag the conflict explicitly |
| User approves findings but wants changes | Revise findings.md before proceeding to scaffolding |
