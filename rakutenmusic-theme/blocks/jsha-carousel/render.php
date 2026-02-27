<?php
/**
 * ジャケ写カルーセルブロックのフロント出力
 */
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}

// 表示時に Slick / stack-jsya-scroll を確実に読み込む（has_block がテンプレート等で効かない場合の保険）
wp_enqueue_style( 'rakutenmusic-slick-base' );
wp_enqueue_style( 'rakutenmusic-stack-jsya-scroll' );
wp_enqueue_script( 'rakutenmusic-stack-jsya-scroll' );

$attrs = $block->attributes ? $block->attributes : array();
$items = isset( $attrs['items'] ) && is_array( $attrs['items'] ) ? $attrs['items'] : array();
$items = array_values( array_filter( $items, function ( $item ) {
	return ! empty( $item['src'] );
} ) );

if ( empty( $items ) ) {
	return;
}
?>
<div class="jsha-carousel jsha-carousel-block">
	<?php foreach ( $items as $item ) : ?>
		<div>
			<img
				src="<?php echo esc_url( $item['src'] ); ?>"
				alt="<?php echo esc_attr( isset( $item['alt'] ) ? $item['alt'] : '' ); ?>"
				loading="lazy"
			/>
		</div>
	<?php endforeach; ?>
</div>
