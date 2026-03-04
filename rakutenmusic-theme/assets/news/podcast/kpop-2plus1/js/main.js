$(document).ready(function () {
    $('.gallery-item img').click(function () {
        // クリックされた写真のsrcを取得
        var src = $(this).attr('src');
        // オーバーレイに表示するためのimg要素にsrcを設定
        $('.overlay img').attr('src', src);
        // オーバーレイを表示
        $('.overlay').fadeIn();
    });

    // オーバーレイをクリックしたときの処理
    $('.overlay').click(function () {
        // オーバーレイを非表示
        $(this).fadeOut();
    });
});