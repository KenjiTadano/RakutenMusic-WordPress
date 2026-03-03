document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll(".copy-button");
  const campaignCodeArea = document.querySelector(".coupon-code"); // 新しく追加
  const copyModal = document.getElementById("copyModal");
  const couponCode = "bundle60"; // コピーするクーポンコード

  // 既存のコピーボタンに対するイベントリスナー
  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      await copyCodeToClipboard(couponCode);
    });
  });

  // 新しく追加: セレクタ領域に対するイベントリスナー
  if (campaignCodeArea) {
    // campaignCodeAreaが存在する場合のみイベントリスナーを追加
    campaignCodeArea.addEventListener("click", async () => {
      await copyCodeToClipboard(couponCode);
    });
  }

  async function copyCodeToClipboard(code) {
    try {
      await navigator.clipboard.writeText(code);
      showModal();
    } catch (err) {
      console.error("クリップボードへのコピーに失敗しました:", err);
      alert("クリップボードへのコピーに失敗しました。手動でコピーしてください: " + code);
    }
  }

  function showModal() {
    copyModal.classList.add("show");
    setTimeout(() => {
      copyModal.classList.remove("show");
    }, 2000); // 2秒後にモーダルを非表示にする
  }
});
