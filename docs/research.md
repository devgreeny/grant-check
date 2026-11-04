# U.S.VETS AP: grant coding and compliance research

Noah Guarini | Updated November 4, 2026 | Two deep-research runs, each claim checked by three independent votes (2 of 3 refutes kills a claim)

## Bottom line

- Every invoice is checked against three layers of rules: 2 CFR 200, the program's own regulation, then the funding notice (NOFO) and grant agreement for that award.[1][2][3]
- None of the federal documents found says which layer wins when they conflict. The SSVF NOFO lists its sources side by side without ranking them.[3] "Specific overrides general" and "the stricter rule applies" are common practice, not verified rules.
- Many rental assistance rules depend on client history (months used, income tier, earlier deposits, other subsidies). That history is not on the invoice.[4][5] This is a plausible cause of blanks that doesn't require analysts to be unwilling, but it has not been tested.
- U.S.VETS's public audit record is clean: 0 federal audit findings for FY2022 to FY2025 and $0 questioned costs.[6][7][8] So the 25% is a rework cost that current checks catch, not an audit liability.
- No surviving evidence on why field staff coding fails at nonprofits, or on which fixes work. Any tool is an untested bet.

## 1. Documents an analyst must check, by funding stream

| Stream | Documents | Coding-level limits |
| :- | :- | :- |
| All VA awards | 2 CFR 200, adopted by VA in 2 CFR 802.101[1] | 200.403: necessary, reasonable, allocable, within award limits, documented, inside the budget period[9] |
| SSVF (64.033) | 38 U.S.C. 2044, 38 CFR 62, 2 CFR 200, FY2027 NOFO, MOA (the award terms)[3] | Rent: 6 months in 12, 10 in 24 (extremely low-income households: 9 in 12, 12 in 24), paid to the landlord[4]. Security and utility deposits once per 2 years, moving costs once per 3 years, storage up to 3 months[4]. Admin capped at 10%[3] |
| GPD (64.024) | 38 CFR 61, 2 CFR 200 (adopted in 61.66)[2] | Paid as a daily rate per veteran, not line-item reimbursement. The rate is the lesser of cost of care minus other funding, or the State Home rate (61.33(c))[2]. Medium confidence: the votes on the formula details were split |
| HUD CoC (14.267) | 24 CFR 578, CoC NOFO, grant agreement[10] | Only the costs listed in 578.39 to 578.63 are eligible. Supportive services are a closed list of 17. Staff training isn't eligible as a supportive service. Admin capped at 10%[10] |

## 2. Invoices split across funders

- SSVF cannot pay rent that another federal subsidy already covers for the same period. State or local subsidies can be added on top if the total stays at or below the rent.[4]
- Utilities and moving costs cannot overlap with any other program, whether federal, state or local.[4]
- The regulations decide whether SSVF can pay at all. None of them sets a method for splitting one invoice across funders.[4]
- Under GPD, money from other funders lowers the daily rate VA pays, so coding to other funders changes what VA owes.[2]

## 3. What VA and HUD actually check

- Costs without supporting documentation are not allowable (200.403(g)).[9]
- VA can claw back undocumented, misallocated or "questionable" SSVF costs. It audits about half of SSVF grantees each year. Sending the documentation before VA issues a formal debt notice cures the problem.[11]
- VA's on-site GPD reviews cover payment vouchers, expenses and internal controls.[12]
- HUD's monitoring handbook: a failed check that cites a statute, regulation, NOFO or grant agreement is a finding. One that cites nothing is only a "concern". This is a usable test for separating required controls from habit.[13]
- No source found requires the multi-person approval chain or the re-keying into the accounting system specifically. Those come from the general internal-control duty (2 CFR 200.303) and U.S.VETS's own policy. (Inference)

## 4. U.S.VETS public record

- Federal spending: FY2024 about $66.1M, FY2025 about $67.0M. 0 findings for FY2022 to FY2025.[6]
- The VA Inspector General's reviews of the FY2024 and FY2025 audit packages: "pass with deficiencies", $0 questioned, 0 recommendations. The deficiencies were in how the schedule of federal spending was laid out, not in the costs themselves. The auditor was Armanino LLP.[7][8]
- Those reviews check the format of the audit package, not the transactions. A clean audit is sample-based and comes after the current checks have already caught errors.

## 5. Conflicts and refuted claims

- The SSVF limits ($1,000 move-in, landlord incentive up to 2 months' rent within 90 days) passed in run 1 but failed in run 2 (1 vote of 3). Check the current NOFO and Program Guide before building them into anything.
- A claim that every SSVF rent payment needs a fixed set of documents was refuted. The CoC vacancy payment limits were refuted.
- An earlier interim report of material weakness and going-concern flags for U.S.VETS did not hold up. The federal audit database shows 0 findings.

## 6. What this means for the build hypothesis

- **Hypothesis (Skye):** analysts have to check federal, local and private rules that take priority over each other, so they leave fields blank.
- **Supported:** the layered rules are real and no document ranks them.[3] Low to medium confidence that this is the main cause.
- **Rival 1:** accounting re-codes everything, so there's little reason to code carefully at the site. A lookup tool won't fix that.
- **Rival 2:** rental assistance answers need the client's history, not the documents. A document lookup can't settle those. It has to say "needs case file" rather than guess. Pulling in that history brings client data into AP.
- **Rival 3:** form design or unclear ownership between operations and finance. Not tested.
- **The step that settles it:** sort about 50 invoices from suspense into blank field, ineligible charge, wrong grant or category, or needs client history.

## 7. Open questions

- Which grants does each site hold, and how many at once? Does the error rate follow the number of grants or how long the analyst has been there?
- Do the SSVF general terms, the MOA or the CoC grant agreement set an order of precedence?
- What do the local and private funder agreements restrict?
- Which approval steps does U.S.VETS's own policy require? This needs the financial policies manual and Armanino's management letter.
- Do VA or HUD publish coding tools (allowable cost matrices, TFA checklists) U.S.VETS could adopt instead of building its own?
- Not covered: the current SSVF Program Guide, the CoC grant agreement text, 2 CFR 200.420 to 200.476 (specific cost items), the 2024 Uniform Guidance changes, and what the OMB Compliance Supplement tells auditors to test for these programs.

## Sources

1. 2 CFR 802.101. https://www.law.cornell.edu/cfr/text/2/802.101
2. 38 CFR Part 61 (GPD), eCFR. https://www.ecfr.gov/current/title-38/chapter-I/part-61
3. FY2027 SSVF NOFO, 91 FR, Jan 6, 2026. https://www.govinfo.gov/content/pkg/FR-2026-01-06/html/2026-00009.htm
4. 38 CFR 62.34 (SSVF temporary financial assistance). https://www.law.cornell.edu/cfr/text/38/62.34
5. VA SSVF Program Guide. https://www.va.gov/HOMELESS/ssvf/docs/SSVF_Program_Guide.pdf (URL now redirects; text checked through search snippets)
6. Federal Audit Clearinghouse records for U.S.VETS, via a third-party mirror, FY2022 to FY2025.
7. VA OIG, desk review of the U.S.VETS Single Audit package, FY ended June 30, 2024 (25-03511-49). https://vaoig.gov/reports/management-advisory-memo/desk-review-single-audit-reporting-package-year-ended-june-30-2024
8. VA OIG, desk review of the U.S.VETS Single Audit package, FY ended June 2025 (26-02642-227). https://vaoig.gov/reports/management-advisory-memo/desk-review-us-vets-single-audit-reporting-package-year-ended-june
9. 2 CFR 200.403. https://www.law.cornell.edu/cfr/text/2/200.403
10. 24 CFR 578 Subpart D (CoC eligible costs). https://www.ecfr.gov/current/title-24/subtitle-B/chapter-V/subchapter-C/part-578/subpart-D
11. VA SSVF Recoupment Webinar, Feb 23, 2023. https://www.va.gov/HOMELESS/ssvf/docs/Recoupment_Webinar_February_23_2023.pdf
12. VA GPD Cost Principles training, Oct 27, 2021. https://department.va.gov/homeless/wp-content/uploads/sites/72/2026/01/GPDCostPrinciples-10-27-2021.pdf
13. HUD CPD Monitoring Handbook 6509.2. https://www.hud.gov/sites/documents/65092e295cpdh.docx
