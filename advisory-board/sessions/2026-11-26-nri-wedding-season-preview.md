# Board session: NRI wedding-season private preview

**Date:** 26 Nov 2026 · **Chair:** `board-chair`
**Called:** `hyderabad-market-analyst`, `luxury-brand-strategist`, `digital-growth-marketer`, `cfo`, `compliance-advisor`, `devils-advocate`

> All figures below are **hypothetical inputs for the demo** [owner to confirm]. Every number comes from `scripts/margin_calc.py`.

## The question (as the owner asked it)
> "Many NRI families fly home to Hyderabad in December and January for weddings. Should we spend about ₹4 lakh on a private preview evening at the studio plus a WhatsApp concierge for them? Is it worth it?"

**Chair's framing:** Will a ₹4 lakh invitation-only preview and concierge for visiting NRI families bring enough extra bespoke orders in the next 6 months to pay back, without cheapening the brand?

---

## Round 1: independent views

**hyderabad-market-analyst**
December–January overlaps the main wedding window and the NRI travel peak, so the timing is right. This segment usually researches online before landing and has only 2–3 weeks in the city, so the pain is time, not price. Opportunity: **medium-large [estimate]**. To size it, we need the owner's count of last season's NRI orders. Two to three weeks of lead time is the real constraint for bespoke work.

**luxury-brand-strategist**
**Strengthens the brand**, as long as it's invitation-only, small (8–12 families per slot), and nothing is "on offer". Call it a *Private Preview* ("The Belgravia Evening"), not an "event". Copy: *"An unhurried evening with our gemologist and your family, while you're home for the season."* No banners, no giveaways.

**digital-growth-marketer**
Reach them **before they fly**: Instagram Stories targeted to Hyderabad-diaspora audiences in the US, UK and Gulf, plus referrals from existing clients. Run the concierge on WhatsApp: book a 30-minute video pre-consultation abroad, so the in-studio visit is for final decisions. Metrics: pre-consults booked, preview attendance, orders within 30 days. Run a **2-week test** before spending the full budget.

**cfo**
Ran the break-even with placeholder inputs:
```
$ python3 scripts/margin_calc.py breakeven --investment 400000 --order-value 150000 --margin 35 --months 6
Investment:             ₹4,00,000
Average order value:    ₹1,50,000
Gross margin:           35.0%
Gross profit per order: ₹52,500
Extra orders to break even: 8
Needed per month over 6 months: 1.3
```
**Decision rule:** worth it if it brings **at least 8 extra orders** in 6 months, at these assumptions. Take **deposits** on bespoke orders so stone purchases are covered before families fly back.

**compliance-advisor**
- **Amber:** every lab-grown piece and invitation must say "lab-grown" clearly **[verify current disclosure guidelines]**.
- **Amber:** WhatsApp numbers collected for the concierge need consent for follow-ups, and must not be reused for broadcasts without opt-in (DPDP Act, 2023 **[verify]**).
- **Green:** private invitation-only evenings, as long as there are no misleading "investment" claims.

**devils-advocate**
*Weakest assumption:* that NRI families can commit to bespoke **within a short visit**. Pre-mortem: (1) pieces can't be finished before they fly back; (2) the evening attracts browsers who were going to buy anyway; (3) ₹4 lakh is spent before we know the WhatsApp pre-consult works. *Cheaper test:* spend about ₹50k on the WhatsApp pre-consult campaign for 2 weeks first. *Kill criteria:* fewer than 10 pre-consults booked, or fewer than 2 orders from them.

---

## Round 2: responses to conflicts

**master-jeweller (called in by chair on the timing point)**
Bespoke takes **roughly 3–5 weeks** depending on stone sourcing and revisions [owner to confirm workshop capacity]. Fix: approve CAD during the video pre-consult abroad, and offer **insured courier delivery** after families return, or ready-to-wear pieces from the collection for immediate needs.

**digital-growth-marketer → devils-advocate:** Agreed. The ₹50k test is phase 1. If it hits the threshold, unlock the preview evening.

**luxury-brand-strategist → cfo:** Deposits are fine, but word them as *"securing your stones"*, not as a payment demand.

**cfo → devils-advocate:** Agree on the kill criteria. To count only incremental orders, tag NRI orders in the order book from now on so we can compare with last season.

---

## Chair's recommendation

**QUESTION:** Spend ₹4 lakh on an NRI private preview plus WhatsApp concierge for the Dec–Jan wedding season?

**BOTTOM LINE:** Yes, but in **two phases**. Test the WhatsApp video pre-consult first (about ₹50k, 2 weeks). Hold the private preview evening only if the test hits its threshold. The real risk is timing, not demand.

**RECOMMENDATION:** Do with conditions.

**WHY**
- Timing matches the wedding and NRI travel peak (`hyderabad-market-analyst`).
- Invitation-only format strengthens the brand (`luxury-brand-strategist`).
- Break-even is **8 extra orders in 6 months** at placeholder inputs (`cfo`, via script).
- Video pre-consults abroad solve the short-visit problem (`digital-growth-marketer`, `master-jeweller`).

**WHERE THE BOARD DISAGREED:** Spend up front (marketer) vs test first (devil's advocate). The chair sides with **test first**: it costs about 2 weeks and protects ₹3.5 lakh.

**RISKS & HOW TO REDUCE THEM**
- Pieces not ready before departure → CAD approval abroad, courier delivery, ready-to-wear option.
- Compliance → "lab-grown" on every invite and tag; consent for WhatsApp follow-up.
- Measuring wrongly → tag NRI orders from today.

**NEXT 3 ACTIONS**
1. Owner: confirm average order value, margin and last season's NRI orders (this week).
2. Marketer + bridal consultant: launch the 2-week WhatsApp pre-consult test (next week).
3. Chair: reconvene the board with test results before booking the evening.

**OPEN QUESTIONS FOR THE OWNER:** Workshop capacity in December? Insured courier partner for India and abroad?
