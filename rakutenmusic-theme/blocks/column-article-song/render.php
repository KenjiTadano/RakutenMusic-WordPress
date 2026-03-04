<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$attrs = $block->attributes ? $block->attributes : array();
$image_url   = isset( $attrs['imageUrl'] ) ? trim( $attrs['imageUrl'] ) : '';
$link_url    = isset( $attrs['linkUrl'] ) ? trim( $attrs['linkUrl'] ) : '#';
$link_url_pc = isset( $attrs['linkUrlPc'] ) && $attrs['linkUrlPc'] !== '' ? trim( $attrs['linkUrlPc'] ) : $link_url;
$link_url_sp = isset( $attrs['linkUrlSp'] ) && $attrs['linkUrlSp'] !== '' ? trim( $attrs['linkUrlSp'] ) : $link_url;
// User-Agent（wp_is_mobile）でデバイス判定し、PC用・スマホ用URLを出し分け
$is_mobile   = function_exists( 'wp_is_mobile' ) && wp_is_mobile();
$link_url_use = $is_mobile ? $link_url_sp : $link_url_pc;
$song_name   = isset( $attrs['songName'] ) ? $attrs['songName'] : '';
$description = isset( $attrs['description'] ) ? $attrs['description'] : '';

$assets_uri = function_exists( 'rakutenmusic_get_assets_uri' ) ? rakutenmusic_get_assets_uri() : get_template_directory_uri() . '/assets';
if ( $image_url !== '' && strpos( $image_url, '/assets/' ) === 0 ) {
	$image_url = $assets_uri . substr( $image_url, 7 );
}

$btn_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none"><rect x="0.5" y="1.02441" width="23" height="23" rx="11.5" stroke="white"/><path d="M10.2147 16.8749L16.625 13.1739C17.125 12.8853 17.125 12.1636 16.625 11.8749L10.2147 8.17393C9.71475 7.88526 9.08975 8.2461 9.08975 8.82345L9.08975 16.2254C9.08975 16.8027 9.71475 17.1636 10.2147 16.8749Z" fill="white"/></svg>';
?>
<div class="song-article-block">
	<div class="song-pic-area">
		<a href="<?php echo esc_url( $link_url_use ); ?>">
			<?php if ( $image_url !== '' ) : ?>
				<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( wp_strip_all_tags( $song_name ) ); ?>" loading="lazy" />
			<?php endif; ?>
		</a>
		<a class="btn-player" href="<?php echo esc_url( $link_url_use ); ?>">
			<p>いますぐ聴く</p>
			<?php echo $btn_svg; ?>
		</a>
	</div>
	<div class="song-desc-area">
		<?php if ( $song_name !== '' ) : ?>
			<span class="song-name" style="padding: 12px 0"><?php echo wp_kses_post( $song_name ); ?></span>
		<?php endif; ?>
		<?php if ( $description !== '' ) : ?>
			<div class="artist-desc"><?php echo wp_kses_post( $description ); ?></div>
		<?php endif; ?>
	</div>
</div>
