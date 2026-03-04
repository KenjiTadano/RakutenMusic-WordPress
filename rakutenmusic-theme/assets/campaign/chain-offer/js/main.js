$(function () {
    $('.l-content').fadeIn('slow');
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    // copy campaign code
    var clipboard = new ClipboardJS('.btn-copy-code');

    clipboard.on('success', function (e) {
        alert('キャンペーンコードをコピーしました。初回30日間無料お試しへお進みください。');
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