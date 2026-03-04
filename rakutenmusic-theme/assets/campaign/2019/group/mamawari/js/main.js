$(function() {
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
