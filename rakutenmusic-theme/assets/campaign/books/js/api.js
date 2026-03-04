/*-- ジャンルアイコンを配列に格納 --*/
var genreArray = [
    'https://image.books.rakuten.co.jp/books/img/t.gif',
    'https://image.books.rakuten.co.jp/books/img/common/main/icon/icon_book_35x15_20130809.gif',
    'https://image.books.rakuten.co.jp/books/img/common/main/icon/icon_cd_35x15_20130809.gif',
    'https://image.books.rakuten.co.jp/books/img/common/main/icon/icon_dvd_35x15_20130809.gif',
    'https://image.books.rakuten.co.jp/books/img/common/main/icon/icon_blue_35x15_20130829.gif',
    'https://image.books.rakuten.co.jp/books/img/common/main/icon/icon_soft_35x15_20130809.gif',
    'https://image.books.rakuten.co.jp/books/img/common/main/icon/icon_fbook_35x15_20130809.gif',
    'https://image.books.rakuten.co.jp/books/img/common/main/icon/icon_game_35x15_20130809.gif',
    'https://image.books.rakuten.co.jp/books/img/common/main/icon/icon_mgzn_35x15_20130809.gif'
];
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

    /***************************
     1,000円以上のCD
    ***************************/
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
            success: rankingCallBack001,
            error: showError
        });
    });

    function rankingCallBack001(data) {
        scope = $('div#rankingArea001 div.rankingContents ol');
        scope.empty();
        rank = 0;
        for (var i in data.Items) {
            itemPrice = data.Items[i].Item.itemPrice;
            if (itemPrice > 1000) {
                smallImageUrl = data.Items[i].Item.smallImageUrl;
                smallImageUrl = smallImageUrl.split('64x64').join('150x150');
                title = data.Items[i].Item.title;
                title = title.split('?').join('～');
                author = data.Items[i].Item.author; //著者名(書籍、洋書)
                author = String(author); //著者名(書籍、洋書)
                publisherName = data.Items[i].Item.publisherName; //出版社名(雑誌)
                publisherName = String(publisherName); //著者名(書籍、洋書)
                artistName = data.Items[i].Item.artistName; //アーティスト名(CD、DVD)
                artistName = String(artistName); //アーティスト名(CD、DVD)
                label = data.Items[i].Item.label; //発売元名(CD、DVD、ゲーム、PC)
                label = String(label); //発売元名(CD、DVD、ゲーム、PC)
                hardware = data.Items[i].Item.hardware; //対応機種(ゲーム)
                hardware = String(hardware); //対応機種(ゲーム)
                os = data.Items[i].Item.os; //対応OS(ソフトウェア)
                os = String(os); //対応OS(ソフトウェア)
                listPrice = data.Items[i].Item.listPrice;
                listPrice = String(listPrice);
                itemPrice = String(itemPrice);
                discountRate = data.Items[i].Item.discountRate;
                discountRate = String(discountRate);
                booksGenreId = data.Items[i].Item.booksGenreId;
                genreVlue = booksGenreId.substr(0, 9);
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

                rank++;
                //rank = Number(i)+1;

                if (i == 0)
                    temp = '<li class="first">';
                else if (i == 1)
                    temp = '<li class="second">';
                else if (i == 2)
                    temp = '<li class="third">';
                else
                    temp = '<li>';

                //booksGenreId
                booksGid(); //ジャンルアイコン表示
                //商品タイトル のテキスト長さ調整
                $(".textFormattingTtl").each(function () {
                    var txt = $(this).text();
                    if (txt.length > 30) {
                        txt = txt.substr(0, 30);
                        $(this).text(txt + "…");
                    }
                });

                //著者名、アーティスト名、対応機種、対応OS のテキスト長さ調整
                $(".textFormattingSub").each(function () {
                    var txt = $(this).text();
                    if (txt.length > 16) {
                        txt = txt.substr(0, 15);
                        $(this).text(txt + "…");
                    }
                });
                if (rank < 11) {
                    if (discountRate == 0) {
                        scope.append([temp,
                            '<div class="image">',
                            '<span><img src="https://books.rakuten.co.jp/info/special-price-sale/img/icon_rank', rank, '.gif" alt="', rank, '位" /></span>',
                            '<a href="', itemUrl, '"><img src="', smallImageUrl, '&s=0" alt="', title, '" /></a>',
                            '</div><!-- /.image -->',
                            '<div class="note">',
                            '<span class="genreicon"><img src="', genreIcon, '" alt="', genreAlt, '" width="35" height="15" /></span>',
                            '<a href="', itemUrl, '" class="textFormattingTtl">', title, '</a>',
                            //'<span class="textFormattingSub">',author,'</span>',
                            //'<span class="textFormattingSub">',publisherName,'</span>',
                            '<span class="textFormattingSub">', artistName, '</span>',
                            //'<span class="textFormattingSub">',label,'</span>',
                            //'<span class="textFormattingSub">',hardware,'</span>',
                            //'<span class="textFormattingSub">',os,'</span>',
                            '<span class="after">', itemPrice, '円（税込）</span>',
                            '</div><!-- /.note -->',
                            '</li>'
                        ].join(''));
                    } else {
                        scope.append([temp,
                            '<div class="image">',
                            '<span><img src="https://books.rakuten.co.jp/info/special-price-sale/img/icon_rank', rank, '.gif" alt="', rank, '位" /></span>',
                            '<a href="', itemUrl, '"><img src="', smallImageUrl, '&s=0" alt="', title, '" /></a>',
                            '</div><!-- /.image -->',
                            '<div class="note">',
                            '<span class="genreicon"><img src="', genreIcon, '" alt="', genreAlt, '" width="35" height="15" /></span>',
                            '<a href="', itemUrl, '" class="textFormattingTtl">', title, '</a>',
                            //'<span class="textFormattingSub">',author,'</span>',
                            //'<span class="textFormattingSub">',publisherName,'</span>',
                            '<span class="textFormattingSub">', artistName, '</span>',
                            //'<span class="textFormattingSub">',label,'</span>',
                            //'<span class="textFormattingSub">',hardware,'</span>',
                            //'<span class="textFormattingSub">',os,'</span>',
                            '<span class="before">', listPrice, '円</span>',
                            '<span class="after">', itemPrice, '円（税込）</span>',
                            '<span class="discountRate">', discountRate, '％OFF！</span>',
                            '</div><!-- /.note -->',
                            '</li>'
                        ].join(''));
                    }
                }
            } else {
                continue;
            }
        } //for
    } //function

    /***************************
     1,000円以上のDVD
    ***************************/
    $(function () {
        $.ajax({
            scriptCharset: 'utf-8',
            url: [
                'https://24x7.app.rakuten.co.jp/engine/api/BooksTotal/Search/20170427?',
                'applicationId=books_20140611',
                'keyword=DVD', //【タイムセール】を表示しないために検索ワードを指定
                'booksGenreId=003',
                'hits=30',
                'availability=1',
                'outOfStockFlag=0',
                'sort=sales',
                'field=0',
                'NGKeyword=%E3%80%90%E3%82%BF%E3%82%A4%E3%83%A0%E3%82%BB%E3%83%BC%E3%83%AB%E3%80%91' //【タイムセール】
            ].join('&'),
            dataType: 'jsonp',
            success: rankingCallBack002,
            error: showError
        });
    });

    function rankingCallBack002(data) {
        scope = $('div#rankingArea002 div.rankingContents ol');
        scope.empty();
        rank = 0;
        for (var i in data.Items) {
            itemPrice = data.Items[i].Item.itemPrice;
            if (itemPrice > 1000) {
                smallImageUrl = data.Items[i].Item.smallImageUrl;
                smallImageUrl = smallImageUrl.split('64x64').join('150x150');
                title = data.Items[i].Item.title;
                title = title.split('?').join('～');
                author = data.Items[i].Item.author; //著者名(書籍、洋書)
                author = String(author); //著者名(書籍、洋書)
                publisherName = data.Items[i].Item.publisherName; //出版社名(雑誌)
                publisherName = String(publisherName); //著者名(書籍、洋書)
                artistName = data.Items[i].Item.artistName; //アーティスト名(CD、DVD)
                artistName = String(artistName); //アーティスト名(CD、DVD)
                label = data.Items[i].Item.label; //発売元名(CD、DVD、ゲーム、PC)
                label = String(label); //発売元名(CD、DVD、ゲーム、PC)
                hardware = data.Items[i].Item.hardware; //対応機種(ゲーム)
                hardware = String(hardware); //対応機種(ゲーム)
                os = data.Items[i].Item.os; //対応OS(ソフトウェア)
                os = String(os); //対応OS(ソフトウェア)
                listPrice = data.Items[i].Item.listPrice;
                listPrice = String(listPrice);
                itemPrice = String(itemPrice);
                discountRate = data.Items[i].Item.discountRate;
                discountRate = String(discountRate);
                booksGenreId = data.Items[i].Item.booksGenreId;
                genreVlue = booksGenreId.substr(0, 9);
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

                rank++;
                //rank = Number(i)+1;

                if (i == 0)
                    temp = '<li class="first">';
                else if (i == 1)
                    temp = '<li class="second">';
                else if (i == 2)
                    temp = '<li class="third">';
                else
                    temp = '<li>';

                //booksGenreId
                booksGid(); //ジャンルアイコン表示
                //商品タイトル のテキスト長さ調整
                $(".textFormattingTtl").each(function () {
                    var txt = $(this).text();
                    if (txt.length > 30) {
                        txt = txt.substr(0, 30);
                        $(this).text(txt + "…");
                    }
                });

                //著者名、アーティスト名、対応機種、対応OS のテキスト長さ調整
                $(".textFormattingSub").each(function () {
                    var txt = $(this).text();
                    if (txt.length > 16) {
                        txt = txt.substr(0, 15);
                        $(this).text(txt + "…");
                    }
                });
                if (rank < 11) {
                    if (discountRate == 0) {
                        scope.append([temp,
                            '<div class="image">',
                            '<span><img src="https://books.rakuten.co.jp/info/special-price-sale/img/icon_rank', rank, '.gif" alt="', rank, '位" /></span>',
                            '<a href="', itemUrl, '"><img src="', smallImageUrl, '&s=0" alt="', title, '" /></a>',
                            '</div><!-- /.image -->',
                            '<div class="note">',
                            '<span class="genreicon"><img src="', genreIcon, '" alt="', genreAlt, '" width="35" height="15" /></span>',
                            '<a href="', itemUrl, '" class="textFormattingTtl">', title, '</a>',
                            //'<span class="textFormattingSub">',author,'</span>',
                            //'<span class="textFormattingSub">',publisherName,'</span>',
                            '<span class="textFormattingSub">', artistName, '</span>',
                            //'<span class="textFormattingSub">',label,'</span>',
                            //'<span class="textFormattingSub">',hardware,'</span>',
                            //'<span class="textFormattingSub">',os,'</span>',
                            '<span class="after">', itemPrice, '円（税込）</span>',
                            '</div><!-- /.note -->',
                            '</li>'
                        ].join(''));
                    } else {
                        scope.append([temp,
                            '<div class="image">',
                            '<span><img src="https://books.rakuten.co.jp/info/special-price-sale/img/icon_rank', rank, '.gif" alt="', rank, '位" /></span>',
                            '<a href="', itemUrl, '"><img src="', smallImageUrl, '&s=0" alt="', title, '" /></a>',
                            '</div><!-- /.image -->',
                            '<div class="note">',
                            '<span class="genreicon"><img src="', genreIcon, '" alt="', genreAlt, '" width="35" height="15" /></span>',
                            '<a href="', itemUrl, '" class="textFormattingTtl">', title, '</a>',
                            //'<span class="textFormattingSub">',author,'</span>',
                            //'<span class="textFormattingSub">',publisherName,'</span>',
                            '<span class="textFormattingSub">', artistName, '</span>',
                            //'<span class="textFormattingSub">',label,'</span>',
                            //'<span class="textFormattingSub">',hardware,'</span>',
                            //'<span class="textFormattingSub">',os,'</span>',
                            '<span class="before">', listPrice, '円</span>',
                            '<span class="after">', itemPrice, '円（税込）</span>',
                            '<span class="discountRate">', discountRate, '％OFF！</span>',
                            '</div><!-- /.note -->',
                            '</li>'
                        ].join(''));
                    }
                }
            } else {
                continue;
            }
        } //for
    } //function

    /***************************
     1,000円以上の本
     ※書籍だけ1000円以上の商品が少ないので
     　ランキングAPIを使用しています
    ***************************/
    $(function () {
        $.ajax({
            scriptCharset: 'utf-8',
            url: [
                'https://api.books.rakuten.co.jp/ranking/1/001/hourly.json?',
                'hits=50'
            ].join('&'),
            dataType: 'jsonp',
            success: rankingCallBack03,
            error: showError
        });
    });
    
    function rankingCallBack03(data) {
        scope = $('div#rankingArea003 div.rankingContents ol');
        scope.empty();
        //変数「rank」を宣言 ※条件を満たさない場合、変数「rank」は不動
        rank = 0;
        for(var i=0; i<data.hits; i++){
            itemPrice = data.data[i].price;
            if(itemPrice>1000){
                itemPrice = String(itemPrice);
                url = data.data[i].url;
                image_url = data.data[i].image_url;
                title = data.data[i].title;
                title = title.split('?').join('～');
                author = data.data[i].author; //著者名(書籍、洋書)
                author = String(author); //著者名(書籍、洋書)
                publisher = data.data[i].publisher; //出版社名(雑誌)
                publisher = String(publisher); //著者名(書籍、洋書)
        
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
                
                rank++;
                
                if(rank < 11){
                    scope.append([
                        '<li>',
                        '<div class="image">',
                        '<span><img src="https://books.rakuten.co.jp/info/special-price-sale/img/icon_rank', rank, '.gif" alt="', rank, '位" /></span>',
                        '<a href="', url, '"><img src="', image_url, '?_ex=150x150&s=0" alt="', title, '" /></a>',
                        '</div><!-- /.image -->',
                        '<div class="note">',
                        '<span class="genreicon"><img src="https://image.books.rakuten.co.jp/books/img/common/main/icon/icon_book_35x15_20130809.gif" alt="本" width="35" height="15" /></span>',
                        '<a href="', url, '" class="textFormattingTtl">', title, '</a>',
                        '<span class="textFormattingSub">',author,'</span>',
                        '<span class="textFormattingSub">',publisher,'</span>',
                        '<span class="after">', itemPrice, '円（税込）</span>',
                        '</div><!-- /.note -->',
                        '</li>'
                    ].join(''));
                }
                
            }
        }
    } //function

    function showError() {
        scope = $('div.rankingContents ol');
        scope.next().remove();
        scope.remove();
        return;
    }


})(jQuery);

(function($) {

//【1,000円以上の】CD
$(function(){
	$.ajax({
		scriptCharset:'utf-8',
		url: [
			'https://24x7.app.rakuten.co.jp/engine/api/BooksTotal/Search/20130522?',
			'applicationId=books_20140611',
			'keyword=cd',
			'outOfStockFlag=0',
			'field=0',
			'hits=30',
			'sort=sales',
			'availability=1',
			'NGKeyword=%E3%80%90%E3%82%BF%E3%82%A4%E3%83%A0%E3%82%BB%E3%83%BC%E3%83%AB%E3%80%91',//【タイムセール】
			'booksGenreId=002'
		].join('&'),
		dataType:'jsonp',
		success: rankingCallBack01,
		error: showError
	});
});

function rankingCallBack01(data) {

	scope = $('div#rankingArea01 div.rankingContents ul');
	scope.empty();
    rank = 0;
	for ( var i in data.Items ) {
		itemPrice = data.Items[i].Item.itemPrice;
        if(itemPrice>1000){
            itemPrice = String(itemPrice);
            smallImageUrl = data.Items[i].Item.smallImageUrl;
            smallImageUrl = smallImageUrl.split('64x64').join('180x180');
            title = data.Items[i].Item.title;
            title = title.split('?').join('～');
            author = data.Items[i].Item.author;//著者名(書籍、洋書)
            author = String(author);//著者名(書籍、洋書)
            artistName = data.Items[i].Item.artistName;//アーティスト名(CD、DVD)
            artistName = String(artistName);//アーティスト名(CD、DVD)
            hardware = data.Items[i].Item.hardware;//対応機種(ゲーム)
            hardware = String(hardware);//対応機種(ゲーム)
            os = data.Items[i].Item.os;//対応OS(ソフトウェア)
            os = String(os);//対応OS(ソフトウェア)
            listPrice = data.Items[i].Item.listPrice;
            listPrice = String(listPrice);
            discountRate = data.Items[i].Item.discountRate;
            discountRate = String(discountRate);
            digit = listPrice.length;
            if(digit > 3){
                temp = '';
                remainder = digit % 3;
                for (var j=0 ; digit>j ; j++){
                    if((remainder - j) % 3 == 0)
                        temp = [temp,listPrice.charAt(j)].join(',');
                    else
                        temp = [temp,listPrice.charAt(j)].join('');
                }
                listPrice = temp;
            }
            digit = itemPrice.length;
            if(digit > 3){
                temp = '';
                remainder = digit % 3;
                for (var j=0 ; digit>j ; j++){
                    if((remainder - j) % 3 == 0)
                        temp = [temp,itemPrice.charAt(j)].join(',');
                    else
                        temp = [temp,itemPrice.charAt(j)].join('');
                }
                itemPrice = temp;
            }

            itemUrl = data.Items[i].Item.itemUrl;

            //rank = Number(i)+1;
            rank++;
            
            if(rank<10){
                if(i==0)
                    temp = '<li class="first">';
                else if(i==1)
                    temp = '<li class="second">';
                else if(i==2)
                    temp = '<li class="third">';
                else
                    temp = '<li>';

                scope.append([temp,
                '<a href="',itemUrl,'">',
                    '<dl class="itemBox">',
                        '<dt><span><img src="',smallImageUrl,'&s=2&r=0" alt="',title,'" width="90"></span></dt>',
                        '<dd>',
                        '<span class="apiRankIc">',rank,'</span>',
                        '<p class="textFormattingTtl">',title,'</p>',
                        '<ul class="subData">',
                        //'<li class="textFormattingSub">',author,'</li>',//著者名(書籍、洋書)
                        '<li class="textFormattingSub">',artistName,'</li>',//アーティスト名(CD、DVD)
                        //'<li class="textFormattingSub">',hardware,'</li>',//対応機種(ゲーム)
                        //'<li class="textFormattingSub">',os,'</li>',//対応OS(ソフトウェア)
                        '</ul>',
                        '<p class="price">',
                        //'<span class="before">',listPrice,'円</span>',
                        '<em>',itemPrice,'円</em><span class="apiTax">(税込)</span>',
                        //'<span class="discount">',discountRate,'％OFF</span>',
                        '</p>',
                        '</dd>',
                    '</dl>',
                '</a>'
                ].join(''));
            }
        }else{
            continue;
        }
	}

//商品タイトル のテキスト長さ調整
$(".textFormattingTtl").each(function(){
    var txt = $(this).text();
    if(txt.length > 28){
        txt = txt.substr(0, 28);
        $(this).text(txt + "…");
    }
});

//著者名、アーティスト名、対応機種、対応OS のテキスト長さ調整
$(".textFormattingSub").each(function(){
    var txt = $(this).text();
    if(txt.length > 9){
        txt = txt.substr(0, 9);
        $(this).text(txt + "…");
    }
});

}

//【1,000円以上の】dvd
$(function(){
	$.ajax({
		scriptCharset:'utf-8',
		url: [
			'https://24x7.app.rakuten.co.jp/engine/api/BooksTotal/Search/20130522?',
			'applicationId=books_20140611',
			'keyword=dvd',
			'outOfStockFlag=0',
			'field=0',
			'hits=30',
			'sort=sales',
			'availability=1',
			'NGKeyword=%E3%80%90%E3%82%BF%E3%82%A4%E3%83%A0%E3%82%BB%E3%83%BC%E3%83%AB%E3%80%91',//【タイムセール】
			'booksGenreId=003'
		].join('&'),
		dataType:'jsonp',
		success: rankingCallBack02,
		error: showError
	});
});

function rankingCallBack02(data) {

	scope = $('div#rankingArea02 div.rankingContents ul');
	scope.empty();
    rank = 0;
	for ( var i in data.Items ) {
		itemPrice = data.Items[i].Item.itemPrice;
        if(itemPrice>1000){
            itemPrice = String(itemPrice);
            smallImageUrl = data.Items[i].Item.smallImageUrl;
            smallImageUrl = smallImageUrl.split('64x64').join('180x180');
            title = data.Items[i].Item.title;
            title = title.split('?').join('～');
            author = data.Items[i].Item.author;//著者名(書籍、洋書)
            author = String(author);//著者名(書籍、洋書)
            artistName = data.Items[i].Item.artistName;//アーティスト名(CD、DVD)
            artistName = String(artistName);//アーティスト名(CD、DVD)
            hardware = data.Items[i].Item.hardware;//対応機種(ゲーム)
            hardware = String(hardware);//対応機種(ゲーム)
            os = data.Items[i].Item.os;//対応OS(ソフトウェア)
            os = String(os);//対応OS(ソフトウェア)
            listPrice = data.Items[i].Item.listPrice;
            listPrice = String(listPrice);
            discountRate = data.Items[i].Item.discountRate;
            discountRate = String(discountRate);
            digit = listPrice.length;
            if(digit > 3){
                temp = '';
                remainder = digit % 3;
                for (var j=0 ; digit>j ; j++){
                    if((remainder - j) % 3 == 0)
                        temp = [temp,listPrice.charAt(j)].join(',');
                    else
                        temp = [temp,listPrice.charAt(j)].join('');
                }
                listPrice = temp;
            }
            digit = itemPrice.length;
            if(digit > 3){
                temp = '';
                remainder = digit % 3;
                for (var j=0 ; digit>j ; j++){
                    if((remainder - j) % 3 == 0)
                        temp = [temp,itemPrice.charAt(j)].join(',');
                    else
                        temp = [temp,itemPrice.charAt(j)].join('');
                }
                itemPrice = temp;
            }

            itemUrl = data.Items[i].Item.itemUrl;

            //rank = Number(i)+1;
            rank++;
            
            if(rank<10){
                if(i==0)
                    temp = '<li class="first">';
                else if(i==1)
                    temp = '<li class="second">';
                else if(i==2)
                    temp = '<li class="third">';
                else
                    temp = '<li>';

                scope.append([temp,
                '<a href="',itemUrl,'">',
                    '<dl class="itemBox">',
                        '<dt><span><img src="',smallImageUrl,'&s=2&r=0" alt="',title,'" width="90"></span></dt>',
                        '<dd>',
                        '<span class="apiRankIc">',rank,'</span>',
                        '<p class="textFormattingTtl">',title,'</p>',
                        '<ul class="subData">',
                        //'<li class="textFormattingSub">',author,'</li>',//著者名(書籍、洋書)
                        '<li class="textFormattingSub">',artistName,'</li>',//アーティスト名(CD、DVD)
                        //'<li class="textFormattingSub">',hardware,'</li>',//対応機種(ゲーム)
                        //'<li class="textFormattingSub">',os,'</li>',//対応OS(ソフトウェア)
                        '</ul>',
                        '<p class="price">',
                        //'<span class="before">',listPrice,'円</span>',
                        '<em>',itemPrice,'円</em><span class="apiTax">(税込)</span>',
                        //'<span class="discount">',discountRate,'％OFF</span>',
                        '</p>',
                        '</dd>',
                    '</dl>',
                '</a>'
                ].join(''));
            }
        }else{
            continue;
        }
	}

//商品タイトル のテキスト長さ調整
$(".textFormattingTtl").each(function(){
    var txt = $(this).text();
    if(txt.length > 28){
        txt = txt.substr(0, 28);
        $(this).text(txt + "…");
    }
});

//著者名、アーティスト名、対応機種、対応OS のテキスト長さ調整
$(".textFormattingSub").each(function(){
    var txt = $(this).text();
    if(txt.length > 9){
        txt = txt.substr(0, 9);
        $(this).text(txt + "…");
    }
});

}




/***************************
 1,000円以上の本
 ※書籍だけ1000円以上の商品が少ないので
 　ランキングAPIを使用しています
***************************/
$(function(){
	$.ajax({
		scriptCharset:'utf-8',
		url: [
			'https://api.books.rakuten.co.jp/ranking/1/001/hourly.json?',
			'hits=50',
		].join('&'),
		dataType:'jsonp',
		success: rankingCallBack03,
		error: showError
	});
});

function rankingCallBack03(data) {

	scope = $('div#rankingArea03 div.rankingContents ul');
	scope.empty();
    rank = 0;
	for(var i=0; i<data.hits; i++){
            itemPrice = data.data[i].price;
            if(itemPrice>1000){
                itemPrice = String(itemPrice);
                url = data.data[i].url;
                image_url = data.data[i].image_url;
                title = data.data[i].title;
                title = title.split('?').join('～');
                author = data.data[i].author; //著者名(書籍、洋書)
                author = String(author); //著者名(書籍、洋書)
                publisher = data.data[i].publisher; //出版社名(雑誌)
                publisher = String(publisher); //著者名(書籍、洋書)
        
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
            //rank = Number(i)+1;
                rank++;
                
                if(rank < 10){
                    scope.append([
						'<li>',
						'<a href="',url,'">',
						'<dl class="itemBox">',
						'<dt><span><img src="',image_url,'?_ex=180x180&s=2&r=0" alt="',title,'" width="90"></span></dt>',
						'<dd>',
						'<span class="apiRankIc">',rank,'</span>',
						'<p class="textFormattingTtl">',title,'</p>',
						'<ul class="subData">',
						'<li class="textFormattingSub">',author,'</li>',//著者名(書籍、洋書)
						'<li class="textFormattingSub">',publisher,'</li>',//著者名(書籍、洋書)
						//'<li class="textFormattingSub">',artistName,'</li>',//アーティスト名(CD、DVD)
						//'<li class="textFormattingSub">',hardware,'</li>',//対応機種(ゲーム)
						//'<li class="textFormattingSub">',os,'</li>',//対応OS(ソフトウェア)
						'</ul>',
						'<p class="price">',
						//'<span class="before">',listPrice,'円</span>',
						'<em>',itemPrice,'円</em><span class="apiTax">(税込)</span>',
						//'<span class="discount">',discountRate,'％OFF</span>',
						'</p>',
						'</dd>',
						'</dl>',
						'</a>',
						'</li>'
                    ].join(''));
                }
                
            }
        }
    } //function

function showError() {
	scope = $('div.rankingContents ul');
	scope.next().remove();
	scope.remove();
	return;
}

})(jQuery);
