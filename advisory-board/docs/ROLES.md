# Step 1: "What experts would this project need?"

Following the class method (Nov 17): describe the project, ask Claude which expert roles it needs, then create an agent for each chosen role.

**Prompt used**
> Bloom & Spencer is a luxury jeweller in Hyderabad (lab-grown diamonds and coloured gemstones, bespoke design). I want an advisory board of synthetic experts the owner can talk to before decisions and use to handle client enquiries. List every expert role this business would need, then recommend which to build first.

## Roles suggested (18)
| # | Role | Built? |
|---|---|---|
| 1 | Board chair / lead coordinator | ✅ `board-chair` |
| 2 | Gemologist | ✅ `gemologist` |
| 3 | Bridal & bespoke consultant | ✅ `bridal-consultant` |
| 4 | Master jeweller / CAD lead | ✅ `master-jeweller` |
| 5 | Local market analyst (Hyderabad) | ✅ `hyderabad-market-analyst` |
| 6 | Luxury brand strategist | ✅ `luxury-brand-strategist` |
| 7 | Digital growth marketer | ✅ `digital-growth-marketer` |
| 8 | CFO / pricing | ✅ `cfo` |
| 9 | Sourcing & supply specialist | ✅ `sourcing-specialist` |
| 10 | Compliance & risk advisor | ✅ `compliance-advisor` |
| 11 | Devil's advocate / skeptic | ✅ `devils-advocate` |
| 12 | Visual merchandiser (studio display) | later |
| 13 | Photographer / content producer | later |
| 14 | After-sales & care specialist | later |
| 15 | NRI client relationship manager | later |
| 16 | HR & training lead | later |
| 17 | E-commerce / website product manager | later |
| 18 | Corporate gifting sales lead | later |

**Why these 11 first:** they cover the three jobs the owner asked for (decisions, enquiries, brand protection) with one lead to coordinate and one skeptic to keep the board honest. The others can be added later as `.claude/agents/*.md` files without changing anything else.
