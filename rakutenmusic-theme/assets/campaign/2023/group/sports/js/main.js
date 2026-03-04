$(function () {
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
            $('#page #sticky-btn').addClass('is-hidden');
        } else {
            $('#page #sticky-btn').removeClass('is-hidden');
        }
    });

    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('is-hidden');
        } else {
            $('#page #sticky-apply-btn').removeClass('is-hidden');
        }
    });
});