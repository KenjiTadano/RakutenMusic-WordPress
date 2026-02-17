//エンタメコンテンツスクロール
$(function () {
    $('.bu-cnp-bnr').on('inview', function (event, isInView) {
        if (isInView) {
            $('.bu-cnp-bnr').slick({
                dots: true,
                slidesToShow: 4,
                responsive: [
                    {
                        breakpoint: 768, // 画面幅が768px以下の場合
                        settings: {
                            dots: true,      // ナビゲーションドットを表示
                            arrows: true,    // 左右のナビゲーション矢印を表示
                            slidesToShow: 2, // 一度に表示するスライド数を2に変更
                            slidesToScroll: 1, // 1つずつスライド
                        }
                    }
                ]
            });
        }
    });
});