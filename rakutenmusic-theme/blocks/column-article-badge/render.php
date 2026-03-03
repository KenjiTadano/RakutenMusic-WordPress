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
<div class="tags">
	<div class="<?php echo esc_attr( $badge ); ?>"><?php echo esc_html( $label ); ?></div>
</div>
</div>
