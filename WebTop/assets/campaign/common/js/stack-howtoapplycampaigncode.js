$(function () {
    function codeStepsSlickSlider() {
        $('.campaign-code-steps').slick({
            autoplay: false,
            infinite: false,
            dots: true,
            arrows: true,
            slidesToShow: 3,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }

                }
            ]
        });
    }

    codeStepsSlickSlider();

});