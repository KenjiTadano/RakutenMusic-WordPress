$(function () {
  if (window.location.pathname == '/') {
    // TopページでのみFVでフローティングバナーを隠す
    $(window).on('scroll', function () {
      var y = $(window).scrollTop();
      if (y > 600) {
        $('.floating_wrapper').show();
      } else {
        $('.floating_wrapper').hide();
      }
    });
  } else {
    $('.floating_wrapper').show();
  }

  $('.floating_wrapper .close').on('click', function () {
    $('.floating_wrapper').remove();
  });
});
