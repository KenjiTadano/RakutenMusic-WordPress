$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    // トライアルボタンテキストを書き換える
    $("#page .l-content #rex-ceb-01+.btn-apply .trial-btn").text("楽天ミュージックに申し込む");

    // トライアルボタン注釈を書き換える
    $("#page .l-content #rex-ceb-01+.btn-apply .btn-apply--caption").html(
        '※必ず本キャンペーンページの「楽天ミュージックに申し込む」ボタンよりお申込みください。<br>' +
        '※エントリーが確認できない場合、本キャンペーンの対象外となります。<br>' +
        '※再入会後、ただちに<a href="https://music.faq.rakuten.net/s/detail/000005473">プラン料金</a>が発生いたします。<br>' +
        '※新規入会の方は、本キャンペーンの対象外となります。'
    );

});