//API
(function ($) {

    //CD
    $.ajax({
        scriptCharset: 'utf-8',
        url: [
            'https://app.rakuten.co.jp/services/api/BooksCD/Search/20170404?',
            'applicationId=books_20140611',
            'artistName=EXILE',
            'booksGenreId=002',
            'hits=10',
            'availability=1',
            'sort=sales',
        ].join('&'),
        dataType: 'jsonp',
        success: rankingCallBack,
        error: showError
    });

    function rankingCallBack(data) {

        scope = $('#page #cd-ranking .item-list .item__list');
        scope.empty();

        for (var i in data.Items) {

            smallImageUrl = data.Items[i].Item.smallImageUrl;
            smallImageUrl = smallImageUrl.split('64x64').join('200x200');
            title = data.Items[i].Item.title;
            title = title.split('?').join('～');
            artistName = data.Items[i].Item.artistName; //アーティスト名(CD、DVD)
            artistName = String(artistName); //アーティスト名(CD、DVD)
            itemPrice = data.Items[i].Item.itemPrice;
            itemPrice = itemPrice.toLocaleString();
            itemUrl = data.Items[i].Item.itemUrl;

            rank = Number(i) + 1;

            if (rank > 4) {
                temp = '<li class="item__card js-toggle__target">';
            } else {
                temp = '<li class="item__card">';
            }

            scope.append([temp,
                '<figure class="item__card__image">',
                '<a href="' + itemUrl + '">',
                '<img src="' + smallImageUrl + '" alt="' + title + '">',
                '</a>',
                '<figcaption class="item__card__title">',
                '<a href="' + itemUrl + '">' + title + '</a>',
                '<p>' + artistName + '</p>',
                '<p>' + itemPrice + '円(税込) <b>送料無料</b></p>',
                '</figcaption>',
                '</figure>',
                '</li>'
            ].join(''));

        } //for
    } //function

    //DVD
    $.ajax({
        scriptCharset: 'utf-8',
        url: [
            'https://app.rakuten.co.jp/services/api/BooksDVD/Search/20170404?',
            'applicationId=books_20140611',
            'artistName=EXILE',
            'booksGenreId=003',
            'hits=10',
            'availability=1',
            'sort=sales',
        ].join('&'),
        dataType: 'jsonp',
        success: rankingCallBack02,
        error: showError
    });


    function rankingCallBack02(data) {

        scope = $('#page #dvd-ranking .item-list .item__list');
        scope.empty();

        for (var i in data.Items) {

            smallImageUrl = data.Items[i].Item.smallImageUrl;
            smallImageUrl = smallImageUrl.split('64x64').join('200x200');
            title = data.Items[i].Item.title;
            title = title.split('?').join('～');
            artistName = data.Items[i].Item.artistName; //アーティスト名(CD、DVD)
            artistName = String(artistName); //アーティスト名(CD、DVD)
            itemPrice = data.Items[i].Item.itemPrice;
            itemPrice = itemPrice.toLocaleString();
            itemUrl = data.Items[i].Item.itemUrl;

            rank = Number(i) + 1;

            if (rank > 4) {
                temp = '<li class="item__card js-toggle__target">';
            } else {
                temp = '<li class="item__card">';
            }

            scope.append([temp,
                '<figure class="item__card__image">',
                '<a href="' + itemUrl + '">',
                '<img src="' + smallImageUrl + '" alt="' + title + '">',
                '</a>',
                '<figcaption class="item__card__title">',
                '<a href="' + itemUrl + '">' + title + '</a>',
                '<p>' + artistName + '</p>',
                '<p>' + itemPrice + '円(税込) <b>送料無料</b></p>',
                '</figcaption>',
                '</figure>',
                '</li>'
            ].join(''));

        } //for
    } //function

    function showError() {
        scope = $('#page #cd-ranking .item-list .item__list,#page #dvd-ranking .item-list .item__list');
        scope.children().remove();
        scope.remove();
        return;
    }

})(jQuery);