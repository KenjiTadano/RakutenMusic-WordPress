<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$attrs   = $block->attributes ? $block->attributes : array();
$content = isset( $attrs['content'] ) ? $attrs['content'] : '';
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
?>
<div<?php echo $style_attr; ?>>
<div class="column-desc"><?php echo wp_kses_post( $content ); ?></div>
</div>
