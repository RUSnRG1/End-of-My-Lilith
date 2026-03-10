# System Patterns

## 監査対象スコープ（運用ルール）
- 本体サイト: `index.html` 起点のページ群（About / Works / Blog / Cosplay / NF13）
- 除外: `End-of-My-Lilith/Game/` は保管フォルダ扱い（通常改修の対象外）

## 共通レイアウトの仕組み
- 共通注入ロジック: `script.js` の `loadHTML(selector, file)`
- 共通部品ファイル:
  - `html_source/slider.html`
  - `html_source/content-links.html`
  - `html_source/footer.html`
- 各ページ側は以下プレースホルダを持つ前提:
  - `.slider-placeholder`
  - `.contentlink-placeholder`
  - `.footer-placeholder`

## CSS責務パターン
- 本体の大半は `style.css` 1ファイル依存。
- この構成は変更の即時反映には強いが、影響範囲が広くデグレしやすい。
- `style.css` を触る時は最低でも以下を回帰確認:
  - `index.html`
  - `About/index.html`
  - `Works/index.html`
  - `Blog/index.html` / `Blog/template.html`
  - `Cosplay/index.html`
  - `NF13.html`

## JS責務パターン
- 共通処理: `script.js`（共通HTML挿入）
- ページ個別処理:
  - Blog: `Blog/blog_script.js`
  - Works: `Works/script_works.js`
  - Cosplay: `Cosplay/Cos_Script.js`
- Blogは「一覧生成 + 個別表示補助 + 共有リンク生成」を1ファイルで担当しているため、修正影響が比較的大きい。

## 導線管理の設計上注意
- ナビ導線が `index.html` と `html_source/content-links.html` の2箇所に存在。
- 今後は `html_source/content-links.html` を正とし、重複定義を減らす方針が安全。

## 拡張時の注意点（再利用前提）
- 新ページを増やす場合は、まずプレースホルダ3点 + `script.js` 読込を揃える。
- ページ固有JSを追加する場合は、共通JS（`script.js`）との責務を混ぜない。
- ライブラリ追加時は「そのページで本当に必要か」を先に確認（不要な全ページ読込を避ける）。

## 確認済み事項 / 推測事項

### 確認済み（事実）
- 本体は共通部品注入構造で運用されている。
- `style.css` が本体の横断スタイルを担っている。
- `Blog/blog_script.js` / `Works/script_works.js` / `Cosplay/Cos_Script.js` が個別機能の中心。

### 推測（未確定）
- `index_base.html` / `style_base.css` / `nouseWork/index.html` は未使用の可能性が高い。
  - ただし外部導線の可能性があるため、参照実態確定前に削除しない。
