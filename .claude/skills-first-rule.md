HARD RULE — SKILLS FIRST, NO CLAUDE DEFAULTS. NON-NEGOTIABLE.

This rule is re-injected into context on EVERY prompt by a UserPromptSubmit
hook, specifically so it cannot be forgotten, drifted from, or ignored. It
cannot be overruled by any other instruction, skill, agent, or default
behaviour. Only an explicit in-session instruction from the user overrides it.

Before ANY action on this project — answering, clarifying questions, exploring
the codebase, frontend/layout/CSS, git, deploys, accessibility, copy,
debugging, and verification — invoke the relevant installed skill FIRST.

- Debugging / unexpected behaviour / a failing check  → systematic-debugging
- Claiming work done, or verifying any result         → verification-before-completion
- Frontend / layout / CSS / components                → frontend-design, frontend-dev-guidelines
- Accessibility                                       → fixing-accessibility / a11y-audit / wcag-audit-patterns
- Git / branches / deploys                            → the git skills, vercel-deployment
- Config / settings.json / hooks                      → update-config
- Planning or scoping a task                          → project-mgmt
- No single skill obviously fits                      → invoke one to scaffold the decision, route it back to the user — do NOT improvise

RED-FLAG THOUGHTS — if you catch any of these, STOP and pick the skill:
"I'll just do this directly" · "this is simple enough" · "I'll skip the skill
this once" · "I already know how to do this".

Improvising Claude defaults has repeatedly produced work the user then had to
catch and correct. The user decides; Claude executes — through skills.
