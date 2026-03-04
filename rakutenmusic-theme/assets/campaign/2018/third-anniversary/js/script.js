$(function() {
  // ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  // コピーボタン表示
  // ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  var w = $(window).width();
  var addCopyButtonFlag = false;
  function addCopyButton() {
    $(".playlist__list>.playlist__artist").after(
      '<dd class="txt-copy">コピーする</dd>'
    );
    addCopyButtonFlag = true;
  }
  if (w <= 768) {
    addCopyButton();
  }
  $(window).on("resize", function() {
    var w = $(window).width();
    if (w <= 768) {
      if (addCopyButtonFlag == false) {
        addCopyButton();
      }
    } else {
      $(".txt-copy").remove();
      addCopyButtonFlag = false;
    }
  });
  // ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  // コピーボタンアクション
  // ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  var ua = navigator.userAgent;
  if (ua.indexOf("iPhone") > 0) {
    alert("あなたはiPhoneです");
  } else if (ua.indexOf("Android")) {
    alert("あなたはAndroidです");
  }
  var copyText = [
    "最新ヒット曲",
    "2016年J-POP",
    "懐かしの名曲",
    "洋楽POP",
    "2017年人気",
    "アニソンまとめ聴き",
    "忘年会で盛り上がる",
    "J-POP クリスマス",
    "CMソング",
    "小室哲哉"
  ];
  // $(document).on("click", ".txt-copy", function() {
  // ↑はjqueryで追加した要素に対してイベントを発火させる書き方
  $(document).on("click", ".txt-copy", function() {
    var index = $(".txt-copy").index(this);
    $(".playlist__list>.playlist__title")
      .eq(index)
      .append(
        '<span id="target-' +
          index +
          '" style="font-size: 0;">' +
          copyText[index] +
          "</span>"
      );
    var target = document.getElementById("target-" + index);
    var range = document.createRange();
    range.selectNode(target);
    window.getSelection().addRange(range);
    document.execCommand("copy");
    alert("コピーしました");
  });
});
