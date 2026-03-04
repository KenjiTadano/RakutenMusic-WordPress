$(function () {
    $.ajax({
        scriptCharset: 'utf-8',
        url: [
            'https://24x7.app.rakuten.co.jp/engine/api/BooksTotal/Search/20170427?',
            'applicationId=books_20140611',
            'keyword=%e7%b5%b5%e6%9c%ac',
            'NGKeyword=%e3%80%90%e3%83%90%e3%83%bc%e3%82%b2%e3%83%b3%e6%9c%ac%e3%80%91',
            'outOfStockFlag=0',
            'field=0',
            'hits=6',
            'sort=sales',
            'availability=0',
            'booksGenreId=001003003'
        ].join('&'),
        dataType: 'jsonp',
        success: rankingCallBack,
        error: showError
    });

    function rankingCallBack(data) {

        scope = $('#page #items-ehon .item-list .item__list');
        scope.empty();

        rank = 0;

        for (var i in data.Items) {

            itemPrice = data.Items[i].Item.itemPrice;
            itemPrice = itemPrice.toLocaleString();
            itemUrl = data.Items[i].Item.itemUrl;
            smallImageUrl = data.Items[i].Item.smallImageUrl;
            smallImageUrl = smallImageUrl.split('64x64').join('200x200');
            title = data.Items[i].Item.title;
            title = title.split('?').join('～');
            author = data.Items[i].Item.author;//著者名(書籍、洋書)
            author = String(author);//著者名(書籍、洋書)
            rank++;

            if (rank > 4) {
                temp = '<li class="item__card js-toggle__target">';
            } else {
                temp = '<li class="item__card">';
            }

            if (rank < 11) {
                scope.append([temp,
                    '<figure class="item__card__image">',
                    '<a href="' + itemUrl + '">',
                    '<img src="' + smallImageUrl + '" alt="' + title + '">',
                    '</a>',
                    '<figcaption class="item__card__title">',
                    '<a href="' + itemUrl + '">' + title + '</a>',
                    '<p>' + author + '</p>',
                    '<p>' + itemPrice + '円(税込) <b>送料無料</b></p>',
                    '</figcaption>',
                    '</figure>',
                    '</li>'
                ].join(''));
            }
        }
    }



    function showError() {
        scope = $('#page #items-ehon .item-list .item__list');
        scope.next().remove();
        scope.remove();
        return;
    }

});
