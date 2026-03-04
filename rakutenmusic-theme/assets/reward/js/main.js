/**
 * リワードページ用: HOW TO USE カルーセル（Slick）の初期化
 * 依存: jquery, rakutenmusic-slick
 */
(function () {
	'use strict';
	if ( typeof jQuery === 'undefined' ) {
		return;
	}
	var $ = jQuery;

	function initHowtouseSlick() {
		var $el = $( '.howtouse-steps' ).not( '.slick-initialized' );
		if ( ! $el.length ) {
			return false;
		}
		if ( typeof $.fn.slick !== 'function' ) {
			return false;
		}
		$el.slick( {
			slidesToShow: 3,
			arrows: true,
			infinite: false,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1
					}
				}
			]
		} );
		return true;
	}

	function run() {
		if ( initHowtouseSlick() ) {
			return;
		}
		// ブロックが遅延描画される場合に備え、短い間隔で数回リトライ
		var attempts = 0;
		var maxAttempts = 20;
		var id = setInterval( function () {
			if ( initHowtouseSlick() || attempts >= maxAttempts ) {
				clearInterval( id );
			}
			attempts += 1;
		}, 150 );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', run );
	} else {
		run();
	}
})();
