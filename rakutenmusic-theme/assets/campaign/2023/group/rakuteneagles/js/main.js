$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    $("#page .l-content .btn-apply a.trial-btn").text("楽天ミュージックに申し込む");

    // *****
    // トライアルボタンの注釈修正
    // *****
    var $targetElement = $("#page .l-content .btn-apply p.btn-apply--caption");

    // テキストの中の「※無料トライアル終了後」を「※新規入会の方は無料トライアル終了後」に置換
    $targetElement.html(function (index, oldHtml) {
        var newHtml = oldHtml.replace('※無料トライアル終了後', '※新規入会の方は無料トライアル終了後');
        return newHtml + "<br>※再入会の方もご参加いただけます。";
    });


    // *****
    // copy campaign code
    // *****
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