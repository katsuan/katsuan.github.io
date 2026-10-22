# Portfolio Site

制作物を管理するための GitHub Pages サイト。

## 構成

- `index.html` — サイト本体（経歴・コネクト 〜ConneQt〜・そのほかの作品・非公開の実績・活動・ツール）
- ConneQt の一覧は、おくるん（line-share）の `data/hub-links.json` を読んで出す（Qツールを足すと、ここにも出る）。使っている技術は `script.js` の `tech` に足す
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
