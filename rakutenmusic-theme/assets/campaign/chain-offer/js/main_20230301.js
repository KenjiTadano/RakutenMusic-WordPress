$(function () {
    $('.l-content').fadeIn('slow');
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    $(window).on('load', function () {
        if (_UA.indexOf('App-') > -1) {
            var textEntry = $('.text-entry');
            for (var i = 0; i < textEntry.length; i++) {
                $('.text-entry')[i].innerHTML = 'アプリをダウンロード';
            }

            var ctaButtonURL = $('.chain-offer-ddt_conversion_btn.entry_completed a');
            for (var j = 0; j < ctaButtonURL.length; j++) {
                ctaButtonURL[j].href = 'https://music.rakuten.co.jp/link/app/app_inflow.html';
            }
        }
    });
});