$(function() {
  // +++++++++++++++++++++++++++
  //   Songs
  // +++++++++++++++++++++++++++
  function slickStart() {
    $("#page #mc-songs ul").slick({
      infinite: true,
      centerMode: true,
      slidesToShow: 14,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 12
          }
        },
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 10
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 8
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 2,
            centerPadding: "30px"
          }
        }
      ]
    });
  }
  function showRanking() {
    $.ajax({
      url: "https://music.r10s.jp/external/prod/json/ranking_weekly_3.json",
      dataType: "json",
      success: function(data) {
        $("#page #mc-songs ul")
          .children()
          .remove();
        for (var i = 0; i < 20; i++) {
          $("#page #mc-songs ul").append(
            [
              "<li>",
              "<figure>",
              '<img src="' + data.ranking[i].images[0].s2 + '">',
              "</figure>",
              "</li>"
            ].join("")
          );
          if (i > 18) {
            slickStart();
          }
        }
      }
    });
  }
  // +++++++++++++++++++++++++++
  //   Loading
  // +++++++++++++++++++++++++++
  function loading() {
    $(window).on("load", function() {
      $("#page #loading").fadeOut("slow", function() {
        $("#page #loading").remove();
      });
    });
  }
  loading();
  showRanking();
  // +++++++++++++++++++++++++++
  //   How to Use
  // +++++++++++++++++++++++++++
  var btnLeft = $(".carousel-left");
  var btnRight = $(".carousel-right");
  var currentSlide = 1;
  var sliderPosition = 0;
  var minSlide = 1;
  var maxSlide = 7;
  var slider = $("#page #mc-cpm-2 .l-inner .wrap .steps");
  var slide = $("#page #mc-cpm-2 .l-inner .wrap .steps > li");
  var listWidth = slide.eq(2).width() + 20;
  btnLeft.on("click", function() {
    if (currentSlide > minSlide) {
      currentSlide--;
      sliderPosition = listWidth * (currentSlide - 1);
      slider.animate(
        {
          left: "-" + sliderPosition + "px"
        },
        "fast",
        "swing",
        function() {
          slide.removeClass("current");
          slide.eq(currentSlide - 1).addClass("current");
        }
      );
      if (currentSlide < minSlide + 1) {
        btnLeft.fadeOut();
      }
      if (currentSlide == maxSlide - 1) {
        btnRight.fadeIn();
      }
    }
  });
  btnRight.on("click", function() {
    if (currentSlide < maxSlide) {
      currentSlide++;
      sliderPosition = listWidth * (currentSlide - 1);
      slider.animate(
        {
          left: "-" + sliderPosition + "px"
        },
        "fast",
        "swing",
        function() {
          slide.removeClass("current");
          slide.eq(currentSlide - 1).addClass("current");
        }
      );
      if (currentSlide > maxSlide - 1) {
        btnRight.fadeOut();
      }
      if (currentSlide == minSlide + 1) {
        btnLeft.fadeIn();
      }
    }
  });
});
