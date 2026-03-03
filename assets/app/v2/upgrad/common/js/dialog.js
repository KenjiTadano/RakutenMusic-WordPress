//////////////////////Dialog表示
const copyButton = document.getElementById("copy-button");
const dialog = document.getElementById("myDialog");
const openButtons = document.querySelectorAll(".openDialog");
const closeDialogButton = document.getElementById("closeDialog");

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    var copyText = document.querySelector(".copy-word");
    navigator.clipboard
      .writeText(copyText.textContent)
      .then(() => {
        copyButton.disabled = true; // ダイアログが開いている間、ボタンを無効にする
        dialog.showModal();
      })
      .catch((err) => {
        console.error("エラーが発生しました:", err);
      });
  });
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
  copyButton.disabled = false;
});
dialog.addEventListener("click", (event) => {
  // クリックされた要素がダイアログ自身であるか確認
  if (event.target === dialog) {
    dialog.close();
    copyButton.disabled = false;
  }
});
