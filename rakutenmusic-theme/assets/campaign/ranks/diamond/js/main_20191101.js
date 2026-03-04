$(function () {
    $('#page #steps .l-inner > ol li .howtouse').slick({
        dots: true,
        infinite: false,
        arrows: true,
        adaptiveHeight: true,
        slidesToShow: 3,
        autoplay: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
})