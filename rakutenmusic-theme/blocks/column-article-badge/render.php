<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$attrs = $block->attributes ? $block->attributes : array();
$badge = isset( $attrs['badge'] ) ? $attrs['badge'] : 'feature';
$allowed = array( 'feature', 'column', 'interview', 'ranking' );
if ( ! in_array( $badge, $allowed, true ) ) {
	$badge = 'feature';
}
$labels = array( 'feature' => '特集', 'column' => 'コラム', 'interview' => 'インタビュー', 'ranking' => 'ランキング' );
$label = isset( $labels[ $badge ] ) ? $labels[ $badge ] : '特集';
?>
<div>
<div class="tags">
	<div class="<?php echo esc_attr( $badge ); ?>"><?php echo esc_html( $label ); ?></div>
</div>
</div>
