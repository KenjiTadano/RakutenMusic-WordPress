$(function () {
    $('.l-content').fadeIn('slow');
    $('.trial-btn a').text('60日間無料お試しをはじめる');
    $('#sticky-apply-btn .trial-btn a').text('60日間無料お試し');
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    // +++++++++++++++++++++++++++
    //   お試し Text Replacement
    // +++++++++++++++++++++++++++

    $(window).on('load resize', function () {
        var w = window.innerWidth;
        console.log('kkkk');
        if (w >= 768) {
            $('#sticky-apply-btn .trial-btn a').text('60日間無料お試しをはじめる');
        } else {
            $('#sticky-apply-btn .trial-btn a').text('60日間無料お試し');
        }
    });

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
    //   Code copy
    // +++++++++++++++++++++++++++

    var clipboard = new ClipboardJS('.btn-copy-code');

    clipboard.on('success', function (e) {
        alert('キャンペーンコードをコピーしました。初回30日間無料お試しへお進みください。');
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
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