# Portfolio Site

制作物を管理するための GitHub Pages サイト。

## 構成

- `index.html` — サイト本体（経歴・コネクト 〜ConneQt〜・そのほかの作品・非公開の実績・活動・ツール）
- ConneQt の一覧は、おくるん（line-share）の `data/hub-links.json` から作る。使っている技術は `conneqt-tech.json` に足す
  - `python3 tools/build_conneqt.py` で、カードを `index.html` に書きこむ（読みこみに失敗しても・JS がなくても・検索エンジンにも見える控え）。Qツールを足したら、これを動かして push
  - ページを開いたときは `script.js` が最新の一覧を読みにいき、読めたら差しかえる（5秒で読めない・中身がおかしいときは控えのまま）。アイコン画像が読めないときは絵文字に
- `tools/backup_and_delete.bat` — Windows用ツール。ドラッグ&ドロップしたファイル/フォルダを
  同じ階層の `backup/` にコピーしてから元を削除する。

## GitHub Pages 公開手順

1. GitHub に新しいリポジトリを作成する
2. このディレクトリの内容を push する

```bash
git remote add origin <リポジトリURL>
git branch -M main
git push -u origin main
```

3. リポジトリの Settings > Pages で公開ブランチを `main` / `/(root)` に設定する
