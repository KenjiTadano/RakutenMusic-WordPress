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

    // +++++++++++++++++++++++++++
    //   Form
    // +++++++++++++++++++++++++++

    function doTrim(el) {
        el.value = el.value.replace(/^\s+|\s+$/g, '');
    }

    function isLength(el, len) {
        if ("え".length == 2) {
            len *= 2;
        }
        return el.value.length <= len;
    }

    function zen2han(el) {
        el.value = el.value.replace(/[０]/g, "0");
        el.value = el.value.replace(/[１]/g, "1");
        el.value = el.value.replace(/[２]/g, "2");
        el.value = el.value.replace(/[３]/g, "3");
        el.value = el.value.replace(/[４]/g, "4");
        el.value = el.value.replace(/[５]/g, "5");
        el.value = el.value.replace(/[６]/g, "6");
        el.value = el.value.replace(/[７]/g, "7");
        el.value = el.value.replace(/[８]/g, "8");
        el.value = el.value.replace(/[９]/g, "9");
    }

    function checkForm() {
        var el;
        var obj = document.enenForm;

        el = obj.elements['answers[37810_259709]'];
        doTrim(el);
        zen2han(el);
        if (!isLength(el, 10)) {
            alert("店舗コード入力してください。");
            return false;
        }

        el = obj.elements['answers[37810_259710]'];
        doTrim(el);
        zen2han(el);
        if (!isLength(el, 10)) {
            alert("STAFF IDを入力してください。");
            return false;
        }

    }
});