<?php
/**
 * 読む音楽ガイド：記事一覧ブロックのフロント出力
 */
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}

$attrs = $block->attributes ? $block->attributes : array();
$items = isset( $attrs['items'] ) && is_array( $attrs['items'] ) ? $attrs['items'] : array();
$items = array_values( array_filter( $items, function ( $item ) {
	return is_array( $item ) && ( isset( $item['title'] ) || isset( $item['imageUrl'] ) );
} ) );

$badge_labels = array(
	'feature'   => '特集',
	'column'    => 'コラム',
	'interview' => 'インタビュー',
	'ranking'   => 'ランキング',
);

/**
 * /assets/ で始まるパスをテーマの絶対URLに変換（ローカルで相対パス指定したい場合用）
 *
 * @param string $url 画像URLまたはリンクURL
 * @return string
 */
$resolve_assets_url = function ( $url ) {
	$url = trim( $url );
	if ( $url === '' ) {
		return $url;
	}
	if ( strpos( $url, '/assets/' ) === 0 ) {
		$base = function_exists( 'rakutenmusic_get_assets_uri' ) ? rakutenmusic_get_assets_uri() : get_template_directory_uri() . '/assets';
		return $base . substr( $url, 7 );
	}
	return $url;
};
?>
<section class="bg-archive">
	<div class="archive">
		<div class="title-latest">
			<div class="page-subtitle-en">Articles</div>
			<h2 class="page-subtitle"><?php esc_html_e( '記事一覧', 'rakutenmusic-theme' ); ?></h2>
		</div>
		<ul id="target-row">
			<?php foreach ( $items as $item ) : ?>
				<?php
				$image_url = isset( $item['imageUrl'] ) ? $resolve_assets_url( $item['imageUrl'] ) : '';
				$link_url  = isset( $item['linkUrl'] ) ? trim( $item['linkUrl'] ) : '';
				$link_url  = $link_url !== '' ? $resolve_assets_url( $link_url ) : '#';
				$badge     = isset( $item['badge'] ) && in_array( $item['badge'], array( 'feature', 'column', 'interview', 'ranking' ), true ) ? $item['badge'] : 'feature';
				$title     = isset( $item['title'] ) ? $item['title'] : '';
				$date      = isset( $item['date'] ) ? $item['date'] : '';
				$label     = isset( $badge_labels[ $badge ] ) ? $badge_labels[ $badge ] : '特集';
				if ( $image_url === '' ) {
					continue;
				}
				?>
				<li>
					<div class="article-card">
						<div class="cover-img">
							<a href="<?php echo esc_url( $link_url ); ?>">
								<img
									src="<?php echo esc_url( $image_url ); ?>"
									alt="<?php echo esc_attr( $title ); ?>"
									loading="lazy"
								/>
							</a>
						</div>
						<div class="tags">
							<div class="<?php echo esc_attr( $badge ); ?>"><?php echo esc_html( $label ); ?></div>
						</div>
						<div class="name">
							<p><?php echo esc_html( $title ); ?></p>
						</div>
						<div class="date">
							<p><?php echo esc_html( $date ); ?></p>
						</div>
					</div>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
