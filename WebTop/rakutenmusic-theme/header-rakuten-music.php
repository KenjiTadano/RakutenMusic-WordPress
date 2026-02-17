<?php
/**
 * 楽天ミュージック汎用テンプレート用ヘッダー
 * テンプレートパートに格納したヘッダーHTMLを出力します。
 */
$t = get_template_directory_uri();
$h = esc_url( home_url( '/' ) );
?>
<!doctype html>
<html <?php language_attributes(); ?> prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page">
<?php
$part = get_template_directory() . '/template-parts/header-rakuten-music.html';
if ( file_exists( $part ) ) {
	$html = file_get_contents( $part );
	$html = str_replace( '{{T}}', $t, $html );
	$html = str_replace( '{{HOME}}', $h, $html );
	$html = str_replace( '{{FLOATING_CTA_HTML}}', rakutenmusic_render_floating_cta_html( $t, $h ), $html );
	echo $html;
}
?>
