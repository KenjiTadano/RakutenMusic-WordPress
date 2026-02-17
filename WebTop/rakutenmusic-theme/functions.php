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
		array( 'name' => 'feature', 'title' => '便利な機能', 'keywords' => array( '機能' ) ),
		array( 'name' => 'price', 'title' => '料金プラン', 'keywords' => array( '料金', 'プラン', 'stack-section-price' ) ),
		array( 'name' => 'reward', 'title' => 'リワード', 'keywords' => array( 'リワード', 'ポイント', 'stack-section-reward' ) ),
		array( 'name' => 'rakutenmusicrank', 'title' => 'Rakuten Musicランク', 'keywords' => array( 'ランク' ) ),
		array( 'name' => 'faq', 'title' => 'よくあるご質問', 'keywords' => array( 'FAQ', '質問' ) ),
		array( 'name' => 'others', 'title' => 'その他キャンペーン', 'keywords' => array( 'その他' ) ),
		array( 'name' => 'groupservices', 'title' => '楽天グループサービス', 'keywords' => array( 'グループ' ) ),
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
		$path = $blocks_path . 'section-' . $slug;
		if ( file_exists( $path . '/block.json' ) ) {
			register_block_type( $path );
		}
	}
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
	return $html;
}

add_action( 'init', 'rakutenmusic_register_rakuten_music_section_blocks' );

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
 * ブロックエディターでセクションブロックをクライアント登録（インサーターに表示するため必須）
 * データを base64 で渡し、全角括弧などでスクリプトが壊れないようにする（トップFV・コスパ最強が表示されない対策）
 */
function rakutenmusic_enqueue_block_editor_assets() {
	$blocks = rakutenmusic_get_section_blocks();
	$json   = wp_json_encode( $blocks, JSON_UNESCAPED_UNICODE );
	$b64    = base64_encode( $json );

	$inline  = 'var _r=function(){var w=window.wp;if(!w||!w.blocks||!w.element)return;var u=w.blockEditor&&w.blockEditor.useBlockProps,r=w.blocks.registerBlockType,e=w.element.createElement;var raw=atob("' . $b64 . '"),s;try{s=new TextDecoder("utf-8").decode(new Uint8Array([].map.call(raw,function(c){return c.charCodeAt(0);})));}catch(_){s=decodeURIComponent(escape(raw));}var d;try{d=JSON.parse(s);}catch(e){return;}';
	$inline .= 'd.forEach(function(b){try{r("rakutenmusic/rakuten-music-section-"+b.name,{title:"[楽天ミュージック] "+b.title,category:"rakutenmusic",keywords:["楽天","ミュージック"].concat(b.keywords||[]),icon:"align-wide",description:"楽天ミュージック: "+b.title,';
	$inline .= 'edit:function(){var o={className:"rakutenmusic-section-placeholder",style:{padding:"16px",background:"#f0f0f0",border:"1px dashed #999",borderRadius:"4px",textAlign:"center"}};var p=u?u(o):o;return e("div",p,e("strong",null,b.title));},save:function(){return null;}});}catch(err){}});};';
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
