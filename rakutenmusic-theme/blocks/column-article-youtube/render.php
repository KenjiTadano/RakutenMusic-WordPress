<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$attrs = $block->attributes ? $block->attributes : array();
$video_type = isset( $attrs['videoType'] ) && $attrs['videoType'] === 'image' ? 'image' : 'iframe';
$iframe_src = isset( $attrs['iframeSrc'] ) ? trim( $attrs['iframeSrc'] ) : '';
$image_url = isset( $attrs['imageUrl'] ) ? trim( $attrs['imageUrl'] ) : '';
$link_url = isset( $attrs['linkUrl'] ) ? trim( $attrs['linkUrl'] ) : '#';
$song_name = isset( $attrs['songName'] ) ? $attrs['songName'] : '';
$artist_name = isset( $attrs['artistName'] ) ? $attrs['artistName'] : '';
$description = isset( $attrs['description'] ) ? $attrs['description'] : '';
if ( $image_url !== '' && ( strpos( $image_url, '/assets/' ) === 0 || strpos( $image_url, 'assets/' ) === 0 ) ) {
	$image_url = function_exists( 'rakutenmusic_resolve_asset_url' ) ? rakutenmusic_resolve_asset_url( $image_url ) : ( get_template_directory_uri() . '/assets' . ( strpos( $image_url, '/' ) === 0 ? substr( $image_url, 7 ) : '/' . $image_url ) );
}
?>
<div class="video-article-block">
	<div class="video-area">
		<?php if ( $video_type === 'image' && $image_url !== '' ) : ?>
			<a href="<?php echo esc_url( $link_url ); ?>">
				<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $song_name ); ?>" />
			</a>
		<?php elseif ( $video_type === 'iframe' && $iframe_src !== '' ) : ?>
			<iframe src="<?php echo esc_url( $iframe_src ); ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
		<?php endif; ?>
	</div>
	<div class="video-desc-area">
		<div class="video-name-group">
			<span class="song-name"><?php echo esc_html( $song_name ); ?></span>
			<p class="artist-name"><?php echo esc_html( $artist_name ); ?></p>
		</div>
		<div class="video-artist-desc"><?php echo wp_kses_post( $description ); ?></div>
	</div>
</div>
