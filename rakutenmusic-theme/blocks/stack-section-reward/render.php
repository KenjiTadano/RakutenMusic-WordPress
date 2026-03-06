<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return '';
}
$dir  = get_template_directory();
$file = $dir . '/template-parts/sections/section-reward.html';
if ( ! file_exists( $file ) ) {
	return '';
}
$html = file_get_contents( $file );
// リワード【Black】= ダーク背景版
$html = str_replace( 'class="bg-light"', 'class="bg-dark"', $html );
$html = str_replace( 'class="bg-light-txt font-rakuten-b">REWARD', 'class="bg-dark-txt font-rakuten-b">REWARD', $html );
$reward_url = esc_url( home_url( '/reward/' ) ) . '?scid=wi_msc_stack_reward';
$html = str_replace( 'href="#section-howtouse" class="txt-link-red-dark scroll"', 'href="' . $reward_url . '" class="txt-link-red-dark"', $html );
return $html;
