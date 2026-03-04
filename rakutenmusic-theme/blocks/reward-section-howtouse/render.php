<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$slug = str_replace( 'rakutenmusic/', '', $block->block_type->name );
rakutenmusic_render_reward_block( $slug );
