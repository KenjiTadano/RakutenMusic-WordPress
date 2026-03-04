$('.scroll').on('click',function(){
    var navHeight = $('header').height();
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top-navHeight;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
});