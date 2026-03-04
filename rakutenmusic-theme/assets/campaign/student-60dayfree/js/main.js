$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    var clipboard = new ClipboardJS('.btn-copy-url');

    clipboard.on('success', function (e) {
        $('.btn-copy-url').after('<p style="color: #bf0000; font-size: 12px;">キャンペーン紹介用URLをコピーしました。</p>');
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
});