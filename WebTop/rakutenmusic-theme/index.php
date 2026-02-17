<?php
/**
 * メインテンプレート
 */
get_header();
?>
<div class="l-container">
	<main class="l-content">
		<?php
		if ( have_posts() ) :
			while ( have_posts() ) :
				the_post();
				the_content();
			endwhile;
		endif;
		?>
	</main>
	<aside class="l-aside" aria-hidden="true"></aside>
</div>
<?php
get_footer();
