"""Assemble dist/grant-coding-check.html from src/ and data/.

Run from the repo root:  python3 tools/build.py
"""
import json
from pathlib import Path

root = Path(__file__).resolve().parent.parent
template = (root / "src" / "template.html").read_text()
logic = (root / "src" / "logic.js").read_text().split("if (typeof module")[0]
regs = json.dumps(json.loads((root / "data" / "regs.json").read_text()), separators=(",", ":")).replace("</", "<\\/")

out = template.replace("/*REGS*/", regs).replace("/*LOGIC*/", logic)
(root / "dist").mkdir(exist_ok=True)
(root / "dist" / "grant-coding-check.html").write_text(out)
print(f"Built dist/grant-coding-check.html ({len(out):,} bytes)")
