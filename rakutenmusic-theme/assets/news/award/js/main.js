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
    pageList
      .eq(j)
      .prepend(["<figure><img src='" + imageUrl + "'></figure>"].join(""));
    pageList.eq(j).wrapInner("<a href='" + url + "'></a>");
  }
});
