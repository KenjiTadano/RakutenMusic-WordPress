$(function() {
  //Stickyfill
  var elem = document.querySelectorAll(
    "#page main.l-content > .ccm-layout-wrapper > .ccm-layout > .ccm-layout-row > .ccm-layout-col.first > .ccm-layout-col-spacing"
  );
  Stickyfill.add(elem);

  // Layout
  $(".ccm-page-list-description").remove();
  $(".ccm-spacer").remove();
  var pathname = location.pathname;
  var bar = pathname.match(/([^\/.]+)/g);
  var p3 = bar[2]; // ex./toppage/
  var p4 = bar[3]; // ex./new/
  var leftColMenu = $(
    "#page main.l-content > .ccm-layout-wrapper > .ccm-layout > .ccm-layout-row > .ccm-layout-col.first h1.heading + .ccm-page-list .ccm-page-list-title a"
  );
  leftColMenu.each(function() {
    var href = $(this).attr("href");
    if (href.match(p3)) {
      $(this).addClass("active");
    }
  });
  var rightColMenu = $(
    "#page main.l-content > .ccm-layout-wrapper > .ccm-layout > .ccm-layout-row > .ccm-layout-col.last .ccm-layout-col-spacing > .ccm-layout-wrapper:last-child .ccm-page-list .ccm-page-list-title a"
  );
  rightColMenu.each(function() {
    var href = $(this).attr("href");
    href = href.match(/([^\/.]+)/g);
    if (href[3] == p4) {
      $(this)
        .parent()
        .remove();
    }
  });
  var subCol = $(
    "#page main.l-content > .ccm-layout-wrapper > .ccm-layout > .ccm-layout-row > .ccm-layout-col.first"
  );
  var mainCol = $(
    "#page main.l-content > .ccm-layout-wrapper > .ccm-layout > .ccm-layout-row > .ccm-layout-col.last"
  );
  var mainColChildText = $(
    "#page main.l-content > .ccm-layout-wrapper > .ccm-layout > .ccm-layout-row > .ccm-layout-col.last .ccm-layout-col-spacing > .ccm-layout-wrapper:nth-child(2) .ccm-layout-row .ccm-layout-col.first"
  );
  var mainColChildImage = $(
    "#page main.l-content > .ccm-layout-wrapper > .ccm-layout > .ccm-layout-row > .ccm-layout-col.last .ccm-layout-col-spacing > .ccm-layout-wrapper:nth-child(2) .ccm-layout-row .ccm-layout-col.last"
  );
  $(window).on("load resize", function() {
    if (window.matchMedia("(max-width: 767px)").matches) {
      subCol.before(mainCol);
      mainColChildText.before(mainColChildImage);
    } else {
      mainCol.before(subCol);
      mainColChildImage.before(mainColChildText);
    }
  });
});
