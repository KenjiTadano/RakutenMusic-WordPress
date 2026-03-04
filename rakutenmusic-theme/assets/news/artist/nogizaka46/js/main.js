$(function() {
  var src = document.currentScript.src;
  console.log(src);
  //   $.ajax({
  //     scriptCharset: "utf-8",
  //     url: [
  //       "https://24x7.app.rakuten.co.jp/engine/api/BooksTotal/Search/20170427?",
  //       "applicationId=books_20140611",
  //       "keyword=cd",
  //       "booksGenreId=002",
  //       "hits=30",
  //       "availability=1",
  //       "outOfStockFlag=0",
  //       "sort=sales",
  //       "field=0"
  //     ].join("&"),
  //     dataType: "jsonp",
  //     success: rankingCallBack,
  //     error: showError
  //   });
  //   function rankingCallBack(data) {
  //     scope = $("#page #items-cd .item-list .item__list");
  //     scope.empty();
  //     rank = 0;
  //     for (var i in data.Items) {
  //       itemPrice = data.Items[i].Item.itemPrice;
  //       if (itemPrice > 1500) {
  //         itemPrice = itemPrice.toLocaleString();
  //         itemUrl = data.Items[i].Item.itemUrl;
  //         smallImageUrl = data.Items[i].Item.smallImageUrl;
  //         smallImageUrl = smallImageUrl.split("64x64").join("200x200");
  //         title = data.Items[i].Item.title;
  //         title = title.split("?").join("��");
  //         artistName = data.Items[i].Item.artistName;
  //         artistName = String(artistName);
  //         rank++;
  //         if (rank > 4) {
  //           temp = '<li class="item__card js-toggle__target">';
  //         } else {
  //           temp = '<li class="item__card">';
  //         }
  //         if (rank < 11) {
  //           scope.append(
  //             [
  //               temp,
  //               '<figure class="item__card__image">',
  //               '<a href="' + itemUrl + '">',
  //               '<img src="' + smallImageUrl + '" alt="' + title + '">',
  //               "</a>",
  //               '<figcaption class="item__card__title">',
  //               '<a href="' + itemUrl + '">' + title + "</a>",
  //               "<p>" + artistName + "</p>",
  //               "<p>" + itemPrice + "蜀�(遞手ｾｼ) <b>騾∵侭辟｡譁�</b></p>",
  //               "</figcaption>",
  //               "</figure>",
  //               "</li>"
  //             ].join("")
  //           );
  //         }
  //       } else {
  //         continue;
  //       }
  //     }
  //   }
  //   $.ajax({
  //     scriptCharset: "utf-8",
  //     url: [
  //       "https://24x7.app.rakuten.co.jp/engine/api/BooksTotal/Search/20170427?",
  //       "applicationId=books_20140611",
  //       "keyword=dvd", //縲舌ち繧､繝�繧ｻ繝ｼ繝ｫ縲代ｒ陦ｨ遉ｺ縺励↑縺�◆繧√↓讀懃ｴ｢繝ｯ繝ｼ繝峨ｒ謖�ｮ�
  //       "booksGenreId=003",
  //       "hits=30",
  //       "availability=1",
  //       "outOfStockFlag=0",
  //       "sort=sales",
  //       "field=0",
  //       "NGKeyword=%E3%80%90%E3%82%BF%E3%82%A4%E3%83%A0%E3%82%BB%E3%83%BC%E3%83%AB%E3%80%91" //縲舌ち繧､繝�繧ｻ繝ｼ繝ｫ縲�
  //     ].join("&"),
  //     dataType: "jsonp",
  //     success: rankingCallBack02,
  //     error: showError
  //   });
  //   function rankingCallBack02(data) {
  //     scope = $("#page #items-dvd .item-list .item__list");
  //     scope.empty();
  //     rank = 0;
  //     for (var i in data.Items) {
  //       itemPrice = data.Items[i].Item.itemPrice;
  //       if (itemPrice > 1500) {
  //         //1,500蜀�ｻ･荳翫�蝠�刀
  //         itemPrice = itemPrice.toLocaleString();
  //         itemUrl = data.Items[i].Item.itemUrl;
  //         smallImageUrl = data.Items[i].Item.smallImageUrl;
  //         smallImageUrl = smallImageUrl.split("64x64").join("200x200");
  //         title = data.Items[i].Item.title;
  //         title = title.split("?").join("��");
  //         artistName = data.Items[i].Item.artistName;
  //         artistName = String(artistName);
  //         rank++;
  //         if (rank > 4) {
  //           temp = '<li class="item__card js-toggle__target">';
  //         } else {
  //           temp = '<li class="item__card">';
  //         }
  //         if (rank < 11) {
  //           scope.append(
  //             [
  //               temp,
  //               '<figure class="item__card__image">',
  //               '<a href="' + itemUrl + '">',
  //               '<img src="' + smallImageUrl + '" alt="' + title + '">',
  //               "</a>",
  //               '<figcaption class="item__card__title">',
  //               '<a href="' + itemUrl + '">' + title + "</a>",
  //               "<p>" + artistName + "</p>",
  //               "<p>" + itemPrice + "蜀�(遞手ｾｼ) <b>騾∵侭辟｡譁�</b></p>",
  //               "</figcaption>",
  //               "</figure>",
  //               "</li>"
  //             ].join("")
  //           );
  //         }
  //       } else {
  //         continue;
  //       }
  //     }
  //   }
  //   $.ajax({
  //     scriptCharset: "utf-8",
  //     url: [
  //       "https://24x7.app.rakuten.co.jp/engine/api/BooksTotal/Search/20170427?",
  //       "applicationId=books_20140611",
  //       "keyword=game", //縲舌ち繧､繝�繧ｻ繝ｼ繝ｫ縲代ｒ陦ｨ遉ｺ縺励↑縺�◆繧√↓讀懃ｴ｢繝ｯ繝ｼ繝峨ｒ謖�ｮ�
  //       "booksGenreId=006",
  //       "hits=30",
  //       "availability=1",
  //       "outOfStockFlag=0",
  //       "sort=sales",
  //       "field=0",
  //       "NGKeyword=%E3%80%90%E3%82%BF%E3%82%A4%E3%83%A0%E3%82%BB%E3%83%BC%E3%83%AB%E3%80%91" //縲舌ち繧､繝�繧ｻ繝ｼ繝ｫ縲�
  //     ].join("&"),
  //     dataType: "jsonp",
  //     success: rankingCallBack03,
  //     error: showError
  //   });
  //   function rankingCallBack03(data) {
  //     scope = $("#page #items-game .item-list .item__list");
  //     scope.empty();
  //     rank = 0;
  //     for (var i in data.Items) {
  //       itemPrice = data.Items[i].Item.itemPrice;
  //       if (itemPrice > 1500) {
  //         //1,500蜀�ｻ･荳翫�蝠�刀
  //         itemPrice = itemPrice.toLocaleString();
  //         itemUrl = data.Items[i].Item.itemUrl;
  //         smallImageUrl = data.Items[i].Item.smallImageUrl;
  //         smallImageUrl = smallImageUrl.split("64x64").join("200x200");
  //         title = data.Items[i].Item.title;
  //         title = title.split("?").join("��");
  //         label = data.Items[i].Item.label; //逋ｺ螢ｲ蜈�錐(CD縲．VD縲√ご繝ｼ繝�縲￣C)
  //         label = String(label); //逋ｺ螢ｲ蜈�錐(CD縲．VD縲√ご繝ｼ繝�縲￣C)
  //         hardware = data.Items[i].Item.hardware; //蟇ｾ蠢懈ｩ溽ｨｮ(繧ｲ繝ｼ繝�)
  //         hardware = String(hardware); //蟇ｾ蠢懈ｩ溽ｨｮ(繧ｲ繝ｼ繝�)
  //         rank++;
  //         if (rank > 4) {
  //           temp = '<li class="item__card js-toggle__target">';
  //         } else {
  //           temp = '<li class="item__card">';
  //         }
  //         if (rank < 11) {
  //           scope.append(
  //             [
  //               temp,
  //               '<figure class="item__card__image">',
  //               '<a href="' + itemUrl + '">',
  //               '<img src="' + smallImageUrl + '" alt="' + title + '">',
  //               "</a>",
  //               '<figcaption class="item__card__title">',
  //               '<a href="' + itemUrl + '">' + title + "</a>",
  //               "<p>" + label + "</p>",
  //               "<p>" + hardware + "</p>",
  //               "<p>" + itemPrice + "蜀�(遞手ｾｼ) <b>騾∵侭辟｡譁�</b></p>",
  //               "</figcaption>",
  //               "</figure>",
  //               "</li>"
  //             ].join("")
  //           );
  //         }
  //       } else {
  //         continue;
  //       }
  //     }
  //   }
  //   function showError() {
  //     scope = $(
  //       "#page #items-cd .item-list .item__list , #page #items-dvd .item-list .item__list , #page #items-game .item-list .item__list"
  //     );
  //     scope.next().remove();
  //     scope.remove();
  //     return;
  //   }
});
