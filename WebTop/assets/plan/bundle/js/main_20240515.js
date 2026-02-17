$(document).ready(function () {
    // ウィンドウの幅をチェックする関数
    function checkWidth() {
        var windowSize = $(window).width(); // ウィンドウの幅を取得

        // ウィンドウの幅が768px以下の場合
        if (windowSize <= 768) {
            // 指定されたセレクタの中身を新しいボタンで置き換える
            $('#page .l-header .btn-apply').html('<button onclick="return gtag_report_conversion(\'https://app.adjust.com/1aqkqyt4\')" data-ratid="download-btn" data-ratevent="click" data-ratparam="all">アプリをダウンロード</button>');

        } else {
            $('#page .l-header .btn-apply a').attr('href', 'https://app.adjust.com/1aqkqyt4').text('アプリをダウンロード');
        }
    }

    // ページ読み込み時とウィンドウサイズが変更された時にチェックを実行
    checkWidth(); // ページ読み込み時に実行
    $(window).resize(checkWidth); // ウィンドウサイズが変更された時に実行

    $('.usage-item').click(function () {
        $(this).find('.usage-answer').slideToggle(200);
        $(this).find('i').toggleClass('close');
    });

    $('#page .l-content .btn-default-light a.trial-btn').text('初回30日間無料でアップグレード版を試す');

    // ジャケ写カルーセル
    $('.jsha-carousel').slick({
        slidesToShow: 19,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    });
});

