<?php
/**
 * 楽天ミュージック汎用テーマ用 functions
 * セクションブロックの登録 / CSS・JS の読み込み
 */

defined( 'ABSPATH' ) || exit;

/**
 * テーマサポート：ブロックの余白（マージン・パディング）をサイドバーで編集できるようにする
 */
function rakutenmusic_setup_theme_support() {
	add_theme_support( 'appearance-tools' );
}
add_action( 'after_setup_theme', 'rakutenmusic_setup_theme_support' );

/**
 * 全 rakutenmusic ブロックに「上余白・下余白」属性を付与（記事ブロックと同じ余白設定をサイドバーに表示するため）
 * 今後新規作成するブロックも block.json の name が rakutenmusic/ で始まればデフォルトで余白設定が利用可能
 */
function rakutenmusic_register_block_type_args( $args, $block_type ) {
	$name = isset( $block_type->name ) ? $block_type->name : '';
	if ( strpos( $name, 'rakutenmusic/' ) !== 0 ) {
		return $args;
	}
	$attrs = isset( $args['attributes'] ) && is_array( $args['attributes'] ) ? $args['attributes'] : array();
	$attrs['spacingTop']    = array( 'type' => 'string', 'default' => '' );
	$attrs['spacingBottom'] = array( 'type' => 'string', 'default' => '' );
	$args['attributes'] = $attrs;
	return $args;
}
add_filter( 'register_block_type_args', 'rakutenmusic_register_block_type_args', 10, 2 );

/**
 * フロント：余白属性（spacingTop / spacingBottom）をブロック出力のラッパーに反映
 */
function rakutenmusic_render_block_add_spacing_wrapper( $block_content, $block, $instance ) {
	if ( empty( $block['blockName'] ) || strpos( $block['blockName'], 'rakutenmusic/' ) !== 0 ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	$top    = isset( $attrs['spacingTop'] ) && $attrs['spacingTop'] !== '' ? $attrs['spacingTop'] : '';
	$bottom = isset( $attrs['spacingBottom'] ) && $attrs['spacingBottom'] !== '' ? $attrs['spacingBottom'] : '';
	if ( $top === '' && $bottom === '' ) {
		return $block_content;
	}
	$style_parts = array();
	if ( $top !== '' ) {
		$style_parts[] = 'margin-top:' . esc_attr( $top );
	}
	if ( $bottom !== '' ) {
		$style_parts[] = 'margin-bottom:' . esc_attr( $bottom );
	}
	return '<div class="rakutenmusic-block-spacing-wrapper" style="' . implode( ';', $style_parts ) . '">' . $block_content . '</div>';
}
add_filter( 'render_block', 'rakutenmusic_render_block_add_spacing_wrapper', 10, 3 );

/**
 * テーマ用アセットのベースURL（フィルターで変更可能）
 *
 * @return string
 */
function rakutenmusic_get_assets_uri() {
	$base = get_template_directory_uri() . '/assets';
	return apply_filters( 'rakutenmusic_assets_base_uri', $base );
}

/**
 * フロント用 CSS・JS を登録・読み込み
 */
function rakutenmusic_enqueue_scripts() {
	$t_uri = get_template_directory_uri();
	$assets = rakutenmusic_get_assets_uri();

	// 外部CSS
	wp_enqueue_style(
		'rakutenmusic-google-fonts',
		'https://fonts.googleapis.com/earlyaccess/notosansjp.css',
		array(),
		null
	);
	wp_enqueue_style(
		'rakutenmusic-google-fonts-lato',
		'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700&family=Raleway:wght@800;900&display=swap',
		array(),
		null
	);
	wp_enqueue_style(
		'rakutenmusic-fontawesome',
		'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
		array(),
		'5.8.2'
	);
	wp_enqueue_style(
		'rakutenmusic-rf-main',
		'https://corp.rakuten.co.jp/assets/css/rf-main.css',
		array(),
		null
	);
	wp_enqueue_style(
		'rakutenmusic-slick-theme',
		'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
		array(),
		'1.8.1'
	);
	wp_enqueue_style(
		'rakutenmusic-splide',
		'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css',
		array(),
		'4.1.4'
	);
	wp_enqueue_style(
		'rakutenmusic-app-common',
		'https://music.r10s.jp/external/prod/assets/common/css/app.css',
		array(),
		'011615'
	);

	// テーマ内CSS（スタック系）※ top-main-fv / saikyo / campaign は style_2026.css、price は stack-pricelist、reward は stack-reward
	$stack_css = array(
		'stack-magnific-popup'        => '/common/css/magnific-popup.css',
		'stack-floating-banner'       => '/campaign/common/css/stack-floating-banner.css',
		'stack-mission'              => '/campaign/common/css/stack-mission.css',
		'stack-pricelist'             => '/campaign/common/css/stack-pricelist.css',
		'stack-competitiveservices'   => '/campaign/common/css/stack-competitiveservices.css',
		'stack-sound-quality'         => '/campaign/common/css/stack-sound-quality.css',
		'stack-rakutenmusicrank'      => '/common/css/stack-rakutenmusicrank.css',
		'stack-reward'                => '/common/css/stack-reward.css',
		'stack-trial-button'          => '/campaign/common/css/stack-trial-button.css',
	);
	foreach ( $stack_css as $handle => $path ) {
		wp_enqueue_style(
			'rakutenmusic-' . $handle,
			$assets . $path,
			array(),
			wp_get_theme()->get( 'Version' )
		);
	}

	// メインCSS（フォント・メインスタイル）
	wp_enqueue_style(
		'rakutenmusic-font',
		$assets . '/top/css/font.css',
		array(),
		wp_get_theme()->get( 'Version' )
	);
	wp_enqueue_style(
		'rakutenmusic-main',
		$assets . '/top/css/style_2026.css',
		array( 'rakutenmusic-font', 'rakutenmusic-splide' ),
		wp_get_theme()->get( 'Version' )
	);

	// common.css / stack-service-overview.css（#page .l-content → .l-content に置換してメインの .l-content に当たるようにする）
	$t_dir   = get_template_directory() . '/assets/common/css/';
	$common  = array( 'common.css', 'stack-service-overview.css' );
	$common_css = '';
	foreach ( $common as $file ) {
		$path = $t_dir . $file;
		if ( file_exists( $path ) ) {
			$css  = file_get_contents( $path );
			$css  = str_replace( '#page .l-content', '.l-content', $css );
			$common_css .= $css . "\n";
		}
	}
	if ( $common_css !== '' ) {
		wp_register_style( 'rakutenmusic-common', false, array( 'rakutenmusic-main' ), wp_get_theme()->get( 'Version' ) );
		wp_enqueue_style( 'rakutenmusic-common' );
		wp_add_inline_style( 'rakutenmusic-common', $common_css );
	}

	// jQuery（WordPress標準）・inview・メインJS
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script(
		'rakutenmusic-jquery-inview',
		$assets . '/common/js/jquery.inview.min.js',
		array( 'jquery' ),
		wp_get_theme()->get( 'Version' ),
		true
	);
	wp_enqueue_script(
		'rakutenmusic-main',
		$assets . '/top/js/main.js',
		array( 'jquery' ),
		wp_get_theme()->get( 'Version' ),
		true
	);
	wp_enqueue_script(
		'rakutenmusic-splide',
		'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js',
		array(),
		'4.1.4',
		true
	);
}

add_action( 'wp_enqueue_scripts', 'rakutenmusic_enqueue_scripts' );

/**
 * top-section-price ブロック使用時に plan 用 CSS・JS を読み込む
 */
function rakutenmusic_enqueue_plan_section_assets() {
	$post = get_queried_object();
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return;
	}
	if ( ! has_block( 'rakutenmusic/rakuten-music-section-top-section-price', $post ) ) {
		return;
	}
	$assets = rakutenmusic_get_assets_uri();
	$ver    = wp_get_theme()->get( 'Version' );
	$script_path = get_template_directory() . '/assets/plan/js/script_simulator.js';
	if ( file_exists( $script_path ) ) {
		$ver = $ver . '-' . filemtime( $script_path );
	}

	wp_enqueue_style(
		'rakutenmusic-plan-style',
		$assets . '/plan/css/style_20250812.css',
		array(),
		$ver
	);
	wp_enqueue_style(
		'rakutenmusic-plan-simulator',
		$assets . '/plan/css/style_simulator.css',
		array( 'rakutenmusic-plan-style' ),
		$ver
	);
	// 結合・別URL読み込み時も画像が取れるよう絶対URLで上書き
	$plan_img = get_template_directory_uri() . '/assets/plan/img/';
	$plan_img_css = sprintf(
		".plan__simulator-header::after{background-image:url('%splan__simulator-header--bg--sp.png')!important}"
		. ".plan__simulator-check-wrapper .plan__simulator-check-container .radio-label.radio-label--1::after{background-image:url('%sbtn__illust_01.png')!important}"
		. ".plan__simulator-check-wrapper .plan__simulator-check-container .radio-label.radio-label--3::after{background-image:url('%sbtn__illust_02.png')!important}"
		. ".plan__simulator-check-wrapper .plan__simulator-check-container .radio-label.radio-label--5::after{background-image:url('%sbtn__illust_03.png')!important}"
		. "@media screen and (min-width:768px){.plan__simulator-header::after{background-image:url('%splan__simulator-header--bg--pc.png')!important}}",
		$plan_img,
		$plan_img,
		$plan_img,
		$plan_img,
		$plan_img
	);
	wp_add_inline_style( 'rakutenmusic-plan-simulator', $plan_img_css );
	wp_enqueue_script(
		'rakutenmusic-plan-simulator',
		$assets . '/plan/js/script_simulator.js',
		array( 'jquery' ),
		$ver,
		true
	);
	// 外部JSが読めない場合のフォールバック: data属性のみで結果表示まで実行
	$inline_fallback = <<<'JS'
(function(){
function planSimulatorShowResult(){
if(window._planSimulatorTimeoutId){clearTimeout(window._planSimulatorTimeoutId);window._planSimulatorTimeoutId=null;}
var w=document.querySelector(".plan__simulator-check-wrapper")||document.querySelector("[data-plan-simulator-wrapper]");
if(!w)return;
var loading=w.querySelector("[data-plan-simulator=loading]");
var result=w.querySelector("[data-plan-simulator=result]");
if(!loading)return;
var initial=w.querySelector("[data-plan-simulator=initial]");
var msg=w.querySelector(".plan__initial-message");
if(initial)initial.classList.add("plan__is-hidden");
if(msg)msg.classList.add("plan__is-hidden");
if(result){result.classList.add("plan__is-hidden");var s=result.querySelectorAll("section");for(var i=0;i<s.length;i++)s[i].classList.add("plan__is-hidden");}
loading.classList.remove("plan__is-hidden");
loading.style.removeProperty("display");
window._planSimulatorTimeoutId=setTimeout(function(){
window._planSimulatorTimeoutId=null;
var w2=document.querySelector(".plan__simulator-check-wrapper")||document.querySelector("[data-plan-simulator-wrapper]");
if(!w2)return;
var ld=w2.querySelector("[data-plan-simulator=loading]");
var res=w2.querySelector("[data-plan-simulator=result]");
if(ld)ld.style.setProperty("display","none","important");
if(res){res.classList.remove("plan__is-hidden");res.style.removeProperty("display");}
var v1=(w2.querySelector("input[name=select1]:checked")||{}).value,v2=(w2.querySelector("input[name=select2]:checked")||{}).value,v3=(w2.querySelector("input[name=select3]:checked")||{}).value;
var pat=(v1||"")+(v2||"")+(v3||""),key=null;
if(/^A(AA|AB|BA|BB)$/.test(pat))key="1";else if(/^B(AA|BA)$/.test(pat))key="2";else if(pat==="BAB")key="6";else if(pat==="BBB")key="8";
var pel=key&&res?res.querySelector("[data-plan-pattern=\""+key+"\"]"):null;
if(pel){pel.classList.remove("plan__is-hidden");pel.style.removeProperty("display");}
},2000);
}
document.addEventListener("DOMContentLoaded",function(){
var w=document.querySelector(".plan__simulator-check-wrapper")||document.querySelector("[data-plan-simulator-wrapper]");
if(!w)return;
var btn=w.querySelector("[data-plan-simulator=decision]")||document.getElementById("decisionButton");
if(!btn)return;
btn.addEventListener("click",function(e){e.preventDefault();(window.rakutenMusicShowResult||planSimulatorShowResult)();});
});
})();
JS;
	wp_add_inline_script( 'rakutenmusic-plan-simulator', $inline_fallback, 'after' );
}
add_action( 'wp_enqueue_scripts', 'rakutenmusic_enqueue_plan_section_assets', 20 );

/**
 * バンドル用セクションブロック（overview / firstplaylists / usage-steps / upgrade / faq）使用時に bundle 用 CSS・JS を読み込む
 */
function rakutenmusic_enqueue_bundle_section_assets() {
	$post = get_queried_object();
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return;
	}
	$bundle_blocks = array(
		'rakutenmusic/rakuten-music-section-top-section-overview',
		'rakutenmusic/rakuten-music-section-top-section-firstplaylists',
		'rakutenmusic/rakuten-music-section-top-section-usage-steps',
		'rakutenmusic/rakuten-music-section-top-section-upgrade',
		'rakutenmusic/rakuten-music-section-top-section-faq',
		'rakutenmusic/rakuten-music-section-top-section-scene',
		'rakutenmusic/rakuten-music-section-top-section-function-comparison',
	);
	$has_bundle = false;
	foreach ( $bundle_blocks as $block_name ) {
		if ( has_block( $block_name, $post ) ) {
			$has_bundle = true;
			break;
		}
	}
	if ( ! $has_bundle ) {
		return;
	}
	$assets = rakutenmusic_get_assets_uri();
	$ver    = wp_get_theme()->get( 'Version' );
	$t_dir = get_template_directory() . '/assets/';
	// 隔離用：IDで特定性を上げ、確実に効くベースを先頭に置く
	$all_css = '
#rakutenmusic-bundle-root.rakutenmusic-bundle-wrap { box-sizing: border-box; width: 100%; max-width: 100%; }
#rakutenmusic-bundle-root.rakutenmusic-bundle-wrap *,
#rakutenmusic-bundle-root.rakutenmusic-bundle-wrap *::before,
#rakutenmusic-bundle-root.rakutenmusic-bundle-wrap *::after { box-sizing: border-box; }
#rakutenmusic-bundle-root .bg-dark,
#rakutenmusic-bundle-root .bg-light { padding: 48px 0; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; gap: 32px; }
#rakutenmusic-bundle-root .bg-dark .ttl-group,
#rakutenmusic-bundle-root .bg-light .ttl-group { display: flex; flex-direction: column; align-items: center; gap: 8px; }
#rakutenmusic-bundle-root .bg-light .ttl-group sub { font-size: 16px !important; font-weight: 900; line-height: 110% !important; text-transform: uppercase; text-align: center; color: #d80000; }
#rakutenmusic-bundle-root .bg-light .ttl-group h2 { text-align: center; font-size: 24px; font-weight: 700; line-height: 140%; color: #000; }
#rakutenmusic-bundle-root .bg-dark .ttl-group sub { color: #f53a3a; }
#rakutenmusic-bundle-root .bg-dark .ttl-group h2 { color: #fff; }
#rakutenmusic-bundle-root #top-section-overview { width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center; }
#rakutenmusic-bundle-root #top-section-overview .ttl-group,
#rakutenmusic-bundle-root #top-section-overview .column-flex { display: flex; flex-direction: column; align-items: center; text-align: center; }
#rakutenmusic-bundle-root #top-section-overview .overview_new { display: flex; flex-direction: row; justify-content: center; align-items: center; flex-wrap: nowrap; text-align: center; }
#rakutenmusic-bundle-root #top-section-overview .about-bundle-pricegroup h1 { font-size: 72px; line-height: 120%; font-weight: 800; }
#rakutenmusic-bundle-root #top-section-overview .about-bundle-pricegroup h2 { font-size: 18px; font-weight: 800; line-height: 108%; }
#rakutenmusic-bundle-root .font-rakuten-b { font-weight: 700; }
/* 音楽配信サービス機能比較: テーブル幅・スマホ横スクロール・1列目固定（#function-sheet は overview テンプレート内だが section の外側にあり得る） */
#rakutenmusic-bundle-root #function-sheet { overflow-x: visible; }
#rakutenmusic-bundle-root .container:has(#function-sheet) { margin: 0 auto; padding: 30px; }
#rakutenmusic-bundle-root #function-sheet .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; border: 1px solid #bf0000; border-radius: 4px; margin-bottom: 2px; }
#rakutenmusic-bundle-root #function-sheet table { width: 100%; min-width: 600px; border-collapse: collapse; }
@media (min-width: 768px) {
  #rakutenmusic-bundle-root .container:has(#function-sheet) { max-width: 1600px; }
  #rakutenmusic-bundle-root #function-sheet .table-wrapper { overflow-x: hidden; }
  #rakutenmusic-bundle-root #function-sheet table { min-width: auto; }
  #rakutenmusic-bundle-root #top-section-overview .about-bundle-pricegroup h1 { font-size: 140px; line-height: 120%; }
  #rakutenmusic-bundle-root #top-section-overview .about-bundle-pricegroup h2 { font-size: 52px; line-height: 108%; }
}
@media (max-width: 767px) {
  #rakutenmusic-bundle-root #function-sheet th:first-child,
  #rakutenmusic-bundle-root #function-sheet td:first-child { position: sticky; left: 0; z-index: 2; background-color: #ffefef; text-align: left; word-break: break-word; min-width: 120px; width: 120px; max-width: 150px; box-shadow: 2px 0 4px rgba(0,0,0,0.08); }
  #rakutenmusic-bundle-root #function-sheet th:first-child { z-index: 3; background-color: #ffefef; }
  #rakutenmusic-bundle-root #function-sheet td:first-child { background-color: #fff; }
}
/* FAQ（よくあるご質問）: 本番と同じスタイル */
#rakutenmusic-bundle-root .bg-dark { background: #020717; }
#rakutenmusic-bundle-root .bg-dark .bg-dark-txt { color: rgba(255,255,255,0.05); font-size: 81px; font-weight: 900; line-height: 100%; text-transform: uppercase; white-space: nowrap; position: absolute; top: -16px; left: 0; }
#rakutenmusic-bundle-root .bg-dark .faq-item { background: #212331; border-radius: 16px; width: 327px; display: flex; padding: 24px 0 0; flex-direction: column; justify-content: center; align-items: center; gap: 16px; align-self: center; }
#rakutenmusic-bundle-root .bg-dark .faq-item .faq-question,
#rakutenmusic-bundle-root .bg-dark .faq-item .faq-answer { display: flex; flex-direction: row; align-items: stretch; gap: 16px; align-self: stretch; padding: 0 24px; }
#rakutenmusic-bundle-root .bg-dark .faq-item .faq-question p,
#rakutenmusic-bundle-root .bg-dark .faq-item .faq-answer p { font-size: 14px; font-weight: 400; line-height: 20px; color: #fff; }
#rakutenmusic-bundle-root .bg-dark .faq-item .faq-question p strong,
#rakutenmusic-bundle-root .bg-dark .faq-item .faq-answer p strong { font-size: 32px; font-weight: 900; line-height: 110%; color: #fff; }
#rakutenmusic-bundle-root .bg-dark .faq-item .faq-question p a,
#rakutenmusic-bundle-root .bg-dark .faq-item .faq-answer p a { text-decoration: underline; color: #f53a3a; }
#rakutenmusic-bundle-root .bg-dark .faq-item .faq-answer p strong { color: #f53a3a; }
#rakutenmusic-bundle-root .bg-dark .faq-item .accordion-switch { display: flex; justify-content: flex-end; align-items: center; gap: 16px; align-self: stretch; background: none; padding: 0 24px 24px; margin: 0; color: #fff; font-size: 14px; cursor: pointer; }
#rakutenmusic-bundle-root .bg-dark .faq-item .accordion-area { height: 0; margin: 0; opacity: 0; overflow: hidden; transition: padding 0.5s linear, opacity 0.5s linear 0s; }
#rakutenmusic-bundle-root .bg-dark .faq-item .accordion-flag:checked + .accordion-area { height: auto; opacity: 1; padding: 0 24px; }
#rakutenmusic-bundle-root .bg-dark .faq-item .accordion-flag:checked + .accordion-area + .accordion-switch i { transform: rotate(180deg); }
#rakutenmusic-bundle-root .bg-dark .faq-item .accordion-switch i { display: flex; transition: all 0.5s ease-in; }
@media screen and (min-width: 768px) {
  #rakutenmusic-bundle-root .bg-dark,
  #rakutenmusic-bundle-root .bg-light { padding: 64px 0; }
  #rakutenmusic-bundle-root .bg-dark .ttl-group h2,
  #rakutenmusic-bundle-root .bg-light .ttl-group h2 { font-size: 48px; }
  #rakutenmusic-bundle-root .bg-dark .faq-item { width: 886px; }
  #rakutenmusic-bundle-root .bg-dark .faq-item .faq-question p,
  #rakutenmusic-bundle-root .bg-dark .faq-item .faq-answer p { font-size: 16px; line-height: 140%; }
}
';
	// plan/bundle/index.html と同じCSSを同じ順で読み込み（#page / #page .l-content → .rakutenmusic-bundle-wrap に置換）
	$css_sources = array(
		array( 'dir' => $t_dir . 'common/css/', 'files' => array( 'common.css', 'slick-theme.css', 'slick.css', 'stack-service-overview.css' ) ),
		array( 'dir' => $t_dir . 'plan/bundle/css/', 'files' => array( 'style_cpn_bundle60.css', 'style_entry.css', 'style_20260202.css', 'style_function.css' ) ),
	);
	foreach ( $css_sources as $group ) {
		$dir = $group['dir'];
		foreach ( $group['files'] as $file ) {
			$path = $dir . $file;
			if ( ! file_exists( $path ) ) {
				continue;
			}
			$css = file_get_contents( $path );
			$css = preg_replace( '/#page\s+\.l-content\s*/', '.rakutenmusic-bundle-wrap ', $css );
			$css = preg_replace( '/#page(?=[\s#\.>+:\[\]])/', '.rakutenmusic-bundle-wrap', $css );
			$all_css .= $css . "\n";
		}
	}
	wp_register_style( 'rakutenmusic-bundle-scoped', false, array(), $ver );
	wp_enqueue_style( 'rakutenmusic-bundle-scoped' );
	if ( $all_css !== '' ) {
		wp_add_inline_style( 'rakutenmusic-bundle-scoped', $all_css );
	}
	wp_enqueue_style(
		'rakutenmusic-bundle-bootstrap-icons',
		'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
		array(),
		'1.11.3'
	);

	$js_path = get_template_directory() . '/assets/plan/bundle/js/main_20240701.js';
	if ( file_exists( $js_path ) ) {
		wp_enqueue_script(
			'rakutenmusic-bundle-main',
			$assets . '/plan/bundle/js/main_20240701.js',
			array(),
			$ver . '-' . filemtime( $js_path ),
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'rakutenmusic_enqueue_bundle_section_assets', 21 );

/**
 * 楽天ミュージック セクションブロックの一覧（ここだけ編集すればOK）
 *
 * 新規ブロックを追加するとき:
 * 1. 下の配列に1行追加（name=スラッグ, title=表示名, keywords=検索用）
 * 2. blocks/section-{name}/ を作成し、block.json と render.php を配置
 *    （既存フォルダをコピーして name / title / keywords を書き換え）
 * 3. template-parts/sections/section-{name}.html を配置
 *
 * ※ 配列を変えると「サーバー登録」と「エディター登録（インサーター表示）」の両方に反映されます。
 * ※ 配列への追加を忘れるとエディターのブロック一覧・検索に表示されません。
 */
function rakutenmusic_get_section_blocks() {
	return array(
		// トップページ用（楽天ミュージック - トップに表示）
		array( 'name' => 'top-main-fv', 'title' => 'トップFV（ヒーロー）', 'keywords' => array( 'FV', 'ヒーロー', 'ファーストビュー', 'top-main-fv', 'トップ' ), 'category' => 'rakutenmusic-top' ),
		array( 'name' => 'saikyo-cost-performance', 'title' => 'コスパ最強な理由', 'keywords' => array( 'コスパ', '最強', 'top-section-saikyo_cost_performance', 'トップ' ), 'category' => 'rakutenmusic-top' ),
		array( 'name' => 'top-section-price', 'title' => '料金プラン（トップ用）', 'keywords' => array( '料金', 'プラン', '診断', 'top-section-price', 'トップ' ), 'category' => 'rakutenmusic-top' ),
		array( 'name' => 'top-section-overview', 'title' => 'バンドル：OVERVIEW', 'keywords' => array( 'バンドル', 'overview', '概要', 'トップ' ), 'category' => 'rakutenmusic-top' ),
		array( 'name' => 'top-section-firstplaylists', 'title' => 'バンドル：FIRST PLAYLISTS', 'keywords' => array( 'バンドル', 'プレイリスト', 'トップ' ), 'category' => 'rakutenmusic-top' ),
		array( 'name' => 'top-section-usage-steps', 'title' => 'バンドル：ご利用の流れ', 'keywords' => array( 'バンドル', '利用の流れ', 'usage steps', 'トップ' ), 'category' => 'rakutenmusic-top' ),
		array( 'name' => 'top-section-upgrade', 'title' => 'バンドル：UPGRADE', 'keywords' => array( 'バンドル', 'アップグレード', 'upgrade', 'トップ' ), 'category' => 'rakutenmusic-top' ),
		array( 'name' => 'top-section-faq', 'title' => 'バンドル：FAQ', 'keywords' => array( 'バンドル', 'FAQ', 'よくあるご質問', 'トップ' ), 'category' => 'rakutenmusic-top' ),
		array( 'name' => 'top-section-scene', 'title' => 'バンドル：SCENE', 'keywords' => array( 'バンドル', 'scene', 'シーン', '利用シーン', 'トップ' ), 'category' => 'rakutenmusic-top' ),
		array( 'name' => 'top-section-function-comparison', 'title' => 'バンドル：音楽配信サービス機能比較', 'keywords' => array( 'バンドル', '機能比較', '比較表', 'トップ' ), 'category' => 'rakutenmusic-top' ),
		// その他セクション
		array( 'name' => 'campaign', 'title' => 'キャンペーン（スライダー）', 'keywords' => array( 'キャンペーン', 'top-section-campaign' ), 'category' => 'rakutenmusic-campaign' ),
		array( 'name' => 'campaign-list', 'title' => 'キャンペーンリスト（一覧）', 'keywords' => array( 'キャンペーン', 'リスト', 'ライト', '開催中' ), 'category' => 'rakutenmusic-campaign' ),
		array( 'name' => 'feature', 'title' => '便利な機能', 'keywords' => array( '機能' ), 'category' => 'rakutenmusic-common' ),
		array( 'name' => 'price', 'title' => '料金プラン（メイン）', 'keywords' => array( '料金', 'プラン', 'stack-section-price' ), 'category' => 'rakutenmusic-bundle' ),
		array( 'name' => 'reward', 'title' => 'リワード', 'keywords' => array( 'リワード', 'ポイント', 'stack-section-reward' ), 'category' => 'rakutenmusic-reward' ),
		array( 'name' => 'rakutenmusicrank', 'title' => 'Rakuten Musicランク', 'keywords' => array( 'ランク' ), 'category' => 'rakutenmusic-bundle' ),
		array( 'name' => 'faq', 'title' => 'よくあるご質問', 'keywords' => array( 'FAQ', '質問' ), 'category' => 'rakutenmusic-common' ),
		array( 'name' => 'others', 'title' => 'その他キャンペーン（スライダー）', 'keywords' => array( 'その他' ), 'category' => 'rakutenmusic-common' ),
		array( 'name' => 'groupservices', 'title' => '楽天グループサービス（スライダー）', 'keywords' => array( 'グループ' ), 'category' => 'rakutenmusic-common' ),
	);
}

/**
 * 楽天ミュージック汎用セクションブロックを登録（block.json から読み込み）
 * priority 1 で他より先に実行し「ブロックに対応していません」を防ぐ
 */
function rakutenmusic_register_rakuten_music_section_blocks() {
	$blocks_path = get_template_directory() . '/blocks/';
	$blocks      = rakutenmusic_get_section_blocks();
	$skip_slugs  = array( 'campaign', 'campaign-list', 'groupservices', 'others', 'top-section-overview' );
	foreach ( $blocks as $b ) {
		$slug = isset( $b['name'] ) ? $b['name'] : '';
		if ( $slug === '' || in_array( $slug, $skip_slugs, true ) ) {
			continue;
		}
		$path = $blocks_path . 'section-' . $slug;
		if ( ! file_exists( $path . '/block.json' ) ) {
			continue;
		}
		register_block_type( $path );
	}
}

/** バンドル用セクション（CSSが #page を前提とするためラップでスコープする） */
function rakutenmusic_get_bundle_section_slugs() {
	return array( 'top-section-overview', 'top-section-firstplaylists', 'top-section-usage-steps', 'top-section-upgrade', 'top-section-faq', 'top-section-scene', 'top-section-function-comparison' );
}

/**
 * セクションのHTMLをテンプレートパートから読み込みプレースホルダーを置換して出力
 *
 * @param string $slug セクションスラッグ（例: saikyo_cost_performance）
 * @return string
 */
function rakutenmusic_render_rakuten_section( $slug ) {
	$part = get_template_directory() . '/template-parts/sections/section-' . $slug . '.html';
	if ( ! file_exists( $part ) ) {
		return '<!-- section-' . esc_attr( $slug ) . '.html not found -->';
	}
	$html = file_get_contents( $part );
	$html = str_replace( '{{T}}', get_template_directory_uri(), $html );
	$html = str_replace( '{{HOME}}', esc_url( home_url( '/' ) ), $html );
	if ( in_array( $slug, rakutenmusic_get_bundle_section_slugs(), true ) ) {
		$html = trim( $html );
		$html = '<div id="rakutenmusic-bundle-root" class="rakutenmusic-bundle-wrap">' . $html . '</div>';
	}
	return $html;
}

add_action( 'init', 'rakutenmusic_register_rakuten_music_section_blocks', 1 );

/**
 * ブロックに preview.png がある場合、インサーターのアイコンをその画像にする
 * セクションブロックには edit 用の共通スクリプトを付与（インサーターのプレビュー表示のため）
 */
function rakutenmusic_block_type_args_preview_icon( $args, $block_type ) {
	static $preview_urls = null;
	if ( $block_type instanceof WP_Block_Type && isset( $block_type->name ) ) {
		if ( $preview_urls === null ) {
			$preview_urls = rakutenmusic_get_block_preview_urls();
		}
		if ( ! empty( $preview_urls[ $block_type->name ] ) ) {
			$args['icon'] = array( 'src' => $preview_urls[ $block_type->name ] );
		}
		// セクションブロックに edit 用スクリプトを付与（「プレビューが利用できません」を防ぐ）
		// バンドル：OVERVIEW は独自の editorScript（サイドバーでアプリDL設定）を持つため除外
		if ( strpos( $block_type->name, 'rakutenmusic/rakuten-music-section-' ) === 0
			&& $block_type->name !== 'rakutenmusic/rakuten-music-section-top-section-overview' ) {
			$args['editor_script'] = 'rakutenmusic-section-blocks-edit';
		}
		// ライトプラン・リワード・ランクは早期登録スクリプトを editor_script に指定（リストビューで非サポートにならないようエディターが必ず読み込む）
		if ( strpos( $block_type->name, 'rakutenmusic/plan-lite-' ) === 0
			|| strpos( $block_type->name, 'rakutenmusic/reward-' ) === 0
			|| strpos( $block_type->name, 'rakutenmusic/rank-' ) === 0 ) {
			$args['editor_script'] = 'rakutenmusic-block-editor-early-register';
		}
	}
	return $args;
}
add_filter( 'register_block_type_args', 'rakutenmusic_block_type_args_preview_icon', 10, 2 );

/**
 * セクションブロック用 edit スクリプトを登録（register_block_type_args で参照される）
 */
function rakutenmusic_register_section_blocks_edit_script() {
	$dir = get_template_directory();
	$uri = get_template_directory_uri();
	$script_path = $dir . '/assets/js/section-blocks-edit.js';
	if ( ! file_exists( $script_path ) ) {
		return;
	}
	// 余白パネル用スクリプトを先に読み込むため依存に含める（ライトプラン等インライン登録ブロックでサイドバーに余白が表示されるようにする）
	$section_deps = array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'rakutenmusic-block-spacing-sidebar' );
	wp_register_script(
		'rakutenmusic-section-blocks-edit',
		$uri . '/assets/js/section-blocks-edit.js',
		$section_deps,
		wp_get_theme()->get( 'Version' ) . '-' . filemtime( $script_path )
	);
}
add_action( 'init', 'rakutenmusic_register_section_blocks_edit_script', 5 );

/**
 * ブロック余白パネル用スクリプトを init で登録（section-blocks-edit の依存にするため先に登録する）
 */
function rakutenmusic_register_block_spacing_sidebar_script() {
	$dir  = get_template_directory();
	$uri  = get_template_directory_uri();
	$path = $dir . '/assets/js/block-spacing-sidebar.js';
	if ( ! file_exists( $path ) ) {
		return;
	}
	wp_register_script(
		'rakutenmusic-block-spacing-sidebar',
		$uri . '/assets/js/block-spacing-sidebar.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-hooks', 'wp-i18n' ),
		wp_get_theme()->get( 'Version' ) . '-' . filemtime( $path )
	);
}
add_action( 'init', 'rakutenmusic_register_block_spacing_sidebar_script', 1 );

/**
 * ブロックエディターより先にブロックをレジストリに登録するスクリプト（依存は wp-blocks, wp-element のみで wp-block-editor より先に実行）
 * リストビューで「非サポート」表示にならないようにする
 */
function rakutenmusic_register_block_editor_early_script() {
	$dir = get_template_directory();
	$uri = get_template_directory_uri();
	$path = $dir . '/assets/js/block-editor-early-register.js';
	if ( ! file_exists( $path ) ) {
		return;
	}
	wp_register_script(
		'rakutenmusic-block-editor-early-register',
		$uri . '/assets/js/block-editor-early-register.js',
		array( 'wp-blocks', 'wp-element' ),
		wp_get_theme()->get( 'Version' ) . '-' . filemtime( $path )
	);
}
add_action( 'init', 'rakutenmusic_register_block_editor_early_script', 2 );

/**
 * キャンペーン詳細ブロック（編集可能テーブル）を登録
 */
function rakutenmusic_register_campaign_detail_blocks() {
	$dir    = get_template_directory();
	$uri    = get_template_directory_uri();
	$editor = $dir . '/blocks/campaign-detail/editor.js';
	$style  = $dir . '/blocks/campaign-detail/editor.css';
	if ( ! file_exists( $editor ) ) {
		return;
	}
	wp_register_script(
		'rakutenmusic-campaign-detail',
		$uri . '/blocks/campaign-detail/editor.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		wp_get_theme()->get( 'Version' ) . '-' . filemtime( $editor )
	);
	if ( file_exists( $style ) ) {
		wp_register_style(
			'rakutenmusic-campaign-detail-editor-style',
			$uri . '/blocks/campaign-detail/editor.css',
			array(),
			filemtime( $style )
		);
	}
	register_block_type( $dir . '/blocks/campaign-detail', array(
		'editor_script' => 'rakutenmusic-campaign-detail',
		'editor_style'  => 'rakutenmusic-campaign-detail-editor-style',
	) );
	register_block_type( $dir . '/blocks/campaign-detail-table', array(
		'editor_script' => 'rakutenmusic-campaign-detail',
		'editor_style'  => 'rakutenmusic-campaign-detail-editor-style',
	) );
}
add_action( 'init', 'rakutenmusic_register_campaign_detail_blocks', 20 );

/**
 * キャンペーンリストブロック（編集パネル・プレビュー付き）を登録
 */
function rakutenmusic_register_campaign_list_block() {
	$dir   = get_template_directory();
	$uri   = get_template_directory_uri();
	$block_dir = $dir . '/blocks/section-campaign-list';
	$editor_js = $block_dir . '/editor.js';
	$editor_css = $block_dir . '/editor.css';

	if ( ! file_exists( $editor_js ) ) {
		return;
	}

	$version = wp_get_theme()->get( 'Version' ) . '-' . filemtime( $editor_js );
	wp_register_script(
		'rakutenmusic-section-campaign-list-editor',
		$uri . '/blocks/section-campaign-list/editor.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		$version
	);

	if ( file_exists( $editor_css ) ) {
		wp_register_style(
			'rakutenmusic-section-campaign-list-editor-style',
			$uri . '/blocks/section-campaign-list/editor.css',
			array(),
			filemtime( $editor_css )
		);
	}

	register_block_type( $block_dir, array(
		'editor_script' => 'rakutenmusic-section-campaign-list-editor',
		'editor_style'  => 'rakutenmusic-section-campaign-list-editor-style',
	) );
}
add_action( 'init', 'rakutenmusic_register_campaign_list_block', 20 );

/**
 * キャンペーンブロック（編集パネル・プレビュー付き）を登録
 */
function rakutenmusic_register_campaign_block() {
	$dir       = get_template_directory();
	$uri       = get_template_directory_uri();
	$block_dir = $dir . '/blocks/section-campaign';
	$editor_js = $block_dir . '/editor.js';
	$editor_css = $block_dir . '/editor.css';

	if ( ! file_exists( $editor_js ) ) {
		return;
	}

	$version = wp_get_theme()->get( 'Version' ) . '-' . filemtime( $editor_js );
	wp_register_script(
		'rakutenmusic-section-campaign-editor',
		$uri . '/blocks/section-campaign/editor.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		$version
	);

	if ( file_exists( $editor_css ) ) {
		wp_register_style(
			'rakutenmusic-section-campaign-editor-style',
			$uri . '/blocks/section-campaign/editor.css',
			array(),
			filemtime( $editor_css )
		);
	}

	register_block_type( $block_dir, array(
		'editor_script' => 'rakutenmusic-section-campaign-editor',
		'editor_style'  => 'rakutenmusic-section-campaign-editor-style',
	) );
}
add_action( 'init', 'rakutenmusic_register_campaign_block', 20 );

/**
 * 楽天グループサービスブロック（編集パネル・プレビュー付き）を登録
 */
function rakutenmusic_register_groupservices_block() {
	$dir       = get_template_directory();
	$uri       = get_template_directory_uri();
	$block_dir = $dir . '/blocks/section-groupservices';
	$editor_js = $block_dir . '/editor.js';
	$editor_css = $block_dir . '/editor.css';

	if ( ! file_exists( $editor_js ) ) {
		return;
	}

	$version = wp_get_theme()->get( 'Version' ) . '-' . filemtime( $editor_js );
	wp_register_script(
		'rakutenmusic-section-groupservices-editor',
		$uri . '/blocks/section-groupservices/editor.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		$version
	);

	wp_localize_script(
		'rakutenmusic-section-groupservices-editor',
		'rakutenmusicGroupServices',
		array( 'themeUri' => $uri )
	);

	if ( file_exists( $editor_css ) ) {
		wp_register_style(
			'rakutenmusic-section-groupservices-editor-style',
			$uri . '/blocks/section-groupservices/editor.css',
			array(),
			filemtime( $editor_css )
		);
	}

	register_block_type( $block_dir, array(
		'editor_script' => 'rakutenmusic-section-groupservices-editor',
		'editor_style'  => 'rakutenmusic-section-groupservices-editor-style',
	) );
}
add_action( 'init', 'rakutenmusic_register_groupservices_block', 20 );

/**
 * その他キャンペーンブロック（編集パネル・プレビュー付き）を登録
 */
function rakutenmusic_register_others_block() {
	$dir       = get_template_directory();
	$uri       = get_template_directory_uri();
	$block_dir = $dir . '/blocks/section-others';
	$editor_js = $block_dir . '/editor.js';
	$editor_css = $block_dir . '/editor.css';

	if ( ! file_exists( $editor_js ) ) {
		return;
	}

	$version = wp_get_theme()->get( 'Version' ) . '-' . filemtime( $editor_js );
	wp_register_script(
		'rakutenmusic-section-others-editor',
		$uri . '/blocks/section-others/editor.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		$version
	);

	if ( file_exists( $editor_css ) ) {
		wp_register_style(
			'rakutenmusic-section-others-editor-style',
			$uri . '/blocks/section-others/editor.css',
			array(),
			filemtime( $editor_css )
		);
	}

	register_block_type( $block_dir, array(
		'editor_script' => 'rakutenmusic-section-others-editor',
		'editor_style'  => 'rakutenmusic-section-others-editor-style',
	) );
}
add_action( 'init', 'rakutenmusic_register_others_block', 20 );

/**
 * バンドル：OVERVIEW ブロックを登録（「アプリをダウンロード」は固定ページのフローティングCTA設定を流用）
 */
function rakutenmusic_register_overview_block() {
	$block_dir = get_template_directory() . '/blocks/section-top-section-overview';
	if ( ! file_exists( $block_dir . '/block.json' ) ) {
		return;
	}
	register_block_type( $block_dir );
}
add_action( 'init', 'rakutenmusic_register_overview_block', 5 );

/**
 * キャンペーンヒーローブロック（編集パネル・プレビュー付き）を登録
 */
function rakutenmusic_register_campaign_hero_block() {
	$dir       = get_template_directory();
	$uri       = get_template_directory_uri();
	$block_dir = $dir . '/blocks/campaign-hero';
	$editor_js = $block_dir . '/editor.js';
	$editor_css = $block_dir . '/editor.css';

	if ( ! file_exists( $editor_js ) ) {
		return;
	}

	$version = wp_get_theme()->get( 'Version' ) . '-' . filemtime( $editor_js );
	wp_register_script(
		'rakutenmusic-campaign-hero-editor',
		$uri . '/blocks/campaign-hero/editor.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		$version
	);
	wp_localize_script(
		'rakutenmusic-campaign-hero-editor',
		'rakutenmusicCampaignHero',
		array( 'assetsUri' => $uri . '/assets' )
	);

	if ( file_exists( $editor_css ) ) {
		wp_register_style(
			'rakutenmusic-campaign-hero-editor-style',
			$uri . '/blocks/campaign-hero/editor.css',
			array(),
			filemtime( $editor_css )
		);
	}

	register_block_type( $block_dir, array(
		'editor_script' => 'rakutenmusic-campaign-hero-editor',
		'editor_style'  => 'rakutenmusic-campaign-hero-editor-style',
	) );
}
add_action( 'init', 'rakutenmusic_register_campaign_hero_block', 20 );

/**
 * ジャケ写カルーセルブロックを登録（Slick 依存含む）
 */
function rakutenmusic_register_jsha_carousel_block() {
	$dir        = get_template_directory();
	$uri        = get_template_directory_uri();
	$block_dir  = $dir . '/blocks/jsha-carousel';
	$editor_js  = $block_dir . '/editor.js';
	$editor_css = $block_dir . '/editor.css';
	$view_js    = $block_dir . '/view.js';
	$style_css  = $block_dir . '/style.css';

	if ( ! file_exists( $editor_js ) || ! file_exists( $view_js ) ) {
		return;
	}

	$version = wp_get_theme()->get( 'Version' ) . '-' . filemtime( $editor_js );

	// Slick（カルーセル用）※ブロック使用時のみフロントで読み込む
	wp_register_style(
		'rakutenmusic-slick-base',
		'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
		array(),
		'1.8.1'
	);
	wp_register_script(
		'rakutenmusic-slick',
		'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
		array( 'jquery' ),
		'1.8.1',
		true
	);

	// フロント用スタイル（block.json の style を PHP で明示登録し確実に読み込む）
	if ( file_exists( $style_css ) ) {
		wp_register_style(
			'rakutenmusic-jsha-carousel-style',
			$uri . '/blocks/jsha-carousel/style.css',
			array(),
			filemtime( $style_css )
		);
	}

	wp_register_script(
		'rakutenmusic-jsha-carousel-view',
		$uri . '/blocks/jsha-carousel/view.js',
		array( 'jquery', 'rakutenmusic-slick' ),
		wp_get_theme()->get( 'Version' ) . '-' . filemtime( $view_js ),
		true
	);

	wp_register_script(
		'rakutenmusic-jsha-carousel-editor',
		$uri . '/blocks/jsha-carousel/editor.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		$version
	);

	if ( file_exists( $editor_css ) ) {
		wp_register_style(
			'rakutenmusic-jsha-carousel-editor-style',
			$uri . '/blocks/jsha-carousel/editor.css',
			array(),
			filemtime( $editor_css )
		);
	}

	// stack-jsya-scroll.css / stack-jsya-scroll.js（ジャケ写カルーセル用・#page スコープのスタイル等）
	$stack_jsya_css = $dir . '/assets/common/css/stack-jsya-scroll.css';
	$stack_jsya_js  = $dir . '/assets/common/js/stack-jsya-scroll.js';
	if ( file_exists( $stack_jsya_css ) ) {
		wp_register_style(
			'rakutenmusic-stack-jsya-scroll',
			$uri . '/assets/common/css/stack-jsya-scroll.css',
			array(),
			filemtime( $stack_jsya_css )
		);
	}
	if ( file_exists( $stack_jsya_js ) ) {
		wp_register_script(
			'rakutenmusic-stack-jsya-scroll',
			$uri . '/assets/common/js/stack-jsya-scroll.js',
			array( 'jquery', 'rakutenmusic-slick' ),
			filemtime( $stack_jsya_js ),
			true
		);
	}

	$block_args = array(
		'editor_script'        => 'rakutenmusic-jsha-carousel-editor',
		'editor_style'        => 'rakutenmusic-jsha-carousel-editor-style',
		'view_script_handles' => array( 'rakutenmusic-jsha-carousel-view' ),
	);
	if ( file_exists( $style_css ) ) {
		$block_args['style'] = 'rakutenmusic-jsha-carousel-style';
	}
	register_block_type( $block_dir, $block_args );
}
add_action( 'init', 'rakutenmusic_register_jsha_carousel_block', 20 );

/**
 * ジャケ写カルーセルブロック使用時に Slick / stack-jsya-scroll の CSS・JS をフロントで読み込む
 */
function rakutenmusic_enqueue_jsha_carousel_front_assets() {
	if ( ! is_singular() ) {
		return;
	}
	$post = get_queried_object();
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return;
	}
	if ( ! has_block( 'rakutenmusic/jsha-carousel', $post ) ) {
		return;
	}
	wp_enqueue_style( 'rakutenmusic-slick-base' );
	wp_enqueue_style( 'rakutenmusic-stack-jsya-scroll' );
	wp_enqueue_script( 'rakutenmusic-stack-jsya-scroll' );
}
add_action( 'wp_enqueue_scripts', 'rakutenmusic_enqueue_jsha_carousel_front_assets', 25 );

/**
 * 読む音楽ガイドアーカイブ用ブロック（メイン看板・記事一覧）を登録
 */
function rakutenmusic_register_column_archive_blocks() {
	$dir   = get_template_directory();
	$uri   = get_template_directory_uri();
	$deps  = array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' );
	$assets_uri = function_exists( 'rakutenmusic_get_assets_uri' ) ? rakutenmusic_get_assets_uri() : $uri . '/assets';

	// エディター用コラムCSS（プレビュー表示用）
	$column_css = $dir . '/assets/column/css/style.css';
	if ( file_exists( $column_css ) ) {
		wp_register_style(
			'rakutenmusic-column-archive-editor',
			$uri . '/assets/column/css/style.css',
			array(),
			filemtime( $column_css )
		);
	}
	// 記事：小見出しブロック用エディターCSS（編集域をフロントと同じ見た目に）
	$header_editor_css = $dir . '/blocks/column-article-header/editor.css';
	if ( file_exists( $header_editor_css ) ) {
		wp_register_style(
			'rakutenmusic-column-article-header-editor-style',
			$uri . '/blocks/column-article-header/editor.css',
			array( 'rakutenmusic-column-archive-editor' ),
			filemtime( $header_editor_css )
		);
	}

	// メイン看板
	$hero_dir = $dir . '/blocks/column-archive-hero';
	if ( file_exists( $hero_dir . '/block.json' ) && file_exists( $hero_dir . '/editor.js' ) ) {
		wp_register_script(
			'rakutenmusic-column-archive-hero-editor',
			$uri . '/blocks/column-archive-hero/editor.js',
			$deps,
			wp_get_theme()->get( 'Version' ) . '-' . filemtime( $hero_dir . '/editor.js' )
		);
		wp_localize_script( 'rakutenmusic-column-archive-hero-editor', 'rakutenmusicColumnArchive', array(
			'assetsUri' => $assets_uri,
		) );
		$block_args = array( 'editor_script' => 'rakutenmusic-column-archive-hero-editor' );
		if ( file_exists( $column_css ) ) {
			$block_args['editor_style'] = 'rakutenmusic-column-archive-editor';
		}
		register_block_type( $hero_dir, $block_args );
	}

	// 記事一覧
	$list_dir = $dir . '/blocks/column-archive-article-list';
	if ( file_exists( $list_dir . '/block.json' ) && file_exists( $list_dir . '/editor.js' ) ) {
		wp_register_script(
			'rakutenmusic-column-archive-article-list-editor',
			$uri . '/blocks/column-archive-article-list/editor.js',
			$deps,
			wp_get_theme()->get( 'Version' ) . '-' . filemtime( $list_dir . '/editor.js' )
		);
		wp_localize_script( 'rakutenmusic-column-archive-article-list-editor', 'rakutenmusicColumnArchive', array(
			'assetsUri' => $assets_uri,
		) );
		$block_args = array( 'editor_script' => 'rakutenmusic-column-archive-article-list-editor' );
		if ( file_exists( $column_css ) ) {
			$block_args['editor_style'] = 'rakutenmusic-column-archive-editor';
		}
		register_block_type( $list_dir, $block_args );
	}

	// 記事ページ用ブロック（タイトル・サイン・メイン画像・バッジ・本文・小見出し・YouTube・音楽再生・余白）
	$article_blocks = array(
		'column-article-title',
		'column-article-author-start',
		'column-article-main-image',
		'column-article-badge',
		'column-article-body',
		'column-article-header',
		'column-article-youtube',
		'column-article-song',
		'column-article-spacer',
	);
	foreach ( $article_blocks as $slug ) {
		$block_dir = $dir . '/blocks/' . $slug;
		if ( ! file_exists( $block_dir . '/block.json' ) || ! file_exists( $block_dir . '/editor.js' ) ) {
			continue;
		}
		$handle = 'rakutenmusic-' . str_replace( '/', '-', $slug ) . '-editor';
		wp_register_script(
			$handle,
			$uri . '/blocks/' . $slug . '/editor.js',
			$deps,
			wp_get_theme()->get( 'Version' ) . '-' . filemtime( $block_dir . '/editor.js' )
		);
		if ( in_array( $slug, array( 'column-article-author-start', 'column-article-main-image', 'column-article-youtube', 'column-article-song' ), true ) ) {
			wp_localize_script( $handle, 'rakutenmusicColumnArchive', array( 'assetsUri' => $assets_uri ) );
		}
		$block_args = array( 'editor_script' => $handle );
		if ( file_exists( $column_css ) ) {
			$block_args['editor_style'] = 'rakutenmusic-column-archive-editor';
		}
		if ( $slug === 'column-article-header' && file_exists( $header_editor_css ) ) {
			$block_args['editor_style'] = array( 'rakutenmusic-column-archive-editor', 'rakutenmusic-column-article-header-editor-style' );
		}
		register_block_type( $block_dir, $block_args );
	}
}
add_action( 'init', 'rakutenmusic_register_column_archive_blocks', 20 );

/**
 * バッジ種別のラベル対応
 *
 * @return array
 */
function rakutenmusic_get_column_badge_labels() {
	return array(
		'feature'   => '特集',
		'column'    => 'コラム',
		'interview' => 'インタビュー',
		'ranking'   => 'ランキング',
	);
}

/**
 * アーカイブ一覧用サムネイルURLを取得（アイキャッチ → 記事：メイン画像ブロック → 本文先頭画像の順で取得）
 *
 * @param WP_Post $post      投稿オブジェクト
 * @param string  $assets_uri テーマの assets ベースURL（/assets/ 始まりの相対パス解決用）
 * @return string 画像URL。取得できない場合は空文字
 */
function rakutenmusic_get_column_archive_thumbnail_url( $post, $assets_uri = '' ) {
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return '';
	}
	if ( $assets_uri === '' ) {
		$assets_uri = function_exists( 'rakutenmusic_get_assets_uri' ) ? rakutenmusic_get_assets_uri() : get_template_directory_uri() . '/assets';
	}

	// 1. アイキャッチ画像
	$url = get_the_post_thumbnail_url( $post, 'medium_large' );
	if ( ! $url ) {
		$url = get_the_post_thumbnail_url( $post, 'full' );
	}
	if ( $url ) {
		return $url;
	}

	// 2. 記事：メイン画像ブロックの url 属性
	if ( function_exists( 'parse_blocks' ) && ! empty( $post->post_content ) ) {
		$blocks = parse_blocks( $post->post_content );
		$url    = rakutenmusic_find_main_image_url_in_blocks( $blocks, $assets_uri );
		if ( $url ) {
			return $url;
		}
	}

	// 3. 本文中の最初の img の src
	if ( ! empty( $post->post_content ) && preg_match( '#<img[^>]+src="([^"]+)"#', $post->post_content, $m ) ) {
		$url = trim( $m[1] );
		if ( strpos( $url, '/assets/' ) === 0 ) {
			$url = $assets_uri . substr( $url, 7 );
		}
		return $url;
	}

	return '';
}

/**
 * ブロック配列から「記事：メイン画像」の url を再帰的に検索
 *
 * @param array  $blocks      parse_blocks() の戻り値
 * @param string $assets_uri   テーマの assets ベースURL
 * @return string 画像URL。見つからなければ空文字
 */
function rakutenmusic_find_main_image_url_in_blocks( array $blocks, $assets_uri ) {
	foreach ( $blocks as $block ) {
		if ( isset( $block['blockName'] ) && $block['blockName'] === 'rakutenmusic/column-article-main-image' ) {
			if ( ! empty( $block['attrs']['url'] ) ) {
				$url = trim( $block['attrs']['url'] );
				if ( strpos( $url, '/assets/' ) === 0 ) {
					$url = $assets_uri . substr( $url, 7 );
				}
				return $url;
			}
		}
		if ( ! empty( $block['innerBlocks'] ) ) {
			$found = rakutenmusic_find_main_image_url_in_blocks( $block['innerBlocks'], $assets_uri );
			if ( $found ) {
				return $found;
			}
		}
	}
	return '';
}

/**
 * アーカイブ一覧データを取得（テンプレート page-column-archive.php 用）
 * WordPress 運用: 指定した固定ページの「子ページ」から一覧を生成。
 * サムネイル＝アイキャッチ画像、タイトル＝ページタイトル、日付＝更新日、バッジ＝カスタムフィールド rakutenmusic_column_badge（feature / column / interview / ranking）
 *
 * @param int $parent_page_id アーカイブページ（親）のID。0 の場合は従来どおりファイルシステムをスキャン。
 * @return array[] 各要素は link, image_url, title, date, badge_class, badge_label を持つ配列
 */
function rakutenmusic_get_column_archive_items( $parent_page_id = 0 ) {
	$badge_labels = rakutenmusic_get_column_badge_labels();

	// WordPress 運用: 親ページの子ページを一覧にする
	if ( $parent_page_id > 0 ) {
		$children = get_posts( array(
			'post_type'      => 'page',
			'post_parent'    => (int) $parent_page_id,
			'orderby'        => 'modified',
			'order'          => 'DESC',
			'posts_per_page' => -1,
			'post_status'    => 'publish',
		) );

		$assets_uri = function_exists( 'rakutenmusic_get_assets_uri' ) ? rakutenmusic_get_assets_uri() : get_template_directory_uri() . '/assets';
		$items      = array();

		foreach ( $children as $post ) {
			$badge_meta  = get_post_meta( $post->ID, 'rakutenmusic_column_badge', true );
			$badge_class = in_array( $badge_meta, array( 'feature', 'column', 'interview', 'ranking' ), true ) ? $badge_meta : 'feature';
			$badge_label = isset( $badge_labels[ $badge_class ] ) ? $badge_labels[ $badge_class ] : '特集';

			$thumb_url = rakutenmusic_get_column_archive_thumbnail_url( $post, $assets_uri );

			$items[] = array(
				'link'        => get_permalink( $post ),
				'image_url'   => $thumb_url ? $thumb_url : '',
				'title'       => get_the_title( $post ),
				'date'        => get_the_modified_date( 'Y/n/j', $post ),
				'badge_class' => $badge_class,
				'badge_label' => $badge_label,
			);
		}
		return $items;
	}

	// 従来: ファイルシステムの column/archive/ サブフォルダ内 index.html を解析
	$archive_path = apply_filters( 'rakutenmusic_column_archive_path', dirname( get_template_directory() ) . '/column/archive' );
	if ( ! is_dir( $archive_path ) ) {
		return array();
	}

	$dirs = glob( $archive_path . '/*', GLOB_ONLYDIR );
	if ( empty( $dirs ) ) {
		return array();
	}

	$assets_uri = function_exists( 'rakutenmusic_get_assets_uri' ) ? rakutenmusic_get_assets_uri() : get_template_directory_uri() . '/assets';
	$items      = array();

	foreach ( $dirs as $dir ) {
		$folder     = basename( $dir );
		$index_file = $dir . '/index.html';
		if ( ! file_exists( $index_file ) || ! is_readable( $index_file ) ) {
			continue;
		}

		$html = file_get_contents( $index_file );
		if ( $html === false || $html === '' ) {
			continue;
		}

		$image_url   = '';
		$title       = '';
		$date        = '';
		$badge_class = 'feature';
		$badge_label = '特集';

		if ( preg_match( '#<div class="main-image"[^>]*>\s*<img[^>]+src="([^"]+)"#s', $html, $m ) ) {
			$img_src = trim( $m[1] );
			if ( strpos( $img_src, '/assets/' ) === 0 ) {
				$image_url = $assets_uri . substr( $img_src, 7 );
			} elseif ( preg_match( '#\.\./.*?assets/(.+)$#', $img_src, $m2 ) ) {
				$image_url = $assets_uri . '/' . $m2[1];
			} else {
				$image_url = $img_src;
			}
		}

		if ( preg_match( '#<h1[^>]*>([^<]+)</h1>#', $html, $m ) ) {
			$title = trim( strip_tags( $m[1] ) );
		}

		if ( preg_match( '#<div class="article-date">.*?(\d{4}/\d{1,2}/\d{1,2})#s', $html, $m ) ) {
			$date = trim( $m[1] );
		}

		if ( preg_match( '#<div class="tags">\s*<div class="(feature|column|interview|ranking)"[^>]*>([^<]*)</div>#s', $html, $m ) ) {
			$badge_class = $m[1];
			$badge_label = trim( strip_tags( $m[2] ) ) !== '' ? trim( $m[2] ) : $badge_label;
		}

		$items[] = array(
			'link'        => $folder . '/',
			'image_url'   => $image_url,
			'title'       => $title,
			'date'        => $date,
			'badge_class' => $badge_class,
			'badge_label' => $badge_label,
		);
	}

	usort( $items, function ( $a, $b ) {
		if ( $a['date'] !== '' && $b['date'] !== '' ) {
			$ta = strtotime( str_replace( '/', '-', $a['date'] ) );
			$tb = strtotime( str_replace( '/', '-', $b['date'] ) );
			return ( $tb - $ta );
		}
		return strcmp( $b['link'], $a['link'] );
	} );

	return $items;
}

/**
 * 固定ページ編集画面に「アーカイブ一覧用バッジ」メタボックスを追加
 */
function rakutenmusic_add_column_badge_meta_box() {
	add_meta_box(
		'rakutenmusic_column_badge',
		__( '読む音楽ガイド アーカイブ用：バッジ', 'rakutenmusic-theme' ),
		'rakutenmusic_render_column_badge_meta_box',
		'page',
		'side'
	);
}
add_action( 'add_meta_boxes', 'rakutenmusic_add_column_badge_meta_box' );

function rakutenmusic_render_column_badge_meta_box( WP_Post $post ) {
	wp_nonce_field( 'rakutenmusic_column_badge', 'rakutenmusic_column_badge_nonce' );
	$current = get_post_meta( $post->ID, 'rakutenmusic_column_badge', true );
	$labels  = rakutenmusic_get_column_badge_labels();
	$options = array( 'feature' => 'feature', 'column' => 'column', 'interview' => 'interview', 'ranking' => 'ranking' );
	?>
	<p>
		<label for="rakutenmusic_column_badge"><?php esc_html_e( '一覧で表示するバッジ', 'rakutenmusic-theme' ); ?></label>
	</p>
	<select name="rakutenmusic_column_badge" id="rakutenmusic_column_badge" style="width:100%;">
		<?php foreach ( $options as $value => $key ) : ?>
			<option value="<?php echo esc_attr( $key ); ?>" <?php selected( $current, $key ); ?>><?php echo esc_html( isset( $labels[ $key ] ) ? $labels[ $key ] : $key ); ?></option>
		<?php endforeach; ?>
	</select>
	<p class="description"><?php esc_html_e( 'アーカイブページの子ページとして表示される場合に使用します。', 'rakutenmusic-theme' ); ?></p>
	<?php
}

function rakutenmusic_save_column_badge_meta_box( $post_id ) {
	if ( ! isset( $_POST['rakutenmusic_column_badge_nonce'] ) || ! wp_verify_nonce( $_POST['rakutenmusic_column_badge_nonce'], 'rakutenmusic_column_badge' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	if ( isset( $_POST['rakutenmusic_column_badge'] ) && in_array( $_POST['rakutenmusic_column_badge'], array( 'feature', 'column', 'interview', 'ranking' ), true ) ) {
		update_post_meta( $post_id, 'rakutenmusic_column_badge', sanitize_key( $_POST['rakutenmusic_column_badge'] ) );
	}
}
add_action( 'save_post_page', 'rakutenmusic_save_column_badge_meta_box' );

/**
 * ページ設定メタボックス（全ページ・投稿の編集で利用可能）
 * ヘッダー追加HTML・ヘッダー用JS/CSS・body末尾JS・フィード除外
 */
function rakutenmusic_add_page_settings_meta_box() {
	$screens = array( 'page', 'post' );
	foreach ( $screens as $screen ) {
		add_meta_box(
			'rakutenmusic_page_settings',
			__( 'ページ設定', 'rakutenmusic-theme' ),
			'rakutenmusic_render_page_settings_meta_box',
			$screen,
			'normal',
			'default'
		);
	}
}
add_action( 'add_meta_boxes', 'rakutenmusic_add_page_settings_meta_box' );

function rakutenmusic_render_page_settings_meta_box( WP_Post $post ) {
	wp_nonce_field( 'rakutenmusic_page_settings', 'rakutenmusic_page_settings_nonce' );
	$meta_title    = get_post_meta( $post->ID, 'rakutenmusic_page_meta_title', true );
	$meta_desc     = get_post_meta( $post->ID, 'rakutenmusic_page_meta_description', true );
	$header_meta   = get_post_meta( $post->ID, 'rakutenmusic_page_header_meta', true );
	$header_scripts = get_post_meta( $post->ID, 'rakutenmusic_page_header_scripts', true );
	$body_scripts  = get_post_meta( $post->ID, 'rakutenmusic_page_body_footer_scripts', true );
	$exclude_feed  = get_post_meta( $post->ID, 'rakutenmusic_page_exclude_from_feed', true );
	$exclude_checked = ( $exclude_feed === '1' || $exclude_feed === 'yes' ) ? ' checked="checked"' : '';
	?>
	<p>
		<label for="rakutenmusic_page_meta_title"><strong><?php esc_html_e( 'Metaタイトル', 'rakutenmusic-theme' ); ?></strong></label><br>
		<input type="text" name="rakutenmusic_page_meta_title" id="rakutenmusic_page_meta_title" class="large-text" value="<?php echo esc_attr( (string) $meta_title ); ?>" placeholder="<?php echo esc_attr( get_the_title( $post ) ); ?>" /><br>
		<span class="description"><?php esc_html_e( '未入力の場合は投稿タイトルが使用されます。&lt;title&gt;タグに反映されます。', 'rakutenmusic-theme' ); ?></span>
	</p>
	<p>
		<label for="rakutenmusic_page_meta_description"><strong><?php esc_html_e( 'Meta Description', 'rakutenmusic-theme' ); ?></strong></label><br>
		<textarea name="rakutenmusic_page_meta_description" id="rakutenmusic_page_meta_description" class="large-text" rows="3" placeholder="<?php esc_attr_e( 'ページの説明文（検索結果の snippet に使われます）', 'rakutenmusic-theme' ); ?>"><?php echo esc_textarea( (string) $meta_desc ); ?></textarea><br>
		<span class="description"><?php esc_html_e( '検索エンジンの検索結果に表示される説明文です。', 'rakutenmusic-theme' ); ?></span>
	</p>
	<p>
		<label for="rakutenmusic_page_header_meta"><strong><?php esc_html_e( 'ヘッダーに追加するHTML（metaタグなど・複数可）', 'rakutenmusic-theme' ); ?></strong></label><br>
		<textarea name="rakutenmusic_page_header_meta" id="rakutenmusic_page_header_meta" class="large-text" rows="5" placeholder="<meta name=&quot;custom&quot; content=&quot;value&quot; />"><?php echo esc_textarea( (string) $header_meta ); ?></textarea><br>
		<span class="description"><?php esc_html_e( '&lt;head&gt;内にそのまま出力されます。複数のmetaタグやlinkタグを記述できます。', 'rakutenmusic-theme' ); ?></span>
	</p>
	<p>
		<label for="rakutenmusic_page_header_scripts"><strong><?php esc_html_e( 'ヘッダーに追加するJavaScript/CSS', 'rakutenmusic-theme' ); ?></strong></label><br>
		<textarea name="rakutenmusic_page_header_scripts" id="rakutenmusic_page_header_scripts" class="large-text code" rows="6" placeholder="<script>...</script> または <style>...</style>"><?php echo esc_textarea( (string) $header_scripts ); ?></textarea><br>
		<span class="description"><?php esc_html_e( '&lt;head&gt;末尾（wp_head 直後付近）に出力されます。', 'rakutenmusic-theme' ); ?></span>
	</p>
	<p>
		<label for="rakutenmusic_page_body_footer_scripts"><strong><?php esc_html_e( 'body 末尾に追加するJavaScript', 'rakutenmusic-theme' ); ?></strong></label><br>
		<textarea name="rakutenmusic_page_body_footer_scripts" id="rakutenmusic_page_body_footer_scripts" class="large-text code" rows="6" placeholder="<script>...</script>"><?php echo esc_textarea( (string) $body_scripts ); ?></textarea><br>
		<span class="description"><?php esc_html_e( '&lt;/body&gt;直前に出力されます（wp_footer 内）。', 'rakutenmusic-theme' ); ?></span>
	</p>
	<p>
		<label>
			<input type="checkbox" name="rakutenmusic_page_exclude_from_feed" value="1" <?php echo $exclude_checked; ?> />
			<strong><?php esc_html_e( '検索エンジンに引っ掛からなくようにする（Exclude From atom.xml）', 'rakutenmusic-theme' ); ?></strong>
		</label><br>
		<span class="description"><?php esc_html_e( 'チェックを入れた場合、このページ/投稿は RSS・Atom フィードに含めません。', 'rakutenmusic-theme' ); ?></span>
	</p>
	<?php
}

function rakutenmusic_save_page_settings_meta_box( $post_id ) {
	if ( ! isset( $_POST['rakutenmusic_page_settings_nonce'] ) || ! wp_verify_nonce( $_POST['rakutenmusic_page_settings_nonce'], 'rakutenmusic_page_settings' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	$post_type = get_post_type( $post_id );
	if ( ! in_array( $post_type, array( 'page', 'post' ), true ) ) {
		return;
	}
	if ( isset( $_POST['rakutenmusic_page_meta_title'] ) ) {
		update_post_meta( $post_id, 'rakutenmusic_page_meta_title', sanitize_text_field( wp_unslash( $_POST['rakutenmusic_page_meta_title'] ) ) );
	}
	if ( isset( $_POST['rakutenmusic_page_meta_description'] ) ) {
		update_post_meta( $post_id, 'rakutenmusic_page_meta_description', sanitize_textarea_field( wp_unslash( $_POST['rakutenmusic_page_meta_description'] ) ) );
	}
	if ( isset( $_POST['rakutenmusic_page_header_meta'] ) ) {
		update_post_meta( $post_id, 'rakutenmusic_page_header_meta', wp_unslash( $_POST['rakutenmusic_page_header_meta'] ) );
	}
	if ( isset( $_POST['rakutenmusic_page_header_scripts'] ) ) {
		update_post_meta( $post_id, 'rakutenmusic_page_header_scripts', wp_unslash( $_POST['rakutenmusic_page_header_scripts'] ) );
	}
	if ( isset( $_POST['rakutenmusic_page_body_footer_scripts'] ) ) {
		update_post_meta( $post_id, 'rakutenmusic_page_body_footer_scripts', wp_unslash( $_POST['rakutenmusic_page_body_footer_scripts'] ) );
	}
	$exclude = isset( $_POST['rakutenmusic_page_exclude_from_feed'] ) && $_POST['rakutenmusic_page_exclude_from_feed'] === '1' ? '1' : '0';
	update_post_meta( $post_id, 'rakutenmusic_page_exclude_from_feed', $exclude );
}
add_action( 'save_post', 'rakutenmusic_save_page_settings_meta_box' );

/**
 * ページ設定メタを REST / ブロックエディタで扱えるように登録
 */
function rakutenmusic_register_page_settings_meta() {
	$args = array(
		'show_in_rest'  => true,
		'single'        => true,
		'type'          => 'string',
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	);
	foreach ( array( 'page', 'post' ) as $post_type ) {
		register_post_meta( $post_type, 'rakutenmusic_page_meta_title', array_merge( $args, array( 'default' => '' ) ) );
		register_post_meta( $post_type, 'rakutenmusic_page_meta_description', array_merge( $args, array( 'default' => '' ) ) );
		register_post_meta( $post_type, 'rakutenmusic_page_header_meta', array_merge( $args, array( 'default' => '' ) ) );
		register_post_meta( $post_type, 'rakutenmusic_page_header_scripts', array_merge( $args, array( 'default' => '' ) ) );
		register_post_meta( $post_type, 'rakutenmusic_page_body_footer_scripts', array_merge( $args, array( 'default' => '' ) ) );
		register_post_meta( $post_type, 'rakutenmusic_page_exclude_from_feed', array_merge( $args, array( 'default' => '0', 'type' => 'string' ) ) );
	}
}
add_action( 'init', 'rakutenmusic_register_page_settings_meta' );

/**
 * ページ設定：Meta Description を wp_head で出力
 */
function rakutenmusic_output_page_meta_description() {
	if ( ! is_singular() ) {
		return;
	}
	$post = get_queried_object();
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return;
	}
	$meta_desc = get_post_meta( $post->ID, 'rakutenmusic_page_meta_description', true );
	if ( $meta_desc !== '' ) {
		echo '<meta name="description" content="' . esc_attr( $meta_desc ) . "\">\n";
	}
}
add_action( 'wp_head', 'rakutenmusic_output_page_meta_description', 0 );

/**
 * ページ設定：カスタム Meta タイトルを document タイトルに反映
 */
function rakutenmusic_document_title_parts( $title_parts ) {
	if ( ! is_singular() ) {
		return $title_parts;
	}
	$post = get_queried_object();
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return $title_parts;
	}
	$meta_title = get_post_meta( $post->ID, 'rakutenmusic_page_meta_title', true );
	if ( $meta_title !== '' ) {
		$title_parts['title'] = $meta_title;
	}
	return $title_parts;
}
add_filter( 'document_title_parts', 'rakutenmusic_document_title_parts', 10, 1 );

/**
 * ページ設定：ヘッダー追加HTML・ヘッダー用JS/CSS を wp_head で出力
 */
function rakutenmusic_output_page_header_settings() {
	if ( ! is_singular() ) {
		return;
	}
	$post = get_queried_object();
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return;
	}
	$header_meta = get_post_meta( $post->ID, 'rakutenmusic_page_header_meta', true );
	if ( $header_meta !== '' ) {
		$allowed_header_meta = array(
			'meta' => array( 'name' => array(), 'content' => array(), 'property' => array(), 'http-equiv' => array(), 'charset' => array(), 'itemprop' => array() ),
			'link' => array( 'rel' => array(), 'href' => array(), 'type' => array(), 'media' => array(), 'sizes' => array() ),
		);
		echo "\n" . wp_kses( $header_meta, $allowed_header_meta ) . "\n";
	}
	$header_scripts = get_post_meta( $post->ID, 'rakutenmusic_page_header_scripts', true );
	if ( $header_scripts !== '' ) {
		echo "\n" . $header_scripts . "\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- 管理者が意図的に挿入するスクリプト/スタイル
	}
}
add_action( 'wp_head', 'rakutenmusic_output_page_header_settings', 1 );

/**
 * ページ設定：body 末尾の JavaScript を wp_footer で出力
 */
function rakutenmusic_output_page_body_footer_scripts() {
	if ( ! is_singular() ) {
		return;
	}
	$post = get_queried_object();
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return;
	}
	$body_scripts = get_post_meta( $post->ID, 'rakutenmusic_page_body_footer_scripts', true );
	if ( $body_scripts !== '' ) {
		echo "\n" . $body_scripts . "\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- 管理者が意図的に挿入するスクリプト
	}
}
add_action( 'wp_footer', 'rakutenmusic_output_page_body_footer_scripts', 99 );

/**
 * フィード（RSS/Atom）から「Exclude From atom.xml」がオンの投稿を除外
 */
function rakutenmusic_exclude_from_feed( $query ) {
	if ( ! $query->is_feed() ) {
		return;
	}
	$excluded = get_posts( array(
		'post_type'      => array( 'post', 'page' ),
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'meta_query'     => array(
			array(
				'key'   => 'rakutenmusic_page_exclude_from_feed',
				'value' => array( '1', 'yes' ),
				'compare' => 'IN',
			),
		),
	) );
	if ( ! empty( $excluded ) ) {
		$query->set( 'post__not_in', array_merge( (array) $query->get( 'post__not_in' ), $excluded ) );
	}
}
add_action( 'pre_get_posts', 'rakutenmusic_exclude_from_feed' );

/**
 * 読む音楽ガイドアーカイブブロック使用時・アーカイブテンプレート使用時にコラム用CSSをフロントで読み込む
 */
function rakutenmusic_enqueue_column_archive_front_assets() {
	if ( ! is_singular() ) {
		return;
	}
	$post = get_queried_object();
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return;
	}
	$has_hero    = has_block( 'rakutenmusic/column-archive-hero', $post );
	$has_list    = has_block( 'rakutenmusic/column-archive-article-list', $post );
	$has_article = has_block( 'rakutenmusic/column-article-title', $post )
		|| has_block( 'rakutenmusic/column-article-author-start', $post )
		|| has_block( 'rakutenmusic/column-article-main-image', $post )
		|| has_block( 'rakutenmusic/column-article-youtube', $post )
		|| has_block( 'rakutenmusic/column-article-song', $post );
	$is_column_article_template  = is_page() && get_page_template_slug( get_queried_object_id() ) === 'page-column-article.php';
	$is_column_archive_template = is_page() && get_page_template_slug( get_queried_object_id() ) === 'page-column-archive.php';
	if ( ! $has_hero && ! $has_list && ! $has_article && ! $is_column_article_template && ! $is_column_archive_template ) {
		return;
	}
	$dir = get_template_directory();
	$uri = get_template_directory_uri();
	$css = $dir . '/assets/column/css/style.css';
	if ( file_exists( $css ) ) {
		wp_enqueue_style(
			'rakutenmusic-column-archive',
			$uri . '/assets/column/css/style.css',
			array(),
			filemtime( $css )
		);
	}
}
add_action( 'wp_enqueue_scripts', 'rakutenmusic_enqueue_column_archive_front_assets', 25 );

/**
 * ブロックエディターでキャンペーン・キャンペーンリスト・楽天グループサービス・その他キャンペーン・キャンペーンヒーローのスクリプトを確実に読み込む
 */
function rakutenmusic_enqueue_campaign_list_block_editor_assets() {
	$screen = get_current_screen();
	if ( ! $screen || $screen->is_block_editor() !== true ) {
		return;
	}
	// 記事ブロック（小見出し等）をフロントと同じ見た目で編集するためコラム用CSSを読み込む
	wp_enqueue_style( 'rakutenmusic-column-archive-editor' );
	wp_enqueue_script( 'rakutenmusic-section-campaign-list-editor' );
	wp_enqueue_style( 'rakutenmusic-section-campaign-list-editor-style' );
	wp_enqueue_script( 'rakutenmusic-section-campaign-editor' );
	wp_enqueue_style( 'rakutenmusic-section-campaign-editor-style' );
	wp_enqueue_script( 'rakutenmusic-section-groupservices-editor' );
	wp_enqueue_style( 'rakutenmusic-section-groupservices-editor-style' );
	wp_enqueue_script( 'rakutenmusic-section-others-editor' );
	wp_enqueue_style( 'rakutenmusic-section-others-editor-style' );
	wp_enqueue_script( 'rakutenmusic-campaign-hero-editor' );
	wp_enqueue_style( 'rakutenmusic-campaign-hero-editor-style' );
	wp_enqueue_script( 'rakutenmusic-jsha-carousel-editor' );
	wp_enqueue_style( 'rakutenmusic-jsha-carousel-editor-style' );
	wp_enqueue_script( 'rakutenmusic-column-archive-hero-editor' );
	wp_enqueue_script( 'rakutenmusic-column-archive-article-list-editor' );
	wp_enqueue_script( 'rakutenmusic-column-article-title-editor' );
	wp_enqueue_script( 'rakutenmusic-column-article-author-start-editor' );
	wp_enqueue_script( 'rakutenmusic-column-article-main-image-editor' );
	wp_enqueue_script( 'rakutenmusic-column-article-badge-editor' );
	wp_enqueue_script( 'rakutenmusic-column-article-body-editor' );
	wp_enqueue_script( 'rakutenmusic-column-article-header-editor' );
	wp_enqueue_script( 'rakutenmusic-column-article-youtube-editor' );
	wp_enqueue_script( 'rakutenmusic-column-article-song-editor' );
	wp_enqueue_script( 'rakutenmusic-column-article-spacer-editor' );
}
add_action( 'enqueue_block_editor_assets', 'rakutenmusic_enqueue_campaign_list_block_editor_assets', 15 );

/**
 * ブロックエディター：全ブロックに「余白」パネル（上余白・下余白）を表示（記事ブロックと同じUI）
 * スクリプトは init で登録済み。section-blocks-edit が本スクリプトに依存するため、ライトプラン等インライン登録ブロックでも余白パネルが表示される
 */
function rakutenmusic_enqueue_block_spacing_sidebar() {
	$screen = get_current_screen();
	if ( ! $screen || $screen->is_block_editor() !== true ) {
		return;
	}
	wp_enqueue_script( 'rakutenmusic-block-spacing-sidebar' );
}
add_action( 'enqueue_block_editor_assets', 'rakutenmusic_enqueue_block_spacing_sidebar', 5 );

/**
 * ブロックエディター：ページ設定サイドパネル（ページ/投稿編集時のみ）
 */
function rakutenmusic_enqueue_page_settings_sidebar() {
	$screen = get_current_screen();
	if ( ! $screen || $screen->is_block_editor() !== true ) {
		return;
	}
	$post_type = isset( $_GET['post'] ) ? get_post_type( (int) $_GET['post'] ) : ( isset( $_GET['post_type'] ) ? sanitize_key( $_GET['post_type'] ) : 'post' );
	if ( $post_type !== 'page' && $post_type !== 'post' ) {
		return;
	}
	$dir = get_template_directory();
	$uri = get_template_directory_uri();
	$path = $dir . '/assets/js/page-settings-sidebar.js';
	if ( ! file_exists( $path ) ) {
		return;
	}
	wp_enqueue_script(
		'rakutenmusic-page-settings-sidebar',
		$uri . '/assets/js/page-settings-sidebar.js',
		array( 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-i18n' ),
		wp_get_theme()->get( 'Version' ) . '-' . filemtime( $path )
	);
}
add_action( 'enqueue_block_editor_assets', 'rakutenmusic_enqueue_page_settings_sidebar', 12 );

/**
 * ブロックエディター用「楽天ミュージック」カテゴリを追加（ランク・バンドル・キャンペーン・コラム・共通で分類）
 *
 * @param array $categories ブロックカテゴリ配列
 * @return array
 */
function rakutenmusic_block_categories( $categories ) {
	$rakutenmusic_categories = array(
		array(
			'slug'  => 'rakutenmusic-rank',
			'title' => '楽天ミュージック - ランク',
			'icon'  => null,
		),
		array(
			'slug'  => 'rakutenmusic-top',
			'title' => '楽天ミュージック - トップ',
			'icon'  => null,
		),
		array(
			'slug'  => 'rakutenmusic-bundle',
			'title' => '楽天ミュージック - バンドル・料金',
			'icon'  => null,
		),
		array(
			'slug'  => 'rakutenmusic-campaign',
			'title' => '楽天ミュージック - キャンペーン',
			'icon'  => null,
		),
		array(
			'slug'  => 'rakutenmusic-column',
			'title' => '楽天ミュージック - コラム',
			'icon'  => null,
		),
		array(
			'slug'  => 'rakutenmusic-common',
			'title' => '楽天ミュージック - 共通',
			'icon'  => null,
		),
		array(
			'slug'  => 'rakutenmusic-reward',
			'title' => '楽天ミュージック - リワード',
			'icon'  => null,
		),
		array(
			'slug'  => 'rakutenmusic-plan-lite',
			'title' => '楽天ミュージック - ライトプラン',
			'icon'  => null,
		),
	);
	return array_merge( $rakutenmusic_categories, $categories );
}

add_filter( 'block_categories_all', 'rakutenmusic_block_categories', 10, 1 );

/**
 * 各ブロックフォルダの preview.png の URL 一覧を取得（block名 => URL）
 * フォルダに preview.png を置くとインサーターのプレビューに表示される
 * 子テーマの blocks/ を優先し、なければ親テーマを参照する
 */
function rakutenmusic_get_block_preview_urls() {
	$urls = array();
	// 子テーマ → 親テーマの順で参照
	$theme_dirs = array(
		get_stylesheet_directory() => get_stylesheet_directory_uri(),
		get_template_directory()   => get_template_directory_uri(),
	);

	// セクションブロック（section-*）
	foreach ( rakutenmusic_get_section_blocks() as $b ) {
		$name = isset( $b['name'] ) ? $b['name'] : '';
		if ( ! $name ) {
			continue;
		}
		$block_name = 'rakutenmusic/rakuten-music-section-' . $name;
		$rel        = 'blocks/section-' . $name . '/preview.png';
		foreach ( $theme_dirs as $dir => $uri ) {
			if ( file_exists( $dir . '/' . $rel ) ) {
				$urls[ $block_name ] = $uri . '/' . $rel;
				break;
			}
		}
	}
	// キャンペーン詳細ブロック
	$rel = 'blocks/campaign-detail/preview.png';
	foreach ( $theme_dirs as $dir => $uri ) {
		if ( file_exists( $dir . '/' . $rel ) ) {
			$urls['rakutenmusic/campaign-detail'] = $uri . '/' . $rel;
			break;
		}
	}
	return $urls;
}

/**
 * ランクページ用ブロックの HTML を出力（template-parts/rank/{$slug}.html を読み込み）
 * スタイル確実適用のため、3ブロックは .rank-block-inner.rank-block-{slug} でラップする
 *
 * @param string $slug ブロックスラッグ（例: rank-nav, rank-01-about）
 */
function rakutenmusic_render_rank_block( $slug ) {
	$dir  = get_template_directory();
	$file = $dir . '/template-parts/rank/' . $slug . '.html';
	if ( ! file_exists( $file ) ) {
		return;
	}
	$html = file_get_contents( $file );
	$html = str_replace( '{{ASSETS}}', get_template_directory_uri() . '/assets', $html );
	$html = str_replace( '{{HOME}}', home_url( '/' ), $html );
	$wrap_slugs = array( 'rank-stack-characteristic', 'rank-point-mission', 'rank-04-rakutenmusic' );
	if ( in_array( $slug, $wrap_slugs, true ) ) {
		echo '<div class="rank-block-inner rank-block-' . esc_attr( $slug ) . '">';
	}
	echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	if ( in_array( $slug, $wrap_slugs, true ) ) {
		echo '</div>';
	}
}

/**
 * リワードページ用ブロックの HTML を出力（template-parts/reward/{$slug}.html を読み込み）
 *
 * @param string $slug        ブロックスラッグ（例: reward-temporary-banner-bundle, reward-section-howtouse）
 * @param array  $replacements 追加の置換 [ プレースホルダ => 値 ]（例: {{ACCORDION_ID}} => ユニークID）
 */
function rakutenmusic_render_reward_block( $slug, $replacements = array() ) {
	$dir  = get_template_directory();
	$file = $dir . '/template-parts/reward/' . $slug . '.html';
	if ( ! file_exists( $file ) ) {
		return;
	}
	$html = file_get_contents( $file );
	$html = str_replace( '{{ASSETS}}', get_template_directory_uri() . '/assets', $html );
	$html = str_replace( '{{HOME}}', home_url( '/' ), $html );
	foreach ( $replacements as $placeholder => $value ) {
		$html = str_replace( (string) $placeholder, (string) $value, $html );
	}
	echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

/**
 * リワードページ用ブロックのメタデータを取得（インライン登録用）
 *
 * @return array
 */
function rakutenmusic_get_reward_blocks_for_editor() {
	$dir   = get_template_directory();
	$slugs = array(
		'reward-temporary-banner-bundle',
		'reward-section-howtouse',
		'reward-top-section-introduction',
	);
	$out   = array();
	foreach ( $slugs as $slug ) {
		$block_json = $dir . '/blocks/' . $slug . '/block.json';
		if ( ! file_exists( $block_json ) ) {
			continue;
		}
		$json = json_decode( file_get_contents( $block_json ), true );
		if ( ! is_array( $json ) ) {
			continue;
		}
		$out[] = array(
			'name'        => 'rakutenmusic/' . $slug,
			'title'       => isset( $json['title'] ) ? $json['title'] : $slug,
			'description' => isset( $json['description'] ) ? $json['description'] : '',
			'keywords'    => isset( $json['keywords'] ) ? $json['keywords'] : array( '楽天', 'ミュージック', 'リワード' ),
			'icon'        => isset( $json['icon'] ) ? $json['icon'] : 'align-wide',
			'category'    => isset( $json['category'] ) ? $json['category'] : 'rakutenmusic-reward',
		);
	}
	return $out;
}

/**
 * リワードページ用ブロックをサーバー側で登録
 */
function rakutenmusic_register_reward_blocks() {
	$dir   = get_template_directory();
	$slugs = array(
		'reward-temporary-banner-bundle',
		'reward-section-howtouse',
		'reward-top-section-introduction',
	);
	foreach ( $slugs as $slug ) {
		$block_dir = $dir . '/blocks/' . $slug;
		if ( ! file_exists( $block_dir . '/block.json' ) ) {
			continue;
		}
		register_block_type( $block_dir, array() );
	}
}
add_action( 'init', 'rakutenmusic_register_reward_blocks', 20 );

/**
 * ライトプラン用ブロックの HTML を出力（template-parts/plan-lite/{$slug}.html を読み込み）
 *
 * @param string $slug ブロックスラッグ（anchor-link-group, overview, top-section-scene, usage-steps）
 */
function rakutenmusic_render_plan_lite_block( $slug ) {
	$dir  = get_template_directory();
	$file = $dir . '/template-parts/plan-lite/' . $slug . '.html';
	if ( ! file_exists( $file ) ) {
		return;
	}
	$html = file_get_contents( $file );
	$html = str_replace( '{{ASSETS}}', get_template_directory_uri() . '/assets', $html );
	$html = str_replace( '{{HOME}}', home_url( '/' ), $html );
	echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

/**
 * ライトプラン用ブロックのメタデータを取得（インライン登録用）
 *
 * @return array
 */
function rakutenmusic_get_plan_lite_blocks_for_editor() {
	$dir   = get_template_directory();
	$slugs = array(
		'plan-lite-anchor-link-group',
		'plan-lite-overview',
		'plan-lite-top-section-scene',
		'plan-lite-usage-steps',
	);
	$out   = array();
	foreach ( $slugs as $slug ) {
		$block_json = $dir . '/blocks/' . $slug . '/block.json';
		if ( ! file_exists( $block_json ) ) {
			continue;
		}
		$json = json_decode( file_get_contents( $block_json ), true );
		if ( ! is_array( $json ) ) {
			continue;
		}
		$out[] = array(
			'name'        => 'rakutenmusic/' . $slug,
			'title'       => isset( $json['title'] ) ? $json['title'] : $slug,
			'description' => isset( $json['description'] ) ? $json['description'] : '',
			'keywords'    => isset( $json['keywords'] ) ? $json['keywords'] : array( '楽天', 'ミュージック', 'ライトプラン' ),
			'icon'        => isset( $json['icon'] ) ? $json['icon'] : 'align-wide',
			'category'    => isset( $json['category'] ) ? $json['category'] : 'rakutenmusic-plan-lite',
		);
	}
	return $out;
}

/**
 * ライトプラン用ブロックをサーバー側で登録（block.json + render.php）
 * priority 1 で他より先に実行し「ブロックに対応していません」を防ぐ
 */
function rakutenmusic_register_plan_lite_blocks() {
	$dir   = get_template_directory();
	$slugs = array(
		'plan-lite-anchor-link-group',
		'plan-lite-overview',
		'plan-lite-top-section-scene',
		'plan-lite-usage-steps',
	);
	foreach ( $slugs as $slug ) {
		$block_dir = $dir . '/blocks/' . $slug;
		if ( ! file_exists( $block_dir . '/block.json' ) ) {
			continue;
		}
		register_block_type( $block_dir, array() );
	}
}
add_action( 'init', 'rakutenmusic_register_plan_lite_blocks', 1 );

/**
 * ライトプランブロックが含まれるページで plan/lite 用 CSS・JS を読み込む
 */
function rakutenmusic_enqueue_plan_lite_assets() {
	$post = get_queried_object();
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return;
	}
	$plan_lite_blocks = array(
		'rakutenmusic/plan-lite-anchor-link-group',
		'rakutenmusic/plan-lite-overview',
		'rakutenmusic/plan-lite-top-section-scene',
		'rakutenmusic/plan-lite-usage-steps',
	);
	$has_plan_lite = false;
	foreach ( $plan_lite_blocks as $block_name ) {
		if ( has_block( $block_name, $post ) ) {
			$has_plan_lite = true;
			break;
		}
	}
	if ( ! $has_plan_lite ) {
		return;
	}
	$assets = get_template_directory_uri() . '/assets';
	$ver    = wp_get_theme()->get( 'Version' );

	// 共通・スタック（overview 等で使用）
	wp_enqueue_style(
		'rakutenmusic-plan-common',
		$assets . '/plan/common/css/style_20240801.css',
		array(),
		$ver
	);
	wp_enqueue_style(
		'rakutenmusic-plan-lite',
		$assets . '/plan/lite/css/style.css',
		array( 'rakutenmusic-plan-common' ),
		$ver
	);
	wp_enqueue_style(
		'rakutenmusic-plan-lite-theme',
		$assets . '/plan/lite/css/style_20240701.css',
		array( 'rakutenmusic-plan-lite' ),
		$ver
	);
	wp_enqueue_style(
		'rakutenmusic-plan-lite-blocks',
		$assets . '/plan/lite/css/blocks.css',
		array( 'rakutenmusic-plan-lite-theme' ),
		$ver
	);

	// usage-steps タブ・プラン変更スライダー用（jQuery + Slick）
	wp_enqueue_style( 'slick', $assets . '/campaign/common/css/slick.css', array(), $ver );
	wp_enqueue_style( 'slick-theme', $assets . '/campaign/common/css/slick-theme.css', array( 'slick' ), $ver );
	wp_enqueue_script( 'slick', $assets . '/campaign/common/js/slick.min.js', array( 'jquery' ), $ver, true );
	$plan_common_js = get_template_directory() . '/assets/plan/common/js/common.js';
	if ( file_exists( $plan_common_js ) ) {
		$ver_js = $ver . '-' . filemtime( $plan_common_js );
		wp_enqueue_script(
			'rakutenmusic-plan-common-js',
			$assets . '/plan/common/js/common.js',
			array( 'jquery', 'slick' ),
			$ver_js,
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'rakutenmusic_enqueue_plan_lite_assets', 25 );

/**
 * ランクページ用ブロックのメタデータを取得（インライン登録用）
 *
 * @return array
 */
function rakutenmusic_get_rank_blocks_for_editor() {
	$dir   = get_template_directory();
	$slugs = array(
		'rank-cospa-saikyo-bnr',
		'rank-nav',
		'rank-02-tokuten',
		'rank-01-about',
		'rank-03-faq',
		'rank-04-rakutenmusic',
		'rank-stack-characteristic',
		'rank-point-mission',
	);
	$out   = array();
	foreach ( $slugs as $slug ) {
		$block_json = $dir . '/blocks/' . $slug . '/block.json';
		if ( ! file_exists( $block_json ) ) {
			continue;
		}
		$json = json_decode( file_get_contents( $block_json ), true );
		if ( ! is_array( $json ) ) {
			continue;
		}
		$out[] = array(
			'name'        => 'rakutenmusic/' . $slug,
			'title'       => isset( $json['title'] ) ? $json['title'] : $slug,
			'description' => isset( $json['description'] ) ? $json['description'] : '',
			'keywords'    => isset( $json['keywords'] ) ? $json['keywords'] : array( '楽天', 'ミュージック', 'ランク' ),
			'icon'        => isset( $json['icon'] ) ? $json['icon'] : 'align-wide',
			'category'    => isset( $json['category'] ) ? $json['category'] : 'rakutenmusic-rank',
		);
	}
	return $out;
}

/**
 * ランクページ用ブロックをサーバー側で登録
 * rank-blocks-scoped.css はブロック style にせず、enqueue_rank_block_assets で必ず head に出力する
 */
function rakutenmusic_register_rank_blocks() {
	$dir   = get_template_directory();
	$slugs = array(
		'rank-cospa-saikyo-bnr',
		'rank-nav',
		'rank-02-tokuten',
		'rank-01-about',
		'rank-03-faq',
		'rank-04-rakutenmusic',
		'rank-stack-characteristic',
		'rank-point-mission',
	);
	foreach ( $slugs as $slug ) {
		$block_dir = $dir . '/blocks/' . $slug;
		if ( ! file_exists( $block_dir . '/block.json' ) ) {
			continue;
		}
		register_block_type( $block_dir, array() );
	}
}
add_action( 'init', 'rakutenmusic_register_rank_blocks', 20 );

/**
 * ランクブロックが含まれるページでランク用 CSS/JS を読み込む（メディアクエリ・slick 等を含む）
 * 楽天ミュージック汎用テンプレート使用時は has_block に頼らずテンプレート判定で読み込む（enqueue タイミングで post が取れない環境対策）
 */
function rakutenmusic_enqueue_rank_block_assets() {
	$post = get_queried_object();
	$has_rank = false;

	// 楽天ミュージック汎用テンプレートなら確実にランク用アセットを読み込む（rank-blocks-scoped / フッター前提）
	if ( is_singular( 'page' ) ) {
		$template = get_page_template_slug( get_queried_object_id() );
		$rank_templates = array( 'page-rakuten-music.php', 'page-column-archive.php', 'page-column-article.php' );
		if ( in_array( $template, $rank_templates, true ) ) {
			$has_rank = true;
		}
	}

	if ( ! $has_rank && $post && ( $post instanceof WP_Post ) ) {
		$rank_slugs = array(
			'rakutenmusic/rank-cospa-saikyo-bnr',
			'rakutenmusic/rank-nav',
			'rakutenmusic/rank-02-tokuten',
			'rakutenmusic/rank-01-about',
			'rakutenmusic/rank-03-faq',
			'rakutenmusic/rank-04-rakutenmusic',
			'rakutenmusic/rank-stack-characteristic',
			'rakutenmusic/rank-point-mission',
		);
		foreach ( $rank_slugs as $block_name ) {
			if ( has_block( $block_name, $post ) ) {
				$has_rank = true;
				break;
			}
		}
	}

	if ( ! $has_rank ) {
		return;
	}
	$dir = get_template_directory();
	$uri = get_template_directory_uri();
	// ランク用・共通コンポーネント用 CSS（メディアクエリ含む）
	$rank_css = array(
		'rakutenmusic-stack-characteristic' => array( 'path' => '/assets/campaign/common/css/stack-characteristic.css', 'deps' => array() ),
		'rakutenmusic-stack-mission'         => array( 'path' => '/assets/campaign/common/css/stack-mission.css', 'deps' => array() ),
		'rakutenmusic-saikyo-cost-performance-banner' => array( 'path' => '/assets/common/css/saikyo-cost-performance-banner.css', 'deps' => array() ),
		'rakutenmusic-rank-common'           => array( 'path' => '/assets/rank/common/css/common.css', 'deps' => array() ),
		'rakutenmusic-rank-style'            => array( 'path' => '/assets/rank/css/style_20230501.css', 'deps' => array() ),
		'rakutenmusic-rank-blocks-scoped'    => array(
			'path'  => '/assets/rank/css/rank-blocks-scoped.css',
			'deps'  => array( 'rakutenmusic-rank-style' ),
		),
	);
	foreach ( $rank_css as $handle => $item ) {
		$rel = is_array( $item ) ? $item['path'] : $item;
		$deps = is_array( $item ) ? $item['deps'] : array();
		if ( file_exists( $dir . $rel ) ) {
			wp_enqueue_style(
				$handle,
				$uri . $rel,
				$deps,
				filemtime( $dir . $rel )
			);
		}
	}
	// ランク用：slick（カルーセル・メディアクエリ用）・inview はテーマで登録済みのものを利用
	wp_enqueue_style( 'rakutenmusic-slick-base' );
	wp_enqueue_script( 'rakutenmusic-slick' );
	$rank_js = $dir . '/assets/rank/js/main.js';
	if ( file_exists( $rank_js ) ) {
		wp_enqueue_script(
			'rakutenmusic-rank-main',
			$uri . '/assets/rank/js/main.js',
			array( 'jquery', 'rakutenmusic-slick', 'rakutenmusic-jquery-inview' ),
			filemtime( $rank_js ),
			true
		);
	}
}

/**
 * ランクブロックが含まれるページの body にクラスを付与（スタイル・スクリプト用）
 */
function rakutenmusic_rank_blocks_body_class( $classes ) {
	$post = get_queried_object();
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return $classes;
	}
	$rank_slugs = array(
		'rakutenmusic/rank-cospa-saikyo-bnr',
		'rakutenmusic/rank-nav',
		'rakutenmusic/rank-02-tokuten',
		'rakutenmusic/rank-01-about',
		'rakutenmusic/rank-03-faq',
		'rakutenmusic/rank-04-rakutenmusic',
		'rakutenmusic/rank-stack-characteristic',
		'rakutenmusic/rank-point-mission',
	);
	foreach ( $rank_slugs as $block_name ) {
		if ( has_block( $block_name, $post ) ) {
			$classes[] = 'has-rank-blocks';
			break;
		}
	}
	return $classes;
}
add_filter( 'body_class', 'rakutenmusic_rank_blocks_body_class' );

/**
 * リワードブロックが含まれるページの body にクラスを付与（スタイル・スクリプト用）
 */
function rakutenmusic_reward_blocks_body_class( $classes ) {
	$post = get_queried_object();
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return $classes;
	}
	$reward_slugs = array(
		'rakutenmusic/rakuten-music-section-reward',
		'rakutenmusic/reward-temporary-banner-bundle',
		'rakutenmusic/reward-section-howtouse',
		'rakutenmusic/reward-top-section-introduction',
	);
	foreach ( $reward_slugs as $block_name ) {
		if ( has_block( $block_name, $post ) ) {
			$classes[] = 'has-reward-blocks';
			break;
		}
	}
	return $classes;
}
add_filter( 'body_class', 'rakutenmusic_reward_blocks_body_class' );

add_action( 'wp_enqueue_scripts', 'rakutenmusic_enqueue_rank_block_assets', 25 );

/**
 * リワードセクション（section-reward）または HOW TO USE を含むページで Slick と reward/main.js を読み込む
 * .howtouse-steps のカルーセル初期化のため
 */
function rakutenmusic_enqueue_reward_section_assets() {
	$post = get_queried_object();
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return;
	}
	$reward_blocks = array(
		'rakutenmusic/rakuten-music-section-reward',
		'rakutenmusic/reward-temporary-banner-bundle',
		'rakutenmusic/reward-section-howtouse',
		'rakutenmusic/reward-top-section-introduction',
	);
	$has_reward = false;
	foreach ( $reward_blocks as $block_name ) {
		if ( has_block( $block_name, $post ) ) {
			$has_reward = true;
			break;
		}
	}
	// ブロック検出が効かない場合のフォールバック：楽天ミュージック汎用テンプレートならリワード用アセットを読み込む
	if ( ! $has_reward && is_singular( 'page' ) ) {
		$template = get_page_template_slug( get_queried_object_id() );
		if ( $template === 'page-rakuten-music.php' ) {
			$has_reward = true;
		}
	}
	if ( ! $has_reward ) {
		return;
	}
	$dir = get_template_directory();
	$uri = get_template_directory_uri();
	$t_banner_css = $dir . '/assets/campaign/common/css/temporary-banner-bundle.css';
	if ( file_exists( $t_banner_css ) ) {
		wp_enqueue_style(
			'rakutenmusic-temporary-banner-bundle',
			$uri . '/assets/campaign/common/css/temporary-banner-bundle.css',
			array(),
			filemtime( $t_banner_css )
		);
	}
	$howtouse_css = $dir . '/assets/reward/css/howtouse-carousel.css';
	if ( file_exists( $howtouse_css ) ) {
		wp_enqueue_style(
			'rakutenmusic-howtouse-carousel',
			$uri . '/assets/reward/css/howtouse-carousel.css',
			array( 'rakutenmusic-main' ),
			filemtime( $howtouse_css )
		);
	}
	$howtouse_js = $dir . '/assets/reward/js/howtouse-carousel.js';
	if ( file_exists( $howtouse_js ) ) {
		wp_enqueue_script(
			'rakutenmusic-howtouse-carousel',
			$uri . '/assets/reward/js/howtouse-carousel.js',
			array(),
			filemtime( $howtouse_js ),
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'rakutenmusic_enqueue_reward_section_assets', 25 );

/**
 * 楽天ミュージック汎用テンプレート使用時にフッター用 CSS を読み込む（フッター崩れ防止）
 * priority 30 でランク用 CSS (25) の後に読み込み、上書きで崩れを防ぐ
 */
function rakutenmusic_enqueue_footer_rakuten_music_style() {
	if ( ! is_singular( 'page' ) ) {
		return;
	}
	$template = get_page_template_slug( get_queried_object_id() );
	$templates_with_footer = array( 'page-rakuten-music.php', 'page-column-archive.php', 'page-column-article.php' );
	if ( ! in_array( $template, $templates_with_footer, true ) ) {
		return;
	}
	$dir = get_template_directory();
	$uri = get_template_directory_uri();
	$css = $dir . '/assets/common/css/footer-rakuten-music.css';
	if ( file_exists( $css ) ) {
		wp_enqueue_style(
			'rakutenmusic-footer-rakuten-music',
			$uri . '/assets/common/css/footer-rakuten-music.css',
			array(),
			filemtime( $css )
		);
	}
}
add_action( 'wp_enqueue_scripts', 'rakutenmusic_enqueue_footer_rakuten_music_style', 30 );

/**
 * 楽天ミュージック汎用テンプレート時に rank-blocks-scoped / フッター用 CSS を <head> に必ず出力する
 * enqueue が効かない環境でも <link> を直接出力してスタイルを当てる。
 * 固定ページかつテンプレートが楽天ミュージック用のいずれかの場合に出力（判定できない場合は固定ページなら出力）。
 */
function rakutenmusic_ensure_rank_and_footer_styles_in_head() {
	if ( ! is_singular( 'page' ) ) {
		return;
	}
	$post_id = get_queried_object_id();
	if ( ! $post_id && ! empty( $GLOBALS['post'] ) && $GLOBALS['post'] instanceof WP_Post ) {
		$post_id = (int) $GLOBALS['post']->ID;
	}
	$template = $post_id ? get_page_template_slug( $post_id ) : '';
	$templates_ok = array( 'page-rakuten-music.php', 'page-column-archive.php', 'page-column-article.php' );
	if ( $template !== '' && ! in_array( $template, $templates_ok, true ) ) {
		return;
	}

	$dir = get_template_directory();
	$uri = get_template_directory_uri();

	$rank_scoped = $dir . '/assets/rank/css/rank-blocks-scoped.css';
	if ( file_exists( $rank_scoped ) ) {
		$ver = filemtime( $rank_scoped );
		printf(
			'<link rel="stylesheet" id="rakutenmusic-rank-blocks-scoped-css" href="%s" type="text/css" media="all" />' . "\n",
			esc_url( $uri . '/assets/rank/css/rank-blocks-scoped.css?ver=' . $ver )
		);
	}

	$footer_css = $dir . '/assets/common/css/footer-rakuten-music.css';
	if ( file_exists( $footer_css ) ) {
		$ver = filemtime( $footer_css );
		printf(
			'<link rel="stylesheet" id="rakutenmusic-footer-rakuten-music-css" href="%s" type="text/css" media="all" />' . "\n",
			esc_url( $uri . '/assets/common/css/footer-rakuten-music.css?ver=' . $ver )
		);
	}
}
add_action( 'wp_head', 'rakutenmusic_ensure_rank_and_footer_styles_in_head', 99 );

/**
 * 記事ブロック（column-article-*）のメタデータを取得（早期登録用）
 */
function rakutenmusic_get_column_article_blocks_for_editor() {
	$dir   = get_template_directory();
	$slugs = array( 'column-article-title', 'column-article-author-start', 'column-article-main-image', 'column-article-badge', 'column-article-body', 'column-article-header', 'column-article-youtube', 'column-article-song', 'column-article-spacer' );
	$out   = array();
	foreach ( $slugs as $slug ) {
		$block_json = $dir . '/blocks/' . $slug . '/block.json';
		if ( ! file_exists( $block_json ) ) {
			continue;
		}
		$json = json_decode( file_get_contents( $block_json ), true );
		if ( ! is_array( $json ) ) {
			continue;
		}
		$out[] = array(
			'name'       => 'rakutenmusic/' . $slug,
			'title'      => isset( $json['title'] ) ? $json['title'] : $slug,
			'category'   => isset( $json['category'] ) ? $json['category'] : 'rakutenmusic-column',
			'attributes' => isset( $json['attributes'] ) && is_array( $json['attributes'] ) ? $json['attributes'] : array(),
		);
	}
	return $out;
}

/**
 * ブロックエディター：セクション・ランク・リワード・ライトプラン・記事ブロックをインサーターに表示
 * 登録処理は section-blocks-edit.js で実行（wp_localize_script でデータを渡す）。各ブロックフォルダに preview.png を置くとセクションのプレビューに表示される
 */
function rakutenmusic_enqueue_block_editor_assets() {
	$blocks            = rakutenmusic_get_section_blocks();
	$preview_urls      = rakutenmusic_get_block_preview_urls();
	$rank_blocks       = rakutenmusic_get_rank_blocks_for_editor();
	$reward_blocks     = rakutenmusic_get_reward_blocks_for_editor();
	$plan_lite_blocks  = rakutenmusic_get_plan_lite_blocks_for_editor();
	$column_article_blocks = rakutenmusic_get_column_article_blocks_for_editor();

	$block_data = array(
		'blocks'            => $blocks,
		'previewUrls'       => $preview_urls,
		'rankBlocks'        => $rank_blocks,
		'rewardBlocks'      => $reward_blocks,
		'planLiteBlocks'    => $plan_lite_blocks,
		'columnArticleBlocks' => $column_article_blocks,
	);

	// wp-blocks 直後にインラインでブロック登録（最も早く実行されリストビューで「非サポート」にならない）
	wp_localize_script( 'wp-blocks', 'rakutenmusicSectionBlocksData', $block_data );
	$inline_register = <<<'INLINE'
(function(){
	var w=window.wp,d=window.rakutenmusicSectionBlocksData;
	if(!w||!w.blocks||!w.element||!d)return;
	var r=w.blocks.registerBlockType,e=w.element.createElement;
	function minEdit(t){return function(){return e('div',{className:'rakutenmusic-block-early-placeholder',style:{padding:'8px',fontSize:'13px',color:'#666'}},t);};}
	(d.blocks||[]).forEach(function(b){try{r('rakutenmusic/rakuten-music-section-'+b.name,{title:'[楽天ミュージック] '+b.title,category:b.category||'rakutenmusic-common',attributes:{},edit:minEdit(b.title),save:function(){return null;}});}catch(err){}});
	(d.rankBlocks||[]).forEach(function(b){try{r(b.name,{title:b.title,category:b.category||'rakutenmusic-rank',attributes:{},edit:minEdit(b.title),save:function(){return null;}});}catch(err){}});
	(d.rewardBlocks||[]).forEach(function(b){try{r(b.name,{title:b.title,category:b.category||'rakutenmusic-reward',attributes:{},edit:minEdit(b.title),save:function(){return null;}});}catch(err){}});
	(d.planLiteBlocks||[]).forEach(function(b){try{r(b.name,{title:b.title,category:b.category||'rakutenmusic-plan-lite',attributes:{},edit:minEdit(b.title),save:function(){return null;}});}catch(err){}});
	(d.columnArticleBlocks||[]).forEach(function(b){try{var attrs=b.attributes||{};var hasContent=attrs.content;var editFn=hasContent?function(props){var a=props.attributes||{};return e('div',{className:'rakutenmusic-block-early-placeholder',style:{padding:'8px'}},e('input',{type:'text',value:a.content||'',onChange:function(ev){props.setAttributes({content:ev.target.value});},placeholder:b.title,style:{width:'100%',padding:'6px',fontSize:'14px'}}));}:minEdit(b.title);r(b.name,{title:b.title,category:b.category||'rakutenmusic-column',attributes:attrs,edit:editFn,save:function(){return null;}});}catch(err){}});
})();
INLINE;
	wp_add_inline_script( 'wp-blocks', $inline_register, 'after' );

	wp_localize_script( 'rakutenmusic-block-editor-early-register', 'rakutenmusicSectionBlocksData', $block_data );
	wp_enqueue_script( 'rakutenmusic-block-editor-early-register' );

	wp_localize_script( 'rakutenmusic-section-blocks-edit', 'rakutenmusicSectionBlocksData', $block_data );
	wp_enqueue_script( 'rakutenmusic-section-blocks-edit' );
}

add_action( 'enqueue_block_editor_assets', 'rakutenmusic_enqueue_block_editor_assets' );

/**
 * 固定ページ：フローティングCTA メタボックス（サイドバーに表示・ブロックエディター対応）
 */
function rakutenmusic_add_floating_cta_meta_box() {
	add_meta_box(
		'rakutenmusic_floating_cta',
		__( 'フローティングCTA', 'rakutenmusic-theme' ),
		'rakutenmusic_floating_cta_meta_box_cb',
		'page',
		'side'
	);
}
add_action( 'add_meta_boxes', 'rakutenmusic_add_floating_cta_meta_box' );

/**
 * フローティングCTA メタボックスの中身
 */
function rakutenmusic_floating_cta_meta_box_cb( $post ) {
	wp_nonce_field( 'rakutenmusic_floating_cta_save', 'rakutenmusic_floating_cta_nonce' );
	$defaults = rakutenmusic_floating_cta_defaults();
	$visible       = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_visible', true );
	$type          = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_type', true );
	$text          = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_text', true );
	$text_line2    = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_text_line2', true );
	$font_size     = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_font_size', true );
	$color         = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_color', true );
	$link          = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_link', true );
	$app_qr_url    = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_app_qr_url', true );
	$app_store_url = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_app_store_url', true );
	if ( $visible === '' ) {
		$visible = $defaults['visible'];
	}
	if ( $type === '' || ! in_array( $type, array( 'trial', 'app_download' ), true ) ) {
		$type = $defaults['type'];
	}
	if ( $text === '' ) {
		$text = $defaults['text'];
	}
	if ( $text_line2 === '' && array_key_exists( 'text_line2', $defaults ) ) {
		$text_line2 = $defaults['text_line2'];
	}
	if ( $font_size === '' ) {
		$font_size = $defaults['font_size'];
	}
	if ( $color === '' ) {
		$color = $defaults['color'];
	}
	if ( $link === '' && array_key_exists( 'link', $defaults ) ) {
		$link = $defaults['link'];
	}
	if ( $app_store_url === '' && array_key_exists( 'app_store_url', $defaults ) ) {
		$app_store_url = $defaults['app_store_url'];
	}
	$checked = ( $visible === 'show' || $visible === '1' ) ? ' checked="checked"' : '';
	$ajax_url = admin_url( 'admin-ajax.php' );
	$ajax_nonce = wp_create_nonce( 'rakutenmusic_floating_cta_ajax' );
	?>
	<div id="rakutenmusic_fcta_wrapper" data-post-id="<?php echo (int) $post->ID; ?>" data-ajax-url="<?php echo esc_url( $ajax_url ); ?>" data-nonce="<?php echo esc_attr( $ajax_nonce ); ?>">
	<p>
		<label>
			<input type="checkbox" id="rakutenmusic_fcta_visible" name="rakutenmusic_floating_cta_visible" value="1" <?php echo $checked; ?> />
			<?php esc_html_e( 'フローティングボタンを表示する', 'rakutenmusic-theme' ); ?>
		</label>
	</p>
	<p>
		<strong><?php esc_html_e( 'ボタン種類', 'rakutenmusic-theme' ); ?></strong><br>
		<label><input type="radio" name="rakutenmusic_floating_cta_type" value="trial" <?php checked( $type, 'trial' ); ?> /> <?php esc_html_e( '①会員登録ボタン', 'rakutenmusic-theme' ); ?></label><br>
		<label><input type="radio" name="rakutenmusic_floating_cta_type" value="app_download" <?php checked( $type, 'app_download' ); ?> /> <?php esc_html_e( '②アプリダウンロードボタン', 'rakutenmusic-theme' ); ?></label>
	</p>
	<div class="rakutenmusic-fcta-trial-fields" style="<?php echo ( $type !== 'trial' ) ? 'display:none;' : ''; ?>">
		<p>
			<label for="rakutenmusic_fcta_link"><?php esc_html_e( 'ボタンURL', 'rakutenmusic-theme' ); ?></label>
			<input type="url" id="rakutenmusic_fcta_link" name="rakutenmusic_floating_cta_link" value="<?php echo esc_attr( $link ); ?>" class="widefat" placeholder="<?php echo esc_attr( $defaults['link'] ); ?>" />
		</p>
		<p>
			<label for="rakutenmusic_fcta_text"><?php esc_html_e( '1行目テキスト', 'rakutenmusic-theme' ); ?></label>
			<input type="text" id="rakutenmusic_fcta_text" name="rakutenmusic_floating_cta_text" value="<?php echo esc_attr( $text ); ?>" class="widefat" placeholder="<?php echo esc_attr( $defaults['text'] ); ?>" />
		</p>
		<p>
			<label for="rakutenmusic_fcta_text_line2"><?php esc_html_e( '2行目テキスト', 'rakutenmusic-theme' ); ?></label>
			<input type="text" id="rakutenmusic_fcta_text_line2" name="rakutenmusic_floating_cta_text_line2" value="<?php echo esc_attr( $text_line2 ); ?>" class="widefat" placeholder="<?php echo esc_attr( $defaults['text_line2'] ); ?>" />
		</p>
	</div>
	<div class="rakutenmusic-fcta-app-fields" style="<?php echo ( $type !== 'app_download' ) ? 'display:none;' : ''; ?>">
		<p>
			<label for="rakutenmusic_fcta_app_qr_url"><?php esc_html_e( 'QRコード画像URL（PC時モーダル用）', 'rakutenmusic-theme' ); ?></label>
			<input type="url" id="rakutenmusic_fcta_app_qr_url" name="rakutenmusic_floating_cta_app_qr_url" value="<?php echo esc_attr( $app_qr_url ); ?>" class="widefat" />
		</p>
		<p>
			<label for="rakutenmusic_fcta_app_store_url"><?php esc_html_e( 'ストアリンクURL（スマホ時）', 'rakutenmusic-theme' ); ?></label>
			<input type="url" id="rakutenmusic_fcta_app_store_url" name="rakutenmusic_floating_cta_app_store_url" value="<?php echo esc_attr( $app_store_url ); ?>" class="widefat" placeholder="<?php echo esc_attr( $defaults['app_store_url'] ); ?>" />
		</p>
	</div>
	<p class="rakutenmusic-fcta-hidden-fields" style="display:none;">
		<input type="hidden" id="rakutenmusic_fcta_font_size" name="rakutenmusic_floating_cta_font_size" value="<?php echo esc_attr( $font_size ); ?>" />
		<input type="hidden" id="rakutenmusic_fcta_color" name="rakutenmusic_floating_cta_color" value="<?php echo esc_attr( $color ); ?>" />
	</p>
	<script>
	(function(){
		var w = document.getElementById('rakutenmusic_fcta_wrapper');
		if(!w) return;
		var postId = w.getAttribute('data-post-id');
		var ajaxUrl = w.getAttribute('data-ajax-url');
		var nonce = w.getAttribute('data-nonce');
		var visibleEl = document.getElementById('rakutenmusic_fcta_visible');
		var typeRadios = w.querySelectorAll('input[name="rakutenmusic_floating_cta_type"]');
		var textEl = document.getElementById('rakutenmusic_fcta_text');
		var text2El = document.getElementById('rakutenmusic_fcta_text_line2');
		var fontSizeEl = document.getElementById('rakutenmusic_fcta_font_size');
		var colorEl = document.getElementById('rakutenmusic_fcta_color');
		var linkEl = document.getElementById('rakutenmusic_fcta_link');
		var appQrEl = document.getElementById('rakutenmusic_fcta_app_qr_url');
		var appStoreEl = document.getElementById('rakutenmusic_fcta_app_store_url');
		var trialDiv = w.querySelector('.rakutenmusic-fcta-trial-fields');
		var appDiv = w.querySelector('.rakutenmusic-fcta-app-fields');
		if(!visibleEl || !ajaxUrl || !nonce || !postId) return;
		function getType(){ var r = w.querySelector('input[name="rakutenmusic_floating_cta_type"]:checked'); return r ? r.value : 'trial'; }
		function toggleFields(){ var t = getType(); if(trialDiv) trialDiv.style.display = t === 'trial' ? '' : 'none'; if(appDiv) appDiv.style.display = t === 'app_download' ? '' : 'none'; }
		function save(){
			var fd = new FormData();
			fd.append('action','rakutenmusic_save_floating_cta_meta');
			fd.append('nonce',nonce);
			fd.append('post_id',postId);
			fd.append('visible', visibleEl.checked ? 'show' : 'hidden');
			fd.append('type', getType());
			fd.append('text', textEl ? textEl.value || '' : '');
			fd.append('text_line2', text2El ? text2El.value || '' : '');
			fd.append('font_size', fontSizeEl ? (fontSizeEl.value || '16') : '16');
			fd.append('color', colorEl ? colorEl.value || '' : '');
			fd.append('link', linkEl ? (linkEl.value || '') : '');
			fd.append('app_qr_url', appQrEl ? (appQrEl.value || '') : '');
			fd.append('app_store_url', appStoreEl ? (appStoreEl.value || '') : '');
			var xhr = new XMLHttpRequest();
			xhr.open('POST', ajaxUrl);
			xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
			xhr.send(fd);
		}
		toggleFields();
		[].forEach.call(typeRadios || [], function(r){ r.addEventListener('change', function(){ toggleFields(); save(); }); });
		visibleEl.addEventListener('change', save);
		if(textEl){ textEl.addEventListener('input', function(){ clearTimeout(window._rakutenmusicFctaT); window._rakutenmusicFctaT = setTimeout(save, 500); }); textEl.addEventListener('blur', save); }
		if(text2El){ text2El.addEventListener('input', function(){ clearTimeout(window._rakutenmusicFctaT); window._rakutenmusicFctaT = setTimeout(save, 500); }); text2El.addEventListener('blur', save); }
		if(linkEl){ linkEl.addEventListener('input', function(){ clearTimeout(window._rakutenmusicFctaT); window._rakutenmusicFctaT = setTimeout(save, 500); }); linkEl.addEventListener('blur', save); }
		if(appQrEl){ appQrEl.addEventListener('input', function(){ clearTimeout(window._rakutenmusicFctaT); window._rakutenmusicFctaT = setTimeout(save, 500); }); appQrEl.addEventListener('blur', save); }
		if(appStoreEl){ appStoreEl.addEventListener('input', function(){ clearTimeout(window._rakutenmusicFctaT); window._rakutenmusicFctaT = setTimeout(save, 500); }); appStoreEl.addEventListener('blur', save); }
	})();
	</script>
	</div>
	<?php
}

/**
 * メタボックス保存（従来エディター用）
 */
function rakutenmusic_save_floating_cta_meta( $post_id ) {
	if ( ! isset( $_POST['rakutenmusic_floating_cta_nonce'] ) ||
		! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['rakutenmusic_floating_cta_nonce'] ) ), 'rakutenmusic_floating_cta_save' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	if ( get_post_type( $post_id ) !== 'page' ) {
		return;
	}
	if ( isset( $_POST['rakutenmusic_floating_cta_visible'] ) ) {
		$val = sanitize_text_field( wp_unslash( $_POST['rakutenmusic_floating_cta_visible'] ) );
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_visible', $val ? 'show' : 'hidden' );
	}
	if ( isset( $_POST['rakutenmusic_floating_cta_text'] ) ) {
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_text', sanitize_text_field( wp_unslash( $_POST['rakutenmusic_floating_cta_text'] ) ) );
	}
	if ( isset( $_POST['rakutenmusic_floating_cta_text_line2'] ) ) {
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_text_line2', sanitize_text_field( wp_unslash( $_POST['rakutenmusic_floating_cta_text_line2'] ) ) );
	}
	if ( isset( $_POST['rakutenmusic_floating_cta_font_size'] ) ) {
		$fs = absint( wp_unslash( $_POST['rakutenmusic_floating_cta_font_size'] ) );
		$fs = $fs >= 10 && $fs <= 32 ? $fs : 16;
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_font_size', (string) $fs );
	}
	if ( isset( $_POST['rakutenmusic_floating_cta_color'] ) ) {
		$c = sanitize_hex_color( wp_unslash( $_POST['rakutenmusic_floating_cta_color'] ) );
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_color', $c ? $c : '#bf0000' );
	}
	if ( isset( $_POST['rakutenmusic_floating_cta_link'] ) ) {
		$url = esc_url_raw( wp_unslash( $_POST['rakutenmusic_floating_cta_link'] ) );
		$defaults = rakutenmusic_floating_cta_defaults();
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_link', $url ? $url : $defaults['link'] );
	}
	if ( isset( $_POST['rakutenmusic_floating_cta_type'] ) ) {
		$val = sanitize_text_field( wp_unslash( $_POST['rakutenmusic_floating_cta_type'] ) );
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_type', ( $val === 'app_download' ) ? 'app_download' : 'trial' );
	}
	if ( isset( $_POST['rakutenmusic_floating_cta_app_qr_url'] ) ) {
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_app_qr_url', esc_url_raw( wp_unslash( $_POST['rakutenmusic_floating_cta_app_qr_url'] ) ) );
	}
	if ( isset( $_POST['rakutenmusic_floating_cta_app_store_url'] ) ) {
		$url = esc_url_raw( wp_unslash( $_POST['rakutenmusic_floating_cta_app_store_url'] ) );
		$defaults = rakutenmusic_floating_cta_defaults();
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_app_store_url', $url ? $url : $defaults['app_store_url'] );
	}
}
add_action( 'save_post_page', 'rakutenmusic_save_floating_cta_meta' );

/**
 * ブロックエディター：メタボックス用スクリプト（AJAX で即時保存）
 */
function rakutenmusic_enqueue_floating_cta_meta_box_sync() {
	global $post;
	if ( ! $post || $post->post_type !== 'page' ) {
		return;
	}
	$assets = rakutenmusic_get_assets_uri();
	wp_enqueue_script(
		'rakutenmusic-floating-cta-meta-box-sync',
		$assets . '/js/floating-cta-meta-box-sync.js',
		array(),
		wp_get_theme()->get( 'Version' ),
		true
	);
	wp_localize_script( 'rakutenmusic-floating-cta-meta-box-sync', 'rakutenmusicFloatingCta', array(
		'ajaxUrl' => admin_url( 'admin-ajax.php' ),
		'nonce'   => wp_create_nonce( 'rakutenmusic_floating_cta_ajax' ),
		'postId'  => (int) $post->ID,
	) );
}
add_action( 'enqueue_block_editor_assets', 'rakutenmusic_enqueue_floating_cta_meta_box_sync' );

/**
 * AJAX：フローティングCTAメタを即時保存（ブロックエディターでチェック等が保存されない対策）
 */
function rakutenmusic_ajax_save_floating_cta_meta() {
	if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'rakutenmusic_floating_cta_ajax' ) ) {
		wp_send_json_error( array( 'message' => 'nonce' ) );
	}
	$post_id = isset( $_POST['post_id'] ) ? (int) $_POST['post_id'] : 0;
	if ( ! $post_id || get_post_type( $post_id ) !== 'page' ) {
		wp_send_json_error( array( 'message' => 'post' ) );
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		wp_send_json_error( array( 'message' => 'capability' ) );
	}
	$defaults = rakutenmusic_floating_cta_defaults();
	if ( isset( $_POST['visible'] ) ) {
		$val = sanitize_text_field( wp_unslash( $_POST['visible'] ) );
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_visible', ( $val === 'show' || $val === '1' ) ? 'show' : 'hidden' );
	}
	if ( isset( $_POST['text'] ) ) {
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_text', sanitize_text_field( wp_unslash( $_POST['text'] ) ) );
	}
	if ( isset( $_POST['text_line2'] ) ) {
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_text_line2', sanitize_text_field( wp_unslash( $_POST['text_line2'] ) ) );
	}
	if ( isset( $_POST['font_size'] ) ) {
		$fs = absint( wp_unslash( $_POST['font_size'] ) );
		$fs = $fs >= 10 && $fs <= 32 ? $fs : 16;
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_font_size', (string) $fs );
	}
	if ( isset( $_POST['color'] ) ) {
		$c = sanitize_hex_color( wp_unslash( $_POST['color'] ) );
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_color', $c ? $c : $defaults['color'] );
	}
	if ( isset( $_POST['link'] ) ) {
		$url = esc_url_raw( wp_unslash( $_POST['link'] ) );
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_link', $url ? $url : $defaults['link'] );
	}
	if ( isset( $_POST['type'] ) ) {
		$val = sanitize_text_field( wp_unslash( $_POST['type'] ) );
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_type', ( $val === 'app_download' ) ? 'app_download' : 'trial' );
	}
	if ( isset( $_POST['app_qr_url'] ) ) {
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_app_qr_url', esc_url_raw( wp_unslash( $_POST['app_qr_url'] ) ) );
	}
	if ( isset( $_POST['app_store_url'] ) ) {
		$url = esc_url_raw( wp_unslash( $_POST['app_store_url'] ) );
		update_post_meta( $post_id, 'rakutenmusic_floating_cta_app_store_url', $url ? $url : $defaults['app_store_url'] );
	}
	wp_send_json_success();
}
add_action( 'wp_ajax_rakutenmusic_save_floating_cta_meta', 'rakutenmusic_ajax_save_floating_cta_meta' );

/**
 * フローティングCTA用 投稿メタのデフォルト値
 */
function rakutenmusic_floating_cta_defaults() {
	return array(
		'visible'       => 'show',
		'type'          => 'trial', // 'trial' = 会員登録ボタン, 'app_download' = アプリダウンロードボタン
		'text'          => 'いますぐ始める(無料)',
		'text_line2'    => '※楽天会員ログインに遷移します',
		'font_size'     => '16',
		'color'         => '#bf0000',
		'link'          => 'https://member.music.rakuten.co.jp/mypage',
		'app_qr_url'    => '',   // PC時モーダル用QR画像URL
		'app_store_url' => 'https://music.rakuten.co.jp/link/app/app_inflow.html', // スマホ時ストアリンク
	);
}

/**
 * 固定ページ：フローティングCTA用 post meta を登録
 */
function rakutenmusic_register_floating_cta_meta() {
	$defaults = rakutenmusic_floating_cta_defaults();
	$args = array(
		'show_in_rest'  => true,
		'single'        => true,
		'type'          => 'string',
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	);
	// アンダースコアなしにすると REST API で保存・取得できる（ブロックエディター用）
	register_post_meta( 'page', 'rakutenmusic_floating_cta_visible', array_merge( $args, array( 'default' => 'show' ) ) );
	register_post_meta( 'page', 'rakutenmusic_floating_cta_type', array_merge( $args, array( 'default' => $defaults['type'] ) ) );
	register_post_meta( 'page', 'rakutenmusic_floating_cta_text', array_merge( $args, array( 'default' => $defaults['text'] ) ) );
	register_post_meta( 'page', 'rakutenmusic_floating_cta_text_line2', array_merge( $args, array( 'default' => $defaults['text_line2'] ) ) );
	register_post_meta( 'page', 'rakutenmusic_floating_cta_font_size', array_merge( $args, array( 'default' => $defaults['font_size'] ) ) );
	register_post_meta( 'page', 'rakutenmusic_floating_cta_color', array_merge( $args, array( 'default' => $defaults['color'] ) ) );
	register_post_meta( 'page', 'rakutenmusic_floating_cta_link', array_merge( $args, array( 'default' => $defaults['link'] ) ) );
	register_post_meta( 'page', 'rakutenmusic_floating_cta_app_qr_url', array_merge( $args, array( 'default' => $defaults['app_qr_url'] ) ) );
	register_post_meta( 'page', 'rakutenmusic_floating_cta_app_store_url', array_merge( $args, array( 'default' => $defaults['app_store_url'] ) ) );
}
add_action( 'init', 'rakutenmusic_register_floating_cta_meta' );

/**
 * REST API でページ更新時にフローティングCTAメタを確実に保存する
 * （'0' や空が送られても確実に反映するため）
 *
 * @param WP_Post         $post      Inserted or updated post object.
 * @param WP_REST_Request $request   Request object.
 * @param bool            $creating  True when creating a post, false when updating.
 */
function rakutenmusic_rest_save_floating_cta_meta( $post, $request, $creating ) {
	if ( ! $post || $post->post_type !== 'page' ) {
		return;
	}
	$params = $request->get_json_params();
	if ( empty( $params ) ) {
		$params = $request->get_body_params();
	}
	if ( ! isset( $params['meta'] ) || ! is_array( $params['meta'] ) ) {
		return;
	}
	$meta = $params['meta'];
	$defaults = rakutenmusic_floating_cta_defaults();

	if ( array_key_exists( 'rakutenmusic_floating_cta_visible', $meta ) ) {
		$val = (string) $meta['rakutenmusic_floating_cta_visible'];
		update_post_meta( $post->ID, 'rakutenmusic_floating_cta_visible', ( $val === 'show' || $val === '1' ) ? 'show' : 'hidden' );
	}
	if ( array_key_exists( 'rakutenmusic_floating_cta_text', $meta ) ) {
		update_post_meta( $post->ID, 'rakutenmusic_floating_cta_text', sanitize_text_field( (string) $meta['rakutenmusic_floating_cta_text'] ) );
	}
	if ( array_key_exists( 'rakutenmusic_floating_cta_text_line2', $meta ) ) {
		update_post_meta( $post->ID, 'rakutenmusic_floating_cta_text_line2', sanitize_text_field( (string) $meta['rakutenmusic_floating_cta_text_line2'] ) );
	}
	if ( array_key_exists( 'rakutenmusic_floating_cta_font_size', $meta ) ) {
		$fs = absint( $meta['rakutenmusic_floating_cta_font_size'] );
		$fs = $fs >= 10 && $fs <= 32 ? $fs : 16;
		update_post_meta( $post->ID, 'rakutenmusic_floating_cta_font_size', (string) $fs );
	}
	if ( array_key_exists( 'rakutenmusic_floating_cta_color', $meta ) ) {
		$c = sanitize_hex_color( (string) $meta['rakutenmusic_floating_cta_color'] );
		update_post_meta( $post->ID, 'rakutenmusic_floating_cta_color', $c ? $c : $defaults['color'] );
	}
	if ( array_key_exists( 'rakutenmusic_floating_cta_link', $meta ) ) {
		$url = esc_url_raw( (string) $meta['rakutenmusic_floating_cta_link'] );
		update_post_meta( $post->ID, 'rakutenmusic_floating_cta_link', $url ? $url : $defaults['link'] );
	}
	if ( array_key_exists( 'rakutenmusic_floating_cta_type', $meta ) ) {
		$val = (string) $meta['rakutenmusic_floating_cta_type'];
		update_post_meta( $post->ID, 'rakutenmusic_floating_cta_type', ( $val === 'app_download' ) ? 'app_download' : 'trial' );
	}
	if ( array_key_exists( 'rakutenmusic_floating_cta_app_qr_url', $meta ) ) {
		update_post_meta( $post->ID, 'rakutenmusic_floating_cta_app_qr_url', esc_url_raw( (string) $meta['rakutenmusic_floating_cta_app_qr_url'] ) );
	}
	if ( array_key_exists( 'rakutenmusic_floating_cta_app_store_url', $meta ) ) {
		$url = esc_url_raw( (string) $meta['rakutenmusic_floating_cta_app_store_url'] );
		update_post_meta( $post->ID, 'rakutenmusic_floating_cta_app_store_url', $url ? $url : $defaults['app_store_url'] );
	}
}
add_action( 'rest_after_insert_page', 'rakutenmusic_rest_save_floating_cta_meta', 10, 3 );

/**
 * 現在表示中のページのフローティングCTA用HTMLを生成（ヘッダーで使用）
 *
 * @param string $t テーマURI
 * @param string $h ホームURL
 * @return string
 */
function rakutenmusic_render_floating_cta_html( $t, $h ) {
	$defaults     = rakutenmusic_floating_cta_defaults();
	$page_id      = get_queried_object_id();
	$visible      = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_visible', true ) : '';
	$type         = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_type', true ) : '';
	$text         = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_text', true ) : '';
	$text_line2   = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_text_line2', true ) : '';
	$link         = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_link', true ) : '';
	$app_qr_url   = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_app_qr_url', true ) : '';
	$app_store_url = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_app_store_url', true ) : '';

	$visible = ( $visible === 'show' || $visible === '1' );
	if ( $type !== 'trial' && $type !== 'app_download' ) {
		$type = $defaults['type'];
	}
	$text       = $text !== '' ? $text : $defaults['text'];
	$caption   = $text_line2 !== '' ? $text_line2 : '';
	$link       = $link !== '' ? esc_url( $link ) : $defaults['link'];
	if ( ! $link ) {
		$link = $defaults['link'];
	}
	$app_store_url = $app_store_url !== '' ? esc_url( $app_store_url ) : $defaults['app_store_url'];
	if ( ! $app_store_url ) {
		$app_store_url = $defaults['app_store_url'];
	}
	$app_qr_url = $app_qr_url !== '' ? esc_url( $app_qr_url ) : '';

	if ( ! $visible ) {
		return '';
	}

	$svg_arrow = '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.707 1.76709L5 2.47409L10.793 8.26709L5 14.0601L5.707 14.7671L12.207 8.26709L5.707 1.76709Z" fill="white"></path></svg>';

	ob_start();
	if ( $type === 'app_download' ) {
		$btn_style = 'background-color: #FF008C;';
		?>
  <div class="floating-cta-button floating-cta-button--app">
    <div id="cta-btn-txt" class="btn-apply">
      <a class="floating-cta-app-btn iap-store-link" href="<?php echo esc_url( $app_store_url ); ?>" target="_blank" rel="noopener" data-qr-url="<?php echo esc_attr( $app_qr_url ); ?>" data-store-url="<?php echo esc_attr( $app_store_url ); ?>" data-ratid="download-btn-floating" data-ratevent="click" data-ratparam="all" style="<?php echo esc_attr( $btn_style ); ?>">
        <span class="txt" style="font-size: 16px;">アプリをダウンロード</span>
        <?php echo $svg_arrow; ?>
      </a>
    </div>
  </div>
		<?php
	} else {
		$btn_style = 'background-color: #BF0000;';
		$txt_style = 'font-size: 16px;';
		$txt_small_style = 'font-size: 14px;';
		?>
  <div class="floating-cta-button">
    <div id="cta-btn-txt" class="btn-apply">
      <a class="trial-btn" href="<?php echo esc_url( $link ); ?>" target="_blank" rel="noopener" data-ratid="trial-btn-floating" data-ratevent="click" data-ratparam="all" style="<?php echo esc_attr( $btn_style ); ?>">
        <div class="cta-btn-txt" style="<?php echo esc_attr( $txt_style ); ?>">
          <span class="txt"><?php echo esc_html( $text ); ?></span>
          <?php if ( $caption !== '' ) : ?><span class="txt-small" style="<?php echo esc_attr( $txt_small_style ); ?>"><?php echo esc_html( $caption ); ?></span><?php endif; ?>
        </div>
        <?php echo $svg_arrow; ?>
      </a>
    </div>
  </div>
		<?php
	}
	?>
  <script type="text/javascript" src="<?php echo esc_url( $t ); ?>/assets/common/js/jquery.inview.min.js"></script>
  <script>
    (function($){$(function(){ $(".l-footer").on("inview",function(e,isInView){ $("#page .floating-cta-button").toggle(!isInView); }); }); })(window.jQuery);
  </script>
	<?php
	return ob_get_clean();
}

/**
 * アプリDL用モーダル＋クリック処理（.iap-store-link / .floating-cta-app-btn をイベント委譲で共通処理）
 * バンドル：OVERVIEW の「アプリをダウンロード」ボタンとフローティングCTAで利用
 */
function rakutenmusic_render_app_dl_modal() {
	ob_start();
	?>
  <div id="rakutenmusic-app-dl-modal" class="rakutenmusic-app-dl-modal" role="dialog" aria-modal="true" aria-labelledby="rakutenmusic-app-dl-modal-title" style="display:none; position:fixed; inset:0; z-index:99999; background:rgba(0,0,0,.5); align-items:center; justify-content:center;">
    <div class="rakutenmusic-app-dl-modal__inner" style="background:#fff; border-radius:12px; box-shadow:0 4px 24px rgba(0,0,0,.2); padding:24px; max-width:320px; text-align:center;">
      <h2 id="rakutenmusic-app-dl-modal-title" style="margin:0 0 16px; font-size:18px;">アプリをダウンロードする</h2>
      <div class="rakutenmusic-app-dl-modal__qr" style="margin:0 0 20px;">
        <img id="rakutenmusic-app-dl-modal-qr" src="" alt="QRコード" style="max-width:100%; height:auto; display:block; margin:0 auto;" />
      </div>
      <button type="button" class="rakutenmusic-app-dl-modal__close" style="display:inline-flex; align-items:center; gap:6px; padding:8px 16px; font-size:14px; cursor:pointer; border:1px solid #ccc; border-radius:6px; background:#fff;">
        <span aria-hidden="true">×</span> 閉じる
      </button>
    </div>
  </div>
  <script>
  (function(){
    var modal = document.getElementById('rakutenmusic-app-dl-modal');
    var qrImg = document.getElementById('rakutenmusic-app-dl-modal-qr');
    var closeBtn = modal && modal.querySelector('.rakutenmusic-app-dl-modal__close');
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    function openModal(qrUrl){ if(modal && qrImg && qrUrl){ qrImg.src = qrUrl; qrImg.alt = 'QRコード'; modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; } }
    function closeModal(){ if(modal){ modal.style.display = 'none'; document.body.style.overflow = ''; } }
    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(modal) modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });
    document.addEventListener('click', function(e){
      var btn = e.target && e.target.closest ? e.target.closest('.iap-store-link, .floating-cta-app-btn') : null;
      if(!btn) return;
      var qrUrl = btn.getAttribute('data-qr-url');
      var storeUrl = btn.getAttribute('data-store-url') || btn.getAttribute('href');
      if(isMobile) return;
      e.preventDefault();
      if(qrUrl){ openModal(qrUrl); } else { if(storeUrl) window.open(storeUrl, '_blank'); }
    }, true);
  })();
  </script>
	<?php
	return ob_get_clean();
}

/**
 * 固定ページで OVERVIEW ブロック or フローティングCTA（アプリDL）がある場合にアプリDLモーダルをフッターに出力
 */
function rakutenmusic_maybe_output_app_dl_modal() {
	if ( ! is_singular( 'page' ) ) {
		return;
	}
	$post_id = get_queried_object_id();
	if ( ! $post_id ) {
		return;
	}
	$post = get_post( $post_id );
	if ( ! $post || ! ( $post instanceof WP_Post ) ) {
		return;
	}
	$has_overview = has_block( 'rakutenmusic/rakuten-music-section-top-section-overview', $post );
	$fcta_visible = get_post_meta( $post_id, 'rakutenmusic_floating_cta_visible', true );
	$fcta_type   = get_post_meta( $post_id, 'rakutenmusic_floating_cta_type', true );
	$need_modal = $has_overview || ( ( $fcta_visible === 'show' || $fcta_visible === '1' ) && $fcta_type === 'app_download' );
	if ( $need_modal ) {
		echo rakutenmusic_render_app_dl_modal(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}
add_action( 'wp_footer', 'rakutenmusic_maybe_output_app_dl_modal' );
