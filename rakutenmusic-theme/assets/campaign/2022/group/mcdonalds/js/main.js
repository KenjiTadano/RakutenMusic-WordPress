$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');
    $('#page #sticky-apply-btn .trial-btn a').text('初回30日間無料お試し');

    // +++++++++++++++++++++++++++
    //   お試し Text Replacement
    // +++++++++++++++++++++++++++

    $(window).on('load resize', function () {
        var w = window.innerWidth;
        if (w >= 768) {
            $('#sticky-apply-btn .trial-btn a').text('初回30日間無料お試しをはじめる');
        } else {
            $('#sticky-apply-btn .trial-btn a').text('初回30日間無料お試し');
        }
    });

    // copy campaign code
    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('is-hidden');
        } else {
            $('#page #sticky-apply-btn').removeClass('is-hidden');
        }
    });

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