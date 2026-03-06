<?php
/**
 * 固定ページテンプレート
 * ヘッダー・フッターの間の本文（ブロック）を確実に出力します。
 */
get_header();
?>
<div class="l-container">
	<main class="l-content">
		<?php
		while ( have_posts() ) :
			the_post();
			the_content();
		endwhile;
		?>
	</main>
	<aside class="l-aside" aria-hidden="true"></aside>
</div>
<?php
get_footer();
