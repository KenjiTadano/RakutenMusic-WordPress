// genreList = {
//     '000': 'all',
//     '001': 'book',
//     '002': 'cd',
//     '003': 'dvd',
//     '004': 'soft',
//     '005': 'fbook',
//     '006': 'game',
//     '007': 'mgzn',
//     '008': 'ebook'
// };

$(function () {

    $.ajax({
        scriptCharset: 'utf-8',
        url: [
            'https://app.rakuten.co.jp/services/api/BooksSoftware/Search/20170404?',
            'applicationId=books_20140611',
            'booksGenreId=004319',
            'hits=30', 'availability=1', 'outOfStockFlag=0', 'sort=sales'
        ].join('&'),
        dataType: 'jsonp',
        success: rankingCallBack,
        error: showError
    });

    function rankingCallBack(data) {

        scope = $('#page #items-soft .item-list .item__list');
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

                if (rank < 16) {
                    scope.append([temp,
                        '<figure class="item__card__image">',
                        '<a href="' + itemUrl + '">',
                        '<img src="' + smallImageUrl + '" alt="' + title + '">',
                        '</a>',
                        '<figcaption class="item__card__title">',
                        '<a href="' + itemUrl + '">' + title + '</a>',
                        '<p>' + label + '</p>',
                        // '<p>' + hardware + '</p>',
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
        scope = $('#page #items-cd .item-list .item__list , #page #items-dvd .item-list .item__list , #page #items-soft .item-list .item__list');
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
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
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
