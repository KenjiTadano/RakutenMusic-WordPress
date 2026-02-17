/********** source:s_customTracking.js.txt ***********/
/* PRE-PLUGINS SECTION */
s.pathExcludeList="rbooks"
var do_PrePlugins = function() {
// your customized code is here
  //tracking code
  if(document.referrer.match(/sclid\=(.+)\&/))s.campaign=RegExp.$1

  //gtob
  s.eVar37=s.getQueryParam("gtob")

  //adult produstpage
  try{
  var ctg_id_href=document.getElementById("sc_cgy").innerHTML
  if(ctg_id_href.match(/adult/))sc_adult="true"
  }catch(e){}

  //page name
  var pn=s.getPageName().toLowerCase().replace(/\.[a-z]+$/,"")
  pn=pn.replace(":index","")
  if(!s.pageName&&!s.pageType)s.pageName=pn
  switch(s.pageName){
    case "search:result":
      if(location.pathname.match("/(g[0-9]{3,6})/(bathr|bpbls|dcst|dsll|cartst|csll|sos|ssll|ghrd|gsll|gathr|fpbls|fathr|mpbls|mrymd)"))s.pageName="bksearch:dt:"+RegExp.$1+":"+RegExp.$2
      else if(location.pathname.match("/bksearch/nm|/search/nm"))s.pageName="search:result"
      else if(location.pathname.match("/bksearch/anm|/search/anm"))s.pageName="search:result"
      else if(location.pathname.match("/bksearch/dt/|/search/dt/"))s.pageName=pn
      else if(location.pathname.match("/bksearch/adt/|/search/adt/"))s.pageName=pn
      else if(document.referrer.match("/(g[0-9]{3,6})/(bathr|bpbls|dcst|dsll|cartst|csll|sos|ssll|ghrd|gsll|gathr|fpbls|fathr|mpbls|mrymd)"))s.pageName="bksearch:dt:"+RegExp.$1+":"+RegExp.$2
      break
  }

  if(location.pathname.match("bksearch/anm|search/anm")||location.pathname.match("bksearch/adt|search/adt"))s.pageName=s.pageName+"[adult]"


  //productspage
  if(location.pathname.match(/-(\d+)\/item\//)){
    s.products=";"+RegExp.$1
    s.events=s.apl(s.events,"event1,prodView")
    if(window.sc_adult){
      s.pageName="item:detail[adult]"
      s.channel="item:detail[adult]"
    }else if(s.pageName!="item:detail[iPhone]"){
      s.pageName="item:detail"
      s.channel="item:detail"
    }
  }
  //productpage /rb/XXX 20120924
  if(location.pathname.match(/\/rb\/(\d+)\//)){
    s.events=s.apl(s.events,"event1,prodView")
  }
  //android pagename
  if(s.prop61.indexOf("Android")>-1&&s.pageName.indexOf("[iPhone]")>-1)s.pageName=s.pageName.replace("[iPhone]","[Android]")

  //prop21 devicetype!Upage
  s.prop21="["+s.prop61+"]"+s.pageName

  if(location.pathname.match(/\/rb\/item\/(\d+)\//))s.prop28=RegExp.$1
  if(location.pathname.match(/\/rb\/[^/]+\/item\/(\d+)\//))s.prop28=RegExp.$1
  if(location.pathname.match(/\/book\/(\d+)\//))s.prop28=RegExp.$1
  //20120924
  if(location.pathname.match(/\/rb\/(\d+)\//))s.prop28=RegExp.$1
  s.eVar28=s.prop28
  //channel
  if(!s.channel){
    var sec=s.pageName.split(":"),secL=sec.length
    if(secL>=2){
      s.channel=sec[0]+":"+sec[1]
    }else{
      s.channel=sec[0]
    }
    if(secL>=3){
      s.prop26=sec[0]+":"+sec[1]+":"+sec[2]
    }else{
      s.prop26=s.channel
    }
    if(secL>=4){
      s.prop27=sec[0]+":"+sec[1]+":"+sec[2]+":"+sec[3]
    }else{
      s.prop27=s.prop26
    }
    s.prop25=sec[0]
  }
  if(s.pageName.indexOf("bksearch")>-1)s.channel="bksearch"
  if(s.pageName.indexOf("event:pointup-campaign")>-1)s.channel="event:pointup-campaign"
  if(s.pageName.indexOf("event-sp")>-1)s.channel="event"


  //android channel
  if(s.prop61.indexOf("Android")>-1&&s.channel.indexOf("[iPhone]")>-1)s.channel=s.channel.replace("[iPhone]","[Android]")


  //prop23 devicetype!Usection
  s.prop23="["+s.prop61+"]"+s.channel

  //link handler
  if((s.server=="books.rakuten.co.jp"||s.pageName.match("bksearch:dt:"))&&s.pageName.match("item:detail")){
    var url=s.linkHandler("item.rakuten.co.jp|books.rakuten.co.jp")
    if(url.match(/item\.rakuten\.co\.jp\/book\/(\d+)/)){
      s.linkTrackVars="prop15,eVar16,events"
      s.linkTrackEvents="event5"
      s.events="event5"
      s.prop15=s.eVar16=s.pageName+"|"+RegExp.$1
    }
    if(url.match(/item\.rakuten\.co\.jp%2Fbook%2F(\d+)/)){
      s.linkTrackVars="prop15,eVar16,events"
      s.linkTrackEvents="event5"
      s.events="event5"
      s.prop15=s.eVar16=s.pageName+"|"+RegExp.$1
    }
    if(url.match(/\/rb\/(\d+)\//)){
      s.linkTrackVars="prop15,eVar16,events"
      s.linkTrackEvents="event5"
      s.events="event5"
      s.prop15=s.eVar16=s.pageName+"|"+RegExp.$1
    }
    if(url.match(/\/rb\/[^/]+\/item\/(\d+)\//)){
      s.linkTrackVars="prop15,eVar16,events"
      s.linkTrackEvents="event5"
      s.events="event5"
      s.prop15=s.eVar16=s.pageName+"|"+RegExp.$1
    }
  }

  //link handler event:e-book:application
    var url_app = s.linkHandler('r10.to/kobo_iOS_App|r10.to/koboAndroidApp|download.kobobooks.com/desktop/RakutenBooks/');

    if (new RegExp("r10.to/kobo_iOS_App").test(url_app)){
      s.linkTrackVars = "eVar32";
      s.eVar32 = "iPhone App DL link";
    }
    if (new RegExp("r10.to/koboAndroidApp").test(url_app)){
      s.linkTrackVars = "eVar32";
      s.eVar32 = "Android App DL link";
    }
    if (new RegExp("download.kobobooks.com/desktop/RakutenBooks/KoboSetup.exe").test(url_app)){
      s.linkTrackVars = "eVar32";
      s.eVar32 = "Windows DL link";
    }
    if (new RegExp("download.kobobooks.com/desktop/RakutenBooks/KoboSetup.dmg").test(url_app)){
      s.linkTrackVars = "eVar32";
      s.eVar32 = "Mac DL link";
    }

  //20131130e-book
  if(typeof jQuery !== 'undefined') {
    var $ = jQuery;
    var koboFlag = false;

    if ((!trackingParam.prop38)&&(!s.prop38)) {
      if ((location.href.indexOf('books.step.rakuten.co.jp') === -1 )&&( location.href.indexOf('sp.books.step.rakuten.co.jp') === -1)&&(( location.href.indexOf('search.books.rakuten.co.jp') === -1)||( location.href.indexOf('books.rakuten.co.jp/search') === -1))&&( location.href.indexOf('sp.bookslottery.step.rakuten.co.jp') === -1)) {

        koboFlag = location.pathname.indexOf('e-book') !== -1 || $('.searchBoxGr.ebook').length !== 0 || $('.searchBoxGr.ebook.adult').length !== 0 || $('.purchase-box-kobo.is-ebook-only').length !== 0;

        if (koboFlag) {
          s.prop38 = "kobo";
        } else if (location.pathname === '/') {
          s.prop38 = "books|kobo";
        } else {
          s.prop38 = "books";
        }
      }
    }
  } else {
    var koboFlag = false;

    if ((!trackingParam.prop38)&&(!s.prop38)) {
      if ((location.href.indexOf('books.step.rakuten.co.jp') === -1 )&&( location.href.indexOf('sp.books.step.rakuten.co.jp') === -1)&&(( location.href.indexOf('search.books.rakuten.co.jp') === -1)||(location.href.indexOf('books.rakuten.co.jp/search') === -1))&&( location.href.indexOf('sp.bookslottery.step.rakuten.co.jp') === -1)) {

        koboFlag = location.pathname.indexOf('e-book') !== -1 || document.getElementsByClassName('searchBoxGr ebook').length !== 0 || document.getElementsByClassName('searchBoxGr ebook adult').length !== 0 || document.getElementsByClassName('purchase-box-kobo is-ebook-only').length !== 0;

        if (koboFlag) {
          s.prop38 = "kobo";
        } else if (location.pathname === '/') {
          s.prop38 = "books|kobo";
        } else {
          s.prop38 = "books";
        }
      }
    }
  }

  //TOP 20131217
  if(location.pathname === '/'){
    if((!s.pageName)&&(!s.channel)) {
    s.pageName = "top"
    s.channel = "top"
    }
  }

  //Get source element
  if(s.pageName.match("item:detail")){
    try{
      var sc_genreCateTag=document.getElementById("topicPath").innerHTML
      if(sc_genreCateTag.match(/(g[0-9]{9})/))sc_genreCategory=RegExp.$1
      else if(sc_genreCateTag.match(/(g[0-9]{6})/))sc_genreCategory=RegExp.$1
      else if(sc_genreCateTag.match(/co\.jp\/([a-z]+)/))sc_genreCategory=RegExp.$1
    }catch(e){}
    try{
      var sc_genreCategory
      var sc_genreCateTag=document.getElementById("topicPath").innerHTML
      if(sc_genreCateTag.match(/(g[0-9]{9})/)){
        sc_genreCategory=RegExp.$1
      }else if(sc_genreCateTag.match(/(g[0-9]{6})/)){
        sc_genreCategory=RegExp.$1
      }else if(sc_genreCateTag.match(/co\.jp\/([a-z]+)/)){
        sc_genreCategory=RegExp.$1
      }else{
        sc_genreCategory="NA"
      }

      var sc_stock=""
      try{
      var sc_stock_id
      var sc_stock_str=escape(document.getElementById("sc_stock").innerHTML)
      sc_stock_str=escape(document.getElementById("sc_stock").innerHTML)
      if(sc_stock_str.match(/p%20id%3D%22s([a-z0-9]+)%22/))sc_stock_id=RegExp.$1
      if(sc_stock_id){
        sc_stock=":"+sc_stock_id
      }else{
        if(sc_stock_str.match(/2%u65E5%u4EE5%u5185/)){
          sc_stock=":1b"
        }else if(sc_stock_str.match(/%u5EAB%u3042%u308A/)){
          sc_stock=":1a"
        }else if(sc_stock_str.match(/3%u65E5%u4EE5%u5185/)){
          sc_stock=":2"
        }else if(sc_stock_str.match(/6%u65E5%u4EE5%u5185/)){
          sc_stock=":3"
        }else if(sc_stock_str.match(/2%u9031/)){
          sc_stock=":10"
        }else if(sc_stock_str.match(/%u78BA%u8A8D/)){
          sc_stock=":11"
        }else if(sc_stock_str.match(/3%u9031/)){
          sc_stock=":14"
        }else if(sc_stock_str.match(/%u5207%u308C\*/)){
          sc_stock=":22"
        }else if(sc_stock_str.match(/%u5207%u308C/)){
          sc_stock=":21"
        }else if(sc_stock_str.match(/%u4EE5%u964D/)){
          sc_stock=":34"
        }else if(sc_stock_str.match(/%u4ED8%u4E2D/)){
          sc_stock=":30"
        }else if(sc_stock_str.match(/%u4ED8%u7D42/)){
          sc_stock=":31"
        }else if(sc_stock_str.match(/%u8377%u4E88/)){
          sc_stock=":35"
        }else{
          sc_stock=":NA"
        }
      }
      }catch(e){}
      var sc_noimg=""
      try{
      var sc_noimg_str=document.getElementById("productExtra").innerHTML
      if(sc_noimg_str.match(/noimage_01\.gif/)){
        sc_noimg=":noimg"
      }else{
        sc_noimg=":img"
      }
      }catch(e){}
      s.eVar23=sc_genreCategory+sc_stock+sc_noimg
      if(s.pageName.indexOf("[iPhone]")>-1)s.eVar23="[iPhone]"+s.eVar23
      if(s.pageName.indexOf("[Android]")>-1)s.eVar23="[Android]"+s.eVar23
    }catch(e){}
    try{
      var ctg_id_href=document.getElementById("sc_cgy").innerHTML
      if(ctg_id_href.match(/goods_icon_([a-z]+).gif/))s.eVar26=RegExp.$1
      if(ctg_id_href.match(/main\/icon\/icon_([\w]+)_64/))s.eVar26=RegExp.$1
    }catch(e){}
  }

  //add categoly to l-id at itempage
  if(s.pageName.match("item:detail")&&s.eVar15&&s.eVar15.match(/h-text/))s.eVar15="["+s.eVar26+"]"+s.eVar15

  //search times
  if(s.channel!="search"&&document.referrer.match("/search.books.rakuten.co.jp/|/books.rakuten.co.jp/search/")){
    if(s.events){s.events+=",event2"}
    else{s.events="event2"}
  }
  if(s.channel!="search"&&document.referrer.match("/search.books.rakuten.co.jp/|/books.rakuten.co.jp/search/")&&s.pageName.match(/item:detail/)){
    if(s.events){s.events+=",event3"}
    else{s.events="event3"}
  }

  //cookie
  s.prop13=s.getCk("BooksOEM")?"BooksOEM-true":"BooksOEM-false"

  //visit time
  try{
    s.prop30=s.eVar30=s.getTimeParting("h")
    s.prop31=s.eVar31=s.getTimeParting("d")
  }catch(e){}

  //products
  if(location.hostname.match(/step\.rakuten\.co\.jp/)&&s.products&&s.products.match(/^;/)){
    s.products=s.products.replace(/^;/,"")
    s.products=s.products.replace(/,;/g,",")
  }

  //suggest
  var bks_parts=s.c_r("bks_parts")
  var src_gn="search"
  if(s.eVar24)src_gn=s.eVar24.slice(0, 10);
  if(s.pageName.indexOf("kmerch")<1&&s.channel.indexOf("search")>-1&&bks_parts=="suggest"){
    s.pageName+=":"+bks_parts
    s.events=s.apl(s.events,"event20")
    s.eVar20="suggest:"+src_gn
    s.channel=s.channel+":suggest"
  }else if(s.channel.indexOf("search")>-1){
    s.eVar20=src_gn
  }
  if(s.eVar20&&s.pageName.indexOf("[iPhone]")>-1)s.eVar20+="[iPhone]"
  if(s.eVar20&&s.pageName.indexOf("[Android]")>-1)s.eVar20+="[Android]"
  if(s.patsFlag==false)s.c_w("bks_parts","","")

  // 2016.02.03 DA-65, KOBOBOOKS-700: Send an array of data: Recommendation carousel tracking
  s.sendSTL = function(variables, events, friendlyName, linktype) {
    try {
          // populates s.linkTrackVars, s.eVarX, s.propY, etc.
          for (parameter in variables) {

            if (variables.hasOwnProperty(parameter)) {
                    if (s.linkTrackVars === 'None') {
                        s.linkTrackVars = parameter;
                    } else {
                        s.linkTrackVars += ',' + parameter;
                    }
                    s[parameter] = variables[parameter];
              }
          }

          // populates s.linkTrackEvents, append 'events' to s.linkTrackVars if any events
          if (events) {
            if (s.linkTrackVars === 'None') {
                    s.linkTrackVars = 'events';
                } else {
                    s.linkTrackVars += ',' + 'events';
                }

                var len = events.length;
                for (var i = 0; i < len; i++) {

                  if (s.linkTrackEvents === 'None') {
                      s.linkTrackEvents = events[i];
                  } else {
                      s.linkTrackEvents += ',' + events[i];
                  }

                  if (!s.events) {
                    s.events = events[i];
                  } else {
                    s.events += ',' + events[i];
                  }
                }
          }

          linktype = linktype || "o";
          friendlyName = friendlyName || "Books_CustomSTL";

          s.tl(this, linktype, friendlyName);

          s.linkTrackVars = 'None';
          s.linkTrackEvents = 'None';
    } catch (e) {
      return;
    }
    };

    //finding metod v14 v36
  if(s.server.indexOf("books.rakuten.co.jp")>-1&&s.pageName.indexOf("item:detail")==-1){
    s.eVar36=s.pageName
    s.eVar14=s.channel
  }

  if(s.eo||s.lnk)return""
  //visit start
  if(s.getVisitStartOld("event21","event22")=="y"){
    s.eVar22=s.pageName
    //referrer type
    s.s_campaign=s.campaign
    if(s.getQueryParam("sclid"))s.campaign="cm_paid"
    s.objCM=s.channelManagerOld()
    s.objCM.keyword=s_rep(s.objCM.keyword,"+"," ")
    if(s.objCM){
      s.eVar33=s.objCM.channel?s.objCM.channel:""
      if(s.eVar33=="Paid"){
        s.eVar33+=":"+s.objCM.partner
        s.eVar17=s.s_campaign.charAt(0)+":"+s.objCM.keyword
      }else if(s.eVar33=="Natural"){
        s.eVar33+=":"+s.objCM.partner
        s.eVar18=s.objCM.keyword
        //temporary for GINZA
        s.eVar55=s.objCM.partner
        s.eVar56=s.objCM.keyword
        s.eVar58=s.server
      }else if(s.eVar33=="Other Websites"){
        if(s.getRefGroupsite()=="y")s.eVar33="Group"
        var refd=s.objCM.referringDomain.split("/")
        if(refd[0].match(/mail\d*\./)){
          s.eVar33="Other Websites:Webmail"
        }else if(refd.length>=3&&refd[1]){
          s.eVar33+=":"+refd[0]+"/"+refd[1]
        }else{
          s.eVar33+=":"+refd[0]
        }
      }
      s.prop33=s.eVar71="D=v33"
      s.eVar72=s.eVar33
      if(s.eVar72.match(/Group:/))s.eVar72=""
      s.eVar74="D=v22"
    }
    s.campaign=s.s_campaign
  }

  //eVar46
  try{
  if(s.getVisitStart()=="y"){
    if(!s.objCM){
      s.eVar46="Direct Load"
    }else{
      s.eVar46=s.objCM.channel?s.objCM.channel:""
      if(s.eVar46=="Paid"){
          s.eVar46+=":"+s.objCM.partner
      }else if(s.eVar46=="Natural"){
        s.eVar46+=":"+s.objCM.partner
      }else if(s.eVar46=="Other Websites"){
        if(s.getRefGroupsite()=="y")s.eVar46="Group"
        var refd=s.objCM.referringDomain.split("/")
        if(refd[0].match(/mail\d*\./)){
          s.eVar46="Other Websites:Webmail"
        }else if(refd.length>=3&&refd[1]){
          s.eVar46+=":"+refd[0]+"/"+refd[1]
        }else{
          s.eVar46+=":"+refd[0]
        }
      }
    }
  }
  if(s.eVar46){
    s.eVar46=s.eVar46.split("/")[0]
    if(s.eVar46.match(/Other Websites/))s.eVar46="Other Websites"
    if(s.eVar46.match(/Email/))s.eVar46="Email"
  }
  }catch(e){}

  if(s.events&&s.events.match(/purchase/)){
    s.events+=",event71"
    s.eVar49=s.prop50+":"+"purchase"
    s.CvRepeatSet(8)
  }

  //eVar13 get rank and relation in item page 20120705
  //if(s.pageName.indexOf("item:detail")>-1){
  //  if(document.getElementById("ScItemRelation")&&document.getElementById("ScItemRank")){
  //    s.eVar13="rel_rank"
  //  }else if(document.getElementById("ScItemRelation")){
  //    s.eVar13="rel"
  //  }else if(document.getElementById("ScItemRank")){
  //    s.eVar13="rank"
  //  }
  //}

  //eVar21 lsid
  s.eVar21= s.getQueryParam("lsid")

  //prop22
  if(!s.prop22)s.prop22="D=pageName"
  if(s.eVar6&&s.eVar6=="book")s.eVar6==""

  //eVar7
  if(s.channel!="search"&&document.referrer.match("/search.books.rakuten.co.jp/|/books.rakuten.co.jp/search/")){
    if(s.eVar7=="item"){s.eVar7="search_to_item"}
  }
}
  //prop20
  s.prop20=s.getQueryParam("cid")

  //prop11
  s.prop11="D=v9"

  //eVar26
  s.eVar26 = s.getQueryParam("s-id")


/* POST-PLUGINS SECTION */
var do_PostPlugins = function() {
// your customized code is here
  //copy v15 to v13
  s.eVar13="D=v15"

  // for MST global tracking
  if(!s.eo&&!s.lnk&&!s.pageType&&!s.un.match(/dev/)&&!s.un.match(/rakutenglobal/)){
    if(s.campaign.match(/_gmx/)||s.campaign.match(/_upc/)||s.eVar49){s.un=s.apl(s.un,"rakutenglobalprod")}
  }

  /*
    * Get tag value by its id
    */
    s.getTagValById = function(tagId) {
        var tag = document.getElementById(tagId);
        if (tag && tag.value) {
            return tag.value;
        }
    };

    s._ABTest = s.getTagValById("ralTarget") || s.getTagValById("scABTest");
    if (s._ABTest) {
        s.prop52 = window.location.pathname + "|" + s._ABTest;
    };

}


/* CUSTOM-PLUGIN SECTION */
/*
 * Plugin: lidTrack0.1 - Custom Link for Rakuten group
 */
 s.lidTrack = new Function("lidv",""
+" s.linkTrackVars='eVar6,eVar15,eVar13';"
+" s.eVar15=s.pageName+'|'+lidv;"
+" s.eVar13='D=v15';"
+" s.tl(this,'o',s.eVar15);")
 s.lidTrackE28 = new Function("lidv",""
+" s.linkTrackVars='eVar15,eVar13,eVar27,events';"
+" s.linkTrackEvents='event28';"
+" s.eVar15=lidv;"
+" s.eVar13='D=v15';"
+" s.eVar27=s.eVar29+'_if-wc';"
+" s.events='event28';"
+" s.tl(this,'o',s.eVar15);")
 s.lidTrackE29 = new Function("lidv",""
+" s.linkTrackVars='eVar15,eVar13,eVar27,events';"
+" s.linkTrackEvents='event29';"
+" s.eVar15=lidv;"
+" s.eVar13='D=v15';"
+" s.eVar27=s.eVar29+'_if-tc';"
+" s.events='event29';"
+" s.tl(this,'o',s.eVar15);")
 s.lidTrackE30 = new Function("lidv",""
+" s.linkTrackVars='eVar15,eVar13,eVar27,events';"
+" s.linkTrackEvents='event30';"
+" s.eVar15=lidv;"
+" s.eVar13='D=v15';"
+" s.eVar27=s.eVar29+'_rel-wc';"
+" s.events='event30';"
+" s.tl(this,'o',s.eVar15);")

/*
 * parts cookie
 */

function s_partsCounter(parts){
    s.patsFlag=true
    s.c_w("bks_parts",parts,"")
}

/*
 * Plugin: getTimeParting 1.5r - Set timeparting values based on time zone (30 min)
 * DST disabled
 */
s.getTimeParting=new Function("t",""
+"dc=new Date('1/1/2000');var f=15;var ne=8;var y=new Date().getFullYe"
+"ar();var z=9;if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not A"
+"vailable'}else{;z=parseInt(z);if(y=='2009'){f=8;ne=1};gmar=new Date"
+"('3/1/'+y);dsts=f-gmar.getDay();gnov=new Date('11/1/'+y);dste=ne-gno"
+"v.getDay();spr=new Date('3/'+dsts+'/'+y);fl=new Date('11/'+dste+'/'+"
+"y);cd=new Date();"
+"if(cd>spr&&cd<fl){z=z}else{z=z};utc=cd.getTime()+(cd.getTimezoneO"
+"ffset()*60000);tz=new Date(utc + (3600000*z));thisy=tz.getFullYear("
+");var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Fr"
+"iday','Saturday'];if(thisy!=y){return'Data Not Available'}else{;thi"
+"sh=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();var dow="
+"days[thisd];var ap='AM';var dt='Weekday';var mint='00';if(thismin>30"
+"&&thismin<60){mint='30'}"
+"if(thish>=12){ap='PM';thish=thish-12};if (thish==0){th"
+"ish=12};if(thisd==6||thisd==0){dt='Weekend'};var timestring=thish+'"
+":'+mint+ap;var daystring=dow;var endstring=dt;if(t=='h'){return tim"
+"estring}if(t=='d'){return daystring};if(t=='w'){return en"
+"dstring}}};");

/*
 * Plugin: getVisitStartOld (2010.04.13)
 * requries: Rakuten Visit 1.0, s.getCk, s.setCk, s.prop50, s.apl
 */
s.internalSite="ichiba,kuji,login";
s.getVisitStartOld=function(e1,e2){s.gvRetval="y";s.chkRef=document.referrer.replace(/\?.*?$/,"");if(s.chkRef){s.chkFilt=s.linkInternalFilters.split(",");for(s.rIdx=0;s.rIdx<s.chkFilt.length;s.rIdx++){if(s.chkRef.indexOf(s.chkFilt[s.rIdx])>-1){s.gvRetval="n";break}}}else{s.chkInt=s.internalSite.split(",");s.gvPrevsite=s.getCk("s_prevsite");if(s.gvPrevsite){if(s.gvPrevsite==s.prop50){s.gvRetval="n"}else{for(s.rIdx=0;s.rIdx<s.chkInt.length;s.rIdx++){if(s.gvPrevsite==s.chkInt[s.rIdx]){s.gvRetval="n";break}}}}}if(!s.eo&&!s.lnk){if(s.gvRetval=="y"){s.events=s.apl(s.events,e1,",",1);s.setCk("s_landed","1",0)}else if(s.getCk("s_landed")=="1"){s.events=s.apl(s.events,e2,",",1);s.setCk("s_landed","2",0)}}return s.gvRetval}

/*
 * Plugin: linkHandler 0.5 - identify and report custom links
 */
s.linkHandler=new Function("p","t",""
+"var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
+"ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
+"substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
+"e=l=='[['?'':l;s.linkType=t;return h;}return '';");
s.p_gn=new Function("t","h",""
+"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+"return 0;");

/*
 * Plugin: Member Plugin 1.1
 * requires: getCk, setCk
 */
s.MemberRankGet=function(){s.initMrcr();s.mrRetval="";switch(s.s_mrcrArr[0]){case"1":s.mrRetval="nonmember";break;case"2":s.mrRetval="regular";break;case"3":s.mrRetval="silver";break;case"4":s.mrRetval="gold";break;case"5":s.mrRetval="platinum";break}return s.mrRetval};
s.MemberRankSet=function(v){s.initMrcr();if(v=="2"||v=="3"||v=="4"||v=="5"){s.s_mrcrArr[0]=v;s.saveMrcr()}};
s.CvRepeatGet=function(v){s.initMrcr();s.crRetval="0";if(s.s_mrcrArr[v-1]){s.crRetval=s.s_mrcrArr[v-1]}return s.crRetval};
s.CvRepeatSet=function(v){s.initMrcr();s.s_mrcrArr[v-1]="1";s.saveMrcr()};
s.GenderAgeGet=function(){s.initMrcr();s.gaRetval="100";if(s.s_mrcrArr[1]&&s.s_mrcrArr[2]&&s.s_mrcrArr[3]){s.gaRetval=s.s_mrcrArr[1]+s.s_mrcrArr[2]+s.s_mrcrArr[3]}return s.gaRetval};
s.GenderAgeSet=function(v){s.initMrcr();if(v.length==3){if(v.charAt(0)!="1"){s.s_mrcrArr[1]=v.charAt(0)}if(v.substring(1,3)!="00"){s.s_mrcrArr[2]=v.charAt(1);s.s_mrcrArr[3]=v.charAt(2)}}s.saveMrcr()};
s.initMrcr=function(){if(!s.s_mrcrArr){s.s_mrcrArr=new Array();s.s_mrcr=s.getCk("s_mrcr");s.s_mrcrPre=s.s_mrcr.substring(0,4);s.s_mrcrHex=s.s_mrcr.substring(4);s.s_mrcrBin0="";s.s_mrcrBin1="";s.s_mrcrBin2="";s.s_mrcrBin3="";if(s.s_mrcrHex){s.s_mrcrHexArr=s.s_mrcrHex.split("|");s.s_mrcrBin0=parseInt(s.s_mrcrHexArr[0],16).toString(2);s.s_mrcrBin1=parseInt(s.s_mrcrHexArr[1],16).toString(2);s.s_mrcrBin2=parseInt(s.s_mrcrHexArr[2],16).toString(2);s.s_mrcrBin3=parseInt(s.s_mrcrHexArr[3],16).toString(2);s.s_mrcr=s.s_mrcrPre+s.s_mrcrBin0.substring(1);s.s_mrcr=s.s_mrcr+s.s_mrcrBin1.substring(1);s.s_mrcr=s.s_mrcr+s.s_mrcrBin2.substring(1);s.s_mrcr=s.s_mrcr+s.s_mrcrBin3.substring(1)}if(s.s_mrcr){for(s.s_mrcri=0;s.s_mrcri<s.s_mrcr.length;s.s_mrcri++){s.s_mrcrArr.push(s.s_mrcr.charAt(s.s_mrcri))}}else{s.s_mrcrArr.push("1");s.s_mrcrArr.push("1");s.s_mrcrArr.push("0");s.s_mrcrArr.push("0");for(s.s_mrcri=4;s.s_mrcri<200;s.s_mrcri++){s.s_mrcrArr.push("0")}s.saveMrcr()}}};
s.saveMrcr=function(){s.s_mrcrPreWrite=s.s_mrcrArr[0]+s.s_mrcrArr[1]+s.s_mrcrArr[2]+s.s_mrcrArr[3];s.s_mrcrBinWrite0="1";s.s_mrcrBinWrite1="1";s.s_mrcrBinWrite2="1";s.s_mrcrBinWrite3="1";for(s.s_mrcri=4;s.s_mrcri<s.s_mrcrArr.length;s.s_mrcri++){if(s.s_mrcri<50){s.s_mrcrBinWrite0=s.s_mrcrBinWrite0+s.s_mrcrArr[s.s_mrcri]}else if(s.s_mrcri>=50&&s.s_mrcri<100){s.s_mrcrBinWrite1=s.s_mrcrBinWrite1+s.s_mrcrArr[s.s_mrcri]}else if(s.s_mrcri>=100&&s.s_mrcri<150){s.s_mrcrBinWrite2=s.s_mrcrBinWrite2+s.s_mrcrArr[s.s_mrcri]}else{s.s_mrcrBinWrite3=s.s_mrcrBinWrite3+s.s_mrcrArr[s.s_mrcri]}}s.s_mrcrHexWrite=parseInt(s.s_mrcrBinWrite0,2).toString(16);s.s_mrcrHexWrite=s.s_mrcrHexWrite+"|"+parseInt(s.s_mrcrBinWrite1,2).toString(16);s.s_mrcrHexWrite=s.s_mrcrHexWrite+"|"+parseInt(s.s_mrcrBinWrite2,2).toString(16);s.s_mrcrHexWrite=s.s_mrcrHexWrite+"|"+parseInt(s.s_mrcrBinWrite3,2).toString(16);s.s_mrcrWrite=s.s_mrcrPreWrite+s.s_mrcrHexWrite;s.setCk("s_mrcr",s.s_mrcrWrite,1825)};

/*
 * Plugin: ChannelManager 1.5
 */
s.___se="{'Paid':{p:['cm_paid|'Y%':{^p=','va=|~.y%.co>,'G`':{^q=|~.g`"
+".','g`syndication*>,'Biglobe':{^q=|~$.biglobe.ne.jp>,'Goo':{^MT=|~g"
+"oo.ne.jp>,'Bing':{^q=|~www.bing*>,'Nifty':{^q=','Text=|~$.nifty*>,'"
+"Excite':{^$=','s=|~excite.co.jp>,'Infoseek':{^qt=|~infoseek.co.jp>,"
+"'Livedoor':{^q=|~$.livedoor*>,'Baidu':{^wd=','s=|~baidu.>,'Naver':{"
+"^q=',';=|~$.naver.>,'FreshEye':{^ord=','kw=|~$.fresheye*>,'So-net':"
+"{^;=|~so-net.ne.jp/$>,'Overture':{^Keywords=|~overture*>,'Mobagee S"
+"earch':{^q=|~s.mbga.jp>,'Crooz':{^;=|~crooz.jp>,'Au One':{^q=|~$.au"
+"one.jp>,'WAKWAK':{^MT=|~wakwak*>,'Aladdin':{^key=|~$.$.jp>,'Froute'"
+":{^k=|~froute.jp>,'Searchteria':{^p=|~ad.$teria.co.jp>,'Mooter':{^<"
+"s=|~mooter.co.jp/moot>,'Mars Flag':{^phrase=|~marsflag*/$>,'Sagool'"
+":{^q=|~sagool.jp>,'Ask':{^q=|~ask.jp>,'Oh New':{^k=|~ohnew.co.jp>,'"
+"Rakuten Toolbar':{^qt=|~web$.rakuten.co.jp>},'AD:External':{p:['we_"
+">,'Email:Internal':{p:['mi_>,'Email':{p:['me_>,'Affiliate':{p:['af_"
+">,'ContentMatch':{p:['cn_>,'Rakuten Toolbar':{p:['tb_>}";
s.__se = new Function(""
+"var l={'~':'tl:[\\'','^': 'kw:[\\'','%': 'ahoo','|': '\\'],','>': '"
+"\\']}','*': '.com','$': 'search',';':'query','#':'land','`':'oogle'"
+",'+':'http://www','<':'keyword'};var f=this.___se+'';var g='';for(v"
+"ar i=0;i<f.length;i++){if(l[f.substring(i,i+1)]&&typeof l[f.substri"
+"ng(i,i+1)]!='undefined'){g+=l[f.substring(i,i+1)];}else{g+=f.substr"
+"ing(i,i+1);}}return eval('('+g+')');");
s.isEntry=function(){return 1};
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");
s.channelManagerOld=new Function("p","f",""
+"var dl='Direct Load',nr='No Referrer',ow='Other Websites';if(!this."
+"p_fo('cm')) {return -1;}if(!this.isEntry()){return 0;}var s=this,r="
+"s.referrer||typeof s.referrer!='undefined'?s.referrer:document.refe"
+"rrer,e,k,c,w,_b=0,url=s.pageURL?s.pageURL:s.wd.location,url=url+'',"
+"rf='';s.__se=s.__se();var br=0;var ob=new Object;ob.debug=function("
+"m){if(f){f(m);}};ob.channel='';ob.keyword='';ob.partner='';ob.toStr"
+"ing=function(ar){var str='';var x=0;for(x in ar){str+=ar[x]+':\\\''"
+"+ob[ar[x]]+'\\\',';}str='{'+str.substring(0,str.length-1)+'}';retur"
+"n str;};ob.referrer=r?r:nr;ob.getReferringDomain=function(){if(this"
+".referrer==''){return '';}if(r&&typeof r!='undefined'){var end=r.in"
+"dexOf('?') >-1?r.indexOf('?'):r.substring(r.length-1,r.length)=='/'"
+"?r.length-1:r.length;var start=r.indexOf('://')>-1?r.indexOf('://')"
+"+3:0;return r.substring(start,end);}else{return nr;}};ob.clear=func"
+"tion(ar){var x=0;for(x in ar){this[ar[x]]='';}this.referringDomain="
+"this.getReferringDomain();};ob.referringDomain=ob.getReferringDomai"
+"n();ob.campaignId=''; ob.isComplete=function(){var ar=['channel','k"
+"eyword','partner','referrer','campaignId'];for(var i=0;i<ar.length;"
+"i++){if(!ob[ar[i]]){return 0;}}if(p&&s.c_r('cmm')==ob.toString(ar))"
+"{this.debug('Duplicate');this.clear(ar);return 1;}else if(p){s.c_w("
+"'cmm',ob.toString(ar));return 1;}return 1;};ob.matcher=function(u,x"
+"){if(!u){return false;}if(typeof s.__se[u].i!='undefined'&&(s.campa"
+"ign||s.getQueryParam&&s.getQueryParam(ids[x]))){ob.campaignId=s.get"
+"QueryParam(ids[x]);return true;}else if(typeof s.__se[u].p!='undefi"
+"ned' &&(s.campaign||s.getQueryParam&&s.getQueryParam&&s.getQueryPar"
+"am(ids[x].substring(0,ids[x].indexOf('='))))){var _ii=ids[x].substr"
+"ing(ids[x].indexOf('=') +1,ids[x].length);var _id=s.campaign||s.get"
+"QueryParam(ids[x].substring(0,ids[x].indexOf('=')));if (_ii==_id.su"
+"bstring(0,_ii.length)){ob.campaignId=_id;return true;}}else{return "
+"false;}};var ids='';var _p='';for(var i in s.__se){if(_p){break;}fo"
+"r(var j in s.__se[i]){if(!(j=='p' ||j=='i')){_p=i;}}}for(var u in s"
+".__se[_p]){if(u!='i' &&u!='p'){for(var h=0;h<s.__se[_p][u].tl.lengt"
+"h;h++){if(s.__se[_p][u].tl[h]&&typeof s.__se[_p][u].tl[h]=='string'"
+"){if(r.indexOf(s.__se[_p][u].tl[h])!=-1){ob.partner=u;br=1;break;}}"
+"if(br){break;}}}else {ids=s.__se[_p][u];}if(br){for(var i=0;i<s.__s"
+"e[_p][ob.partner].kw.length;i++){if(s.__se[_p][u].kw[i]&&typeof s._"
+"_se[_p][u].kw[i]=='string') {var kwd=s.__se[_p][u].kw[i].substring("
+"0,s.__se[_p][u].kw[i].length-1);"
+"try{ob.keyword=s.getQueryParam?s.getQue"
+"ryParam(kwd,'',decodeURIComponent(r)):'';}catch(e){"
+"if(ob.partner==\'Infoseek\'){"
+"if(r.match(/[?&]qt=([^&]*)/)){"
+"ob.keyword=decodeURIComponent(r.match(/[?&]qt=([^&]*)/)[1]);}"
+"}else{ob.keyword='Not UTF-8';}}"
+"if(ob.keyword){break;}}}for(var x=0;x<ids.le"
+"ngth;x++){if(ob.matcher(_p,x)){ob.channel=_p;if(!ob.keyword){ob.key"
+"word='n/a'; }break;}};if(!ob.channel){ob.channel='Natural'; ob.camp"
+"aignId='n/a'; }break;}}if(ob.isComplete()){return ob;}for(var _u in"
+" s.__se){if(_u==_p){continue;}for(var u in s.__se[_u]){ids=s.__se[_"
+"u][u];for(var x=0;x<ids.length;x++){if(ob.matcher(_u,x)){ob.channel"
+"=_u;ob.partner=_u;ob.keyword='n/a'; break;}}if(ob.isComplete()){ret"
+"urn ob;}}}if(ob.isComplete()){return ob;}if(ob.referrer&&(ob.referr"
+"er!=nr)){ob.channel=ow;ob.partner=ow;ob.keyword='n/a'; ob.campaignI"
+"d='n/a'; }if(ob.isComplete()){return ob;}ob.channel=dl;ob.partner=d"
+"l;ob.keyword='n/a';ob.campaignId='n/a';return ob;");

/*
 * Utility Function: join: 1.0 - s.join(v,p)
 *  v - Array (may also be array of array)
 *  p - formatting parameters (front, back, delim, wrap)
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Utility Function: p_c
 */
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");

/*
 * Utility Function: p_gh
 */
s.p_gh=new Function(""
+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/* CODE SECTION - DON'T TOUCH BELOW */
if(s.usePrePlugins)s.doPrePlugins = do_PrePlugins;
if(s.usePostPlugins)s.doPostPlugins = do_PostPlugins;

/************* To Stop Google Preview From Being Counted *************/
if(navigator.userAgent.match(/Google Web Preview/i)){
  s.t=new Function();
  s.tl=new Function();
}
