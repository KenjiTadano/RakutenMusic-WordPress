$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    $('.renewal-point--mission').on('inview', function (event, isInView) {
        if (isInView) {
            $(this).slick({
                centerMode: true,
                slidesToShow: 1,
            });
        } else {
            $('.renewal-point--mission').off('inview');
        }
    });
})