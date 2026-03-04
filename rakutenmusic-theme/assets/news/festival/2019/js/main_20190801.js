$(function() {
  var index, result, tmp, playlistName, songTitle, songArtist, playlistImages;
  var playlist_1,
    playlist_2,
    playlist_3,
    playlist_4,
    playlist_5,
    playlist_6,
    otherPlaylists;

  function getPlaylistImages() {
    playlistImages = [
      {
        1: "https://r-music-pro-image-resized.s3.amazonaws.com/a/e/aea7/ab58/b631/a5e1/27c6/5391/8e0d/2091.s2.jpg",
        2: "https://r-music-pro-image-resized.s3.amazonaws.com/4/4/4487/7f75/3756/be16/0097/8c30/176c/802a.s2.jpg",
        3: "https://r-music-pro-image-resized.s3.amazonaws.com/f/f/ff27/cbef/8237/5215/5fa5/585b/8c36/1a4e.s2.jpg",
        4: "https://r-music-pro-image-resized.s3.amazonaws.com/1/c/1ca9/1383/07c6/8a75/7841/cb81/526d/5bf4.s2.jpg"
      },
      {
        1: "https://r-music-pro-image-resized.s3.amazonaws.com/c/0/c0b1/b50c/2bdc/cd12/3392/c9b8/eb9a/5f0c.s2.jpg",
        2: "https://r-music-pro-image-resized.s3.amazonaws.com/2/d/2d7b/ad00/587f/98cf/9120/153a/91d4/2920.s2.jpg",
        3: "https://r-music-pro-image-resized.s3.amazonaws.com/0/7/07e6/30f1/8f06/82b2/355e/a69e/170a/9de3.s2.jpg",
        4: "https://r-music-pro-image-resized.s3.amazonaws.com/a/a/aa7a/edb9/df5c/fb4a/3ccb/cc97/f1ab/1ce8.s2.jpg"
      },
      {
        1: "https://r-music-pro-image-resized.s3.amazonaws.com/4/d/4df3/9253/b569/5330/0695/933b/2f57/c15a.s2.jpg",
        2: "https://r-music-pro-image-resized.s3.amazonaws.com/3/0/30c1/62d7/08bf/c64e/865d/e303/6714/7c93.s2.jpg",
        3: "https://r-music-pro-image-resized.s3.amazonaws.com/3/f/3f49/c098/73ff/fac0/d5bf/1e08/dcb3/3c0b.s2.jpg",
        4: "https://r-music-pro-image-resized.s3.amazonaws.com/7/1/71a9/bc89/591b/d4a4/0774/0dd2/6ed6/23b5.s2.jpg"
      },
      {
        1: "https://r-music-pro-image-resized.s3.amazonaws.com/d/e/de14/dc3c/6546/7fa5/c19c/1778/bbfa/2985.s2.jpg",
        2: "https://r-music-pro-image-resized.s3.amazonaws.com/6/4/6409/fca1/db34/3296/b1f7/ad24/f96b/d89d.s2.jpg",
        3: "https://r-music-pro-image-resized.s3.amazonaws.com/f/8/f8d4/a659/2d63/0b7a/a32d/29ce/93b0/1d63.s2.jpg",
        4: "https://r-music-pro-image-resized.s3.amazonaws.com/b/f/bf2f/e607/6953/61ad/9d82/6fe9/eeaf/0bc1.s2.jpg"
      },
      {
        1: "https://r-music-pro-image-resized.s3.amazonaws.com/f/c/fc3b/2ce3/b369/d0de/5cfb/7631/f062/c9c9.s2.jpg",
        2: "https://r-music-pro-image-resized.s3.amazonaws.com/a/0/a001/1ad3/c2bf/3b62/fb96/ce88/35ba/1249.s2.jpg",
        3: "https://r-music-pro-image-resized.s3.amazonaws.com/2/9/29eb/02ca/b5b9/44e1/78b8/ad52/c9d1/370c.s2.jpg",
        4: "https://r-music-pro-image-resized.s3.amazonaws.com/c/5/c5c1/e464/0c6d/7daa/55dd/ef26/d79c/8398.s2.jpg"
      },
      {
        1: "https://r-music-pro-image-resized.s3.amazonaws.com/a/d/ad6f/dbdd/3602/c9fc/2e00/287d/c2fd/9b85.s2.jpg",
        2: "https://r-music-pro-image-resized.s3.amazonaws.com/d/e/de22/7f77/fba6/e960/34b8/982c/7fe6/804f.s2.jpg",
        3: "https://r-music-pro-image-resized.s3.amazonaws.com/0/0/0030/1603/62d2/7a15/44ca/9404/549c/27a8.s2.jpg",
        4: "https://r-music-pro-image-resized.s3.amazonaws.com/1/8/18bc/dacc/8ded/71a4/954b/d508/1468/3f86.s2.jpg"
      }
    ];
  }

  function initPlaylist() {
    // パラメータを取得
    var urlParam = location.search.substring(1);
    var param = urlParam.split("&");
    var paramArray = [];
    for (i = 0; i < param.length; i++) {
      var paramItem = param[i].split("=");
      paramArray[paramItem[0]] = paramItem[1];
    }
    if (paramArray.fdpl == "playlist_sls2019") {
      // パラメータ ?fdpl=playlist_sls2019 が存在する場合
      // SLSをデフォルトで表示
      index = 3;
      changePlaylist(index);
    } else {
      // 通常通り表示
      getPlaylistImages();
      for (var i = 0; i < 4; i++) {
        $("#page #playlist .l-inner > div.title figure > div")
          .eq(i)
          .children("img")
          .attr("src", playlistImages[0][i + 1]);
      }
      $("#page #playlist .l-inner > div.title > div h1").text(
        playlist_1[0].playlist_name
      );
      for (var j in playlist_1) {
        $("#page #playlist .l-inner > div.songs ul").append(
          [
            "<li>",
            "<p>" + playlist_1[j].song_title + "</p>",
            "<p>" + playlist_1[j].song_Artist + "</p>",
            "</li>"
          ].join("")
        );
      }
    }
  }

  function getCSV() {
    var req = new XMLHttpRequest();
    req.open(
      "get",
      "https://music.r10s.jp/external/prod/assets/news/festival/2019/js/playlists_02.csv",
      true
    );
    req.send(null);

    req.onload = function() {
      convertCSVtoArray(req.responseText);
    };
  }

  function convertCSVtoArray(str) {
    result = [];
    tmp = str.split("\n");

    for (var i = 0; i < tmp.length - 1; ++i) {
      playlistName = tmp[i].split(",")[0];
      songTitle = tmp[i].split(",")[1];
      songArtist = tmp[i].split(",")[2];
      result[i] = {
        playlist_name: playlistName,
        song_title: songTitle,
        song_Artist: songArtist
      };
      if (i == tmp.length - 2) {
        playlist_1 = result.filter(function(element) {
          return element["playlist_name"] == result[0].playlist_name;
        });
        playlist_2 = result.filter(function(element) {
          return element["playlist_name"] == result[51].playlist_name;
        });
        playlist_3 = result.filter(function(element) {
          return element["playlist_name"] == result[123].playlist_name;
        });
        playlist_4 = result.filter(function(element) {
          return element["playlist_name"] == result[185].playlist_name;
        });
        playlist_5 = result.filter(function(element) {
          return element["playlist_name"] == result[250].playlist_name;
        });
        playlist_6 = result.filter(function(element) {
          return element["playlist_name"] == result[269].playlist_name;
        });
        otherPlaylists = [
          {
            playlist_name: eval("playlist_" + 1)[0].playlist_name,
            other_playlists: [
              "FUJI ROCK FESTIVAL '19 day3 (7/28)",
              "FUJI ROCK FESTIVAL '19 day2 (7/27)",
              "FUJI ROCK FESTIVAL '19 day1 (7/26)"
            ]
          },
          {
            playlist_name: eval("playlist_" + 3)[0].playlist_name
          },
          {
            playlist_name: eval("playlist_" + 4)[0].playlist_name,
            other_playlists: [
              "SUMMER SONIC 2019 OSAKA(8/18)",
              "SUMMER SONIC 2019 OSAKA(8/17)",
              "SUMMER SONIC 2019 OSAKA(8/16)",
              "SUMMER SONIC 2019 TOKYO(8/18)",
              "SUMMER SONIC 2019 TOKYO(8/17)"
            ]
          },
          {
            playlist_name: eval("playlist_" + 5)[0].playlist_name,
            other_playlists: [
              "SWEET LOVE SHOWER 2019 day2(8/31)",
              "SWEET LOVE SHOWER 2019 day3(9/1)"
            ]
          },
          {
            playlist_name: eval("playlist_" + 6)[0].playlist_name
          },
          {
            playlist_name: eval("playlist_" + 2)[0].playlist_name,
            other_playlists: [
              "ROCK IN JAPAN FESTIVAL 2019 day1(8/3)",
              "ROCK IN JAPAN FESTIVAL 2019 day2(8/4)",
              "ROCK IN JAPAN FESTIVAL 2019 day3(8/10)",
              "ROCK IN JAPAN FESTIVAL 2019 day4(8/11)",
              "ROCK IN JAPAN FESTIVAL 2019 day5(8/12)"
            ]
          }
        ];

        initPlaylist();
      }
    }
  }

  function clickPlaylistTab() {
    $(document).on("click", "#page #tab .l-inner ul li", function() {
      index = $("#page #tab .l-inner ul li").index(this);
      console.log(index);
      changePlaylist(index);
    });
  }

  function changePlaylist(index) {
    $("#page #tab .l-inner ul li")
      .removeClass("on")
      .eq(index)
      .addClass("on");

    getPlaylistImages();
    for (var i = 0; i < 4; i++) {
      $("#page #playlist .l-inner > div.title figure > div")
        .eq(i)
        .children("img")
        .attr("src", playlistImages[index][i + 1]);
    }

    $("#page #playlist .l-inner > div.title > div h1").text(
      eval("playlist_" + (index + 1))[0].playlist_name
    );

    $("#page #playlist .l-inner > div.songs h2").hide();

    $("#page #playlist .l-inner > div.songs ul").empty();
    for (var j in eval("playlist_" + (index + 1))) {
      $("#page #playlist .l-inner > div.songs ul").append(
        [
          "<li>",
          "<p>" + eval("playlist_" + (index + 1))[j].song_title + "</p>",
          "<p>" + eval("playlist_" + (index + 1))[j].song_Artist + "</p>",
          "</li>"
        ].join("")
      );
    }

    $("#page #playlist .l-inner > div.songs ol").empty();
    if (otherPlaylists[index].other_playlists) {
      $("#page #playlist .l-inner > div.songs h2").show();
      for (var k = 0; k < otherPlaylists[index].other_playlists.length; k++) {
        $("#page #playlist .l-inner > div.songs ol").append(
          ["<li>", otherPlaylists[index].other_playlists[k], "</li>"].join("")
        );
      }
    }
  }

  getCSV();
  clickPlaylistTab();
});
