$(function() {
  $("#page #loading").fadeOut("slow", function() {
    $("#page #loading").remove();
  });

  $(".songs").slick({
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 8,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 7
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "30px"
        }
      }
    ]
  });
  $(".playlists").slick({
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 5,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "30px"
        }
      }
    ]
  });

  // キャンペーンコード適用方法
  var btnLeft = $(".carousel-left");
  var btnRight = $(".carousel-right");
  var currentSlide = 1;
  var sliderPosition = 0;
  var minSlide = 1;
  var maxSlide = 7;
  var slider = $("#page #howtouse .l-inner .steps");
  var slide = $("#page #howtouse .l-inner .steps > li");
  var listWidth = slide.eq(2).width() + 30;
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
