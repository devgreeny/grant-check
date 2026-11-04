# grantcodingcheck

Basecamp prototype for the U.S.VETS accounts payable discovery. A site budget analyst opens one invoice at a time and gets a plain answer: which fund pays, whether it can be paid, the rule that decides it, and why that rule wins. Claude shows each step it takes while it works.

**All invoices, participants, funds, the county agreement, the foundation letter and policy FIN-07 are fake.** Federal rule text is the official eCFR text. Not compliance advice. Never put real client or invoice data in this repo.

## Layout

| Path | What it is |
|---|---|
| `src/template.html` | Page markup, styles and UI code |
| `src/logic.js` | Fake data, rule checks, prompts, page tools, practice generator, eval checks |
| `data/regs.json` | Official regulation text pulled from the eCFR API |
| `dist/grant-coding-check.html` | Built single-file page (what gets published) |
| `tools/build.py` | Builds `dist/` from `src/` and `data/` |
| `tools/regs2json.py` | Converts eCFR XML downloads into `data/regs.json` |
| `docs/evals.md` | Eval plan and the answer key that needs human sign-off |
| `docs/research.md` | Research on grant compliance and the coding problem |
| `notes/` | Local design notes, gitignored |

## Build

```
python3 tools/build.py
```

The page runs Claude through the claude.ai artifact `sample` capability, so it only checks invoices when opened on claude.ai. Opened as a local file, it shows the invoices and rules but cannot run checks.
