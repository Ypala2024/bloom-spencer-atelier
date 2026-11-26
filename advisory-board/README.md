# Bloom & Spencer Advisory Board

**A team of 11 synthetic employees, built as Claude Code agents, that advise a luxury jeweller.**

Bloom & Spencer is a luxury jeweller in Begumpet, Hyderabad, known for lab-grown diamonds and coloured gemstones. The owner wanted a board of experts to consult before spending money, to answer client enquiries consistently, and to protect the brand. This repo is that board.

> ISM 6427 · AI for Business Innovation (FAU) · In-Class Assignment: Agents.
> This folder lives inside the Bloom & Spencer Atelier repo (the companion app is in the repo root). The board is a separate project: run Claude Code from `advisory-board/`.
> Bloom & Spencer is my cousin's company. I have their permission, and this is a concept project, not an official Bloom & Spencer product.

---

## The team (`.claude/agents/`)

| Agent | Role |
|---|---|
| 🪑 **board-chair** | Lead. Picks the specialists, runs the discussion in rounds, resolves disagreements and writes the recommendation. |
| 💎 **gemologist** | Stones, cuts, durability, treatments, lab-grown vs natural |
| 💍 **bridal-consultant** | Client enquiries and bespoke journey. **Uses the skill below.** |
| 🔨 **master-jeweller** | Can it be made? Settings, metals, workshop time |
| 📍 **hyderabad-market-analyst** | Local demand, wedding seasons, NRI clients, competitors |
| 🖤 **luxury-brand-strategist** | Guards the quiet-luxury brand. No discounts, ever. |
| 📱 **digital-growth-marketer** | Instagram → WhatsApp → consultation funnel |
| 📊 **cfo** | Margins, break-even, cash. **Runs a Python script for every number.** |
| 🚚 **sourcing-specialist** | Stone suppliers, grading reports, lead times |
| ⚖️ **compliance-advisor** | Hallmarking, lab-grown disclosure, client-data privacy (not legal advice) |
| 😈 **devils-advocate** | Pre-mortem and kill criteria before money is spent |

How the roles were chosen (18 suggested, 11 built first): [`docs/ROLES.md`](docs/ROLES.md)

## How it fits together

```
Owner's question / client enquiry
            │
            ▼
      board-chair ── reads CLAUDE.md + docs/BUSINESS.md
            │  picks 3-5 specialists
   ┌────────┼─────────┬──────────────┐
   ▼        ▼         ▼              ▼
specialist specialist  cfo ──► scripts/margin_calc.py   bridal-consultant ──► skill: bloom-spencer-bespoke-brief
   │        │         │                                 │
   └── Round 1: independent views ── Round 2: respond to conflicts ──┘
            │
            ▼
  Recommendation → sessions/   ·   Client brief → briefs/
```

- **Skill:** [`.claude/skills/bloom-spencer-bespoke-brief`](.claude/skills/bloom-spencer-bespoke-brief/SKILL.md) turns a WhatsApp enquiry into a client reply, a design brief and open questions (from the "Create your skill" assignment).
- **Code for money:** [`scripts/margin_calc.py`](scripts/margin_calc.py). AI text varies run to run, so all money maths is done in code and always gives the same answer.
- **Guardrails** ([`CLAUDE.md`](CLAUDE.md)): the agents advise but never act, never discount, always say "lab-grown", and mark unverified facts **[verify]**.

## Talking to the board: sample sessions

| Session | What happened |
|---|---|
| [NRI wedding-season private preview](sessions/2026-11-26-nri-wedding-season-preview.md) | Six agents debated a ₹4 lakh spend. The CFO ran the break-even (8 extra orders), the devil's advocate pushed for a ₹50k test first, and the chair recommended a two-phase plan. |
| [Client enquiry: emerald proposal ring](sessions/2026-11-26-client-enquiry-emerald-ring.md) | The bridal consultant ran the skill. The gemologist and master jeweller adjusted the design for a doctor who wears her ring daily. |

## Try it yourself

```bash
git clone https://github.com/Ypala2024/bloom-spencer-atelier
cd bloom-spencer-atelier/advisory-board
claude          # open Claude Code in THIS folder so it loads these agents
```
Then ask, for example:
- *"Use the board-chair agent: should we launch a Paraiba collection for Valentine's Day?"*
- *"Use the bridal-consultant agent on this enquiry: 'need diamond studs for my mom's 60th, she likes simple things, budget 1L'"*
- *"Ask the cfo: what's the margin if cost is ₹1.2 lakh and price is ₹1.85 lakh?"*

## Repo map
```
.claude/agents/      11 agent definitions
.claude/skills/      bloom-spencer-bespoke-brief skill
docs/BUSINESS.md     shared business context
docs/ROLES.md        the roles-first step
scripts/             margin_calc.py (deterministic maths)
sessions/            board discussions
briefs/              client design briefs from the skill
```
