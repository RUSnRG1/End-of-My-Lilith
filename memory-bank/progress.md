# Progress

## 完了したこと
- 現行運用サイト（`index.html` 起点）の全体監査を実施。
- 監査スコープを明確化（`End-of-My-Lilith/Game/` は保管フォルダのため除外）。
- 主要問題点の整理と、優先度つき改善候補を確定。
- ユーザー対応済み項目の反映確認。
  - A1: `Blog/blog_script.js` の `twitterUrl` 未定義代入解消を確認。
  - A2: `NF13.html` の `loadBlogList(1)` 削除を確認。
  - A4: `Blog/index.html` の `Blog/blog_script.js` 二重読込解消を確認。
- `memory-bank/siteAudit.md` を今回監査内容で更新。
- Blog の緊急性高め3項目に対する小規模改修を実施。
  - `Blog/index.html`, `Blog/template.html` に `meta viewport` を追加。
  - `style.css` の Blog レイアウトを、PCで安定しやすい2カラム + スマホ1カラムへ調整。
  - 一覧カードのタイトルまわりを再設計し、負の margin 依存を解消。
  - `Blog/blog_script.js` で一覧抜粋をプレーンテキスト化し、画像・HTML混入で崩れにくくした。
  - `Blog/blog_script.js` のプレースホルダ記事 `XXXX-XX-XX` を削除。
  - `loadMarkdown()` に `await` / `response.ok` を入れて、詳細記事の読込失敗を拾えるようにした。

## 未着手の改善候補
- C1: 主要ページへの `meta viewport` 統一追加
- C2: `style.css` の責務分離（段階分割）
- C3: 導線定義の一元化（`index.html` と `html_source/content-links.html` の重複解消）
- C4: `Blog/blog_script.js` の `blogData` プレースホルダ整理
- C5: Blog読込処理の `await` / `response.ok` 対応
- C6: `<base>` 設定スクリプトの共通化
- C7: 不要ライブラリ読込の棚卸し
- C8: HTML記述の近代化（`font` タグ置換、`auther` typo など）

## 現時点で残っている Blog 関連の主な候補
- `Blog/source/2024-11-16/text.md` が一覧未掲載のまま。
- 一覧データはまだ `blogData` 手管理なので、公開漏れ検知まではできていない。
- 記事本文の見た目（`figure`, `blockquote`, 見出し, リンク）はまだ記事ごとの差が出やすい。
- 詳細ページの直アクセス時ガード（`path` 不在時の案内）は未実装。

## 優先度の高い順（次回着手候補）
1. C1: viewport 統一追加（影響小・効果大）
2. C3: 導線定義一元化（運用事故防止）
3. C4: Blog公開データ整理（表示安定化）
4. C2: `style.css` 段階分割の着手（デグレ抑制）

## 後回しでよい項目
- C5: Blogの通信エラーハンドリング強化
- C6: `<base>` 設定コードの共通化
- C8: HTML品質改善（古い記述の置換）
- C7: 依存ライブラリ最適化（余裕時）

## 保留事項
- [未確認] ユーザー修正後の全ページ Console エラー再確認（実ブラウザ検証未実施）。
- [未確認] 実機スマホでのレイアウト崩れ確認。
- [推測] `index_base.html` / `style_base.css` / `nouseWork/index.html` の未使用判定は未確定（外部導線の可能性あり）。

## 今回は着手していないこと
- 新規コード修正（監査と記録のみ実施）
- デザイン改修
- レスポンシブ最適化の実装
- アクセシビリティ改善の実装
