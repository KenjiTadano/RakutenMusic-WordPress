
$(function(){
    var featureBtn = $('#aboutArea02 ul.btnArea li');
    var areaInner = $('#aboutArea02 .areaInner');
    var textArea = $('#aboutArea02 .txtArea');
    var closeBtn = $('#aboutArea02 .feature-close');
    featureBtn.on('click',function(){
        featureBtn.children('a').removeClass('hover');
        textArea.children('li').css('display','none');
        var index = featureBtn.index(this);
        featureBtn.eq(index).children('a').addClass('hover');
        areaInner.fadeIn('fast',function(){
            textArea.fadeIn('fast',function(){
                textArea.children('li').eq(index).fadeIn('fast');
                closeBtn.fadeIn('fast');
            });
        });
    });
    areaInner.on('click',btnClose);
    closeBtn.on('click',btnClose);
    function btnClose(){
        closeBtn.fadeOut('fast');
        featureBtn.children('a').removeClass('hover');
        textArea.children('li').css('display','none');
        areaInner.fadeOut('fast');
    }
});
