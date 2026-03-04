$(function () {
    // $('#page #sticky-apply-btn .trial-btn a').text('初回60日間無料お試し');
    // $('#page section#ad-point-steps .l-inner .white-wrapper .trial-btn a').text('初回60日間無料お試しをはじめる');
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('display-none');
        } else {
            $('#page #sticky-apply-btn').removeClass('display-none');
        }
    });

    var clipboard = new ClipboardJS('.btn-copy-code');

    clipboard.on('success', function (e) {
        alert('キャンペーンコードをコピーしました。無料トライアルへお進みください。');
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