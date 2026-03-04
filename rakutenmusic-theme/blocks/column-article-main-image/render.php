<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$attrs = $block->attributes ? $block->attributes : array();
$url = isset( $attrs['url'] ) ? trim( $attrs['url'] ) : '';
$alt = isset( $attrs['alt'] ) ? $attrs['alt'] : '';
if ( $url === '' ) {
	return;
}
if ( strpos( $url, '/assets/' ) === 0 ) {
	$assets_uri = function_exists( 'rakutenmusic_get_assets_uri' ) ? rakutenmusic_get_assets_uri() : get_template_directory_uri() . '/assets';
	$url = $assets_uri . substr( $url, 7 );
}
?>
<div>
<div class="main-image">
	<img src="<?php echo esc_url( $url ); ?>" width="800" height="420" alt="<?php echo esc_attr( $alt ); ?>" loading="lazy" />
</div>
</div>
