$(function(){
    var anim01 = $('.anim01');
    var anim02 = $('.anim02');
    var anim03 = $('.anim03');
    var scrollHeight = 0;    
    var animationFlag = false;
    var tl = new TimelineLite();
    tl.set(anim01, {scale:0})
      .set(anim02, {scale:0})
      .set(anim03, {scale:0});
    
    $(window).on('scroll',function(){
        scrollHeight = $(window).scrollTop();
        if(scrollHeight>500){
            if(!animationFlag){
                animationFlag = true;
                tl.to(anim01, 0.3, {scale:1, ease: Back.easeOut.config(1.7),})
                  .to(anim02, 0.3, {scale:1, ease: Back.easeOut.config(1.7),})
                  .to(anim03, 0.3, {scale:1, ease: Back.easeOut.config(1.7),onComplete: function(){
                      tl.to(anim03, 0.8, {rotation:-3, ease: Power0.easeNone,})
                        .to(anim03, 0.8, {rotation:3, yoyo:true, repeat: -1, ease: Power0.easeNone,});
                  }});
            }
        }
    });
});