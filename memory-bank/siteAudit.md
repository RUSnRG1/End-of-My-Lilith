# Site Audit

## 監査日
- 2026-03-08

## 監査スコープ
- 対象: 現行運用サイト（`index.html` 起点の本体ページ群）
- 除外: `End-of-My-Lilith/Game/`（保管フォルダ扱い。今回は監査対象外）
- 実施内容: ファイル読取ベースの全体監査（コード修正は未実施）

## 全体所見
- 共通部品（`html_source/slider.html` / `content-links.html` / `footer.html`）を `script.js` で差し込む構造は、マジで再利用しやすい。
- ただし、ナビ導線とスタイル責務が一部で密結合していて、今後の改修時に影響範囲が広がりやすい状態。
- 先に「壊れやすい土台（viewport不足、導線二重管理、CSS肥大）」を整えるのが安全。

## 確認済み事項（事実）
- `Blog/blog_script.js` の `twitterUrl` 未定義代入は解消済み（A1対応済み）。
- `NF13.html` の `loadBlogList(1)` 呼び出しは削除済み（A2対応済み）。
- `Blog/index.html` の `Blog/blog_script.js` 二重読み込みは解消済み（A4対応済み）。
- 本体ページの多くで `meta viewport` が未設定。
- `style.css` にトップ / About / Blog / Works / Cosplay / NF13 のスタイルが集約され、責務が重い。
- ナビ導線は `html_source/content-links.html` と `index.html` 本文の両方に定義があり、実質二重管理。

## 推測・未確認事項（保留）
- [推測] `index_base.html` / `style_base.css` / `nouseWork/index.html` は未使用候補。
  - 外部リンク直打ちや手動運用の可能性は未確認。
- [未確認] 実ブラウザでの Console エラー最終状態（ユーザー修正後の全ページ再巡回）。
- [未確認] 実機スマホでの表示崩れ（DevTools/実機検証は未実施）。

## 主要な問題点

### C1. モバイル基礎設定不足（viewport未設定）
- 関係ファイル: `index.html`, `About/index.html`, `Works/index.html`, `Blog/index.html`, `Blog/template.html`, `Cosplay/index.html`, `NF13.html`
- 問題: `meta viewport` が未設定のため、スマホ表示の初期スケーリングが不安定。
- 放置影響: レイアウト崩れ・文字サイズ体験の劣化。

### C2. 共通CSSの責務過多
- 関係ファイル: `style.css`
- 問題: 複数ページのスタイルが単一ファイルに集中。
- 放置影響: 1箇所修正で別ページが壊れるデグレリスク上昇。

### C3. 導線定義の二重管理
- 関係ファイル: `index.html`, `html_source/content-links.html`
- 問題: 同種のリンク定義が複数箇所にあり、更新漏れが起きやすい。
- 放置影響: ページ間導線の不一致、運用ミス。

### C4. Blogデータ管理の不安定要素
- 関係ファイル: `Blog/blog_script.js`
- 問題: `blogData` に `XXXX-XX-XX` / 空タイトル要素が残っている。
- 放置影響: 記事読込失敗ログ増加、一覧品質の低下。

### C5. Blog読込エラーハンドリングの弱さ
- 関係ファイル: `Blog/blog_script.js`
- 問題: `loadMarkdown` が `async` 宣言だが `await` 未使用、`response.ok` 判定なし。
- 放置影響: 通信失敗時の表示不整合・切り分けコスト増。

### C6. `<base>` 設定コードの重複
- 関係ファイル: 本体HTML各ページ（`index.html`, `About/index.html`, `Works/index.html`, `Blog/index.html`, `Blog/template.html`, `Cosplay/index.html`）
- 問題: 同一IIFEがコピペ分散。
- 放置影響: 環境設定変更時の修正漏れ。

### C7. 依存ライブラリ読込の最適化余地
- 関係ファイル: `About/index.html`, `Cosplay/index.html`, `NF13.html` ほか
- 問題: `marked` などの不要読込が混在する可能性。
- 放置影響: 初期読込コスト・依存管理コスト増。

### C8. HTML品質の古い記述
- 関係ファイル: `Blog/index.html` ほか
- 問題: `font` タグ、`auther` typo など。
- 放置影響: 可読性/保守性の地味な負債化。

## 優先度つき改善候補

### 先に直すべきもの
1. C1: 主要ページへの `meta viewport` 統一追加
2. C3: ナビ導線定義の一元化（`html_source/content-links.html` を正とする）
3. C4: `Blog/blog_script.js` の公開データ整理（プレースホルダ除去）
4. C2: `style.css` の段階分割計画を開始（最初は Blog/Works/Cosplay）

### 後で直してよいもの
- C5: Blog読込処理の `await`/`response.ok` 対応
- C6: `<base>` 設定コードの共通化
- C8: HTML記述の近代化（`font` 置換、meta typo修正）

### 余裕があればやるもの
- C7: 依存ライブラリの棚卸しと不要読込の削減
- 未使用候補ファイルの台帳化（事実確定後に整理）

## 特に影響範囲が大きいファイル / 注意点
- `style.css`
  - 本体ページ横断で効くため、修正時はページごとに回帰確認が必須。
- `script.js`
  - 共通部品差し込みの起点。読み込み失敗時に全ページへ波及。
- `html_source/content-links.html`
  - サイト導線の中枢。リンク1件の変更でも全ページ影響。
- `Blog/blog_script.js`
  - 一覧・詳細表示導線・共有リンクに関与。小変更でもBlog体験に直結。
- `index.html`
  - トップ導線とナビ補助導線を両方持つため、二重管理のズレが出やすい。

## 次回以降の改修で気をつけるべきこと
- まずは「小さい変更 + 影響確認」の順で進める（いきなり全面リファクタしない）。
- 1回の修正対象を明確化（例: viewportだけ / 導線だけ）してデグレ範囲を絞る。
- 共通ファイル（`style.css`, `script.js`, `html_source/content-links.html`）を触る時は、最低でもトップ + About + Works + Blog + Cosplay を目視確認。
- 推測項目（未使用ファイル）は、参照実態が確定するまで削除しない。

## 今回は着手していないこと
- 新規コード修正（ユーザー修正分の再確認のみ）
- デザイン改修
- レスポンシブ調整の実装
- アクセシビリティ改善の実装
