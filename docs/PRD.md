# PRD — Bloom & Spencer Atelier

**Owner:** Y. Pala (ISM 6427, FAU) · **Status:** v1 · **Type:** companion web app (separate from bloomandspencer.com)

## 1. Executive summary
Bloom & Spencer is a luxury jeweller in Begumpet, Hyderabad (lab-grown diamonds, ruby, emerald, sapphire, Paraiba). Today customers browse the catalogue on the website and then call or WhatsApp — there is no way to explore a custom piece or book a consultation online. **Atelier** is a mobile-first companion app that lets a client design a bespoke piece, learn which stone suits them, save designs, and book a consultation that arrives at the store as a ready-to-read WhatsApp message.

## 2. Value proposition
"Arrive at your consultation already knowing what you love." Clients get a calm, private place to explore; the store gets warm leads with the design, budget and preferred time already written down.

## 3. Target user (psychographic)
**Ananya, 29, Hyderabad** — marketing manager, engaged, planning a wedding in 7 months. Browses Instagram for jewellery at night, saves screenshots, feels intimidated walking into a high-end store without knowing the vocabulary (cut? carat? Paraiba?). Values: craftsmanship, individuality, ethics (likes that diamonds are lab-grown). Fear: being upsold or looking uninformed. Desire: a piece that feels like hers, chosen with confidence.
Secondary: **Rohan, 34**, buying an anniversary gift, short on time, wants to send his wife's preferences straight to the jeweller.

## 4. Features (v1)
| # | Feature | Acceptance criteria |
|---|---|---|
| F1 | **Atelier designer** | Choose piece (ring, studs, pendant, bracelet), stone (diamond, ruby, emerald, sapphire, Paraiba), cut (round, oval, pear, marquise, princess, emerald), metal (yellow gold, white gold, rose gold, platinum), size (0.5–3 ct). Live illustrated preview updates instantly. Summary card lists every choice. |
| F2 | **Inspired-by collection** | For the chosen piece type, show 3 real Bloom & Spencer pieces (photo, name, link to the product page). |
| F3 | **Stone guide** | One card per stone: colour, character, hardness (Mohs), why people choose it, link to the collection. |
| F4 | **"Which stone is you?" quiz** | 4 questions → a recommended stone with a reason; one tap applies it to the designer. |
| F5 | **My designs (wishlist)** | Save up to 12 designs on the device; view, load back into designer, delete. |
| F6 | **Book a consultation** | Name, phone, preferred date (today or later), time slot, in-store or video, occasion, budget range, notes, "attach my current design". Submits by opening WhatsApp to the store with a formatted message; email fallback. Validates required fields. |
| F7 | **Brand fidelity** | Uses the Bloom & Spencer logo, black/white/grey palette, Playfair-style serif + clean sans, outlined uppercase buttons, real product photography. |
| F8 | **Prototype label** | Footer states this is a concept companion app built for a university project. |

Out of scope v1: payments, live pricing, accounts/login, real inventory.

## 5. Tech stack
Static site (HTML/CSS/vanilla JS, no build step) → GitHub (main) → Netlify. Product images hot-linked from bloomandspencer.com. Designs saved in localStorage. Booking via `https://wa.me/<number>?text=` deep link. Store contact details live in one config object.

## 6. Milestones
- **M1 — Shell & brand:** layout, header, hero, footer, navigation, palette, typography, responsive grid.
- **M2 — Atelier designer:** options, live SVG preview, summary, inspired-by collection.
- **M3 — Stone guide & quiz.**
- **M4 — My designs & booking** (WhatsApp/email hand-off, validation).
- **M5 — QA:** accessibility (labels, focus, contrast), mobile 390px, no console errors, deploy.

Each milestone is pushed to `main` and is usable on its own.

## 7. Success metrics
Consultation requests per week; % of requests that include a design; time from first visit to booking < 5 min.

## 8. Risks
- Store phone number shown on the website differs from the number the buttons dial — confirm with the owner; it lives in `CONFIG.whatsapp`.
- Hot-linked images break if the website changes paths — fall back to a neutral tile.
