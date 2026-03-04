$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('display-none');
        } else {
            $('#page #sticky-apply-btn').removeClass('display-none');
        }
    });

    $('#ttl-01-howtouse').on('inview', function (event, isInView) {
        $("#ttl-01-howtouse .steps").slick({
            infinite: false,
            autoplay: false,
            responsive: [
                {
                    breakpoint: 3000,
                    settings: "unslick",
                },
                {
                    breakpoint: 768,
                    settings: "slick",
                }
            ]
        });
        $(this).off('inview');
    });

    $('#ttl-02-campaign').on('inview', function (event, isInView) {
        $("#ttl-02-campaign .steps").slick({
            infinite: false,
            autoplay: false,
            responsive: [
                {
                    breakpoint: 3000,
                    settings: "unslick",
                },
                {
                    breakpoint: 768,
                    settings: "slick",
                }
            ]
        });
        $(this).off('inview');
    });
});