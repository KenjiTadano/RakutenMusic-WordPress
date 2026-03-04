$(function () {
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

    $('.semifinalist-slider').slick({
        slidesToShow: 8,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4
                }
            }
        ]
    });

    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-btn').addClass('is-hidden');
        } else {
            $('#page #sticky-btn').removeClass('is-hidden');
        }
    });

    const today = new Date();
    const target = new Date(2023, 0, 9, 23, 59);
    const remainTime = target - today;
    const difDay = Math.floor(remainTime / 1000 / 60 / 60 / 24);
    $('.countdown--date--num').text(difDay);


});