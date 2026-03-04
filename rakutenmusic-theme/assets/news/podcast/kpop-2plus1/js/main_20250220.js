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
// すべての「続きを読む」ボタンを取得
const moreBtns = document.querySelectorAll('.read_more');

moreBtns.forEach(moreBtn => {
    moreBtn.addEventListener('click', () => {
        // ボタンの直前にある要素（本文）を取得
        const prev = moreBtn.previousElementSibling;

        // active クラスを切り替え
        if (prev.classList.contains('active')) {
            prev.classList.remove('active');
            moreBtn.textContent = '続きを読む';
        } else {
            prev.classList.add('active');
            moreBtn.textContent = '閉じる';
        }
    });
});