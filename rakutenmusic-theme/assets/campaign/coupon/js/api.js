//PC-API JS
/*-- 各ジャンルに振分け --*/
function booksGid() {
	if (genreVlue.substr(0, 3) == '000') {
		genreIcon = genreArray[0];
	} else if (genreVlue.substr(0, 3) == '001') {
		genreIcon = genreArray[1];
		genreAlt = '本';
	} else if (genreVlue.substr(0, 3) == '002') {
		genreIcon = genreArray[2];
		genreAlt = 'CD';
	} else if (genreVlue.substr(0, 3) == '003') {
		if (genreVlue.substr(0, 6) == '003215') {
			genreIcon = genreArray[4];
			genreAlt = 'ブルーレイ';
		} else {
			genreIcon = genreArray[3];
			genreAlt = 'DVD';
		}
	} else if (genreVlue.substr(0, 3) == '004') {
		genreIcon = genreArray[5];
		genreAlt = 'PCソフト・周辺機器';
	} else if (genreVlue.substr(0, 3) == '005') {
		genreIcon = genreArray[6];
		genreAlt = '洋書';
	} else if (genreVlue.substr(0, 3) == '006') {
		genreIcon = genreArray[7];
		genreAlt = 'ゲーム';
	} else {
		genreIcon = genreArray[8];
		genreAlt = '雑誌';
	}
}
//API
(function ($) {
	//CD
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
	});

	function rankingCallBack(data) {

		scope = $('#page #items-cd .item-list .item__list');
		scope.empty();
        
        rank = 0;
        for (var i in data.Items) {
            itemPrice = data.Items[i].Item.itemPrice;
            if(itemPrice>1200){
                itemPrice = String(itemPrice);
                smallImageUrl = data.Items[i].Item.smallImageUrl;
                smallImageUrl = smallImageUrl.split('64x64').join('200x200');
                title = data.Items[i].Item.title;
                title = title.split('?').join('～');
                artistName = data.Items[i].Item.artistName; //アーティスト名(CD、DVD)
                artistName = String(artistName); //アーティスト名(CD、DVD)
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
                rank++;
                temp = '<li class="item__card js-toggle__target">';
                //booksGenreId
                //booksGid(); //ジャンルアイコン表示
                
                //商品タイトル のテキスト長さ調整
                $("#page #items-cd .item-list .item__card__title a").each(function () {
                    var txt = $(this).text();
                    if (txt.length > 30) {
                        txt = txt.substr(0, 30);
                        $(this).text(txt + "…");
                    }
                });

                //著者名、アーティスト名、対応機種、対応OS のテキスト長さ調整
                //$("#page #items-cd .item-list .item__card__title a").eq(rank).after('<p>おおおお</p>');
                /*$(".textFormattingSub").each(function () {
                    var txt = $(this).text();
                    if (txt.length > 16) {
                        txt = txt.substr(0, 15);
                        $(this).text(txt + "…");
                    }
                });*/
                
                if(rank<6){
                    scope.append([temp,
                        '<figure class="item__card__image">',
                        '<a href="'+itemUrl+'">',
                        '<img src="'+smallImageUrl+'" alt="'+title+'">',
                        '</a>',
                        '<figcaption class="item__card__title">',
                        '<a href="'+itemUrl+'">'+title+'</a>',
                        '<p>'+artistName+'</p>',
                        '</figcaption>',
                        '</figure>',
                        '</li>'
                    ].join(''));
                }
                
            }else{
                continue;
            }
        } //for
	} //function
    
	//DVD
	$(function () {
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
	});

	function rankingCallBack02(data) {

		scope = $('#page #items-dvd .item-list .item__list');
		scope.empty();
        
        rank = 0;
        for (var i in data.Items) {
            itemPrice = data.Items[i].Item.itemPrice;
            if(itemPrice>1200){
                itemPrice = String(itemPrice);
                smallImageUrl = data.Items[i].Item.smallImageUrl;
                smallImageUrl = smallImageUrl.split('64x64').join('200x200');
                title = data.Items[i].Item.title;
                title = title.split('?').join('～');
                artistName = data.Items[i].Item.artistName; //アーティスト名(CD、DVD)
                artistName = String(artistName); //アーティスト名(CD、DVD)
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
                rank++;
                temp = '<li class="item__card js-toggle__target">';
                //booksGenreId
                //booksGid(); //ジャンルアイコン表示
                
                //商品タイトル のテキスト長さ調整
                $("#page #items-dvd .item-list .item__card__title a").each(function () {
                    var txt = $(this).text();
                    if (txt.length > 30) {
                        txt = txt.substr(0, 30);
                        $(this).text(txt + "…");
                    }
                });

                //著者名、アーティスト名、対応機種、対応OS のテキスト長さ調整
                //$("#page #items-dvd .item-list .item__card__title a").eq(rank).after('<p>おおおお</p>');
                /*$(".textFormattingSub").each(function () {
                    var txt = $(this).text();
                    if (txt.length > 16) {
                        txt = txt.substr(0, 15);
                        $(this).text(txt + "…");
                    }
                });*/
                
                if(rank<6){
                    scope.append([temp,
                        '<figure class="item__card__image">',
                        '<a href="'+itemUrl+'">',
                        '<img src="'+smallImageUrl+'" alt="'+title+'">',
                        '</a>',
                        '<figcaption class="item__card__title">',
                        '<a href="'+itemUrl+'">'+title+'</a>',
                        '<p>'+artistName+'</p>',
                        '</figcaption>',
                        '</figure>',
                        '</li>'
                    ].join(''));
                }
                
            }else{
                continue;
            }
        } //for
	} //function
    
	function showError() {
		scope = $('#page .item-list .item__list');
		scope.next().remove();
		scope.remove();
		return;
	}


})(jQuery);