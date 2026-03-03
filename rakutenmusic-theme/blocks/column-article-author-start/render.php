<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}
$attrs = $block->attributes ? $block->attributes : array();
$date = isset( $attrs['date'] ) ? $attrs['date'] : '';
$twitter_href = isset( $attrs['twitterHref'] ) ? $attrs['twitterHref'] : '';
$facebook_href = isset( $attrs['facebookHref'] ) ? $attrs['facebookHref'] : '';
$hide_twitter = ! empty( $attrs['hideTwitter'] );
$hide_facebook = ! empty( $attrs['hideFacebook'] );
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
$assets_uri = function_exists( 'rakutenmusic_get_assets_uri' ) ? rakutenmusic_get_assets_uri() : get_template_directory_uri() . '/assets';
$icon_url = $assets_uri . '/column/img/common/icon.png';
?>
<div<?php echo $style_attr; ?>>
<div class="author-start">
	<div class="author-area">
		<img class="author-img" height="50" width="50" src="<?php echo esc_url( $icon_url ); ?>" alt="<?php echo esc_attr__( '楽天ミュージック編集室', 'rakutenmusic-theme' ); ?>" loading="lazy" />
		<div class="author-desc">
			<span><?php echo esc_html__( '楽天ミュージック編集室', 'rakutenmusic-theme' ); ?></span>
			<div class="article-date">
				<locale-date><template shadowrootmode="open"><slot></slot></template><?php echo esc_html( $date ); ?></locale-date>
			</div>
		</div>
	</div>
	<?php if ( ! $hide_twitter || ! $hide_facebook ) : ?>
	<div class="sns-area">
		<?php if ( ! $hide_twitter && $twitter_href !== '' ) : ?>
		<a href="<?php echo esc_url( $twitter_href ); ?>" class="twitter-share-button" data-show-count="false">Tweet</a>
		<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
		<?php endif; ?>
		<?php if ( ! $hide_facebook && $facebook_href !== '' ) : ?>
		<div class="fb-share-button" data-href="<?php echo esc_attr( $facebook_href ); ?>" data-layout="button" data-size="small"><a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo rawurlencode( $facebook_href ); ?>&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"><?php esc_html_e( 'シェアする', 'rakutenmusic-theme' ); ?></a></div>
		<?php endif; ?>
	</div>
	<?php endif; ?>
</div>
</div>
