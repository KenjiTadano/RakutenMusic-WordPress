$(function () {
    // 指定された要素を選択し、透明度を0に設定
    var $elements = $('#page #stack-section-reward .reward-mission-list > li .reward-mission-list-main i');

    // 中身を画像に差し替え
    $elements.html('<img src="/assets/reward/img/panda_coin.svg" alt="ポイントコイン">');

    // 画像が読み込まれたら透明度を1に変更
    $elements.find('img').on('load', function () {
        $(this).parent().css('opacity', '1'); // 透明度を1に変更するアニメーション（1000ミリ秒で実行）
    });

    $('.howtouse-steps').slick({
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
    });
});