$(function () {
    $('.readmore').on('click', function () {
        $('#page #introduction .l-inner .about-song > div p').css('height', 'initial')
        $(this).remove();
    })

    $('#howtobox .l-inner > div ul').slick({
        arrows: true,
        dots: true
    })
})