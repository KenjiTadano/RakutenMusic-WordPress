<?php
/**
 * 読む音楽ガイド：メイン看板ブロックのフロント出力
 */
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}

$attrs   = $block->attributes ? $block->attributes : array();
$title   = isset( $attrs['title'] ) ? $attrs['title'] : '読む音楽ガイド';
$subtitle = isset( $attrs['subtitle'] ) ? $attrs['subtitle'] : '新しい発見がここに';
$desc    = isset( $attrs['description'] ) ? $attrs['description'] : '楽天ミュージックが贈る、聴いても読んでも楽しめる音楽記事をお届け';
$top_img = isset( $attrs['topImageUrl'] ) ? trim( $attrs['topImageUrl'] ) : '';
$btm_img = isset( $attrs['bottomImageUrl'] ) ? trim( $attrs['bottomImageUrl'] ) : '';

$default_img = function_exists( 'rakutenmusic_asset_url' ) ? rakutenmusic_asset_url( 'column/img/common/img_record.png' ) : ( get_template_directory_uri() . '/assets/column/img/common/img_record.png' );
if ( $top_img === '' ) {
	$top_img = $default_img;
}
if ( $btm_img === '' ) {
	$btm_img = $default_img;
}

$desc_esc = esc_html( $desc );
$desc_br  = str_replace( "\n", '<br class="is-pc-hidden" />', $desc_esc );

$bg_url  = function_exists( 'rakutenmusic_asset_url' ) ? rakutenmusic_asset_url( 'column/img/common/bg.png' ) : ( get_template_directory_uri() . '/assets/column/img/common/bg.png' );
$bg_style = 'background-image: url(' . esc_url( $bg_url ) . '); background-color: lightgray; background-position: 50% 50%; background-size: cover; background-repeat: no-repeat;';
?>
<div class="column-archive-hero-block">
<section class="hero-container" style="<?php echo esc_attr( $bg_style ); ?>">
	<div class="articles-logo-container">
		<div class="articles-logo-set">
			<div class="articles-logo-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="50" height="35" viewBox="0 0 50 35" fill="none">
					<path d="M36.5122 1.31738C38.6067 1.31738 41.828 1.55484 45.2827 2.69043C47.0256 3.26342 48.1457 3.84059 48.5132 4.04199H48.5405L48.6636 4.12012C49.0042 4.33693 49.2319 4.71622 49.2319 5.1416V33.1201C49.2318 33.5357 49.0105 33.9363 48.6362 34.1504L48.6372 34.1514C48.4459 34.2629 48.2462 34.3124 48.0396 34.3125C47.8327 34.3125 47.6324 34.263 47.4409 34.1514L47.4048 34.1299C47.4016 34.1281 47.3979 34.1262 47.394 34.124C47.3636 34.1069 47.3162 34.0803 47.2524 34.0469C47.1249 33.9799 46.9329 33.8833 46.6821 33.7676C46.1808 33.5362 45.4436 33.2276 44.5054 32.9209V32.9219C42.7715 32.3623 39.9777 31.6816 36.522 31.6816C33.4972 31.6816 30.9803 32.1952 29.2388 32.7041L28.5405 32.9209C27.6019 33.2277 26.8637 33.5387 26.3618 33.7715C26.1112 33.8877 25.9193 33.9846 25.7905 34.0518C25.7263 34.0853 25.6774 34.1118 25.644 34.1299C25.6286 34.1382 25.6128 34.1471 25.603 34.1523C25.5984 34.1548 25.5908 34.1584 25.5835 34.1621C25.5805 34.1636 25.5715 34.1681 25.561 34.1729C25.5591 34.1737 25.5554 34.174 25.5513 34.1758C25.1865 34.3703 24.7451 34.363 24.3892 34.1465L24.3813 34.1416L24.3501 34.124C24.3196 34.1069 24.2723 34.0804 24.2085 34.0469C24.081 33.9799 23.8899 33.8833 23.6392 33.7676C23.1378 33.5362 22.4001 33.2278 21.4614 32.9209C19.7275 32.3613 16.9337 31.6816 13.478 31.6816C10.4532 31.6817 7.93629 32.1952 6.19482 32.7041L5.49658 32.9209C4.55812 33.2276 3.8207 33.5387 3.31885 33.7715C3.06801 33.8878 2.87541 33.9845 2.74658 34.0518C2.68229 34.0853 2.63346 34.1118 2.6001 34.1299C2.58465 34.1383 2.56885 34.1471 2.55908 34.1523L2.51807 34.1729C2.5141 34.1747 2.50367 34.1785 2.49072 34.1836C2.13498 34.3586 1.71649 34.3509 1.36865 34.1543C0.991232 33.941 0.768181 33.5376 0.768066 33.1201V5.1416C0.768066 4.7243 0.973314 4.32438 1.35889 4.10645L1.37061 4.10059L1.38135 4.09473C1.39205 4.08792 1.74234 3.89066 2.27588 3.64258C2.84299 3.3789 3.66182 3.03422 4.70752 2.69043H4.70947C6.61805 2.07016 9.68611 1.3174 13.478 1.31738C15.5726 1.31738 18.7937 1.55478 22.2485 2.69043L22.2495 2.69141C23.4985 3.10498 24.4355 3.52153 24.9946 3.79688C25.5515 3.52174 26.4829 3.1045 27.7417 2.69043H27.7437C29.6522 2.07016 32.7203 1.31743 36.5122 1.31738ZM36.522 3.70312C33.0651 3.70312 30.2714 4.37457 28.5405 4.94238C27.591 5.25383 26.8461 5.56554 26.3472 5.7959V31.1816C26.7558 31.0191 27.2223 30.8457 27.7495 30.6699L27.7524 30.6689C29.661 30.0487 32.7298 29.2959 36.522 29.2959C38.616 29.2959 41.8358 29.5331 45.2896 30.668C45.8848 30.8604 46.4046 31.0584 46.8462 31.2393V5.86621C46.3529 5.63018 45.5551 5.2835 44.5044 4.94336C42.7704 4.38378 39.9773 3.70313 36.522 3.70312ZM13.478 3.69336C10.0212 3.69338 7.22746 4.36482 5.49658 4.93262L5.49561 4.93359C4.44501 5.27371 3.65261 5.62101 3.15381 5.8584V31.2305C3.59616 31.0515 4.11619 30.8566 4.70557 30.6602L4.70947 30.6592C6.61806 30.0389 9.68615 29.2862 13.478 29.2861C15.5726 29.2861 18.7936 29.5244 22.2485 30.6602H22.2505C22.7748 30.8349 23.2436 31.0084 23.6528 31.1709V5.78809C23.1486 5.55659 22.4099 5.24382 21.4614 4.93262V4.93359C19.7275 4.37398 16.9337 3.69336 13.478 3.69336Z" fill="black" stroke="black"/>
				</svg>
			</div>
			<h1 class="articles-title"><?php echo esc_html( $title ); ?></h1>
		</div>
		<div class="articles-line"></div>
		<h4 class="articles-subtitle"><?php echo esc_html( $subtitle ); ?></h4>
	</div>
	<div class="hero-desc"><?php echo $desc_br; ?></div>
	<img src="<?php echo esc_url( $top_img ); ?>" alt="<?php echo esc_attr__( '右上画像', 'rakutenmusic-theme' ); ?>" class="top-right-image" />
	<img src="<?php echo esc_url( $btm_img ); ?>" alt="<?php echo esc_attr__( '左下画像', 'rakutenmusic-theme' ); ?>" class="bottom-left-image" />
</section>
</div>
