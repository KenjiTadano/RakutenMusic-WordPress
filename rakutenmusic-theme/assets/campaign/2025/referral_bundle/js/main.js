$(document).ready(function () {
    // ウィンドウの幅をチェックする関数
    function checkWidth() {
        var windowSize = $(window).width(); // ウィンドウの幅を取得

        // ウィンドウの幅が768px以下の場合
        if (windowSize <= 768) {
            // 指定されたセレクタの中身を新しいボタンで置き換える
            $('#page .l-header .btn-apply').html('<button onclick="return gtag_report_conversion(\'https://app.adjust.com/1qli8nuq\')" data-ratid="download-btn" data-ratevent="click" data-ratparam="all">アプリをダウンロード</button>');

        } else {
            $('#page .l-header .btn-apply a').attr('href', 'https://app.adjust.com/1qli8nuq').text('アプリをダウンロード');
        }
    }

    // ページ読み込み時とウィンドウサイズが変更された時にチェックを実行
    checkWidth(); // ページ読み込み時に実行
    $(window).resize(checkWidth); // ウィンドウサイズが変更された時に実行

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
});

document.addEventListener('DOMContentLoaded', function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    if (window.matchMedia('(min-width: 767px)').matches) {
        document.querySelectorAll('#page ul.referral-btn-list > li a').forEach(function (a) {
            // li.mail a に該当するリンクを処理から除外
            if (!a.closest('li.mail')) {
                a.addEventListener('click', function (e) {
                    e.preventDefault(); // リンクのデフォルト動作を無効にする
                });
            }
        });
    }
});

function changeTab(event, tabId) {
    // タブボタンのアクティブ状態を更新
    var i, tabcontent, tabbuttons;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }

    // クリックされたタブと関連するコンテンツを表示
    document.getElementById(tabId).style.display = "flex";
    event.currentTarget.className += " active";
}


