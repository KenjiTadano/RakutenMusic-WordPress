<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$slug = str_replace( 'rakutenmusic/', '', $block->block_type->name );
$accordion_id = wp_unique_id( 'accordion-introduction-' );
rakutenmusic_render_reward_block( $slug, array( '{{ACCORDION_ID}}' => $accordion_id ) );
