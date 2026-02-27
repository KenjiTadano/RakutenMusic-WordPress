$(function () {
  // ジャケ写カルーセル（未初期化のもののみ）
  $(".jsha-carousel").not(".slick-initialized").slick({
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
  });
});
