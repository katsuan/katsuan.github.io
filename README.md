# Portfolio Site

制作物を管理するための GitHub Pages サイト。

## 構成

- `index.html` — サイト本体
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
