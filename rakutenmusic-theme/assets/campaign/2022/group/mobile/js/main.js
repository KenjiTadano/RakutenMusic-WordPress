$(function () {
    $('.l-content').fadeIn('slow');

    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('msie') != -1 ||
        userAgent.indexOf('trident') != -1) {
        $('#page #campaign-wrapper .heading--m').addClass('ie');
        $('#ie-hidden').remove();
    }

    $('.myplaylist-creation').on('inview', function (isInView) {
        if (isInView) {
            $(this).slick({
                dots: true,
                infinite: false,
                autoplay: false,
                adaptiveHeight: true
            });
            $(this).off("inview");
        }
    });
    $('section.s-campaign-detail tr').addClass('is-open');
});