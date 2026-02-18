var accountSetting = {};

accountSetting.useLog = true;
accountSetting.listingParamName = "scid,sclid,lsid";
accountSetting.campaignParamName = "scid,sclid";
accountSetting.defaultRSID = "rakutenbooksdev";
accountSetting.dynamicAccountSelection=true;
accountSetting.dynamicAccountList="rakutenbooksbooksmain=books.rakuten.co.jp,search.books.rakuten.co.jp,recommend.books.rakuten.co.jp,books.step.rakuten.co.jp,books.rakuten.ne.jp,books.support.rakuten.ne.jp,bookslottery.step.rakuten.co.jp,readee.rakuten.co.jp,music.rakuten.co.jp,music.r10s.jp;rakutenbooksdev=stg.magaviewer.books.rakuten.ne.jp";
accountSetting.serviceName = "books";
accountSetting.cookieDomainPeriods="3";
accountSetting.currencyCode = "JPY";
accountSetting.trackDownloadLinks = true;
accountSetting.trackExternalLinks = true;
accountSetting.usePrePlugins = true;
accountSetting.usePostPlugins = true;
accountSetting._internalSite = new Array();
accountSetting._internalSite[0] = "javascript:";
accountSetting._internalSite[1] = "order.step.rakuten.co.jp";
accountSetting._internalSite[2] = "ashiato.rakuten.co.jp";
accountSetting._internalSite[3] = "my.bookmark.rakuten.co.jp";
accountSetting._internalSite[4] = "review.rakuten.co.jp";
accountSetting._internalSite[5] = "item.rakuten.co.jp";
accountSetting._internalSite[6] = "books.rakuten.co.jp";
accountSetting._internalSite[7] = "books.faq.rakuten.co.jp";
accountSetting._internalSite[8] = "booksitem.recommend.rakuten.co.jp";
accountSetting._internalSite[9] = "rd.rakuten.co.jp";
accountSetting._internalSite[10] = "id.rakuten.co.jp";
accountSetting._internalSite[11] = "books.step.rakuten.co.jp";
accountSetting._internalSite[12] = "books.support.rakuten.ne.jp";
accountSetting._internalSite[13] = "bookslottery.step.rakuten.co.jp";
accountSetting._internalSite[14] = "readee.rakuten.co.jp";
accountSetting._internalSite[15] = "music.rakuten.co.jp";
accountSetting._internalSite[16] = "music.r10s.jp";

/*** DON'T TOUCH ***/
accountSetting.linkInternalFilters = accountSetting._internalSite.join(",");