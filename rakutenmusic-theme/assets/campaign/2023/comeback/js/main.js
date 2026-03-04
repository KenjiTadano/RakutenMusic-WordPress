$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    // #anchor-retry要素を取得
    var anchorRetry = document.querySelector("#anchor-retry");

    if (anchorRetry) {
        // #anchor-retry要素の隣接要素である.btn-applyを取得
        var btnApply = anchorRetry.nextElementSibling;

        if (btnApply) {
            // a.trial-btn要素の中のテキストを「楽天ミュージックをはじめる」に書き換える
            var trialBtn = btnApply.querySelector("a.trial-btn");
            if (trialBtn) {
                trialBtn.textContent = "楽天ミュージックをはじめる";
            }

            // p.btn-apply--caption要素の中のテキストを指定のテキストに書き換える
            var btnApplyCaption = btnApply.querySelector("p.btn-apply--caption");
            if (btnApplyCaption) {
                btnApplyCaption.innerHTML = "※アプリ内課金は対象外となります。<br>※再入会後、ただちに<a href=\"https://music.faq.rakuten.net/s/detail/000005473\" target=\"_blank\">プラン料金</a>が発生します。";
            }
        }
    }

    var clipboard = new ClipboardJS('.btn-copy-code');

    clipboard.on('success', function (e) {
        alert('キャンペーンコードをコピーしました。楽天ミュージックのお申込みへお進みください。');
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

});