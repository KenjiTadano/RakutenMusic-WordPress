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
$assets_uri = function_exists( 'rakutenmusic_get_assets_uri' ) ? rakutenmusic_get_assets_uri() : get_template_directory_uri() . '/assets';
$icon_url = $assets_uri . '/column/img/common/icon.png';
?>
<div>
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
