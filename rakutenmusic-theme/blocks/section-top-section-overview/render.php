<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}

// ページ共通のフローティングCTA設定（アプリDLのQR・ストアURL）を流用
$defaults      = function_exists( 'rakutenmusic_floating_cta_defaults' ) ? rakutenmusic_floating_cta_defaults() : array();
$page_id       = get_the_ID();
$app_qr_url    = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_app_qr_url', true ) : '';
$app_store_url = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_app_store_url', true ) : '';

if ( $app_store_url === '' && isset( $defaults['app_store_url'] ) ) {
	$app_store_url = $defaults['app_store_url'];
}
$app_store_url = $app_store_url !== '' ? esc_url( $app_store_url ) : ( isset( $defaults['app_store_url'] ) ? esc_url( $defaults['app_store_url'] ) : '#' );
$app_qr_url    = $app_qr_url !== '' ? esc_url( $app_qr_url ) : '';

$slug = 'top-section-overview';
$part = get_template_directory() . '/template-parts/sections/section-' . $slug . '.html';
if ( ! file_exists( $part ) ) {
	echo '<!-- section-' . esc_attr( $slug ) . '.html not found -->';
	return;
}

$html = file_get_contents( $part );
$html = str_replace( '{{T}}', get_template_directory_uri(), $html );
$html = str_replace( '{{HOME}}', esc_url( home_url( '/' ) ), $html );
$html = str_replace( '{{APP_STORE_URL}}', $app_store_url, $html );
$html = str_replace( '{{APP_QR_URL}}', $app_qr_url, $html );

if ( in_array( $slug, function_exists( 'rakutenmusic_get_bundle_section_slugs' ) ? rakutenmusic_get_bundle_section_slugs() : array(), true ) ) {
	$html = trim( $html );
	$html = '<div id="rakutenmusic-bundle-root" class="rakutenmusic-bundle-wrap">' . $html . '</div>';
}

echo $html;
