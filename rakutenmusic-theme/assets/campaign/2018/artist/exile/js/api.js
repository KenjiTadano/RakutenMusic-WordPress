//API
(function ($) {

    //CD
    $(function(){
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
            listPrice = data.Items[i].Item.listPrice;
            listPrice = String(listPrice);
            itemPrice = data.Items[i].Item.itemPrice;
            itemPrice = String(itemPrice);
            discountRate = data.Items[i].Item.discountRate;
            discountRate = String(discountRate);
            booksGenreId = data.Items[i].Item.booksGenreId;
            genreVlue = booksGenreId.substr(0,9);
            digit = listPrice.length;
            
            if (digit > 3) {
                temp = '';
                remainder = digit % 3;
                for (var j = 0; digit > j; j++) {
                    if ((remainder - j) % 3 == 0)
                        temp = [temp, listPrice.charAt(j)].join(',');
                    else
                        temp = [temp, listPrice.charAt(j)].join('');
                }
                listPrice = temp;
            }
            
            digit = itemPrice.length;
            
            if (digit > 3) {
                temp = '';
                remainder = digit % 3;
                for (var j = 0; digit > j; j++) {
                    if ((remainder - j) % 3 == 0)
                        temp = [temp, itemPrice.charAt(j)].join(',');
                    else
                        temp = [temp, itemPrice.charAt(j)].join('');
                }
                itemPrice = temp;
            }
            
            itemUrl = data.Items[i].Item.itemUrl;

            rank = Number(i) + 1;
            
            if (i == 0){
                temp = '<li class="item__card">';   
            }else if(i > 3){
                temp = '<li class="item__card js-toggle__target">';
                //temp = '<li class="item__card">';
            }else{
                temp = '<li class="item__card">';
            }
            

            //商品タイトル のテキスト長さ調整
/*            $(".item__card__title").each(function () {
                var txt = $(this).text();
                if (txt.length > 30) {
                    txt = txt.substr(0, 30);
                    $(this).text(txt + "…");
                }
            });
*/            
            //著者名、アーティスト名、対応機種、対応OS のテキスト長さ調整
/*            $(".textFormattingSub").each(function () {
                var txt = $(this).text();
                if (txt.length > 16) {
                    txt = txt.substr(0, 15);
                    $(this).text(txt + "…");
                }
            });
*/
            if (discountRate == 0) {
                scope.append([temp,
                    '<figure class="item__card__image">',
                    '<a href="'+itemUrl+'">',
                    '<img src="'+smallImageUrl+'" alt="'+title+'">',
                    '</a>',
                    '<figcaption class="item__card__title">',
                    '<a href="'+itemUrl+'">'+title+'</a>',
                    '<p>',
                    '<span class="textFormattingSub">'+artistName+'</span><br>',
                    itemPrice+'円(税込)<br>',
                    '</p>',
                    '</figcaption>',
                    '</figure>',
                    '</li>'
                ].join(''));
            } else {
                scope.append([temp,
                    '<figure class="item__card__image">',
                    '<a href="'+itemUrl+'">',
                    '<img src="'+smallImageUrl+'" alt="'+title+'">',
                    '</a>',
                    '<figcaption class="item__card__title">',
                    '<a href="'+itemUrl+'">'+title+'</a>',
                    '<p>',
                    '<span class="textFormattingSub">'+artistName+'</span><br>',
                    listPrice+'円<br>',
                    '<span class="discountRate">'+itemPrice+'円(税込)</span><br>',
                    '<span class="discountRate">'+discountRate+'％OFF！</span>',
                    '</p>',
                    '</figcaption>',
                    '</figure>',
                    '</li>'
                ].join(''));
            }
        } //for
    } //function

    //DVD
    $(function(){
        $.ajax({
            scriptCharset:'utf-8',
            url: [
                'https://app.rakuten.co.jp/services/api/BooksDVD/Search/20170404?',
                'applicationId=books_20140611',
                'artistName=EXILE',
                'booksGenreId=003',
                'hits=10',
                'availability=1',
                'sort=sales',
            ].join('&'),
            dataType:'jsonp',
            success: rankingCallBack02,
            error: showError
        });
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
            listPrice = data.Items[i].Item.listPrice;
            listPrice = String(listPrice);
            itemPrice = data.Items[i].Item.itemPrice;
            itemPrice = String(itemPrice);
            discountRate = data.Items[i].Item.discountRate;
            discountRate = String(discountRate);
            booksGenreId = data.Items[i].Item.booksGenreId;
            genreVlue = booksGenreId.substr(0,9);
            digit = listPrice.length;

            if (digit > 3) {
                temp = '';
                remainder = digit % 3;
                for (var j = 0; digit > j; j++) {
                    if ((remainder - j) % 3 == 0)
                        temp = [temp, listPrice.charAt(j)].join(',');
                    else
                        temp = [temp, listPrice.charAt(j)].join('');
                }
                listPrice = temp;
            }
            
            digit = itemPrice.length;
            if (digit > 3) {
                temp = '';
                remainder = digit % 3;
                for (var j = 0; digit > j; j++) {
                    if ((remainder - j) % 3 == 0)
                        temp = [temp, itemPrice.charAt(j)].join(',');
                    else
                        temp = [temp, itemPrice.charAt(j)].join('');
                }
                itemPrice = temp;
            }
            
            itemUrl = data.Items[i].Item.itemUrl;

            rank = Number(i) + 1;

            if (i == 0){
                temp = '<li class="item__card">';   
            }else if(i > 3){
                temp = '<li class="item__card js-toggle__target">';
                //temp = '<li class="item__card">';
            }else{
                temp = '<li class="item__card">';
            }
            

            //商品タイトル のテキスト長さ調整
/*            $(".item__card__title").each(function () {
                var txt = $(this).text();
                if (txt.length > 30) {
                    txt = txt.substr(0, 30);
                    $(this).text(txt + "…");
                }
            });
*/            
            //著者名、アーティスト名、対応機種、対応OS のテキスト長さ調整
/*            $(".textFormattingSub").each(function () {
                var txt = $(this).text();
                if (txt.length > 16) {
                    txt = txt.substr(0, 15);
                    $(this).text(txt + "…");
                }
            });
*/
            if (discountRate == 0) {
                scope.append([temp,
                    '<figure class="item__card__image">',
                    '<a href="'+itemUrl+'">',
                    '<img src="'+smallImageUrl+'" alt="'+title+'">',
                    '</a>',
                    '<figcaption class="item__card__title">',
                    '<a href="'+itemUrl+'">'+title+'</a>',
                    '<p>',
                    '<span class="textFormattingSub">'+artistName+'</span><br>',
                    itemPrice+'円(税込)<br>',
                    '</p>',
                    '</figcaption>',
                    '</figure>',
                    '</li>'
                ].join(''));
            } else {
                scope.append([temp,
                    '<figure class="item__card__image">',
                    '<a href="'+itemUrl+'">',
                    '<img src="'+smallImageUrl+'" alt="'+title+'">',
                    '</a>',
                    '<figcaption class="item__card__title">',
                    '<a href="'+itemUrl+'">'+title+'</a>',
                    '<p>',
                    '<span class="textFormattingSub">'+artistName+'</span><br>',
                    listPrice+'円<br>',
                    '<span class="discountRate">'+itemPrice+'円(税込)</span><br>',
                    '<span class="discountRate">'+discountRate+'％OFF！</span>',
                    '</p>',
                    '</figcaption>',
                    '</figure>',
                    '</li>'
                ].join(''));
            }
        } //for
    } //function

    function showError() {
        scope = $('#page .item-list .item__list');
        scope.children().remove();
        scope.remove();
        return;
    }

})(jQuery);