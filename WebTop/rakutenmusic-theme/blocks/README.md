# 楽天ミュージック セクションブロック

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
   - `block.json` の `name` / `title` / `keywords` を新しいブロック用に書き換え

3. **template-parts/sections/section-スラッグ.html を配置**
   - セクションのHTML（`{{T}}` / `{{HOME}}` はそのまま）

以上で「サーバー側の描画」と「エディターでの表示」の両方が有効になります。
