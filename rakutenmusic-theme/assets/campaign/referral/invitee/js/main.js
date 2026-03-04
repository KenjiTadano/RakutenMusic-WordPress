document.addEventListener("DOMContentLoaded", function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    var copyButton = document.querySelector('.btn-copy-code');
    copyButton.addEventListener('click', function () {
        var clipboardText = copyButton.getAttribute('data-clipboard-text');
        navigator.clipboard.writeText(clipboardText)
            .then(function () {
                alert('クーポンコードをコピーしました。無料トライアルをはじめるボタンからお申込みください。');
            })
            .catch(function (error) {
                alert('コピー中にエラーが発生しました');
            });
    });
});