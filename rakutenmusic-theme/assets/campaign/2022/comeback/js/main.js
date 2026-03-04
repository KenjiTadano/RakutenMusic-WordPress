$(function () {

    var trialButton_header = $('.l-header .trial-button').html();
    var trialButton_body = $('.l-campaign-01 .trial-btn').html();
    var trialButton_sticky = $('.l-campaign-03 .trial-btn').html();

    var trialButton_header_result = trialButton_header.replace('初回30日間無料お試し', '30日間無料トライアル');
    var trialButton_body_result = trialButton_body.replace('初回30日間無料お試し', '30日間無料トライアル');
    var trialButton_sticky_result = trialButton_sticky.replace('初回30日間無料お試し', '30日間無料トライアル');

    $('.l-header .trial-button').html(trialButton_header_result);
    $('.l-campaign-01 .trial-btn').html(trialButton_body_result);
    $('.l-campaign-03 .trial-btn').html(trialButton_sticky_result);

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

    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('display-none');
        } else {
            $('#page #sticky-apply-btn').removeClass('display-none');
        }
    });
});