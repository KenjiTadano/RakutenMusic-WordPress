<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$attrs   = $block->attributes ? $block->attributes : array();
$content = isset( $attrs['content'] ) ? $attrs['content'] : '';
?>
<div>
<div class="article-header"><p><?php echo wp_kses_post( $content ); ?></p></div>
</div>
