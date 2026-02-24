<?php
/**
 * キャンペーンリストブロックのフロント出力
 * ブロック属性 items がある場合はそのJSONを表示、なければテンプレートをそのまま使用
 */
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}

$attrs   = $block->attributes ? $block->attributes : array();
$items   = isset( $attrs['items'] ) ? $attrs['items'] : '';
$home    = esc_url( home_url( '/' ) );
$part_path = get_template_directory() . '/template-parts/sections/section-campaign-list.html';

$use_custom = false;
$list       = array();

if ( $items !== '' && $items !== '[]' ) {
	$decoded = json_decode( $items, true );
	if ( is_array( $decoded ) && ! empty( $decoded ) ) {
		$use_custom = true;
		foreach ( $decoded as $item ) {
			$link = isset( $item['link'] ) ? $item['link'] : '#';
			if ( is_string( $link ) && strpos( $link, '/' ) === 0 && strpos( $link, '//' ) !== 0 ) {
				$link = $home . ltrim( $link, '/' );
			}
			$list[] = array_merge( $item, array( 'link' => $link ) );
		}
	}
}

if ( $use_custom && ! empty( $list ) ) {
	$items_json = wp_json_encode( $list, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );

	// テンプレートからスタイルとランナースクリプトを取得
	$template_content = file_exists( $part_path ) ? file_get_contents( $part_path ) : '';
	$style_block      = '';
	$runner_script    = '';
	if ( $template_content !== '' ) {
		if ( preg_match( '/<style[^>]*>.*?<\\/style>/s', $template_content, $style_m ) ) {
			$style_block = $style_m[0];
		}
		$pos = strpos( $template_content, '</script>' );
		if ( $pos !== false ) {
			$pos = strpos( $template_content, '<script>', $pos + 9 );
			if ( $pos !== false ) {
				$runner_script = substr( $template_content, $pos );
			}
		}
	}

	echo $style_block;
	?>
<section class="s-campaign-list" id="campaign-list-block">
	<div class="l-inner">
		<h2 class="heading heading--m">開催中のお得なキャンペーン</h2>
		<div id="campaign-list-editor-wrap" class="campaign-list-editor-wrap" style="display:none;"></div>
		<ul class="campaign-list campaign-list--sp-s" id="campaign-list-container" aria-label="キャンペーン一覧"></ul>
	</div>
	<script type="application/json" id="campaign-list-data"><?php echo $items_json; ?></script>
</section>
	<?php
	if ( $runner_script !== '' ) {
		echo $runner_script;
	}
} else {
	$slug = str_replace( 'rakutenmusic/rakuten-music-section-', '', $block->block_type->name );
	echo rakutenmusic_render_rakuten_section( $slug );
}
