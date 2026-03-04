$(function () {
    $('.anchor-links--sp select').change(function () {
        var speed = 200;
        var href = $(this).val();
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $('body,html').animate({
            scrollTop: position
        }, speed, 'swing');
        return false;
    });

    var heroText = $('#page .campaign-hero__schedule p').html();
    var result = heroText.replace('対象期間', 'nanaオーディション実施期間');
    $('#page .campaign-hero__schedule p').html(result);

});