<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$attrs  = $block->attributes ? $block->attributes : array();
$content = isset( $attrs['content'] ) ? $attrs['content'] : '';
$font_size = isset( $attrs['fontSize'] ) && $attrs['fontSize'] !== '' ? trim( $attrs['fontSize'] ) : '';
$spacing_top = isset( $attrs['spacingTop'] ) && $attrs['spacingTop'] !== '' ? $attrs['spacingTop'] : '';
$spacing_bottom = isset( $attrs['spacingBottom'] ) && $attrs['spacingBottom'] !== '' ? $attrs['spacingBottom'] : '';
$wrapper_style_parts = array();
if ( $spacing_top !== '' ) {
	$wrapper_style_parts[] = 'margin-top:' . esc_attr( $spacing_top );
}
if ( $spacing_bottom !== '' ) {
	$wrapper_style_parts[] = 'margin-bottom:' . esc_attr( $spacing_bottom );
}
$wrapper_style_attr = count( $wrapper_style_parts ) > 0 ? ' style="' . implode( ';', $wrapper_style_parts ) . '"' : '';
$h1_style_attr = $font_size !== '' ? ' style="font-size:' . esc_attr( $font_size ) . '"' : '';
if ( $content === '' ) {
	return;
}
?>
<div<?php echo $wrapper_style_attr; ?>>
<h1<?php echo $h1_style_attr; ?>><?php echo wp_kses_post( $content ); ?></h1>
</div>
