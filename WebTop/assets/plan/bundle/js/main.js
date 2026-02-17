$(document).ready(function () {
    $('#page .l-header .btn-apply a').attr('href', 'https://app.adjust.com/1aqkqyt4').text('アプリをダウンロード');

    $('.usage-item').click(function () {
        $(this).find('.usage-answer').slideToggle(200);
        $(this).find('i').toggleClass('close');
    });
});