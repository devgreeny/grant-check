"""Assemble dist/grant-check.html (demo) and dist/grant-check-consistency.html (repeat-run test) from src/ and data/.

Run from the repo root:  python3 tools/build.py
"""
import json
from pathlib import Path

root = Path(__file__).resolve().parent.parent
logic = (root / "src" / "logic.js").read_text().split("if (typeof module")[0]
regs = json.dumps(json.loads((root / "data" / "regs.json").read_text()), separators=(",", ":")).replace("</", "<\\/")

(root / "dist").mkdir(exist_ok=True)
for src, name in [("template.html", "grant-check.html"), ("consistency.html", "grant-check-consistency.html")]:
    out = (root / "src" / src).read_text().replace("/*REGS*/", regs).replace("/*LOGIC*/", logic)
    (root / "dist" / name).write_text(out)
    print(f"Built dist/{name} ({len(out):,} bytes)")
