$(function () {
    $('.how-to-play').on('inview', function (event, isInView) {
        if (isInView) {
            $(this).slick({
                dots: false,
                infinite: false,
                autoplay: false,
                adaptiveHeight: true
            });
        }
    });

    $('.campaign-terms--step1').on('inview', function (event, isInView) {
        if (isInView) {
            $('.step-1-floating-banner').css('display', 'flex');
            $('.step-1-floating-banner').animate({ opacity: 1 }, 200, 'swing');
            console.log('visible');
        } else {
            $('.step-1-floating-banner').css('display', 'none');
            console.log('hide');
        }
    });



    $('.campaign-detail__table .js-toggle').addClass('is-open');
});