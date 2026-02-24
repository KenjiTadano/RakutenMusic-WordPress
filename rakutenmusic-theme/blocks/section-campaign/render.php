<?php
/**
 * キャンペーンブロックのフロント出力
 * ブロック属性 items がある場合はそのJSONを表示、なければテンプレートをそのまま使用
 */
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}

$attrs = $block->attributes ? $block->attributes : array();
$items = isset( $attrs['items'] ) ? $attrs['items'] : '';
$home = esc_url( home_url( '/' ) );
$part_path = get_template_directory() . '/template-parts/sections/section-campaign.html';

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
			$list[] = array_merge( is_array( $item ) ? $item : array(), array( 'link' => $link ) );
		}
	}
}

if ( $use_custom && ! empty( $list ) ) {
	?>
<section id="top-section-campaign" class="bg-dark" data-ratid="top-section-campaign" data-ratevent="appear">
  <div class="bg-dark-txt font-rakuten-b">CAMPAIGN</div>
  <div class="ttl-group">
    <sub class="font-rakuten-b">CAMPAIGN</sub>
    <h2>キャンペーン</h2>
  </div>
  <div class="splide cp-for-newsubscriber">
    <div class="splide__track">
      <ul class="splide__list">
	<?php
	foreach ( $list as $item ) {
		$link     = esc_url( isset( $item['link'] ) ? $item['link'] : '#' );
		$img_src  = esc_url( isset( $item['imageUrl'] ) ? $item['imageUrl'] : '' );
		$img_alt  = esc_attr( isset( $item['imageAlt'] ) ? $item['imageAlt'] : '' );
		$title    = isset( $item['title'] ) ? $item['title'] : '';
		?>
        <li class="splide__slide">
          <a href="<?php echo $link; ?>">
            <img src="<?php echo $img_src; ?>" alt="<?php echo $img_alt; ?>" />
            <p><?php echo esc_html( $title ); ?></p>
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
