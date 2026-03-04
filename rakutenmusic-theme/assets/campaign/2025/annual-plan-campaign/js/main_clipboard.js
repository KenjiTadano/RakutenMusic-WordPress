$(function () {
    // 免責open
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    // btn-copy-codeの設定
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