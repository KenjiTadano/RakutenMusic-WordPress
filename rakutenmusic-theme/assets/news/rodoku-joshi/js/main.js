$(function() {
  // wrap with ol
  $("#page .ccm-page-list .ccm-page-list-description").remove();
  $("#page .ccm-page-list").wrapInner('<div class="l-inner"></div>');
  $("#page .ccm-page-list h3").wrap("<li></li>");
  $("#page .ccm-page-list > div").wrapInner("<ol></ol>");

  // get length of lists
  var pageList = $("#page .ccm-page-list .l-inner ol li");
  var listLength = pageList.length;
  var j;
  var url;
  for (var i = listLength - 1; i >= 0; i--) {
    j = listLength - 1 - i;
    url = pageList
      .eq(j)
      .children("h3")
      .children("a")
      .attr("href");
    imageUrl =
      "https://music.r10s.jp/external/prod/assets" + url + "img/ogp.jpg";
    pageList
      .eq(j)
      .children("h3")
      .children("a")
      .contents()
      .unwrap();
    numberDigits = i + 1;
    numberDigits = numberDigits.toString().length;
    if (numberDigits == 1) {
      // 1桁のとき
      newNumber = "00" + (i + 1);
    } else if (numberDigits == 2) {
      // 2桁のとき
      newNumber = "0" + (i + 1);
    } else {
      newNumber = i + 1;
    }
    pageList.eq(j).prepend(
      [
        // "<div>",
        "<div class='number'>" + newNumber + "</div>",
        "<figure><img src='" + imageUrl + "'></figure>"
        // "</div>"
      ].join("")
    );
    pageList.eq(j).wrapInner("<a href='" + url + "'></a>");
  }
});
