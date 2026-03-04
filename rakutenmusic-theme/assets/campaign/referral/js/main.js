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
