$(function () {
    $('#page #steps .howtouse').slick({
        infinite: false,
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
    })
})