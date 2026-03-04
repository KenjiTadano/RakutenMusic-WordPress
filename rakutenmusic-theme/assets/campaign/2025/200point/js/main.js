$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    // キャンペーン終了日
    const endDate = new Date('2025-01-31T09:59:59');

    // カウントダウンを更新する関数
    function updateCountdown() {
        const now = new Date();
        const timeDifference = endDate - now;
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        const countdownElement = document.getElementById('countdown');
        const daysElement = document.getElementById('days');

        if (daysRemaining > 0) {
            // 残り日数を表示
            daysElement.textContent = daysRemaining;
        } else if (daysRemaining === 0) {
            // 本日まで
            countdownElement.innerHTML = '<p>キャンペーンは本日まで！</p>';
        } else {
            // キャンペーン終了後の処理（必要に応じて追加）
            countdownElement.innerHTML = '<p>キャンペーンは終了しました。</p>';
        }
    }

    // ページが読み込まれたときにカウントダウンを更新
    updateCountdown();

    // 1日ごとにカウントダウンを更新
    setInterval(updateCountdown, 1000 * 60 * 60 * 24);
});