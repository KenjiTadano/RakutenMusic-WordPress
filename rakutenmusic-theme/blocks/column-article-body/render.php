<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$attrs   = $block->attributes ? $block->attributes : array();
$content = isset( $attrs['content'] ) ? $attrs['content'] : '';
?>
<div>
<div class="column-desc"><?php echo wp_kses_post( $content ); ?></div>
</div>
