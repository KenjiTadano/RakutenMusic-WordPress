$(function () {

    // ===================================
    // Campaign detail tab
    // ===================================

    $('#page #campaign-about .l-inner dl > div dt').on('click', function () {
        if ($(this).hasClass('on')) {
            return false
        } else {
            var index = $('#page #campaign-about .l-inner dl > div dt').index(this)

            $('#page #campaign-about .l-inner dl > div dt').removeClass('on')
            $('#page #campaign-about .l-inner dl > dd').removeClass('on')

            $(this).addClass('on')
            $('#page #campaign-about .l-inner dl > dd').eq(index).addClass('on')
        }
    })

    // ===================================
    // How to use the campaign code
    // ===================================

    var btnLeft = $(".carousel-left");
    var btnRight = $(".carousel-right");
    var currentSlide = 1;
    var sliderPosition = 0;
    var minSlide = 1;
    var maxSlide = 7;
    var slider = $("#page #howtouse .l-inner .steps");
    var slide = $("#page #howtouse .l-inner .steps > li");
    var listWidth = slide.eq(2).width() + 30;

    btnLeft.on("click", function () {
        if (currentSlide > minSlide) {
            currentSlide--;
            sliderPosition = listWidth * (currentSlide - 1);
            slider.animate(
                {
                    left: "-" + sliderPosition + "px"
                },
                "fast",
                "swing",
                function () {
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
    btnRight.on("click", function () {
        if (currentSlide < maxSlide) {
            currentSlide++;
            sliderPosition = listWidth * (currentSlide - 1);
            slider.animate(
                {
                    left: "-" + sliderPosition + "px"
                },
                "fast",
                "swing",
                function () {
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

    // ===================================
    // Modal
    // ===================================

    function campaignCodeModalOpen() {
        $('#page #campaign-code-modal').fadeIn('fast')
    }
    function campaignCodeModalClose() {
        $('#page #campaign-code-modal').fadeOut('fast', showStep1)
    }
    function showStep1() {
        $('#page #campaign-code-modal .l-inner .step').removeClass('hide')
        $('#page #campaign-code-modal .l-inner .step-2').addClass('hide')
    }
    function showStep2() {
        $('#page #campaign-code-modal .l-inner .step').removeClass('hide')
        $('#page #campaign-code-modal .l-inner .step-1').addClass('hide')
    }

    $('#page #campaign-about .l-inner dl > dd .campaign-code-btn').on('click', campaignCodeModalOpen)

    $('#page #campaign-code-modal .click-area').on('click', campaignCodeModalClose)
    $('#page #campaign-code-modal .close-btn').on('click', campaignCodeModalClose)

    $('#page #campaign-code-modal .l-inner .step-1 ul li a.varified').on('click', showStep2)
});