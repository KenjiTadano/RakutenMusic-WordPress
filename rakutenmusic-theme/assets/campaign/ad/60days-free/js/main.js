$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    var clipboard = new ClipboardJS('.btn-copy-code');

    clipboard.on('success', function (e) {
        alert('キャンペーンコードをコピーしました。無料トライアルへお進みください。');
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

    // ジャケ写カルーセル
    $('.jsha-carousel').slick({
        slidesToShow: 19,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    });
});
