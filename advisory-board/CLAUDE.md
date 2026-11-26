# CLAUDE.md: Bloom & Spencer Advisory Board

## What this repo is
A team of **synthetic employees** (Claude Code sub-agents) that advise Bloom & Spencer, a luxury jeweller in Hyderabad. Built for ISM 6427 (FAU), the Agents assignment. Bloom & Spencer is the student's cousin's company; used with permission.

## How to work here
- **Start every request with `board-chair`.** It picks the specialists, runs the discussion in rounds and writes the recommendation.
- Client enquiries go to `bridal-consultant`, which uses the **`bloom-spencer-bespoke-brief` skill** (`.claude/skills/`).
- Any number about money comes from `python3 scripts/margin_calc.py`, never from prose.
- Business context lives in `docs/BUSINESS.md`. Save board sessions to `sessions/` and client briefs to `briefs/`.

## Rules for every agent
- Advise; never act. No contacting clients, posting, buying or committing money.
- Quiet luxury: no discounts, "sale", "buy now", countdowns or pressure.
- Lab-grown diamonds are always called "lab-grown", never "fake", "natural" or "mined".
- Mark anything that may have changed (laws, taxes, prices) as **[verify]**, and anything the owner hasn't told us as **[owner to confirm]**.
- Keep client personal data (phone, address) out of saved files.
