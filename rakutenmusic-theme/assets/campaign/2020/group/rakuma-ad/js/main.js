$(function() {
    function howtogetCouponSliskSlider() {
        $('.howtoget').slick({
            infinite: false,
            dots: true,
            arrows: true,
        });
    }

    // onLoad
    $(window).on('load', function() {
        howtogetCouponSliskSlider();
    })


});