// コピー成功時にモーダルを表示する関数
function showCopiedModal() {
    document.querySelector('#copied').style.display = 'flex';
    setTimeout(function () {
        document.querySelector('#copied').classList.add('show');
    }, 300);
}

// モーダルを閉じる関数
function hideCopiedModal() {
    document.querySelector('#copied').classList.remove('show');
    setTimeout(function () {
        document.querySelector('#copied').style.display = 'none';
    }, 300);
}

// モーダルを表示するイベントリスナーを追加
document.querySelector('.copy').addEventListener('click', function () {
    var copyText = document.querySelector('.copy-word');
    // テキストをコピーする
    navigator.clipboard.writeText(copyText.textContent)
        .then(() => {
            // コピー成功時にモーダルを表示する
            showCopiedModal();
        })
        .catch(err => {
            console.error('エラーが発生しました:', err);
        });
});

// モーダルの閉じるボタンをクリックした際の処理
document.querySelector('#close-modal').addEventListener('click', function () {
    hideCopiedModal();
});

// モーダル外をクリックした際にもモーダルを閉じるようにする
document.querySelector('#copied').addEventListener('click', function (event) {
    if (event.target.id === 'copied') {
        hideCopiedModal();
    }
});