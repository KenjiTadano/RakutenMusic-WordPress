$(function () {

    function changeTermText() {
        var str = $('#page .s-campaign-hero .campaign-hero__schedule p').text();
        var result = str.replace('対象期間', '抽選販売期間');
        $('#page .s-campaign-hero .campaign-hero__schedule p').text(result)
    }

    function getScreenSize() {
        if (window.parent.screen.width <= 768) {
            $('.howtoget').slick({
                autoplay: false,
                infinite: false,
                dots: true,
                arrows: true,
                centerMode: true,
            });
        }
    }

    changeTermText();
    getScreenSize();
})