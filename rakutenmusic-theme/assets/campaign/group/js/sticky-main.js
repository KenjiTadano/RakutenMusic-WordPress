$(function () {
    $('.l-content').fadeIn('slow');
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    if (window.innerWidth <= 768) {
        $('#page #sticky-apply-btn .btn-apply a.trial-btn').text('無料トライアル');
    }

    // copy campaign code
    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('is-hidden');
        } else {
            $('#page #sticky-apply-btn').removeClass('is-hidden');
        }
    });
});