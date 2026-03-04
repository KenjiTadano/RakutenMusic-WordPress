<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$slug = str_replace( 'rakutenmusic/plan-lite-', '', $block->block_type->name );
rakutenmusic_render_plan_lite_block( $slug );
?>
