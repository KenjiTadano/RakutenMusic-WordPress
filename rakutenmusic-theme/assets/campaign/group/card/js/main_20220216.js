$(function () {
    $('.l-content').fadeIn('slow');
    $('.campaign-detail__table .js-toggle').addClass('is-open');
    $('#page #sticky-apply-btn .trial-btn a').text('初回30日間無料お試し');

    // ie hidden
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('msie') != -1 ||
        userAgent.indexOf('trident') != -1) {
        $('#ie-hidden').remove();
    }

    // copy campaign code
    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('is-hidden--sp');
        } else {
            $('#page #sticky-apply-btn').removeClass('is-hidden--sp');
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