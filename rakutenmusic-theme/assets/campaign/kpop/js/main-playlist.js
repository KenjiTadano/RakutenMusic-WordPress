$(function () {
    $('.selected_songs--list').on('inview', function (event, isInView) {
        if (isInView) {
            $(this).slick({
                autoplay: false,
                autoplaySpeed: 60000,
                dots: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1300,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        }
    });
});