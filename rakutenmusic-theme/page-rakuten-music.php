<?php
/**
 * Template Name: 楽天ミュージック汎用
 * ヘッダー・フッターは共通パーツを使用し、本文はブロックで構成します。
 */
get_header( 'rakuten-music' );

$home = esc_url( home_url( '/' ) );
?>
<div class="l-container">
	<div class="l-breadcrumb" aria-label="パンくず"></div>
	<main class="l-content">
		<?php the_content(); ?>
	</main>
	<aside class="l-aside" aria-hidden="true"></aside>
</div>
<?php
get_footer( 'rakuten-music' );
