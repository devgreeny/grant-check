# Grant Check: eval plan

Basecamp prototype, U.S.VETS AP. Fake data only. Updated November 4, 2026.

## Why this needs evals

- It runs many times (every site invoice).
- Claude won't get it right by default: the rules are layered and the order between documents is set by policy FIN-07, not by any federal text.
- Nobody re-checks every output once it is in use.

## Task

Given one invoice packet, the analyst's coding entries, and the site's funds, return a status, the fund that pays, the coding, the deciding rule with a word-for-word quote, a plain summary and explanation, and a question for finance when needed.

## Variables

| Variable | Values |
|---|---|
| Case type | 17 types (table below) |
| Site | Harbor (4 funds), Desert (2), Valley (3) |
| Participant | extremely low or very low income; history present or missing |
| Analyst entries | correct, blank fields, or the case's typical mistake |
| Paperwork | complete or missing a required document |
| Check style | Quick (one call) or Step by step (Claude calls the page tools) |
| Prompt version | recorded on every run |

## Case sets

- **Core 15:** hand-written cases in the page.
- **Random from a seed:** the generator draws case types by weight (about 60% "OK to pay"), so a seed gives a repeatable set of 5, 10 or 25.
- **Hold-out:** pick one seed you never use for tuning. Run it once, at the end, as "Held-out final". The page refuses a seed already used for tuning or for a previous held-out run. Aim for about 20% of all invoices you check to be held out.

## Checks

Graded by code. A starred check sinks the whole invoice.

| ID | Check | How it is graded |
|---|---|---|
| C1* | Right answer | Status is in the answer key's accepted list |
| C2* | Right fund | Suggested fund is in the accepted list (or none) |
| C3 | Right deciding rule | Deciding section contains an accepted section |
| C4* | Quote found in the rule text | Quote appears word for word in the cited document |
| C5 | Plain-language summary | No citations, section numbers or fund codes in summary or explanation |
| C6 | Every fund at the site rated | The "Who pays" list covers every fund at the site |
| C7 | Who pays matches the coding | The fund marked "pays" equals the suggested fund |

Graded by a second Claude (the judge). It never sees the answer key. Yes or no, one thing each.

| ID | Check |
|---|---|
| J1 | Summary agrees with the status |
| J2 | Summary names the deciding fact (a count, date, amount, missing document or payee) |
| J3 | Explanation matches the quoted rule, with no added limits |
| J4 | Question for finance is specific (only for "Need more info" and "Ask finance") |

**Golden set for the judge:** in each run's detail view, mark each judge verdict "Should be yes" or "Should be no". Target 30 to 50 labels from 2 or 3 people, bad answers included. The page reports agreement. If agreement is low, fix the judge's wording before trusting its scores.

## Answer key: needs human sign-off

Claude wrote this table. The playbook requires a person to own the answer key and a second person to check it. Each reviewer checks a row against the rule documents (Reviewer tools, Rule documents) and initials it. Change any row you disagree with and tell the builder; the page's answer key gets updated from this table.

| Case type | Expected answer | Expected fund | Deciding rule | Reviewer 1 | Reviewer 2 |
|---|---|---|---|---|---|
| Rent within the SSVF limit | OK to pay | SSVF | 38 CFR 62.34(a) | | |
| SSVF rent limit reached, county fund can pay (Harbor) | OK to pay | County Housing Fund | 62.34(a) plus county B1/B2, FIN-07 P3 | | |
| SSVF rent limit reached, no other fund (Desert, Valley) | Can't pay or Ask finance | None | 62.34(a) | | |
| Federal voucher already pays rent | Can't pay or Ask finance | None | 62.34(a)(6) | | |
| Rent reasonableness note missing | Need more info | SSVF or none | 62.34(a)(4), FIN-07 P6 | | |
| County bars late fees, SSVF can pay (Harbor) | OK to pay | SSVF | County B3, 62.34(a), FIN-07 P3 | | |
| First security deposit | OK to pay | SSVF | 62.34(c), FIN-07 P4 | | |
| Second deposit within 2 years (Desert, Valley) | Can't pay or Ask finance | None | 62.34(c)(1) | | |
| Utility bill paid to the utility | OK to pay | SSVF | 62.34(b) | | |
| Utility bill paid to the veteran | Can't pay | None or SSVF | 62.34(b)(2), FIN-07 P8 | | |
| Participant file not received | Need more info | SSVF or none | FIN-07 P6 | | |
| Second move within 3 years (Desert) | Can't pay or Ask finance | None | 62.34(d)(1), Ridgeline R1 | | |
| Work or move-in items, SSVF pays first | OK to pay | SSVF | 62.34(e), FIN-07 P4 | | |
| Accounting cost is Admin, not Program | OK to pay | SSVF (as Admin) | 62.70(e), FIN-07 P5 | | |
| Staff training: CoC bars it, foundation allows it | OK to pay | Ridgeline | 24 CFR 578.53(d), Ridgeline R2 | | |
| Participant transit passes under CoC | OK to pay | HUD CoC services | 578.53(e)(15) | | |
| Gift cards | Can't pay or Ask finance | None | Ridgeline R3 | | |

Open questions for the reviewers:
- Several rows accept two answers ("Can't pay or Ask finance"). Is "Ask finance" acceptable when no fund can pay, or should those be "Can't pay" only?
- Transit passes: SSVF also lists transportation (38 CFR 62.33, not loaded in this prototype). Should SSVF be accepted too?

## Running a round (one change at a time)

1. Run the same set (same seed or Core 15) and open the run.
2. For each miss, pick the cause in this order: answer key wrong, data wrong, facts never reached Claude, prompt unclear, model.
3. Write one change and the trace line that shows it. Copy findings.md.
4. Make one edit. Bump the prompt version.
5. Rerun the same set. Keep the change only if more invoices pass and nothing that passed before now fails.
6. When tuning is done, run the held-out seed once and report that score.

Don't: change several things at once, tune on the held-out seed, or prompt around a wrong answer key.

## Privacy

- Seeds, invoices, answers and results stay in the browser that ran them.
- Share the copied report (scores and case types only), never the seed, and never screenshots of the invoice table, to keep the builder blind to the answers.
- Limit to state in the demo: the builder (Claude) wrote both the tool and the draft answer key, so until the key is human-reviewed this measures whether Claude follows the rules as written down, not whether the rules are right.
