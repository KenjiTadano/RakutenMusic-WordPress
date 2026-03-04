document.addEventListener("DOMContentLoaded", function () {
  // ボタン要素を取得
  const downloadButtons = document.querySelectorAll(".btn-app-dl-pc");
  // モーダル要素を取得
  const modal = document.getElementById("myModal");
  // 閉じるボタン要素を取得
  const closeBtn = document.querySelector(".close");

  // 各ダウンロードボタンにイベントリスナーを追加
  downloadButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // モーダルを表示
      modal.style.display = "block";
    });
  });

  // 閉じるボタンがクリックされた時の処理
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // モーダルの外側をクリックされた時の処理
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});
