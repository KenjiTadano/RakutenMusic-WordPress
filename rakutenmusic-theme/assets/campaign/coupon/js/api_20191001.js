$(function () {
    $.ajax({
        scriptCharset: 'utf-8',
        url: [
            'https://24x7.app.rakuten.co.jp/engine/api/BooksTotal/Search/20170427?',
            'applicationId=books_20140611',
            'keyword=cd', //【タイムセール】を表示しないために検索ワードを指定
            'booksGenreId=002',
            'hits=30',
            'availability=1',
            'outOfStockFlag=0',
            'sort=sales',
            'field=0',
            'NGKeyword=%E3%80%90%E3%82%BF%E3%82%A4%E3%83%A0%E3%82%BB%E3%83%BC%E3%83%AB%E3%80%91' //【タイムセール】
        ].join('&'),
        dataType: 'jsonp',
        success: rankingCallBack,
        error: showError
    });

    function rankingCallBack(data) {

        scope = $('#page #items-cd .item-list .item__list');
        scope.empty();

        rank = 0;

        for (var i in data.Items) {

            itemPrice = data.Items[i].Item.itemPrice;

            if (itemPrice > 1500) { //1,500円以上の商品
                itemPrice = itemPrice.toLocaleString();
                itemUrl = data.Items[i].Item.itemUrl;
                smallImageUrl = data.Items[i].Item.smallImageUrl;
                smallImageUrl = smallImageUrl.split('64x64').join('200x200');
                title = data.Items[i].Item.title;
                title = title.split('?').join('～');
                artistName = data.Items[i].Item.artistName;
                artistName = String(artistName);
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
                        '<p>' + artistName + '</p>',
                        '<p>' + itemPrice + '円(税込) <b>送料無料</b></p>',
                        '</figcaption>',
                        '</figure>',
                        '</li>'
                    ].join(''));
                }
            } else {
                continue;
            }
        }
    }

    $.ajax({
        scriptCharset: 'utf-8',
        url: [
            'https://24x7.app.rakuten.co.jp/engine/api/BooksTotal/Search/20170427?',
            'applicationId=books_20140611',
            'keyword=dvd', //【タイムセール】を表示しないために検索ワードを指定
            'booksGenreId=003',
            'hits=30',
            'availability=1',
            'outOfStockFlag=0',
            'sort=sales',
            'field=0',
            'NGKeyword=%E3%80%90%E3%82%BF%E3%82%A4%E3%83%A0%E3%82%BB%E3%83%BC%E3%83%AB%E3%80%91' //【タイムセール】
        ].join('&'),
        dataType: 'jsonp',
        success: rankingCallBack02,
        error: showError
    });

    function rankingCallBack02(data) {

        scope = $('#page #items-dvd .item-list .item__list');
        scope.empty();

        rank = 0;

        for (var i in data.Items) {

            itemPrice = data.Items[i].Item.itemPrice;

            if (itemPrice > 1500) { //1,500円以上の商品
                itemPrice = itemPrice.toLocaleString();
                itemUrl = data.Items[i].Item.itemUrl;
                smallImageUrl = data.Items[i].Item.smallImageUrl;
                smallImageUrl = smallImageUrl.split('64x64').join('200x200');
                title = data.Items[i].Item.title;
                title = title.split('?').join('～');
                artistName = data.Items[i].Item.artistName;
                artistName = String(artistName);
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
                        '<p>' + artistName + '</p>',
                        '<p>' + itemPrice + '円(税込) <b>送料無料</b></p>',
                        '</figcaption>',
                        '</figure>',
                        '</li>'
                    ].join(''));
                }
            } else {
                continue;
            }
        }
    }

    $.ajax({
        scriptCharset: 'utf-8',
        url: [
            'https://24x7.app.rakuten.co.jp/engine/api/BooksTotal/Search/20170427?',
            'applicationId=books_20140611',
            'keyword=game', //【タイムセール】を表示しないために検索ワードを指定
            'booksGenreId=006',
            'hits=30',
            'availability=1',
            'outOfStockFlag=0',
            'sort=sales',
            'field=0',
            'NGKeyword=%E3%80%90%E3%82%BF%E3%82%A4%E3%83%A0%E3%82%BB%E3%83%BC%E3%83%AB%E3%80%91' //【タイムセール】
        ].join('&'),
        dataType: 'jsonp',
        success: rankingCallBack03,
        error: showError
    });

    function rankingCallBack03(data) {

        scope = $('#page #items-game .item-list .item__list');
        scope.empty();

        rank = 0;

        for (var i in data.Items) {

            itemPrice = data.Items[i].Item.itemPrice;

            if (itemPrice > 1500) { //1,500円以上の商品
                itemPrice = itemPrice.toLocaleString();
                itemUrl = data.Items[i].Item.itemUrl;
                smallImageUrl = data.Items[i].Item.smallImageUrl;
                smallImageUrl = smallImageUrl.split('64x64').join('200x200');
                title = data.Items[i].Item.title;
                title = title.split('?').join('～');
                label = data.Items[i].Item.label;//発売元名(CD、DVD、ゲーム、PC)
                label = String(label);//発売元名(CD、DVD、ゲーム、PC)
                hardware = data.Items[i].Item.hardware;//対応機種(ゲーム)
                hardware = String(hardware);//対応機種(ゲーム)

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
                        '<p>' + label + '</p>',
                        '<p>' + hardware + '</p>',
                        '<p>' + itemPrice + '円(税込) <b>送料無料</b></p>',
                        '</figcaption>',
                        '</figure>',
                        '</li>'
                    ].join(''));
                }
            } else {
                continue;
            }
        }
    }

    function showError() {
        scope = $('#page #items-cd .item-list .item__list , #page #items-dvd .item-list .item__list , #page #items-game .item-list .item__list');
        scope.next().remove();
        scope.remove();
        return;
    }

    function howtogetCouponSliskSlider() {
        $('.howtoget').slick({
            infinite: false,
            dots: true,
            arrows: true,
        });
    }

    function codeStepsSlickSlider() {
        $('.code-steps').slick({
            infinite: false,
            dots: true,
            arrows: true,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        centerMode: true,
                        slidesToShow: 1,
                    }

                }
            ]
        });
    }

    // onLoad
    $(window).on('load', function () {
        howtogetCouponSliskSlider();
        codeStepsSlickSlider()
    })


});
