$(function () {

    $('.campaign-detail__table tr').addClass('is-open');

    $('.howtoget').on('inview', function (isInView) {
        if (isInView) {
            $(this).slick({
                dots: true,
                infinite: false,
                autoplay: false,
                adaptiveHeight: true
            });
            $(this).off("inview");
        }
    });

    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').hide();
        } else {
            $('#page #sticky-apply-btn').show();
        }
    });

    var clipboard = new ClipboardJS('.btn-copy-code');

    clipboard.on('success', function (e) {
        alert('キャンペーンコードをコピーしました。無料トライアルへお進みください。');
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

    $.ajax({
        scriptCharset: 'utf-8',
        url: [
            'https://rdc-api-catalog-gateway-api.rakuten.co.jp/books/search-items?sid=19',
            'hits=10',
            'stocks=10',
            'onSaleFlag=1',
            'genres=002',
            'sort=1',
            'adult=0',
            'priceFrom=1000'
        ].join('&'),
        dataType: 'json',
        success: rankingCallBack,
        error: showError
    });

    function rankingCallBack(data) {

        console.log(data);

        scope = $('#page #items-cd .item-list .item__list');
        scope.empty();

        rank = 0;

        for (var i in data.items) {

            itemPrice = data.items[i].selling_price_tax.toLocaleString();
            itemUrl = data.items[i].item_url;
            smallImageUrl = data.items[i].image_url;
            itemTitle = data.items[i].title;
            artistName = data.items[i].persons[0].person_name;

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
                    '<img src="' + smallImageUrl + '" alt="' + itemTitle + '">',
                    '</a>',
                    '<figcaption class="item__card__title">',
                    '<a href="' + itemUrl + '">' + itemTitle + '</a>',
                    '<p>' + artistName + '</p>',
                    '<p>' + itemPrice + '円(税込) <b>送料無料</b></p>',
                    '</figcaption>',
                    '</figure>',
                    '</li>'
                ].join(''));
            }
        }
    }

    $.ajax({
        scriptCharset: 'utf-8',
        url: [
            'https://rdc-api-catalog-gateway-api.rakuten.co.jp/books/search-items?sid=19',
            'fields=title,person_name,selling_price_tax,item_url,image_url',
            'hits=10',
            'stocks=10',
            'onSaleFlag=1',
            'genres=003',
            'sort=1',
            'adult=0',
            'priceFrom=1000'
        ].join('&'),
        dataType: 'json',
        success: rankingCallBack02,
        error: showError
    });

    function rankingCallBack02(data) {

        scope = $('#page #items-dvd .item-list .item__list');
        scope.empty();

        rank = 0;

        for (var i in data.items) {

            itemPrice = data.items[i].selling_price_tax.toLocaleString();
            itemUrl = data.items[i].item_url;
            smallImageUrl = data.items[i].image_url;
            itemTitle = data.items[i].title;
            artistName = data.items[i].persons[0].person_name;
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
                    '<img src="' + smallImageUrl + '" alt="' + itemTitle + '">',
                    '</a>',
                    '<figcaption class="item__card__title">',
                    '<a href="' + itemUrl + '">' + itemTitle + '</a>',
                    '<p>' + artistName + '</p>',
                    '<p>' + itemPrice + '円(税込) <b>送料無料</b></p>',
                    '</figcaption>',
                    '</figure>',
                    '</li>'
                ].join(''));
            }
        }
    }

    $.ajax({
        url: [
            'https://rdc-api-catalog-gateway-api.rakuten.co.jp/books/search-items?sid=19',
            'fields=title,person_name,selling_price_tax,item_url,image_url,maker,platform',
            'hits=10',
            'stocks=10',
            'onSaleFlag=1',
            'genres=006',
            'sort=1',
            'adult=0',
            'priceFrom=1000'
        ].join('&'),
        dataType: 'json',
        success: rankingCallBack03,
        error: showError
    });

    function rankingCallBack03(data) {

        scope = $('#page #items-game .item-list .item__list');
        scope.empty();

        rank = 0;

        for (var i in data.items) {

            itemPrice = data.items[i].selling_price_tax.toLocaleString();
            itemUrl = data.items[i].item_url;
            smallImageUrl = data.items[i].image_url;
            itemTitle = data.items[i].title;
            label = data.items[i].maker;
            hardware = data.items[i].platform[0];

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
                    '<img src="' + smallImageUrl + '" alt="' + itemTitle + '">',
                    '</a>',
                    '<figcaption class="item__card__title">',
                    '<a href="' + itemUrl + '">' + itemTitle + '</a>',
                    '<p>' + label + '</p>',
                    '<p>' + hardware + '</p>',
                    '<p>' + itemPrice + '円(税込) <b>送料無料</b></p>',
                    '</figcaption>',
                    '</figure>',
                    '</li>'
                ].join(''));
            }
        }
    }

    function showError() {
        scope = $('#page #items-cd .item-list .item__list , #page #items-dvd .item-list .item__list , #page #items-game .item-list .item__list');
        scope.next().remove();
        scope.remove();
        return;
    }

});
