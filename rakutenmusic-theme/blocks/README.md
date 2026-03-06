# 楽天ミュージック セクションブロック

## 余白設定（上余白・下余白）

**block.json の `name` が `rakutenmusic/` で始まるブロックは、追加実装なしで余白設定が利用できます。**

- エディタの右サイドバー「ブロック」に「余白」パネル（上余白・下余白）が表示される
- 選択肢：なし / 小 (8px) / 中 (16px) / 大 (24px) / 特大 (32px)
- フロントでは `render_block` フィルターでマージンが自動出力される

今後新規作成するブロックも、`name` を `rakutenmusic/〇〇` の形式にすればデフォルトで余白設定が有効になります。block.json や editor.js に余白用の属性・UIを書く必要はありません。

## スタック化済みセクション（必要なCSSはテーマで読み込み済み）

- **top-main-fv** … トップFV（ヒーロー）。style_2026.css + テンプレート内インラインで背景画像
- **top-section-saikyo_cost_performance** … コスパ最強な理由。style_2026.css
- **top-section-campaign** … キャンペーン。style_2026.css + Splide
- **stack-section-price** … 料金。stack-pricelist.css
- **stack-section-reward** … リワード。stack-reward.css

## 新規ブロックを追加するとき（3ステップ）

1. **functions.php の `rakutenmusic_get_section_blocks()` 内の配列に1行追加**
   - `array( 'name' => 'スラッグ', 'title' => '表示名', 'keywords' => array( '検索キーワード' ) )`
   - ここを忘れると **エディターのブロック一覧・検索に表示されません**

2. **このフォルダに `section-スラッグ/` を作成**
   - 既存の `section-campaign/` などをコピー
   - `block.json` の `name` を **`rakutenmusic/〇〇`** の形式にする（例: `rakutenmusic/rakuten-music-section-スラッグ`）
   - これにより **余白設定（上余白・下余白）が自動で利用可能**になります（上記「余白設定」参照）
   - `title` / `keywords` を新しいブロック用に書き換え

3. **template-parts/sections/section-スラッグ.html を配置**
   - セクションのHTML（`{{T}}` / `{{HOME}}` はそのまま）

以上で「サーバー側の描画」と「エディターでの表示」の両方が有効になります。

## 学生プラン用ブロック（楽天ミュージック - 学生プラン）

| ブロック名 | スラッグ | テンプレート | 説明 |
|-----------|----------|--------------|------|
| 学生プラン：アンカーリンク（ページ内リンク） | plan-student-anchor-link-group | anchor-link-group.html | #overview, #usage-steps 等へのスクロールリンク |
| 学生プラン：OVERVIEW | plan-student-overview | overview.html | 学生プラン概要・楽天学割・注意書き |
| 学生プラン：SCENE（こんな方におすすめ） | plan-student-top-section-scene | top-section-scene.html | 通学・勉強シーン |
| 学生プラン：ご利用の流れ | plan-student-usage-steps | usage-steps.html | 新規・プラン変更タブ |

- **登録**: `functions.php` の `rakutenmusic_register_plan_student_blocks()`（init priority 1）
- **描画**: `render_callback` で `rakutenmusic_render_plan_student_block( $slug )` を呼び出し、`template-parts/plan-student/{$slug}.html` を読み込んで `{{ASSETS}}` / `{{HOME}}` を置換して返す
- **アセット**: 学生プランブロックが1つでも含まれるページで `rakutenmusic_enqueue_plan_student_assets()` が plan common / plan student CSS・JS（Slick, common.js）を読み込む
- **エディター**: `get_plan_student_blocks_for_editor()` でメタデータを取得し、インライン登録と `block-editor-early-register.js` で「楽天ミュージック - 学生プラン」カテゴリに表示
