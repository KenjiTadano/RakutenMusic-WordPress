$(function () {
    $('.playback-steps').slick({
        infinite: false,
        dots: false,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: true
                }
            }
        ]
    });
});