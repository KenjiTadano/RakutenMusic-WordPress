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
    
    function rankingCallBack(data){
        
		scope = $('#page #items-cd .item-list .item__list');
		scope.empty();
        
        rank = 0;
        
        for (var i in data.Items){
            
            itemPrice = data.Items[i].Item.itemPrice;
            
            if(itemPrice>1000){ //1,000円以上の商品
                itemPrice = itemPrice.toLocaleString();
                itemUrl = data.Items[i].Item.itemUrl;
                smallImageUrl = data.Items[i].Item.smallImageUrl;
                smallImageUrl = smallImageUrl.split('64x64').join('200x200');
                title = data.Items[i].Item.title;
                title = title.split('?').join('～');
                artistName = data.Items[i].Item.artistName; 
                artistName = String(artistName);
                rank++;
                
                if(rank>4){
                    temp = '<li class="item__card js-toggle__target">';
                }else{
                    temp = '<li class="item__card">';
                }
                
                if(rank<11){
                    scope.append([temp,
                        '<figure class="item__card__image">',
                        '<a href="'+itemUrl+'">',
                        '<img src="'+smallImageUrl+'" alt="'+title+'">',
                        '</a>',
                        '<figcaption class="item__card__title">',
                        '<a href="'+itemUrl+'">'+title+'</a>',
                        '<p>'+artistName+'</p>',
                        '<p>'+itemPrice+'円(税込) <b>送料無料</b></p>',
                        '</figcaption>',
                        '</figure>',
                        '</li>'
                    ].join(''));
                }
            }else{
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
    
    function rankingCallBack02(data){
        
		scope = $('#page #items-dvd .item-list .item__list');
		scope.empty();
        
        rank = 0;
        
        for (var i in data.Items){
            
            itemPrice = data.Items[i].Item.itemPrice;
            
            if(itemPrice>1000){ //1,000円以上の商品
                itemPrice = itemPrice.toLocaleString();
                itemUrl = data.Items[i].Item.itemUrl;
                smallImageUrl = data.Items[i].Item.smallImageUrl;
                smallImageUrl = smallImageUrl.split('64x64').join('200x200');
                title = data.Items[i].Item.title;
                title = title.split('?').join('～');
                artistName = data.Items[i].Item.artistName; 
                artistName = String(artistName);
                rank++;
                
                if(rank>4){
                    temp = '<li class="item__card js-toggle__target">';
                }else{
                    temp = '<li class="item__card">';
                }
                
                if(rank<11){
                    scope.append([temp,
                        '<figure class="item__card__image">',
                        '<a href="'+itemUrl+'">',
                        '<img src="'+smallImageUrl+'" alt="'+title+'">',
                        '</a>',
                        '<figcaption class="item__card__title">',
                        '<a href="'+itemUrl+'">'+title+'</a>',
                        '<p>'+artistName+'</p>',
                        '<p>'+itemPrice+'円(税込) <b>送料無料</b></p>',
                        '</figcaption>',
                        '</figure>',
                        '</li>'
                    ].join(''));
                }
            }else{
                continue;
            }
        }
    }
    
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
    
    function rankingCallBack03(data){
        
		scope = $('#page #items-book .item-list .item__list');
		scope.empty();
        
        rank = 0;
        
        for (var i in data.data){
        //for(var i=0; i<data.hits; i++){

            price = data.data[i].price;
            
            if(price>1000){ //1,000円以上の商品
                price = Number(price);
                price = price.toLocaleString();
                console.log(price);
                url = data.data[i].url;
                image_url = data.data[i].image_url;
                title = data.data[i].title;
                title = title.split('?').join('～');
                author = data.data[i].author; //著者名(書籍、洋書)
                author = String(author); //著者名(書籍、洋書)
                publisher = data.data[i].publisher; //出版社名(雑誌)
                publisher = String(publisher); //著者名(書籍、洋書)
                rank++;

                if(rank>4){
                    temp = '<li class="item__card js-toggle__target">';
                }else{
                    temp = '<li class="item__card">';
                }
                
                if(rank<11){
                    scope.append([temp,
                        '<figure class="item__card__image">',
                        '<a href="'+url+'">',
                        '<img src="'+image_url+'" alt="'+title+'">',
                        '</a>',
                        '<figcaption class="item__card__title">',
                        '<a href="'+url+'">'+title+'</a>',
                        '<p>'+author+'</p>',
                        '<p>'+publisher+'</p>',
                        '<p>'+price+'円(税込) <b>送料無料</b></p>',
                        '</figcaption>',
                        '</figure>',
                        '</li>'
                    ].join(''));
                }
            }else{
                continue;
            }
        }
    }
    
    function showError(){
        scope = $('#page #items-cd .item-list .item__list , #page #items-dvd .item-list .item__list , #page #items-book .item-list .item__list');
		scope.next().remove();
		scope.remove();
		return;
    }
    
});