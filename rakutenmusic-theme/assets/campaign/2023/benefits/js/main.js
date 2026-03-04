$(function () {

    // $('.trial_button_wrapper .trial-btn a').text('楽天ミュージックのお申し込み');
    // $('#sticky-apply-btn .trial-btn a').text('お申し込みはこちら');
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

    // $('.campaign-code-steps li')[0].children[1].children[0].setAttribute('src', '/assets/campaign/2023/benefits/img/howtouse_step_1.png');
    // var campaignCodeSteps1Text = $('.campaign-code-steps li')[0].children[2].innerHTML
    // $('.campaign-code-steps li')[0].children[2].innerHTML = campaignCodeSteps1Text.replace("初回30日間無料お試しをはじめる", "楽天ミュージックのお申し込み");

    $('.trial-period')[0].innerText = 90;

    // +++++++++++++++++++++++++++
    //   Copy Campaign Code
    // +++++++++++++++++++++++++++

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

    // +++++++++++++++++++++++++++
    //   Floating Button
    // +++++++++++++++++++++++++++

    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('display-none');
        } else {
            $('#page #sticky-apply-btn').removeClass('display-none');
        }
    });

    // +++++++++++++++++++++++++++
    //   IE Hidden
    // +++++++++++++++++++++++++++

    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('msie') != -1 ||
        userAgent.indexOf('trident') != -1) {
        $('#ie-hidden').remove();
    }

});