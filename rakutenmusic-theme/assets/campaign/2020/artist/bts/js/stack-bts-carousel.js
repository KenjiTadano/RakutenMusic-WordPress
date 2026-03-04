$(function() {
    function slickStart() {
        $("#page ol li .slick-mypage #albumlist ul").slick({
            infinite: true,
            centerMode: true,
            slidesToShow: 13,
            responsive: [{
                    breakpoint: 1650,
                    settings: {
                        slidesToShow: 11
                    }
                },
                {
                    breakpoint: 1550,
                    settings: {
                        slidesToShow: 11
                    }
                },
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 9
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 8
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 500,
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
            url: "https://music.r10s.jp/external/prod/assets/campaign/2020/artist/bts/js/bts_album.json",
            dataType: "json",
            success: function(data) {
                $("#page ol li .slick-mypage #albumlist ul")
                    .children()
                    .remove();
                for (var i = 0; i < 25; i++) {
                    $("#page ol li .slick-mypage #albumlist ul").append(
                        [
                            "<li>",
                            "<figure>",
                            '<img src="' + data.ranking[i].images[0].s2 + '">',
                            "</figure>",
                            '<p>' + data.ranking[i].song_name + '</p>',
                            "</li>"
                        ].join("")
                    );
                    if (i > 23) {
                        slickStart();
                    }
                }
            }
        });
    }
    showRanking();
});