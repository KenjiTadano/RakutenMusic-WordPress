$(function () {

    function howtogetCouponSliskSlider() {
        $('.howtoget').slick({
            autoplay: false,
            infinite: false,
            dots: true,
            arrows: true,
        });
    }

    // onLoad
    $(window).on('load', function () {
        howtogetCouponSliskSlider();
    })

});
