(function($) {
  "use strict";

  if (typeof $ == "undefined") {
    return;
  }

  $(function() {

    //---------------------------------
    //アコーディオン
    //---------------------------------
    $(".js-Accordion, .js-Accordions li > a").click(function () {
      var btn = $(this);
      btn.toggleClass("js-active");
      btn.next().stop().slideToggle(400);
      return false;
    });


  });


})(window.jQuery);