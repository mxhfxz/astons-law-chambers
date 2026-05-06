---
trigger: always_on
---

# Personal Webflow Preferences

Referenced by `mast-framework.md` for structural and workflow decisions.

## Elements

- NEVER use the native Webflow Paragraph element. Use a text block with the appropriate Mast typography class.
- NEVER use native Webflow Container, Section, or Column blocks. Use plain div blocks with Mast classes.

## Class Structure

Use a tree hierarchy: a parent class combined with `cc-` combo classes for variants.

- Correct: `section`, `section cc-dark`, `card`, `card cc-featured`
- Incorrect: `hero_section_grid_left_content_wrapper`

## External Code

JavaScript and CSS are hosted externally via GitHub and served through jsDelivr.

- GitHub repo: `https://github.com/mxhfxz/astons-law-chambers`
- jsDelivr base URL for built files: `https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@main/dist/`
- jsDelivr base URL for standalone root files: `https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@main/`

If Windsurf can place the code directly into the project, it does so. If it cannot, it states exactly where to place it and what to paste — then pauses and waits.

## Decision Log

Every decision made during development is logged to `DECISION_LOG.md` in the project root.

Format:

| Date | Action | Reason | File / Class Affected |
|---|---|---|---|

## Rules

- Never program in parallel to existing code. Never create a duplicate of existing code.
- Pause and wait when an action requires a manual step that Windsurf cannot complete itself. Do not continue until confirmed.
- For everything else that will not break the project, continue without pausing.
