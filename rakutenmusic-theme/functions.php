<?php
/**
 * 楽天ミュージック汎用テーマ用 functions
 * セクションブロックの登録 / CSS・JS の読み込み
 */

defined( 'ABSPATH' ) || exit;

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
		array( 'name' => 'top-main-fv', 'title' => 'トップFV（ヒーロー）', 'keywords' => array( 'FV', 'ヒーロー', 'ファーストビュー', 'top-main-fv' ) ),
		array( 'name' => 'saikyo-cost-performance', 'title' => 'コスパ最強な理由', 'keywords' => array( 'コスパ', '最強', 'top-section-saikyo_cost_performance' ) ),
		array( 'name' => 'campaign', 'title' => 'キャンペーン', 'keywords' => array( 'キャンペーン', 'top-section-campaign' ) ),
		array( 'name' => 'campaign-list', 'title' => 'キャンペーンリスト', 'keywords' => array( 'キャンペーン', 'リスト', 'ライト', '開催中' ) ),
		array( 'name' => 'feature', 'title' => '便利な機能', 'keywords' => array( '機能' ) ),
		array( 'name' => 'price', 'title' => '料金プラン', 'keywords' => array( '料金', 'プラン', 'stack-section-price' ) ),
		array( 'name' => 'reward', 'title' => 'リワード', 'keywords' => array( 'リワード', 'ポイント', 'stack-section-reward' ) ),
		array( 'name' => 'rakutenmusicrank', 'title' => 'Rakuten Musicランク', 'keywords' => array( 'ランク' ) ),
		array( 'name' => 'faq', 'title' => 'よくあるご質問', 'keywords' => array( 'FAQ', '質問' ) ),
		array( 'name' => 'others', 'title' => 'その他キャンペーン', 'keywords' => array( 'その他' ) ),
		array( 'name' => 'groupservices', 'title' => '楽天グループサービス', 'keywords' => array( 'グループ' ) ),
		array( 'name' => 'top-section-price', 'title' => '料金プラン（トップセクション）', 'keywords' => array( '料金', 'プラン', '診断', 'top-section-price' ) ),
		// バンドルプラン用（plan/bundle からブロック化）
		array( 'name' => 'top-section-overview', 'title' => 'バンドル：OVERVIEW', 'keywords' => array( 'バンドル', 'overview', '概要' ) ),
		array( 'name' => 'top-section-firstplaylists', 'title' => 'バンドル：FIRST PLAYLISTS', 'keywords' => array( 'バンドル', 'プレイリスト' ) ),
		array( 'name' => 'top-section-usage-steps', 'title' => 'バンドル：ご利用の流れ', 'keywords' => array( 'バンドル', '利用の流れ', 'usage steps' ) ),
		array( 'name' => 'top-section-upgrade', 'title' => 'バンドル：UPGRADE', 'keywords' => array( 'バンドル', 'アップグレード', 'upgrade' ) ),
		array( 'name' => 'top-section-faq', 'title' => 'バンドル：FAQ', 'keywords' => array( 'バンドル', 'FAQ', 'よくあるご質問' ) ),
		array( 'name' => 'top-section-scene', 'title' => 'バンドル：SCENE', 'keywords' => array( 'バンドル', 'scene', 'シーン', '利用シーン' ) ),
		array( 'name' => 'top-section-function-comparison', 'title' => 'バンドル：音楽配信サービス機能比較', 'keywords' => array( 'バンドル', '機能比較', '比較表' ) ),
	);
}

/**
 * 楽天ミュージック汎用セクションブロックを登録（block.json から読み込み）
 */
function rakutenmusic_register_rakuten_music_section_blocks() {
	$blocks = rakutenmusic_get_section_blocks();
	$blocks_path = get_template_directory() . '/blocks/';
	foreach ( $blocks as $b ) {
		$slug = isset( $b['name'] ) ? $b['name'] : '';
		if ( ! $slug ) {
			continue;
		}
		// キャンペーン・キャンペーンリスト・楽天グループサービス・その他キャンペーンは editor 付きで別途登録するためスキップ
		if ( in_array( $slug, array( 'campaign', 'campaign-list', 'groupservices', 'others' ), true ) ) {
			continue;
		}
		$path = $blocks_path . 'section-' . $slug;
		if ( file_exists( $path . '/block.json' ) ) {
			register_block_type( $path );
		}
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

add_action( 'init', 'rakutenmusic_register_rakuten_music_section_blocks' );

/**
 * ブロックに preview.png がある場合、インサーターのアイコンをその画像にする
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
	}
	return $args;
}
add_filter( 'register_block_type_args', 'rakutenmusic_block_type_args_preview_icon', 10, 2 );

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
 * ブロックエディターでキャンペーン・キャンペーンリスト・楽天グループサービス・その他キャンペーンのスクリプトを確実に読み込む
 */
function rakutenmusic_enqueue_campaign_list_block_editor_assets() {
	$screen = get_current_screen();
	if ( ! $screen || $screen->is_block_editor() !== true ) {
		return;
	}
	wp_enqueue_script( 'rakutenmusic-section-campaign-list-editor' );
	wp_enqueue_style( 'rakutenmusic-section-campaign-list-editor-style' );
	wp_enqueue_script( 'rakutenmusic-section-campaign-editor' );
	wp_enqueue_style( 'rakutenmusic-section-campaign-editor-style' );
	wp_enqueue_script( 'rakutenmusic-section-groupservices-editor' );
	wp_enqueue_style( 'rakutenmusic-section-groupservices-editor-style' );
	wp_enqueue_script( 'rakutenmusic-section-others-editor' );
	wp_enqueue_style( 'rakutenmusic-section-others-editor-style' );
}
add_action( 'enqueue_block_editor_assets', 'rakutenmusic_enqueue_campaign_list_block_editor_assets', 15 );

/**
 * ブロックエディター用「楽天ミュージック」カテゴリを追加
 *
 * @param array $categories ブロックカテゴリ配列
 * @return array
 */
function rakutenmusic_block_categories( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'rakutenmusic',
				'title' => '楽天ミュージック',
				'icon'  => null,
			),
		),
		$categories
	);
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
 * ブロックエディターでセクションブロックをクライアント登録（インサーターに表示するため必須）
 * 各ブロックフォルダに preview.png を置くとインサーターのプレビューに表示される
 */
function rakutenmusic_enqueue_block_editor_assets() {
	$blocks = rakutenmusic_get_section_blocks();
	$json   = wp_json_encode( $blocks, JSON_UNESCAPED_UNICODE );
	$b64    = base64_encode( $json );

	$preview_urls = rakutenmusic_get_block_preview_urls();
	$preview_json = wp_json_encode( $preview_urls, JSON_UNESCAPED_SLASHES );
	// インライン内で確実に参照できるよう URL を直接埋め込む（ローカルライズの読み込み順に依存しない）
	$inline  = 'window.rakutenmusicBlockPreviewUrls={urls:' . $preview_json . '};';
	$inline .= 'var _r=function(){var w=window.wp;if(!w||!w.blocks||!w.element)return;var u=w.blockEditor&&w.blockEditor.useBlockProps,r=w.blocks.registerBlockType,e=w.element.createElement,useEffect=w.element.useEffect;var raw=atob("' . $b64 . '"),s;try{s=new TextDecoder("utf-8").decode(new Uint8Array([].map.call(raw,function(c){return c.charCodeAt(0);})));}catch(_){s=decodeURIComponent(escape(raw));}var d;try{d=JSON.parse(s);}catch(err){return;}';
	$inline .= 'var previewUrls=(window.rakutenmusicBlockPreviewUrls&&window.rakutenmusicBlockPreviewUrls.urls)||{};';
	$inline .= 'function PreviewEdit(r){var blockTitle=r.blockTitle,previewUrl=r.previewUrl,props=r.props;if(useEffect&&props.attributes.__preview){useEffect(function(){props.setAttributes({__preview:false});},[]);}if(props.attributes.__preview&&previewUrl){return e("img",{src:previewUrl,alt:blockTitle,style:{width:"100%",maxHeight:"200px",objectFit:"cover",display:"block"}});}var o={className:"rakutenmusic-section-placeholder",style:{padding:"16px",background:"#f0f0f0",border:"1px dashed #999",borderRadius:"4px",textAlign:"center"}};var p=u?u(o):o;return e("div",p,e("strong",null,blockTitle));}';
	$inline .= 'd.forEach(function(b){try{var blockName="rakutenmusic/rakuten-music-section-"+b.name;var previewUrl=previewUrls[blockName]||null;r(blockName,{title:"[楽天ミュージック] "+b.title,category:"rakutenmusic",keywords:["楽天","ミュージック"].concat(b.keywords||[]),icon:previewUrl?{src:previewUrl}:"align-wide",description:"楽天ミュージック: "+b.title,attributes:{__preview:{type:"boolean",default:false}},example:{attributes:{__preview:true}},edit:function(props){return e(PreviewEdit,{blockTitle:b.title,previewUrl:previewUrl,props:props});},save:function(){return null;}});}catch(err){}});};';
	$inline .= 'if(window.wp&&window.wp.blocks)_r();else document.addEventListener("DOMContentLoaded",_r);';

	wp_add_inline_script( 'wp-blocks', $inline, 'after' );
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
	$visible    = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_visible', true );
	$text       = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_text', true );
	$text_line2 = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_text_line2', true );
	$font_size  = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_font_size', true );
	$color      = get_post_meta( $post->ID, 'rakutenmusic_floating_cta_color', true );
	if ( $visible === '' ) {
		$visible = $defaults['visible'];
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
		<label for="rakutenmusic_fcta_text"><?php esc_html_e( 'ボタンの文字（1行目）', 'rakutenmusic-theme' ); ?></label>
		<input type="text" id="rakutenmusic_fcta_text" name="rakutenmusic_floating_cta_text" value="<?php echo esc_attr( $text ); ?>" class="widefat" placeholder="<?php echo esc_attr( $defaults['text'] ); ?>" />
	</p>
	<p>
		<label for="rakutenmusic_fcta_text_line2"><?php esc_html_e( '補足テキスト（※楽天会員...の部分）', 'rakutenmusic-theme' ); ?></label>
		<input type="text" id="rakutenmusic_fcta_text_line2" name="rakutenmusic_floating_cta_text_line2" value="<?php echo esc_attr( $text_line2 ); ?>" class="widefat" placeholder="※楽天会員ログインに遷移します" />
	</p>
	<p>
		<label for="rakutenmusic_fcta_font_size"><?php esc_html_e( 'フォントサイズ（px）', 'rakutenmusic-theme' ); ?></label>
		<input type="number" id="rakutenmusic_fcta_font_size" name="rakutenmusic_floating_cta_font_size" value="<?php echo esc_attr( $font_size ); ?>" class="small-text" min="10" max="32" step="1" />
	</p>
	<p>
		<label for="rakutenmusic_fcta_color"><?php esc_html_e( 'ボタンの色', 'rakutenmusic-theme' ); ?></label>
		<input type="text" id="rakutenmusic_fcta_color" name="rakutenmusic_floating_cta_color" value="<?php echo esc_attr( $color ); ?>" class="widefat" placeholder="#bf0000" />
	</p>
	<script>
	(function(){
		var w = document.getElementById('rakutenmusic_fcta_wrapper');
		if(!w) return;
		var postId = w.getAttribute('data-post-id');
		var ajaxUrl = w.getAttribute('data-ajax-url');
		var nonce = w.getAttribute('data-nonce');
		var visibleEl = document.getElementById('rakutenmusic_fcta_visible');
		var textEl = document.getElementById('rakutenmusic_fcta_text');
		var text2El = document.getElementById('rakutenmusic_fcta_text_line2');
		var fontSizeEl = document.getElementById('rakutenmusic_fcta_font_size');
		var colorEl = document.getElementById('rakutenmusic_fcta_color');
		if(!visibleEl || !textEl || !colorEl || !ajaxUrl || !nonce || !postId) return;
		function save(){
			var fd = new FormData();
			fd.append('action','rakutenmusic_save_floating_cta_meta');
			fd.append('nonce',nonce);
			fd.append('post_id',postId);
			fd.append('visible', visibleEl.checked ? 'show' : 'hidden');
			fd.append('text', textEl.value || '');
			fd.append('text_line2', text2El ? text2El.value || '' : '');
			fd.append('font_size', fontSizeEl ? (fontSizeEl.value || '16') : '16');
			fd.append('color', colorEl.value || '');
			var xhr = new XMLHttpRequest();
			xhr.open('POST', ajaxUrl);
			xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
			xhr.send(fd);
		}
		visibleEl.addEventListener('change', save);
		textEl.addEventListener('input', function(){ clearTimeout(window._rakutenmusicFctaT); window._rakutenmusicFctaT = setTimeout(save, 500); });
		textEl.addEventListener('blur', save);
		if(text2El){ text2El.addEventListener('input', function(){ clearTimeout(window._rakutenmusicFctaT); window._rakutenmusicFctaT = setTimeout(save, 500); }); text2El.addEventListener('blur', save); }
		if(fontSizeEl){ fontSizeEl.addEventListener('change', save); fontSizeEl.addEventListener('input', function(){ clearTimeout(window._rakutenmusicFctaT); window._rakutenmusicFctaT = setTimeout(save, 500); }); }
		colorEl.addEventListener('input', function(){ clearTimeout(window._rakutenmusicFctaT); window._rakutenmusicFctaT = setTimeout(save, 500); });
		colorEl.addEventListener('blur', save);
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
	wp_send_json_success();
}
add_action( 'wp_ajax_rakutenmusic_save_floating_cta_meta', 'rakutenmusic_ajax_save_floating_cta_meta' );

/**
 * フローティングCTA用 投稿メタのデフォルト値
 */
function rakutenmusic_floating_cta_defaults() {
	return array(
		'visible'    => 'show',
		'text'       => 'いますぐ始める(無料)',
		'text_line2' => '※楽天会員ログインに遷移します', // 補足テキスト（.txt-small の文言）
		'font_size'  => '16',
		'color'      => '#bf0000',
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
	register_post_meta( 'page', 'rakutenmusic_floating_cta_text', array_merge( $args, array( 'default' => $defaults['text'] ) ) );
	register_post_meta( 'page', 'rakutenmusic_floating_cta_text_line2', array_merge( $args, array( 'default' => $defaults['text_line2'] ) ) );
	register_post_meta( 'page', 'rakutenmusic_floating_cta_font_size', array_merge( $args, array( 'default' => $defaults['font_size'] ) ) );
	register_post_meta( 'page', 'rakutenmusic_floating_cta_color', array_merge( $args, array( 'default' => $defaults['color'] ) ) );
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
	$defaults  = rakutenmusic_floating_cta_defaults();
	$page_id   = get_queried_object_id();
	$visible   = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_visible', true ) : '';
	$text      = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_text', true ) : '';
	$text_line2 = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_text_line2', true ) : '';
	$font_size  = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_font_size', true ) : '';
	$color      = $page_id ? get_post_meta( $page_id, 'rakutenmusic_floating_cta_color', true ) : '';

	$visible = ( $visible === 'show' || $visible === '1' );
	$text    = $text !== '' ? $text : $defaults['text'];
	// 補足テキスト：空白の場合はキャプションを出さない
	$caption = $text_line2 !== '' ? $text_line2 : '';
	$font_size  = $font_size !== '' ? absint( $font_size ) : (int) $defaults['font_size'];
	if ( $font_size < 10 || $font_size > 32 ) {
		$font_size = 16;
	}
	$color = $color !== '' ? sanitize_hex_color( $color ) : $defaults['color'];
	if ( ! $color ) {
		$color = $defaults['color'];
	}

	// 非表示のときは HTML を出さない（JS の inview が display を上書きするため）
	if ( ! $visible ) {
		return '';
	}

	$btn_style = sprintf( 'background-color: %s;', esc_attr( $color ) );
	$txt_style = sprintf( 'font-size: %dpx;', $font_size );

	ob_start();
	?>
  <div class="floating-cta-button">
    <div id="cta-btn-txt" class="btn-apply">
      <a class="trial-btn" href="https://member.music.rakuten.co.jp/mypage" target="_blank" data-ratid="trial-btn-floating" data-ratevent="click" data-ratparam="all" style="<?php echo esc_attr( $btn_style ); ?>">
        <div class="cta-btn-txt" style="<?php echo esc_attr( $txt_style ); ?>">
		<span class="txt"><?php echo esc_html( $text ); ?></span>
		<?php if ( $caption !== '' ) : ?><span class="txt-small"><?php echo esc_html( $caption ); ?></span><?php endif; ?></div>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.707 1.76709L5 2.47409L10.793 8.26709L5 14.0601L5.707 14.7671L12.207 8.26709L5.707 1.76709Z" fill="white"></path></svg>
      </a>
      <a class="iap-store-link is-hidden" href="https://music.rakuten.co.jp/link/app/app_inflow.html" target="_blank" data-ratid="download-btn-floating" data-ratevent="click" data-ratparam="all" style="<?php echo esc_attr( $btn_style ); ?>">
        <span class="txt">アプリをダウンロード</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.707 1.76709L5 2.47409L10.793 8.26709L5 14.0601L5.707 14.7671L12.207 8.26709L5.707 1.76709Z" fill="white"></path></svg>
      </a>
    </div>
  </div>
  <script type="text/javascript" src="<?php echo esc_url( $t ); ?>/assets/common/js/jquery.inview.min.js"></script>
  <script>
    (function($){$(function(){ $(".l-footer").on("inview",function(e,isInView){ $("#page .floating-cta-button").toggle(!isInView); }); }); })(window.jQuery);
  </script>
	<?php
	return ob_get_clean();
}
