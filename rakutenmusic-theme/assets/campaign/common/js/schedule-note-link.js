$(".campaign-hero__schedule__note").append('<a href='+"#cpn-detail"+' class='+"scroll"+'>詳細はこちら</a>');
$(document).on("click", ".campaign-hero__schedule__note a", function(){
    var navHeight = $('header') .height();
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - (navHeight + navHeight*0.5);
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
});