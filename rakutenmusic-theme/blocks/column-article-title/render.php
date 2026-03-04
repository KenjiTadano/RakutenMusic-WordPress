<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$attrs  = $block->attributes ? $block->attributes : array();
$content = isset( $attrs['content'] ) ? $attrs['content'] : '';
$font_size = isset( $attrs['fontSize'] ) && $attrs['fontSize'] !== '' ? trim( $attrs['fontSize'] ) : '';
$h1_style_attr = $font_size !== '' ? ' style="font-size:' . esc_attr( $font_size ) . '"' : '';
if ( $content === '' ) {
	return;
}
?>
<div>
<h1<?php echo $h1_style_attr; ?>><?php echo wp_kses_post( $content ); ?></h1>
</div>
