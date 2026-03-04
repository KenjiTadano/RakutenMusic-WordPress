$(function () {
    // +++++++++++++++++++++++++++
    //   Loading
    // +++++++++++++++++++++++++++
    function loading() {
        $(window).on("load", function () {
            $("#page #loading").fadeOut("slow", function () {
                $("#page #loading").remove();
                init();
            });
        });
    }

    function init() {
        // Show Term
        var original = $('#page .campaign-hero__schedule p').text();
        var result = original.indexOf(':');
        var result_1 = original.slice(0, result)
        var result_2 = original.slice(result + 2)
        $('#page #term .result_1').text(result_1);
        $('#page #term .result_2').text(result_2);

        // Start Slick
        $('#page #steps .howtouse').slick({
            dots: true,
            arrows: true,
            adaptiveHeight: true,
            infinite: false,
            slidesToShow: 3,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }

            }]
        })
    }

    loading();


});