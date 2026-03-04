$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    $('.cp-tokuten-img-caroucel').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 200,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
    });

    // リンクがクリックされたかどうかを追跡するフラグ
    var clicked = false;

    // クリックイベントを設定
    $('#view-add-to-mypage').on('click', function (event) {
        // リンクがまだクリックされていない場合
        if (!clicked) {
            $('.add-to-mypage-caroucel').removeClass('is-hidden');
            $('.add-to-mypage-caroucel').slick({
                infinite: false,
            });

            // フラグをセットして再クリックを防ぐ
            clicked = true;
        }

        // デフォルトの動作を防ぐ
        event.preventDefault();
    });

    if (_UA.indexOf('App-') > -1) {
        $('#btn-web-1').attr('href', 'r-music://?type=playlist&playlist_id=35121784');
        $('#btn-web-1 span').text('対象プレイリストをみる');
    }
});