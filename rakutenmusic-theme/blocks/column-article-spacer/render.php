<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$attrs = $block->attributes ? $block->attributes : array();
$height = isset( $attrs['height'] ) ? $attrs['height'] : '16';
$allowed = array( '8', '16', '24', '32' );
if ( ! in_array( $height, $allowed, true ) ) {
	$height = '16';
}
$height_px = (int) $height;

$spacer_url = function_exists( 'rakutenmusic_asset_url' ) ? rakutenmusic_asset_url( 'column/img/spacer.png' ) : ( get_template_directory_uri() . '/assets/column/img/spacer.png' );
?>
<img src="<?php echo esc_url( $spacer_url ); ?>" alt="" width="1" height="<?php echo (int) $height_px; ?>" class="column-article-spacer" loading="lazy" />
