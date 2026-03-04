$(function() {
  // ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  // コピーボタン表示
  // ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  var w = $(window).width();
  var addCopyButtonFlag = false;
  function addCopyButton() {
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
    for (i in copyText) {
      $(".playlist__list>.playlist__title")
        .eq(i)
        .append(
          '<label class="txt-copy" style="display: block; font-size: 3vw; color: #686868; margin: 4vw 0 0;">タップしてコピー → アプリで検索！</label>',
          '<input class="txt-copy" style="width: 100%;" id="target-' +
            i +
            '" type="text" value="' +
            copyText[i] +
            '" onclick="this.setSelectionRange(0,9999);" readonly>'
        );
      //   console.log(i);
    }
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
});
