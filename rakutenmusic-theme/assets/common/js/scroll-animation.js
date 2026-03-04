$('.scroll').on('click', function () {
    var navHeight = $('header').innerHeight();
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - navHeight;

    console.log(position);

    // ウィンドウの幅が768px以上の場合、positionに96pxを加える
    if (window.innerWidth >= 768) {
        position -= 96;
    }

    $("html, body").animate({ scrollTop: position }, speed, "swing");

    console.log(position);

    return false;
});
