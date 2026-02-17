$(function () {
    // wrap with ol
    $("#page .ccm-page-list .ccm-page-list-description").remove();
    $("#page .ccm-page-list h3").wrap('<figure class="campaign__image">');
    $("#page .ccm-page-list h3").replaceWith(function () {
        $(this).replaceWith('<figcaption class="campaign__title">' + $(this).html() + '</figcaption>')
    });
    $("#page .ccm-page-list figure").wrap('<div class="campaign__card">');
    $("#page .ccm-page-list .campaign__card").wrap('<li class="campaign__item">');
    $("#page .ccm-page-list").replaceWith(function () {
        $(this).replaceWith('<ul class="campaign-list has-border">' + $(this).html() + '</ul>')
    });

    // get length of lists
    var pageList = $("#page .campaign__item");
    var listLength = pageList.length;
    var url;
    for (var i = 0; i < listLength; i++) {
        url = pageList.eq(i)[0].children[0].children[0].children[0].children[0].attributes[0].value;
        pageList.eq(i).children().children().prepend([
            '<a href="' + url + '">' +
            '<img src="//music.r10s.jp/external/prod/assets' + url + 'img/ogp.jpg" alt="">' +
            '</a>'
        ].join(""));
    }
});
