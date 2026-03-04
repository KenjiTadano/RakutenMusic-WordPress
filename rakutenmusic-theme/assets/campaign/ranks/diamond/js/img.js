        var
            img        = $(".image"),  //対象の画像セレクタ
            imgSrc      = img.attr("src"), //画像ファイル名
            windowWidth = 0,                //ウィンドウサイズ保持用
            limitWidth  = 768;              //ウィンドウサイズ判定
	
$(window).on('load resize',function(){
	
            //windowの幅を再取得
            windowWidth = $(window).width();
	
            //画像ファイル名を置換
            if(windowWidth < limitWidth){
            imgSrc = imgSrc.replace("content.png", "content_sp.png");
            }
             else
           {
            imgSrc = imgSrc.replace("content_sp.png", "content.png");
            }
            //画像ファイル名を再セット
            img.attr({src:imgSrc});
    });