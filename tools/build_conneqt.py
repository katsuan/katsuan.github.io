#!/usr/bin/env python3
"""ConneQt の欄のカードを index.html に書きこむ（読みこみに失敗しても・JS がなくても・検索エンジンにも見えるように）。

一覧は、おくるん（line-share）の data/hub-links.json。手元に ../q-oqrn があればそれを、なければ公開中のものを読む。
ページを開いたときは script.js がもう一度読みにいき、読めたら新しい一覧に差しかえる（ここで書いたものは、そのときの控え）。

  python3 tools/build_conneqt.py
"""
import html
import json
import pathlib
import re
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
LOCAL = ROOT.parent / "q-oqrn" / "data" / "hub-links.json"
URL = "https://katsuan.github.io/line-share/data/hub-links.json"
TECH = json.loads((ROOT / "conneqt-tech.json").read_text(encoding="utf-8"))


def load():
    if LOCAL.exists():
        return json.loads(LOCAL.read_text(encoding="utf-8"))
    with urllib.request.urlopen(URL, timeout=10) as res:
        return json.load(res)


def card(it):
    e = lambda v: html.escape(str(v or ""), quote=True)
    tech = TECH.get(it.get("key"), "")
    return (
        f'      <a class="q-card" href="{e(it["url"])}" target="_blank" rel="noopener" style="--q: {e(it.get("color"))}">'
        f'<img src="{e(it.get("appIcon"))}" alt="" loading="lazy" data-emoji="{e(it.get("icon"))}">'
        '<span class="q-body">'
        f'<span class="q-name">{e(it.get("name"))} <small>{e(it.get("en"))}</small></span>'
        f'<span class="q-copy">{e(it.get("copy"))}</span>'
        f'<span class="q-lead">{e(it.get("lead") or it.get("desc"))}</span>'
        + (f'<span class="q-tech">{e(tech)}</span>' if tech else "")
        + "</span></a>"
    )


def main():
    data = load()
    items = [it for it in data.get("items", []) if it.get("url") and it.get("name")]
    page = ROOT / "index.html"
    s = page.read_text(encoding="utf-8")
    body = "\n".join(card(it) for it in items)
    s, n = re.subn(r"(<!-- conneqt:start -->).*?(<!-- conneqt:end -->)", lambda m: m.group(1) + "\n" + body + "\n      " + m.group(2), s, flags=re.S)
    if n != 1:
        raise SystemExit("index.html に <!-- conneqt:start --> … <!-- conneqt:end --> がありません")
    page.write_text(s, encoding="utf-8")
    print(f"ConneQt のカード {len(items)} 件を書きこみました")


if __name__ == "__main__":
    main()
