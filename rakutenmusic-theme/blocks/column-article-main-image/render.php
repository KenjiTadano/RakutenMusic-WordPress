<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$attrs = $block->attributes ? $block->attributes : array();
$url = isset( $attrs['url'] ) ? trim( $attrs['url'] ) : '';
$alt = isset( $attrs['alt'] ) ? $attrs['alt'] : '';
$spacing_top = isset( $attrs['spacingTop'] ) && $attrs['spacingTop'] !== '' ? $attrs['spacingTop'] : '';
$spacing_bottom = isset( $attrs['spacingBottom'] ) && $attrs['spacingBottom'] !== '' ? $attrs['spacingBottom'] : '';
$style_parts = array();
if ( $spacing_top !== '' ) {
	$style_parts[] = 'margin-top:' . esc_attr( $spacing_top );
}
if ( $spacing_bottom !== '' ) {
	$style_parts[] = 'margin-bottom:' . esc_attr( $spacing_bottom );
}
$style_attr = count( $style_parts ) > 0 ? ' style="' . implode( ';', $style_parts ) . '"' : '';
if ( $url === '' ) {
	return;
}
if ( strpos( $url, '/assets/' ) === 0 ) {
	$assets_uri = function_exists( 'rakutenmusic_get_assets_uri' ) ? rakutenmusic_get_assets_uri() : get_template_directory_uri() . '/assets';
	$url = $assets_uri . substr( $url, 7 );
}
?>
<div<?php echo $style_attr; ?>>
<div class="main-image">
	<img src="<?php echo esc_url( $url ); ?>" width="800" height="420" alt="<?php echo esc_attr( $alt ); ?>" loading="lazy" />
</div>
</div>
