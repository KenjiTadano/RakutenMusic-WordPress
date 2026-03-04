$(function () {
    $('.l-content').fadeIn('slow');
    $('#page #sticky-apply-btn .trial-btn').text('楽天ミュージックのお申し込み');
    $('#page .btn-apply .trial-btn').text('楽天ミュージックのお申し込み');
    $('#page .resubscriber-benefit .trial-btn').text('楽天ミュージックのお申し込み');
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    $('.anchor-links--sp select').change(function () {
        var speed = 200;
        var href = $(this).val();
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $('body,html').animate({
            scrollTop: position
        }, speed, 'swing');
        return false;
    });

    $('.campaign-code-steps li')[0].children[1].children[0].setAttribute('src', '/assets/campaign/2023/benefits/img/howtouse_step_1.png');
    var campaignCodeSteps1Text = $('.campaign-code-steps li')[0].children[2].innerHTML
    $('.campaign-code-steps li')[0].children[2].innerHTML = campaignCodeSteps1Text.replace("無料トライアルをはじめる", "楽天ミュージックのお申し込み");

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
        alert('キャンペーンコードをコピーしました。楽天ミュージックのお申し込みへお進みください。');
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