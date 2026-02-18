$(function () {
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
      url: "https://api.music.rakuten.co.jp/api/web_content/ranking/weekly?access_key=Taf6DJgW6Ny4uR5N&limit=20",
      dataType: "json",
      success: function (data) {
        console.log();
        $("#page #ranks-songs ul")
          .children()
          .remove();
        for (var i = 0; i < 20; i++) {
          $("#page #ranks-songs ul").append(
            [
              "<li>",
              "<figure>",
              '<img src="' + data.body.rankings[i].images[0].s2 + '">',
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
