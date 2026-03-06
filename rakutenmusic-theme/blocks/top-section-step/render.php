<?php
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return '';
}
ob_start();
$attrs = $block->attributes ? $block->attributes : array();
$summary_h3         = isset( $attrs['summaryH3'] ) ? $attrs['summaryH3'] : 'キャンペーンコードを入力すると<br><strong>初回30日間無料 → 90日間無料に!</strong>';
$summary_h3_fs      = isset( $attrs['summaryH3FontSize'] ) && $attrs['summaryH3FontSize'] !== '' ? $attrs['summaryH3FontSize'] : '';
$summary_h3_color   = isset( $attrs['summaryH3Color'] ) && $attrs['summaryH3Color'] !== '' ? $attrs['summaryH3Color'] : '';
$summary_h3_strong  = isset( $attrs['summaryH3StrongColor'] ) && $attrs['summaryH3StrongColor'] !== '' ? $attrs['summaryH3StrongColor'] : '';
$summary_h3_weight  = isset( $attrs['summaryH3FontWeight'] ) && $attrs['summaryH3FontWeight'] !== '' ? $attrs['summaryH3FontWeight'] : '';
$code_text          = isset( $attrs['codeText'] ) ? $attrs['codeText'] : 'gakusei90';

$h3_style = array();
if ( $summary_h3_fs ) {
	$h3_style[] = 'font-size:' . esc_attr( $summary_h3_fs );
}
if ( $summary_h3_color ) {
	$h3_style[] = 'color:' . esc_attr( $summary_h3_color );
}
if ( $summary_h3_weight ) {
	$h3_style[] = 'font-weight:' . esc_attr( $summary_h3_weight );
}
$h3_style_str = implode( ';', $h3_style );
$wrapper_style = ( $summary_h3_strong ) ? '--summary-h3-strong-color:' . esc_attr( $summary_h3_strong ) : '';
?>
<section id="top-section-step" class="bg-light wp-block-rakutenmusic-top-section-step">
	<div class="bg-light-txt font-rakuten-b">STEP</div>
	<div class="ttl-group">
		<sub class="font-rakuten-b">STEP</sub>
		<h2>キャンペーン参加方法</h2>
	</div>
	<div class="summary-group" <?php echo $wrapper_style ? ' style="' . $wrapper_style . '"' : ''; ?>>
		<h3<?php echo $h3_style_str ? ' style="' . esc_attr( $h3_style_str ) . '"' : ''; ?>><?php echo wp_kses_post( $summary_h3 ); ?></h3>
		<div class="step-overview">
			<ul>
				<li>
					<p class="step-overview-number">STEP 1</p>
					<p class="txt">コードを<br class="is-hidden--pc">コピー</p>
				</li>
				<li>
					<p class="step-overview-number">STEP 2</p>
					<p class="txt">無料お試し</p>
				</li>
			</ul>
		</div>
	</div>
	<div class="multi-step">
		<h3>STEP 1</h3>
		<div class="multi-step-content">
			<p class="lead">キャンペーンコードをコピーして<br>STEP2へお進みください</p>
			<div class="ccode">
				<p class="txt">キャンペーンコード</p>
				<p class="code"><?php echo esc_html( $code_text ); ?></p>
			</div>
			<button type="button" class="btn-copy-code" data-clipboard-action="copy" data-clipboard-text="<?php echo esc_attr( $code_text ); ?>" data-ratid="codecopy-btn" data-ratevent="click" data-ratparam="all">コードをコピーする</button>
		</div>
	</div>
	<div class="multi-step">
		<h3>STEP 2</h3>
		<div class="multi-step-content display-block" role="toolbar">
			<p class="lead">無料トライアル終了後も引き続き<br>楽天ミュージックをお楽しみください</p>
			<div class="btn-apply">
				<a class="trial-btn" href="https://member.music.rakuten.co.jp/mypage" target="_blank" data-ratid="trial-btn" data-ratevent="click" data-ratparam="all">
					<span class="txt">無料トライアルをはじめる</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.707 1.76709L5 2.47409L10.793 8.26709L5 14.0601L5.707 14.7671L12.207 8.26709L5.707 1.76709Z" fill="white"></path></svg>
				</a>
				<a class="iap-store-link is-hidden" href="https://music.rakuten.co.jp/link/app/app_inflow.html" target="_blank" data-ratid="download-btn" data-ratevent="click" data-ratparam="all">
					<span class="txt">アプリをダウンロード</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.707 1.76709L5 2.47409L10.793 8.26709L5 14.0601L5.707 14.7671L12.207 8.26709L5.707 1.76709Z" fill="white"></path></svg>
				</a>
				<p class="btn-apply--caption">※無料トライアル終了後、<a href="https://music.faq.rakuten.net/s/detail/000005473" target="_blank">プラン料金</a>が発生します。<br>※無料トライアル期間中は無料で解約できます。<br>※再入会の方は、ただちにプラン料金が発生します。</p>
			</div>
		</div>
	</div>
</section>
<?php
return ob_get_clean();
