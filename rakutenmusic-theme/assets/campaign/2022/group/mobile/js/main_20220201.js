$(function () {
    $('#page #sticky-apply-btn .trial-btn a').text('初回30日間無料お試し');

    $('.l-content').fadeIn('slow');

    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('msie') != -1 ||
        userAgent.indexOf('trident') != -1) {
        $('#page #campaign-wrapper .heading--m').addClass('ie');
        $('#ie-hidden').remove();
    }

    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('is-hidden--sp');
        } else {
            $('#page #sticky-apply-btn').removeClass('is-hidden--sp');
        }
    });

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

    $('.external-campaign-bnr--slick').slick({
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }],
    });

    $('section.s-campaign-detail tr').addClass('is-open');
});

