# CLAUDE.md — Bloom & Spencer Atelier

## Project identity
Companion web app for Bloom & Spencer (luxury jeweller, Hyderabad). Lets clients design a bespoke piece, learn about stones, save designs and book a consultation via WhatsApp. Separate from the main website; reuses the brand's logo, palette and product photography. Built for ISM 6427 (FAU).

## Source of truth
`docs/PRD.md` — every change must trace to a feature (F1–F8) or milestone (M1–M5).

## Tech context
- Plain HTML/CSS/JS, no build step. Entry: `index.html`. Logic: `app.js`. Content data: `data.js`. Styles: `styles.css`.
- Deploy: push to `main` → Netlify (publish dir `.`).
- No secrets in this repo. Store contact info in `CONFIG` in `data.js`.

## Brand rules
- Palette: black `#000`, white `#fff`, grey `#f5f5f5`, ink `#1a1a1a`. Accent colours only from gemstones (Paraiba `#1fb5c2`, ruby `#9b111e`, emerald `#046307`, sapphire `#0f52ba`).
- Type: Playfair Display (headings), Inter (body). Buttons: thin black outline, uppercase, letter-spaced.
- Tone: quiet luxury, unhurried, never pushy. No discounts, no "buy now".

## Agent team
See `.claude/agents/`. Orchestrator plans and delegates; Architect owns structure; Meta-agent reviews the team. Specialists: brand-designer, gem-expert, frontend-engineer, booking-integrator, qa-tester.

## Conventions
- Accessible by default: real buttons/labels, visible focus, 4.5:1 contrast.
- Mobile first (390px), no horizontal scroll.
- Always push to `main` at the end of each milestone.

## Reminders
- Confirm the store's WhatsApp number with the owner before launch.
- Keep the "concept prototype" note in the footer.
