#!/usr/bin/env python3
"""
bookmarklets/*.js を読み込み、index.html 内の対応する
<a class="bkmlt" data-bookmarklet="bookmarklets/xxx.js" href="...">
の href を再生成するビルドスクリプト。

使い方:
  bookmarklets/*.js を編集した後、このスクリプトを実行して index.html に反映する。

  python3 tools/build_bookmarklets.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BOOKMARKLETS_DIR = ROOT / 'bookmarklets'
INDEX_HTML = ROOT / 'index.html'


def minify(source: str) -> str:
    return re.sub(r'\s+', ' ', source).strip()


def html_attr_escape(source: str) -> str:
    return source.replace('&', '&amp;').replace('"', '&quot;')


def build_href(source: str) -> str:
    minified = minify(source)
    if minified.count('{') != minified.count('}') or minified.count('(') != minified.count(')'):
        raise ValueError('unbalanced braces/parens after minify')
    return 'javascript:' + html_attr_escape(minified)


def main():
    html = INDEX_HTML.read_text(encoding='utf-8')

    pattern = re.compile(
        r'(<a class="bkmlt" data-bookmarklet="bookmarklets/([a-z0-9\-]+)\.js" href=")'
        r'.*?'
        r'(">)',
        re.DOTALL,
    )

    missing = []

    def replace(m: re.Match) -> str:
        name = m.group(2)
        src_path = BOOKMARKLETS_DIR / f'{name}.js'
        if not src_path.exists():
            missing.append(name)
            return m.group(0)
        href = build_href(src_path.read_text(encoding='utf-8'))
        return m.group(1) + href + m.group(3)

    new_html, count = pattern.subn(replace, html)

    if missing:
        print('ERROR: source file(s) not found for:', ', '.join(missing), file=sys.stderr)
        sys.exit(1)

    INDEX_HTML.write_text(new_html, encoding='utf-8')
    print(f'Updated {count} bookmarklet href(s) in index.html')


if __name__ == '__main__':
    main()
