$(document).ready(function () {
    const $storeList = $('#store-list');
    const $btnShops = $('a.btn-shops');
    const $btnClose = $('a.btn-close');
    const $storeListInner = $('.store-list-inner');

    // フェードイン
    function fadeIn(element) {
        element.css('display', 'flex').hide().fadeIn();
    }

    // フェードアウト
    function fadeOut(element) {
        element.fadeOut(function () {
            element.css('display', 'none');
        });
    }

    // btnShopsクリックイベント
    $btnShops.on('click', function (event) {
        event.preventDefault();
        fadeIn($storeList);
    });

    // btnCloseクリックイベント
    $btnClose.on('click', function (event) {
        event.preventDefault();
        fadeOut($storeList);
    });

    // storeList外側クリックイベント
    $storeList.on('click', function (event) {
        if (!$storeListInner.is(event.target) && $storeListInner.has(event.target).length === 0) {
            fadeOut($storeList);
        }
    });
});
