$(function() {
  // +++++++++++++++++++++++++++
  //   Songs
  // +++++++++++++++++++++++++++
  function slickStart() {
    $("#page #ranks-songs ul").slick({
      infinite: true,
      centerMode: true,
      slidesToShow: 14,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 12
          }
        },
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 10
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 8
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 2,
            centerPadding: "30px"
          }
        }
      ]
    });
  }
  function showRanking() {
    $.ajax({
      url: "https://music.r10s.jp/external/prod/json/ranking_weekly_3.json",
      dataType: "json",
      success: function(data) {
        $("#page #ranks-songs ul")
          .children()
          .remove();
        for (var i = 0; i < 20; i++) {
          $("#page #ranks-songs ul").append(
            [
              "<li>",
              "<figure>",
              '<img src="' + data.ranking[i].images[0].s2 + '">',
              "</figure>",
              "</li>"
            ].join("")
          );
          if (i > 18) {
            slickStart();
          }
        }
      }
    });
  }
  showRanking();
});
