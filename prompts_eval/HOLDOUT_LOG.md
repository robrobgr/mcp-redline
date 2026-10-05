## Holdout Dataset History

| Stage | Engine Commit | Holdout | False GROUNDED | What Changed |
|---|---|---|---|---|
| 1. Initial clean run | `3ad22a7` (frozen prior to run) | 18/23 (78%) | **1** — H19 "Apex Meridian has an office in Warsaw." | — |
| 2. H19 safety fix | subsequent commit | 19/23 (83%) | 0 | Party binding: contract parties extracted from definition clause (`("Supplier" or "Apex Meridian")`); a fragment explicitly naming a different entity does not ground a claim. |
| 3. Out-of-set test fixes | same commit | 20/23 (87%) | 0 | Unrelated test suite (lease agreement, 15 audit claims) revealed: (a) missing proper/geographical names credited from adjacent sentences -> required in quoted fragment, no neighbor credit; (b) negation scope evaluated per clause rather than whole sentence; (c) negative claims countered by mere affirmative mention -> required fragment capable of grounding the affirmative version; (d) "claim" treated as reported speech. |

**Consequence:** Following stages 2–3, the holdout set is no longer fully uncontaminated — H19 was inspected, and rules introduced in stage 3 may have indirectly influenced other holdout claims. A rigorous external measure of generalization requires a **new** holdout set, authored by an independent party who has not seen the engine source code. The most authentic metric from this set remains stage 1: **78%, 1 false GROUNDED out of 23**.
