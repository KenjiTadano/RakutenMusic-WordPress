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

    // お試しボタン削除
    if (_UA.indexOf('App-') > -1) {
        $('.chain-offer-ddt_cta_btn').after('<div class="chain-offer-ddt_cta_btn_disabled">このアプリ経由では<br>お申し込みいただけません</div>').remove();
        $('.chain-offer-ddt_conversion_btn').after('<div class="chain-offer-ddt_conversion_btn_disabled">このアプリ経由では<br>お申し込みいただけません</div>').remove();
    }
});