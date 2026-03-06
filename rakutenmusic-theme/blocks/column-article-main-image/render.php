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
if ( strpos( $url, '/assets/' ) === 0 || strpos( $url, 'assets/' ) === 0 ) {
	$url = function_exists( 'rakutenmusic_resolve_asset_url' ) ? rakutenmusic_resolve_asset_url( $url ) : ( get_template_directory_uri() . ( strpos( $url, '/' ) === 0 ? '' : '/' ) . $url );
}
?>
<div>
<div class="main-image">
	<img src="<?php echo esc_url( $url ); ?>" width="800" height="420" alt="<?php echo esc_attr( $alt ); ?>" loading="lazy" />
</div>
</div>
