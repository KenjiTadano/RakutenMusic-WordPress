<?php
/**
 * 楽天ミュージック汎用テンプレート用フッター
 * テンプレートパートに格納したフッターHTMLを出力します。
 */
$t = get_template_directory_uri();
$h = esc_url( home_url( '/' ) );
$part = get_template_directory() . '/template-parts/footer-rakuten-music.html';
if ( file_exists( $part ) ) {
	$html = file_get_contents( $part );
	$html = str_replace( '{{T}}', $t, $html );
	$html = str_replace( '{{HOME}}', $h, $html );
	echo $html;
}
?>
</div><!-- /#page -->
<?php wp_footer(); ?>
</body>
</html>
