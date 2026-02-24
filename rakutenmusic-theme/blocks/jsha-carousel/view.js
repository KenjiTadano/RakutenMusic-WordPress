/**
 * ジャケ写カルーセル：Slick 初期化（フロント用）
 */
(function () {
  'use strict';
  if ( typeof jQuery === 'undefined' ) {
    return;
  }
  var $ = jQuery;
  function init() {
    $( '.jsha-carousel' ).not( '.slick-initialized' ).slick( {
      slidesToShow: 19,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 1,
            infinite: true,
          },
        },
      ],
    } );
  }
  if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', init );
  } else {
    init();
  }
})();
