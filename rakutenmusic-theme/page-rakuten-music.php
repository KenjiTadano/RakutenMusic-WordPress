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
	<main class="l-content" id="main-content">
		<?php
		while ( have_posts() ) :
			the_post();
			$content = get_the_content();
			// ブロックを含む本文を描画（do_blocks は the_content フィルター内で実行される）
			echo apply_filters( 'the_content', $content );
			// 本文が空で管理者の場合のみ、ブロック追加を促すメッセージを表示
			if ( trim( $content ) === '' && current_user_can( 'edit_posts' ) ) {
				echo '<p class="rakutenmusic-empty-content-notice" style="padding:1em;margin:1em;background:#f0f0f0;border:1px dashed #ccc;">このページにはまだブロックがありません。編集画面でブロックを追加し、「更新」を押して保存してください。</p>';
			}
		endwhile;
		?>
	</main>
	<aside class="l-aside" aria-hidden="true"></aside>
</div>
<?php
get_footer( 'rakuten-music' );
