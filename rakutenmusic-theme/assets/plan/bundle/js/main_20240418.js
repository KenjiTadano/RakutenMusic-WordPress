$(document).ready(function () {
    $('#page .l-header .btn-apply a').attr('href', 'https://app.adjust.com/1aqkqyt4').text('アプリをダウンロード');

    $('.usage-item').click(function () {
        $(this).find('.usage-answer').slideToggle(200);
        $(this).find('i').toggleClass('close');
    });

    $('#page .l-content .btn-default-light a.trial-btn').text('初回30日間無料でアップグレード版を試す');
});