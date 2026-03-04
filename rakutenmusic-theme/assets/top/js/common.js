$(function() {
  // =================
  // slide banner
  // =================
  unwrapFlug = false;
  function unwrapFunc() {
    $(".s-campaign-list .heading").remove();
    $(".s-campaign-list ul")
      .unwrap()
      .removeClass("campaign-list")
      .addClass("slide-bnr");
    $(".s-campaign-list ul li").removeClass("campaign__item");
    $(".s-campaign-list ul li .campaign__title").remove();
    unwrapFlug = true;
  }
  unwrapFunc();
  if (unwrapFlug == true) {
    $(".slide-bnr").slick({
      autoplay: true,
      dots: true,
      infinite: true,
      slidesToShow: 5,
      variableWidth: true,
      centerMode: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            variableWidth: false,
            centerMode: false
          }
        }
      ]
    });
  }
  // =================
  // wrapper
  // =================
  $("#page main")
    .children()
    .slice(0, 3)
    .wrapAll('<div id="top"></div>');
  $("#page main")
    .children()
    .slice(3, 8)
    .wrapAll('<div id="price" class="wrapper"></div>');
  $("#page main")
    .children()
    .slice(4, 6)
    .wrapAll('<div id="value" class="wrapper"></div>');
  $("#page main")
    .children()
    .slice(5, 8)
    .wrapAll('<div id="campaign" class="wrapper"></div>');
  $("#page #campaign>div").wrapAll('<div class="inner"></div>');
  // =================
  // clone signup
  // =================
  var cloneSignUp = $(".signup").clone();
  $("#campaign , #feature").after(cloneSignUp);
  // =================
  // wrapper after cloning signup
  // =================
  $("#feature + .signup").wrapAll('<div class="wrapper"></div>');

  // =================
  // init
  // =================
  var _ua = (function(u) {
    return {
      Tablet:
        (u.indexOf("windows") != -1 &&
          u.indexOf("touch") != -1 &&
          u.indexOf("tablet pc") == -1) ||
        u.indexOf("ipad") != -1 ||
        (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) ||
        (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) ||
        u.indexOf("kindle") != -1 ||
        u.indexOf("silk") != -1 ||
        u.indexOf("playbook") != -1,
      Mobile:
        (u.indexOf("windows") != -1 && u.indexOf("phone") != -1) ||
        u.indexOf("iphone") != -1 ||
        u.indexOf("ipod") != -1 ||
        (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) ||
        (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) ||
        u.indexOf("blackberry") != -1
    };
  })(window.navigator.userAgent.toLowerCase());

  function init() {
    // ランキング 週
    var rankWeek = $(
      "#page #songs .inner > div > ol > li.songs-ranking .songs-tab li"
    );
    rankWeek.on("click", function() {
      rankWeek.removeClass("on");
      var index = rankWeek.index(this);
      rankWeek.eq(index).addClass("on");
    });
    // アーティスト
    var artistTab = $(
      "#page #songs .inner > div > ol > li.songs-artist .songs-tab li"
    );
    artistTab.on("click", function() {
      artistTab.removeClass("on");
      var index = artistTab.index(this);
      artistTab.eq(index).addClass("on");
    });
    var categoryTab = $("#songs > .inner > ol > li");
    categoryTab.on("click", function() {
      var index = categoryTab.index(this);
      if (index == 0) {
        // 新着
        showNewSongs();
      } else if (index == 1) {
        // ランキング
        showRanking();
      } else {
        // アーティスト
        getArtistTab();
      }
    });
    // タブ
    var songsTab = $("#page #songs .inner > ol li");
    var songsContent = $("#page #songs .inner > div > ol > li");
    songsTab.on("click", function() {
      songsTab.removeClass("on");
      songsContent.hide();
      var index = songsTab.index(this);
      songsTab.eq(index).addClass("on");
      songsContent.eq(index).fadeIn();
      // スマホ高さ調整
      if (_ua.Mobile || _ua.Tablet) {
        if (index == 1) {
          var songsContentOnHeight = songsContent.eq(0).height();
          songsContentOnHeight =
            songsContentOnHeight + $("#page #songs .inner").height() * 2;
          $("#songs").css("height", songsContentOnHeight);
        } else {
          var songsContentOnHeight = songsContent.eq(index).height();
          songsContentOnHeight =
            songsContentOnHeight + $("#page #songs .inner").height() * 2;
          $("#songs").css("height", songsContentOnHeight);
        }
      }
    });
    if (_ua.Mobile || _ua.Tablet) {
      $("#containe-video")
        .children("#video")
        .hide();
      $(window).on("load", function() {
        var songsContentOnHeight = songsContent.eq(0).height();
        songsContentOnHeight =
          songsContentOnHeight + $("#page #songs .inner").height() * 2;
        $("#songs").css("height", songsContentOnHeight);
      });
    } else {
      // PC
    }
  }

  function showNewSongs() {
    //新着 最初の表示
    $.ajax({
      url: "https://music.r10s.jp/external/prod/json/new_content.json",
      dataType: "json",
      success: function(data) {
        $(".songs-new .songs-tab , .songs-new .song")
          .children()
          .remove();
        // ジャンルの表示
        for (var i in data) {
          if (i < 1) {
            // 1ページ目 J-POPの表示
            $(".songs-new .songs-tab").append(
              [
                '<li class="on"><a href="javascript:void(0)">' +
                  data[i].genre +
                  "</a></li>"
              ].join("")
            );
            for (var j = 0; j < 10; j++) {
              $(".songs-new .song").append(
                [
                  "<li>",
                  "<figure>",
                  '<img src="',
                  data[i].items[j].images[0].s2,
                  '" alt="',
                  data[i].items[j].artist_name,
                  '">',
                  "</figure>",
                  "<p>",
                  data[i].items[j].name,
                  "</p>",
                  "<p>",
                  data[i].items[j].artist_name,
                  "</p>",
                  "</li>"
                ].join("")
              );
            }
          } else {
            $(".songs-new .songs-tab").append(
              [
                '<li><a href="javascript:void(0)">' +
                  data[i].genre +
                  "</a></li>"
              ].join("")
            );
          }
        }
        // 新着 ジャンル切り替え
        $(document).on(
          "click",
          "#page #songs .inner > div > ol > li.songs-new .songs-tab li",
          function() {
            $(".songs-new .song").scrollLeft(0);
            $(".songs-new .song")
              .children()
              .remove();
            var index = $(
              "#page #songs .inner > div > ol > li.songs-new .songs-tab li"
            ).index(this);
            for (var k = 0; k < 10; k++) {
              $(".songs-new .song").append(
                [
                  "<li>",
                  "<figure>",
                  '<img src="',
                  data[index].items[k].images[0].s2,
                  '" alt="',
                  data[index].items[k].artist_name,
                  '">',
                  "</figure>",
                  "<p>",
                  data[index].items[k].name,
                  "</p>",
                  "<p>",
                  data[index].items[k].artist_name,
                  "</p>",
                  "</li>"
                ].join("")
              );
            }
            $(
              "#page #songs .inner > div > ol > li.songs-new .songs-tab li"
            ).removeClass("on");
            var index = $(this).index(this);
            $(this)
              .eq(index)
              .addClass("on");
          }
        );
      }
    });
  }
  showNewSongs();

  function showRanking() {
    $(".songs-ranking .song")
      .children()
      .remove();
    $.ajax({
      url: "https://music.r10s.jp/external/prod/json/ranking_weekly_3.json",
      dataType: "json",
      success: function(data) {
        // init
        $(".songs-ranking .songs-tab")
          .children()
          .removeClass("on");
        $(".songs-ranking .songs-tab")
          .children()
          .eq(0)
          .addClass("on");
        // latest
        var year = data.published_at.substr(0, 4),
          month = data.published_at.substr(5, 2),
          day = data.published_at.substr(8, 2);
        year = parseInt(year, 10);
        month = parseInt(month, 10);
        day = parseInt(day, 10);
        // 7 days ago
        var date1 = new Date(year, month - 1, day);
        date1.setDate(date1.getDate() - 7);
        var year2 = date1.getFullYear(),
          month2 = date1.getMonth() + 1,
          day2 = date1.getDate();
        // create tab
        $(".songs-ranking .songs-tab")
          .children()
          .eq(0)
          .html(
            [
              '<a href="javascript:void(0)">',
              year2 + "." + month2 + "." + day2,
              "～",
              year + "." + month + "." + day,
              "</a>"
            ].join("")
          );
        // show latest ranking
        for (var i = 0; i < 10; i++) {
          $(".songs-ranking .song").append(
            [
              "<li>",
              "<figure>",
              '<img src="',
              data.ranking[i].images[0].s2,
              '" alt="',
              data.ranking[i].artist_name,
              '">',
              "</figure>",
              "<p><strong>",
              i + 1,
              "</strong>",
              data.ranking[i].song_name,
              "</p>",
              "<p>",
              data.ranking[i].artist_name,
              "</p>",
              "</li>"
            ].join("")
          );
        }
      }
    });
  }

  function changeTabRanking() {
    $(".songs-ranking .songs-tab")
      .children()
      .on("click", function() {
        $(".songs-ranking .song")
          .children()
          .remove();
        var key = $(this).attr("data-key");
        $.ajax({
          url:
            "https://music.r10s.jp/external/prod/json/ranking_weekly_" +
            key +
            ".json",
          dataType: "json",
          success: function(data) {
            for (var i = 0; i < 10; i++) {
              $(".songs-ranking .song").append(
                [
                  "<li>",
                  "<figure>",
                  '<img src="',
                  data.ranking[i].images[0].s2,
                  '" alt="',
                  data.ranking[i].artist_name,
                  '">',
                  "</figure>",
                  "<p><strong>",
                  i + 1,
                  "</strong>",
                  data.ranking[i].song_name,
                  "</p>",
                  "<p>",
                  data.ranking[i].artist_name,
                  "</p>",
                  "</li>"
                ].join("")
              );
            }
          }
        });
      });
  }
  changeTabRanking();

  function getArtist() {
    $.ajax({
      url: "https://music.r10s.jp/external/prod/json/artistlist.json",
      dataType: "json",
      error: function() {
        $("#list-artist").html(
          "<li>アーティストの読み込みに失敗しました。</li>"
        );
      },
      success: function(data) {
        nameList = [];
        for (i in data) {
          nameList.artistName = data[i].artist_name;
          nameList.nameHiragana = katakanaToHiragana(
            hankanaTozenkana(String(data[i].name_kana))
          );
          nameList.push({
            artistName: nameList.artistName,
            nameHiragana: nameList.nameHiragana
          });
        }
        var sortedArr = nameList.sort(function(a, b) {
          a = a.nameHiragana;
          b = b.nameHiragana;
          if (a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          }
          return 0;
        });
        var allArr = [
          "あいうえお",
          "かきくけこがぎぐげご",
          "さしすせそざじずぜぞ",
          "たちつてとだぢづでど",
          "なにぬねの",
          "はひふへほばびぶべぼぱぴぷぺぽ",
          "まみむめも",
          "やゆよ",
          "らりるれろ",
          "わをん",
          "ゔ"
        ];
        var classifiedArr = {};
        for (i in allArr) {
          classifiedArr[i] = {};
        }
        for (i in sortedArr) {
          for (j in allArr) {
            try {
              if (
                allArr[j].indexOf(sortedArr[i].nameHiragana.charAt(0)) != -1
              ) {
                $("#list-artist").append(
                  [
                    '<li data-classified="',
                    j,
                    '">',
                    sortedArr[i].artistName,
                    "</li>"
                  ].join("")
                );
              }
            } catch (e) {
              //
            }
          }
        }
      }
    });
  }
  getArtist();

  function getArtistTab() {
    // init
    $(".songs-artist .songs-tab")
      .children()
      .removeClass("on");
    $(".songs-artist .songs-tab")
      .children()
      .eq(0)
      .addClass("on");
    // ア行のみ
    $(".songs-artist .artist-list").html(
      $('#list-artist li[data-classified="0"]').clone()
    );
    // 各行
    $(".songs-artist .songs-tab")
      .children()
      .on("click", function() {
        var key = $(this).attr("data-key");
        $(".songs-artist .artist-list")
          .html($('#list-artist li[data-classified="' + key + '"]').clone())
          .scrollTop(0);
      });
  }

  function hankanaTozenkana(str) {
    var kanaMap = {
      ｶﾞ: "ガ",
      ｷﾞ: "ギ",
      ｸﾞ: "グ",
      ｹﾞ: "ゲ",
      ｺﾞ: "ゴ",
      ｻﾞ: "ザ",
      ｼﾞ: "ジ",
      ｽﾞ: "ズ",
      ｾﾞ: "ゼ",
      ｿﾞ: "ゾ",
      ﾀﾞ: "ダ",
      ﾁﾞ: "ヂ",
      ﾂﾞ: "ヅ",
      ﾃﾞ: "デ",
      ﾄﾞ: "ド",
      ﾊﾞ: "バ",
      ﾋﾞ: "ビ",
      ﾌﾞ: "ブ",
      ﾍﾞ: "ベ",
      ﾎﾞ: "ボ",
      ﾊﾟ: "パ",
      ﾋﾟ: "ピ",
      ﾌﾟ: "プ",
      ﾍﾟ: "ペ",
      ﾎﾟ: "ポ",
      ｳﾞ: "ヴ",
      ﾜﾞ: "ヷ",
      ｦﾞ: "ヺ",
      ｱ: "ア",
      ｲ: "イ",
      ｳ: "ウ",
      ｴ: "エ",
      ｵ: "オ",
      ｶ: "カ",
      ｷ: "キ",
      ｸ: "ク",
      ｹ: "ケ",
      ｺ: "コ",
      ｻ: "サ",
      ｼ: "シ",
      ｽ: "ス",
      ｾ: "セ",
      ｿ: "ソ",
      ﾀ: "タ",
      ﾁ: "チ",
      ﾂ: "ツ",
      ﾃ: "テ",
      ﾄ: "ト",
      ﾅ: "ナ",
      ﾆ: "ニ",
      ﾇ: "ヌ",
      ﾈ: "ネ",
      ﾉ: "ノ",
      ﾊ: "ハ",
      ﾋ: "ヒ",
      ﾌ: "フ",
      ﾍ: "ヘ",
      ﾎ: "ホ",
      ﾏ: "マ",
      ﾐ: "ミ",
      ﾑ: "ム",
      ﾒ: "メ",
      ﾓ: "モ",
      ﾔ: "ヤ",
      ﾕ: "ユ",
      ﾖ: "ヨ",
      ﾗ: "ラ",
      ﾘ: "リ",
      ﾙ: "ル",
      ﾚ: "レ",
      ﾛ: "ロ",
      ﾜ: "ワ",
      ｦ: "ヲ",
      ﾝ: "ン",
      ｧ: "ァ",
      ｨ: "ィ",
      ｩ: "ゥ",
      ｪ: "ェ",
      ｫ: "ォ",
      ｯ: "ッ",
      ｬ: "ャ",
      ｭ: "ュ",
      ｮ: "ョ",
      "｡": "。",
      "､": "、",
      ｰ: "ー",
      "｢": "「",
      "｣": "」",
      "･": "・"
    };
    var reg = new RegExp("(" + Object.keys(kanaMap).join("|") + ")", "g");
    return str
      .replace(reg, function(match) {
        return kanaMap[match];
      })
      .replace(/ﾞ/g, "゛")
      .replace(/ﾟ/g, "゜");
  }

  function katakanaToHiragana(src) {
    return src.replace(/[\u30a1-\u30f6]/g, function(match) {
      var chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  }

  // function setArtwork() {
  //   $(window).scroll(function() {
  //     var t = $("#feature").offset().top; // ターゲットの位置取得
  //     var p = t - $(window).height(); // 画面下部からのターゲットの位置
  //     var artWorkFlag = false;
  //     if ($(window).scrollTop() > p) {
  //       if (artWorkFlag == false) {
  //         $("#containe-video").hide();
  //         $.ajax({
  //           url: "https://music.r10s.jp/external/prod/json/new_content.json",
  //           dataType: "json",
  //           success: function(data) {
  //             var k = 0;
  //             var images = [];
  //             var imageLoadedFlag = false;
  //             for (var i in data) {
  //               for (var j = 0; j < 4; j++) {
  //                 var scale = 0.5;
  //                 var canvas = document.createElement("canvas");
  //                 var ctx = canvas.getContext("2d");
  //                 images[k] = new Image();
  //                 var reader = new FileReader();
  //                 images[k].src = data[i].items[j].images[0].s2;
  //                 images[k].crossOrigin = "Anonymous";
  //                 if (imageLoadedFlag == false) {
  //                   images[k].addEventListener(
  //                     "load",
  //                     function() {
  //                       var dstWidth = this.width * scale;
  //                       var dstHeight = this.height * scale;
  //                       canvas.width = dstWidth;
  //                       canvas.height = dstHeight;
  //                       ctx.drawImage(
  //                         this,
  //                         0,
  //                         0,
  //                         this.width,
  //                         this.height,
  //                         0,
  //                         0,
  //                         dstWidth,
  //                         dstHeight
  //                       );
  //                       minifiedImage = canvas.toDataURL("image/jpeg");
  //                       imageLoadedFlag = true;
  //                       if (imageLoadedFlag == true) {
  //                         $("#feature-artwork").prepend(
  //                           [
  //                             "<div>",
  //                             '<div class="box-square">',
  //                             '<div class="box-square-inn">',
  //                             '<div><img src="' + minifiedImage + '" /></div>',
  //                             "</div></div></div>"
  //                           ].join("")
  //                         );
  //                         imageLoadedFlag = false;
  //                         artWorkFlag = true;
  //                       }
  //                       k++;
  //                     },
  //                     false
  //                   );
  //                 }
  //               }
  //             }
  //           }
  //         });
  //       } else {
  //         $("#containe-video").hide();
  //         $("#feature-artwork").show();
  //       }
  //     } else {
  //       if (artWorkFlag == true) {
  //         $("#containe-video").show();
  //         $("#feature-artwork").hide();
  //       }
  //     }
  //   });
  // }
  // setArtwork();

  function campaignPopup() {
    $(".ajax-popup-link").magnificPopup({
      type: "ajax",
      fixedContentPos: true,
      closeMarkup:
        '<div class="icon-24 btn btn-close closePopup"><span class="icon-close"></span></div>'
    });
    $(document).on("click", ".closePopup", function() {
      $.magnificPopup.close();
    });
  }
  campaignPopup();

  // init
  init();
});
