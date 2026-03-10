# Memory Bank rules

## General
- `memory-bank/` が存在する場合は、作業開始時に読み、現在の状態を把握してから進める。
- プロジェクトの大枠、方針、進捗、現在の焦点は `memory-bank/` を優先して参照する。

## Update timing
- 次の場合は `memory-bank/` の更新を検討する。
  - 初回の全体監査が終わった時
  - 大きな設計判断をした時
  - セッションをまたぐ前に、次回の再開が難しくなりそうな時

## Update targets
- 今回の焦点や次の作業は `memory-bank/activeContext.md` に書く。
- 完了事項や未完事項は `memory-bank/progress.md` に要約する。
- サイト全体の構造や設計上の特徴が見えたら `memory-bank/systemPatterns.md` を更新する。
- 技術スタックや運用上の制約が明確になったら `memory-bank/techContext.md` を更新する。
