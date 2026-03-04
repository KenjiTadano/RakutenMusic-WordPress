$(function () {
    $('.rank-01-about--step-03--screenshots').on('inview', function (event, isInView) {
        if (isInView) {
            if ($(window).width() < 767) {
                $('.rank-01-about--step-03--screenshots').slick({
                    arrows: true,
                    dots: true,
                    infinite: false
                });
            }
        }
    });

    $('.rank-03-faq--step-01--screenshots').on('inview', function (event, isInView) {
        if (isInView) {
            if ($(window).width() < 767) {
                $('.rank-03-faq--step-01--screenshots').slick({
                    arrows: true,
                    dots: true,
                    infinite: false
                });
            }
        }
    });

    $('.question').click(function () {
        $(this).next().slideToggle(200);
        $(this).children('i').eq(1).toggleClass('open');
    });
});