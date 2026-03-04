$(document).ready(function () {
    // .campaign-detail__table .js-toggleにis-openクラスを追加
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    // コピー成功時にモーダルを表示する関数
    function showCopiedModal() {
        console.log('showCopiedModal called'); // デバッグ用ログ
        var copiedModal = document.querySelector('#copied');
        if (copiedModal) {
            copiedModal.style.display = 'flex';
            setTimeout(function () {
                copiedModal.classList.add('show');
            }, 300);
        } else {
            console.error('#copied element not found');
        }
    }

    // モーダルを閉じる関数
    function hideCopiedModal() {
        console.log('hideCopiedModal called'); // デバッグ用ログ
        var copiedModal = document.querySelector('#copied');
        if (copiedModal) {
            copiedModal.classList.remove('show');
            setTimeout(function () {
                copiedModal.style.display = 'none';
            }, 300);
        } else {
            console.error('#copied element not found');
        }
    }

    // Clipboard.jsを初期化
    var clipboard = new ClipboardJS('.btn-copy-code');

    // コピー成功時のイベント
    clipboard.on('success', function (e) {
        console.log('Copy success'); // デバッグ用ログ
        showCopiedModal();
        // e.clearSelection();
    });

    // コピー失敗時のイベント
    clipboard.on('error', function (e) {
        console.error('Failed to copy text: ', e);
        alert('コピーに失敗しました');
    });

    // モーダルの閉じるボタンをクリックした際の処理
    var closeModalButton = document.querySelector('#close-modal');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', function () {
            hideCopiedModal();
        });
    } else {
        console.error('#close-modal element not found');
    }

    // モーダル外をクリックした際にもモーダルを閉じるようにする
    var copiedModal = document.querySelector('#copied');
    if (copiedModal) {
        copiedModal.addEventListener('click', function (event) {
            if (event.target.id === 'copied') {
                hideCopiedModal();
            }
        });
    } else {
        console.error('#copied element not found');
    }
});
