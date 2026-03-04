$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');
    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('display-none');
        } else {
            $('#page #sticky-apply-btn').removeClass('display-none');
        }
    });

    $('.soundjoy-campaign-steps--entry').slick({
        infinite: false
    });
});