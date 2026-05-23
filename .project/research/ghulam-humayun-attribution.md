# Ghulam Humayun — attribution research

**Date:** 2026-05-17 (data-stripped 2026-05-17 at client request)
**Purpose:** Separate what belongs to Ghulam Humayun the individual and to Astons from what
belongs to other firms he works with.

> **Note:** This report originally listed the specific identifiers (numbers, addresses, other
> firms' contact details) found during the research. At the client's request those have been
> removed so they cannot be picked up during the website build. What remains is the conclusion
> only. The build rule is in `verified_facts.md` → "Do not import external 'Ghulam Humayun' data".

---

## What the research found

Over his career Ghulam Humayun has worked with or at several different law firms. Only one of
them is **Astons Law Chambers**. He is also not the only person of that name practising law in
England — public records contain several unrelated people called "Ghulam Humayun".

A prior build session searched the web, found identifiers belonging to one of those *other*
firms — a BSB number, an address, and some biography lines — and wrongly placed them on the
Astons site as if they were Astons' own. They were logged in memory as "fabrications". They
were not invented; they were real facts about a different firm, attached to the wrong entity.

The correction matters because it is a different and more serious mistake than inventing data:
publishing another firm's regulatory identity as your own is a misattribution. The fix is the
same either way — none of it goes on the Astons site — but the rule that prevents a repeat is
"never import identifiers from the web", not just "don't make things up".

## What is genuinely Astons / Ghulam

Confirmed and safe to use — all of this is in `verified_facts.md`:

- Ghulam Humayun is a **practising barrister, regulated by the Bar Standards Board** (client-confirmed 2026-05-17).
- Admitted as a solicitor in 2007; he later moved to the Bar. The 2007 date is the only safe
  anchor for length of practice — attach experience to him, never to the firm.
- The company behind Astons Law Chambers is recently incorporated (late 2024). Any "decades" or
  "over 20 years" claim must describe Ghulam's personal practice, never the firm's age.
- Astons' only contact and identity data is the verified list at the top of `verified_facts.md`.

## Resolved by the client 2026-05-17

- **Barrister status:** Ghulam is a practising barrister. The "London barrister practice" framing is correct.
- **BSB regulation:** The practice is regulated by the Bar Standards Board because Ghulam is a
  BSB-regulated barrister. Write "Regulated by the Bar Standards Board" with no number.
- **Partner firms:** Ghulam works with many firms. They do not need to be named on the site and
  there is no legal requirement to name them. Legal-aid copy stays "arranged through partner
  solicitor firms" with no firm names.

## Standing rule

Never take a BSB number, SRA number, firm name, address, email, phone number, or bio detail
from a web search or third-party site and treat it as Astons' or Ghulam's. If a build needs a
detail that is not on the verified list, ask the client — do not source it from the web.
