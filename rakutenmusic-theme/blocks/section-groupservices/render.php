<?php
/**
 * 楽天グループサービスブロックのフロント出力
 * ブロック属性 items がある場合はそのJSONを表示、なければテンプレートをそのまま使用
 */
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}

$attrs = $block->attributes ? $block->attributes : array();
$items = isset( $attrs['items'] ) ? $attrs['items'] : '';
$theme_uri = get_template_directory_uri();
$part_path = get_template_directory() . '/template-parts/sections/section-groupservices.html';

$use_custom = false;
$list       = array();

if ( $items !== '' && $items !== '[]' ) {
	$decoded = json_decode( $items, true );
	if ( is_array( $decoded ) && ! empty( $decoded ) ) {
		$use_custom = true;
		foreach ( $decoded as $item ) {
			$list[] = is_array( $item ) ? $item : array();
		}
	}
}

if ( $use_custom && ! empty( $list ) ) {
	?>
<section id="top-section-groupservices" class="bg-light" data-ratid="top-section-groupservices" data-ratevent="appear">
  <div class="bg-light-txt font-rakuten-b">GROUP SERVICES</div>
  <div class="ttl-group">
    <sub class="font-rakuten-b">GROUP SERVICES</sub>
    <h2>楽天グループサービス</h2>
  </div>
  <div class="splide top-section-groupservices">
    <div class="splide__track">
      <ul class="splide__list group-service-bnr">
	<?php
	foreach ( $list as $item ) {
		$link    = esc_url( isset( $item['link'] ) ? $item['link'] : '#' );
		$img_raw = isset( $item['imageUrl'] ) ? $item['imageUrl'] : '';
		$img_src = $img_raw;
		if ( strpos( $img_src, '{{T}}' ) === 0 ) {
			$img_src = $theme_uri . substr( $img_src, 6 );
		} elseif ( is_string( $img_src ) && strpos( $img_src, '/' ) === 0 && strpos( $img_src, '//' ) !== 0 ) {
			$img_src = $theme_uri . $img_src;
		}
		$img_src = esc_url( $img_src );
		$img_alt = esc_attr( isset( $item['imageAlt'] ) ? $item['imageAlt'] : '' );
		$target  = ( isset( $item['target'] ) && $item['target'] === '_blank' ) ? ' target="_blank" rel="noopener noreferrer"' : '';
		?>
        <li class="splide__slide">
          <a<?php echo $target; ?> href="<?php echo $link; ?>">
            <img src="<?php echo $img_src; ?>" alt="<?php echo $img_alt; ?>" />
          </a>
        </li>
		<?php
	}
	?>
      </ul>
    </div>
  </div>
</section>
	<?php
} else {
	$slug = str_replace( 'rakutenmusic/rakuten-music-section-', '', $block->block_type->name );
	echo rakutenmusic_render_rakuten_section( $slug );
}
