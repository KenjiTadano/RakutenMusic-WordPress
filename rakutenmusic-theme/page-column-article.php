<?php
/**
 * Template Name: 読む音楽ガイド 記事
 *
 * コラム記事ページ用テンプレート。
 * 推奨ブロックの並び順：記事：タイトル → 記事：サイン情報 → 記事：メイン画像 → 記事：バッジ
 * → 記事：本文 → 記事：小見出し → 記事：YouTube（複数可）
 *
 * @package rakutenmusic-theme
 */

get_header( 'rakuten-music' );
?>
<div class="l-container">
	<div class="l-breadcrumb" aria-label="パンくず"></div>
	<main class="l-content">
		<section class="article">
			<div class="article-float-range">
				<?php the_content(); ?>
			</div>
		</section>
	</main>
	<aside class="l-aside" aria-hidden="true"></aside>
</div>
<?php
get_footer( 'rakuten-music' );
