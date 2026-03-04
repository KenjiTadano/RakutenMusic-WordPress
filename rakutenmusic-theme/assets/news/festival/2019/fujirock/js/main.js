$(function() {
  $(document).on("contextmenu", function(e) {
    return false;
  });

  // Set Playlist
  var result, tmp, playlistName, songTitle, songArtist, playlistImages;
  var playlist_1;

  // Set Player
  var status = "initial";
  var index, soundNumber, sound, btn;
  var path = location.pathname;

  function getPlaylistImages() {
    playlistImages = [
      {
        1: "https://r-music-pro-image-resized.s3.amazonaws.com/a/e/aea7/ab58/b631/a5e1/27c6/5391/8e0d/2091.s2.jpg",
        2: "https://r-music-pro-image-resized.s3.amazonaws.com/4/4/4487/7f75/3756/be16/0097/8c30/176c/802a.s2.jpg",
        3: "https://r-music-pro-image-resized.s3.amazonaws.com/f/f/ff27/cbef/8237/5215/5fa5/585b/8c36/1a4e.s2.jpg",
        4: "https://r-music-pro-image-resized.s3.amazonaws.com/1/c/1ca9/1383/07c6/8a75/7841/cb81/526d/5bf4.s2.jpg"
      }
    ];
  }

  function initPlaylist() {
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

      if (j == 50) {
        $("#page #playlist .l-inner > div.songs ul li").append(
          [
            "<div>",
            '<div class="playbtn audio"><i class="fas fa-play-circle"></i></div>',
            "</div>"
          ].join("")
        );
      }
    }
  }

  function getCSV() {
    var req = new XMLHttpRequest();
    req.open(
      "get",
      "https://music.r10s.jp/external/prod/assets/news/festival/2019/js/playlists.csv?v=3",
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

        initPlaylist();
      }
    }
  }

  getCSV();

  $(document).on("tap click", ".audio", function() {
    index = $("#page #playlist .l-inner > div.songs li .playbtn").index(this);
    if ($("#page #playlist .l-inner > div.songs li").hasClass("current")) {
      if (
        $(this)
          .closest("li")
          .hasClass("current")
      ) {
        // +++++++++++++++++++++
        // 同じのがクリックされている
        // +++++++++++++++++++++
        clickNum++;
        if ($(this).hasClass("playbtn")) {
          switch (status) {
            case "playing":
              sound.pause();
              btn.removeClass("fa-pause-circle");
              btn.addClass("fa-play-circle");
              status = "paused";
              console.log(status);
              break;
            case "paused":
              sound.play();
              btn.removeClass("fa-play-circle");
              btn.addClass("fa-pause-circle");
              status = "playing";
              console.log(status);
              break;
          }
        } else {
          switch (status) {
            case "playing":
            case "paused":
              $(this).remove();
              btn.removeClass("fa-pause-circle");
              btn.addClass("fa-play-circle");
              sound.stop();
              clickNum = 0;
              status = "initial";
              $("#page #playlist .l-inner > div.songs li").removeClass(
                "current"
              );
              console.log(status);
              break;
          }
        }
      } else {
        // +++++++++++++++++++++
        // 別のliがクリックされた
        // +++++++++++++++++++++
        $("#page #playlist .l-inner > div.songs li").removeClass("current");
        $(this)
          .closest("li")
          .addClass("current");
        clickNum = 1;
        $("#page #playlist .l-inner > div.songs li .stopbtn").remove();
        btn.removeClass("fa-play-circle").removeClass("fa-pause-circle");
        btn.addClass("fa-play-circle");
        sound.stop();
        var that = $(this);
        soundPlay(that);
      }
    } else {
      // +++++++++++++++++++++
      // はじめてクリックされた
      // +++++++++++++++++++++
      var that = $(this);
      soundPlay(that);
    }
    return false;
  });

  function soundPlay(that) {
    btn = that.find("i");
    that.closest("li").addClass("current");
    if (that.hasClass("playbtn")) {
      clickNum = 1;
      soundNumber = index + 1;
      sound = new Howl({
        src: [
          "https://music.r10s.jp/external/prod/assets" +
            path +
            "audio/sound_" +
            soundNumber +
            ".mp3"
        ]
      });
      sound.play();
      btn.removeClass("fa-play-circle");
      btn.addClass("fa-pause-circle");
      status = "playing";
      $("#page #playlist .l-inner > div.songs li")
        .eq(index)
        .find(".playbtn")
        .before(
          '<div class="stopbtn audio"><i class="fas fa-stop-circle"></i></div>'
        );
    }
    sound.on("end", function() {
      btn.removeClass("fa-pause-circle");
      btn.addClass("fa-play-circle");
      $("#page #playlist .l-inner > div.songs li").removeClass("current");
      $("#page #playlist .l-inner > div.songs li .stopbtn").remove();
      clickNum = 0;
      status = "initial";
    });
  }
});
