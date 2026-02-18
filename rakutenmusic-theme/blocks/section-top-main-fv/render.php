<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$slug = str_replace( 'rakutenmusic/rakuten-music-section-', '', $block->block_type->name );
echo rakutenmusic_render_rakuten_section( $slug );
