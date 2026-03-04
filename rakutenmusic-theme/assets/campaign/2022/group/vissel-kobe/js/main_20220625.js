$(function () {

    $(".campaign-hero__schedule p").text($(".campaign-hero__schedule p").text().replace("対象期間", "第1弾エントリー期間"));

    $('.campaign-detail__table .js-toggle').addClass('is-open');
    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('display-none');
        } else {
            $('#page #sticky-apply-btn').removeClass('display-none');
        }
    });

});