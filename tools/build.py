"""Assemble dist/grant-check.html (demo) and dist/grant-check-consistency.html (repeat-run test) from src/ and data/.

Run from the repo root:  python3 tools/build.py
"""
import base64, json, re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
logic = (root / "src" / "logic.js").read_text().split("if (typeof module")[0]
regs = json.dumps(json.loads((root / "data" / "regs.json").read_text()), separators=(",", ":")).replace("</", "<\\/")

# Brand artwork from the U.S.VETS graphic elements pack, inlined so the page stays one file. Write asset:<name> in src to use assets/brand/<name>.png
assets = {f.stem: "data:image/png;base64," + base64.b64encode(f.read_bytes()).decode() for f in sorted((root / "assets" / "brand").glob("*.png"))}
def inline_assets(text):
    def sub(m):
        if m.group(1) not in assets: raise SystemExit(f"Unknown asset: {m.group(1)}")
        return assets[m.group(1)]
    return re.sub(r"asset:([a-z0-9-]+)", sub, text)

(root / "dist").mkdir(exist_ok=True)
for src, name in [("template.html", "grant-check.html"), ("consistency.html", "grant-check-consistency.html")]:
    out = inline_assets((root / "src" / src).read_text()).replace("/*REGS*/", regs).replace("/*LOGIC*/", logic)
    (root / "dist" / name).write_text(out)
    print(f"Built dist/{name} ({len(out):,} bytes)")
