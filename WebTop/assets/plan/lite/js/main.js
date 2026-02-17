$(function () {

    $('#page #sticky-apply-btn .trial-btn a').text('初回30日間無料お試し');
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    // +++++++++++++++++++++++++++
    //   Floating Button
    // +++++++++++++++++++++++++++

    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('display-none');
        } else {
            $('#page #sticky-apply-btn').removeClass('display-none');
        }
    });

    // +++++++++++++++++++++++++++
    //   IE Hidden
    // +++++++++++++++++++++++++++

    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('msie') != -1 ||
        userAgent.indexOf('trident') != -1) {
        // $('#page #campaign-wrapper .heading--m').addClass('ie');
        $('#ie-hidden').remove();
    }

    // +++++++++++++++++++++++++++
    //   Slick Slider
    // +++++++++++++++++++++++++++

    $('#re-subscriber').on('inview', function (event, isInView) {
        if (isInView) {
            if (window.matchMedia("(max-width: 768px)").matches) {
                $(".plan-change--steps").slick({
                    infinite: false,
                });
            }
        }
    });

    // +++++++++++++++++++++++++++
    //   FAQ
    // +++++++++++++++++++++++++++
    $("#page #rm-faq .l-inner dl dt").on("click", function () {
        var faqIndex = $("#page #rm-faq .l-inner dl dt").index(this);
        $("#page #rm-faq .l-inner dl dt").removeClass("open");
        $(this).addClass("open");
        $("#page #rm-faq .l-inner dl dd").slideUp("fast");
        $("#page #rm-faq .l-inner dl dd")
            .eq(faqIndex)
            .slideDown("fast");
    });
});