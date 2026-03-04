// check.htmlからの遷移かどうかを判定する関数
function isRedirectedFromCheckHTML() {
  return document.referrer.indexOf("https://music.rakuten.co.jp/campaign/2025/lottery2025/lottery-check/") > -1;
}

window.onload = function () {
  var accessModal = document.getElementById("accessModal");

  if (!isRedirectedFromCheckHTML()) {
    accessModal.style.display = "flex";
  }

  document.getElementById("closeAccessModal").addEventListener("click", function () {
    window.location.href = "../lottery-blank/";
  });
};
