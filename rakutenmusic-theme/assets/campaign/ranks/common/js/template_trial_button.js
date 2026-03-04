$(function () {
    if (_UA.indexOf('App-') > -1) {
        $('#rank-ddt .rank-ddt_cta_btn a').attr('href', 'https://music.rakuten.co.jp/link/app/app_inflow.html')
        $('#rank-ddt .rank-ddt_cta_btn a').html('アプリをダウンロード');
    }
});