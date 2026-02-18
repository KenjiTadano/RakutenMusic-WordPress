$(function () {
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
  // wrapper after cloning signup
  // =================
  $("#feature + .signup").wrapAll('<div class="wrapper"></div>');

  // =================
  // init
  // =================
  var _ua = (function (u) {
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
    // ランキングをデフォルトで表示
    createRankingTabs();

    // ランキング 週
    var rankWeek = $(
      "#page #songs .inner > div > ol > li.songs-ranking .songs-tab li"
    );
    rankWeek.on("click", function () {
      rankWeek.removeClass("on");
      var index = rankWeek.index(this);
      rankWeek.eq(index).addClass("on");
    });
    // アーティスト
    var artistTab = $(
      "#page #songs .inner > div > ol > li.songs-artist .songs-tab li"
    );
    artistTab.on("click", function () {
      artistTab.removeClass("on");
      var index = artistTab.index(this);
      artistTab.eq(index).addClass("on");
    });
    var categoryTab = $("#songs > .inner > ol > li");
    categoryTab.on("click", function () {
      var index = categoryTab.index(this);
      if (index == 0) {
        // 新着
        showNewSongs();
      } else if (index == 1) {
        // ランキング
        createRankingTabs();
      } else {
        // アーティスト
        getArtist();
      }
    });
    // タブ
    var songsTab = $("#page #songs .inner > ol li");
    var songsContent = $("#page #songs .inner > div > ol > li");
    songsTab.on("click", function () {
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
      $(window).on("load", function () {
        var songsContentOnHeight = songsContent.eq(1).height();
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
      success: function (data) {
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
          function () {
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
  // showNewSongs();

  function createRankingTabs() {
    $(".songs-ranking .song")
      .children()
      .remove();
    $.when(
      $.getJSON(
        "https://music.r10s.jp/external/prod/json/ranking_weekly_3.json"
      ),
      $.getJSON(
        "https://music.r10s.jp/external/prod/json/ranking_weekly_2.json"
      ),
      $.getJSON(
        "https://music.r10s.jp/external/prod/json/ranking_weekly_1.json"
      )
    )
      .done(function (data_a, data_b, data_c) {
        // すべて成功した時の処理
        // init
        $(".songs-ranking .songs-tab")
          .children()
          .removeClass("on");
        $(".songs-ranking .songs-tab")
          .children()
          .eq(0)
          .addClass("on");
        // latest
        var month1 = data_a[0].published_at.substr(5, 2),
          day1 = data_a[0].published_at.substr(8, 2),
          month2 = data_b[0].published_at.substr(5, 2),
          day2 = data_b[0].published_at.substr(8, 2),
          month3 = data_c[0].published_at.substr(5, 2),
          day3 = data_c[0].published_at.substr(8, 2);
        month1 = parseInt(month1, 10);
        day1 = parseInt(day1, 10);
        month2 = parseInt(month2, 10);
        day2 = parseInt(day2, 10);
        month3 = parseInt(month3, 10);
        day3 = parseInt(day3, 10);
        // create tab
        $(".songs-ranking .songs-tab")
          .children()
          .eq(0)
          .html(
            [
              '<a href="javascript:void(0)">',
              month1 + "/" + day1 + " 付",
              "</a>"
            ].join("")
          );
        $(".songs-ranking .songs-tab")
          .children()
          .eq(1)
          .html(
            [
              '<a href="javascript:void(0)">',
              month2 + "/" + day2 + " 付",
              "</a>"
            ].join("")
          );
        $(".songs-ranking .songs-tab")
          .children()
          .eq(2)
          .html(
            [
              '<a href="javascript:void(0)">',
              month3 + "/" + day3 + " 付",
              "</a>"
            ].join("")
          );
        showRanking(data_a);
        changeRankingTabs(data_a, data_b, data_c);
      })
      .fail(function () {
        // エラーがあった時
        console.log("error");
      });
  }

  function showRanking(data_a) {
    for (var i = 0; i < 10; i++) {
      $(".songs-ranking .song").append(
        [
          "<li>",
          "<figure>",
          '<img src="',
          data_a[0].ranking[i].images[0].s2,
          '" alt="',
          data_a[0].ranking[i].artist_name,
          '">',
          "</figure>",
          "<p><strong>",
          i + 1,
          "</strong>",
          data_a[0].ranking[i].song_name,
          "</p>",
          "<p>",
          data_a[0].ranking[i].artist_name,
          "</p>",
          "</li>"
        ].join("")
      );
    }
  }

  function changeRankingTabs(data_a, data_b, data_c) {
    $(".songs-ranking .songs-tab")
      .children()
      .on("click", function () {
        $(".songs-ranking .song")
          .children()
          .remove();
        var key = $(this).attr("data-key");
        for (var i = 0; i < 10; i++) {
          $(".songs-ranking .song").append(
            [
              "<li>",
              "<figure>",
              '<img src="',
              eval("data_" + key)[0].ranking[i].images[0].s2,
              '" alt="',
              eval("data_" + key)[0].ranking[i].artist_name,
              '">',
              "</figure>",
              "<p><strong>",
              i + 1,
              "</strong>",
              eval("data_" + key)[0].ranking[i].song_name,
              "</p>",
              "<p>",
              eval("data_" + key)[0].ranking[i].artist_name,
              "</p>",
              "</li>"
            ].join("")
          );
        }
      });
  }

  function getArtist() {
    $.ajax({
      url: "https://music.r10s.jp/external/prod/json/artistlist_new.json",
      dataType: "json",
      error: function () {
        $(".artist-list").html(
          "<li>アーティストの読み込みに失敗しました。</li>"
        );
      },
      success: function (data) {
        var num = 100;
        getArtistFromAPI(data, num);
      }
    });
  }

  function getArtistFromAPI(data, num) {
    for (var i = num - 100; i < num + 1; i++) {
      $(".artist-list").append(["<li>", data[i].artist_name, "</li>"].join(""));
      if (i > num - 1) {
        getArtistWhenScrolling(data, num);
      }
    }
  }

  function getArtistWhenScrolling(data, num) {
    var getNextArtistListFlag = false;
    $(".artist-list").bottom();
    $(".artist-list").bind("bottom", function () {
      var obj = $(this);
      if (obj) {
        if (getNextArtistListFlag == false) {
          num = num + 100;
          getNextArtistListFlag = true;
          getArtistFromAPI(data, num);
        }
      }
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
      .replace(reg, function (match) {
        return kanaMap[match];
      })
      .replace(/ﾞ/g, "゛")
      .replace(/ﾟ/g, "゜");
  }

  function katakanaToHiragana(src) {
    return src.replace(/[\u30a1-\u30f6]/g, function (match) {
      var chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  }

  function campaignPopup() {
    $(".ajax-popup-link").magnificPopup({
      type: "ajax",
      fixedContentPos: true,
      closeMarkup:
        '<div class="icon-24 btn btn-close closePopup"><span class="icon-close"></span></div>'
    });
    $(document).on("click", ".closePopup", function () {
      $.magnificPopup.close();
    });
  }
  campaignPopup();

  // init
  init();
});
