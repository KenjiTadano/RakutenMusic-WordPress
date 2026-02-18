$(document).ready(function () {
    // ウィンドウの幅をチェックする関数
    function checkWidth() {
        var windowSize = $(window).width(); // ウィンドウの幅を取得

        // ウィンドウの幅が768px以下の場合
        if (windowSize <= 768) {
            // 指定されたセレクタの中身を新しいボタンで置き換える
            $('#page .l-header .btn-apply').html('<button onclick="return gtag_report_conversion(\'https://app.adjust.com/1eh1ok3d\')" data-ratid="download-btn" data-ratevent="click" data-ratparam="all">アプリをダウンロード</button>');

        } else {
            $('#page .l-header .btn-apply a').attr('href', 'https://app.adjust.com/1eh1ok3d').text('アプリをダウンロード');
        }
    }

    // ページ読み込み時とウィンドウサイズが変更された時にチェックを実行
    checkWidth(); // ページ読み込み時に実行
    $(window).resize(checkWidth); // ウィンドウサイズが変更された時に実行

    // $('.usage-item').click(function () {
    //     $(this).find('.usage-answer').slideToggle(200);
    //     $(this).find('i').toggleClass('close');
    // });

    $('.usage-item').each(function () {
        var $usageItem = $(this);

        $usageItem.click(function () {
            $usageItem.find('.usage-answer').slideToggle(200);
            $usageItem.find('i').toggleClass('close');
        });

        $usageItem.find('.btn-app-dl').click(function (event) {
            event.stopPropagation();
        });
    });

    $('.btn-app-dl-pc').on('click', function (event) {
        $('.app-dl-modal').css('display', 'flex').hide().fadeIn(); // .app-dl-modalをフェードインで表示
    });

    // モーダルの外側をクリックしたとき
    $('.app-dl-modal').on('click', function (event) {
        if ($(event.target).is('.app-dl-modal')) {
            $(this).fadeOut();
        }
    });

    // 閉じるボタンをクリックしたとき
    $('.btn-close').on('click', function () {
        $('.app-dl-modal').fadeOut();
    });

    $('#page .l-content .btn-default-light a.trial-btn .txt').text('アップグレード版を試す');

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

