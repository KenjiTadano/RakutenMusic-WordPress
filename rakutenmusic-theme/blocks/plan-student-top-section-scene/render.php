<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return '';
}
$slug = str_replace( 'rakutenmusic/plan-student-', '', $block->block_type->name );
return rakutenmusic_render_plan_student_block( $slug );
