$(function () {

    var ccmPageListTitle = $('.ccm-page-list-title');
    var ccmPageListDescription = $('.ccm-page-list-description');

    ccmPageListDescription.remove();

    for (var i = 0; i < ccmPageListTitle.length; i++) {
        ccmPageListTitle.eq(i).children('a').html('<img src="https://music.r10s.jp/external/prod/assets' + ccmPageListTitle.eq(i).children('a').attr('href') + 'img/ogp.jpg" alt="' + ccmPageListTitle.eq(i).children('a').text() + '">')
    }

});