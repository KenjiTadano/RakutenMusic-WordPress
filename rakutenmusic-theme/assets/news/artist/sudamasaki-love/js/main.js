$(function() {
  $(document).on("contextmenu", function(e) {
    return false;
  });

  $("#new-release-title .l-inner ul li").append(
    [
      "<div>",
      '<div class="playbtn audio"><i class="fas fa-play-circle"></i></div>',
      "</div>"
    ].join("")
  );

  var status = "initial";
  var index, soundNumber, sound, btn;
  var path = location.pathname;

  $(document).on("tap click", ".audio", function() {
    index = $("#new-release-title .l-inner ul li .playbtn").index(this);
    if ($("#new-release-title .l-inner ul li").hasClass("current")) {
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
              $("#new-release-title .l-inner ul li").removeClass("current");
              console.log(status);
              break;
          }
        }
      } else {
        // +++++++++++++++++++++
        // 別のliがクリックされた
        // +++++++++++++++++++++
        $("#new-release-title .l-inner ul li").removeClass("current");
        $(this)
          .closest("li")
          .addClass("current");
        clickNum = 1;
        $("#new-release-title .l-inner ul li .stopbtn").remove();
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
      $("#new-release-title .l-inner ul li")
        .eq(index)
        .find(".playbtn")
        .before(
          '<div class="stopbtn audio"><i class="fas fa-stop-circle"></i></div>'
        );
    }
    sound.on("end", function() {
      btn.removeClass("fa-pause-circle");
      btn.addClass("fa-play-circle");
      $("#new-release-title .l-inner ul li").removeClass("current");
      $("#new-release-title .l-inner ul li .stopbtn").remove();
      clickNum = 0;
      status = "initial";
    });
  }
});
