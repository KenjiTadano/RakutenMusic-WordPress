$(function () {

    $('.campaign-detail__table .js-toggle').addClass('is-open');

    // +++++++++++++++++++++++++++
    //   Slick Slider
    // +++++++++++++++++++++++++++

    $('#rm-plan-change').on('inview', function (event, isInView) {
        if (isInView) {
            if (window.matchMedia("(max-width: 768px)").matches) {
                $(".rm-plan-change--steps").slick({
                    infinite: false,
                });
            }
        }
    });

    function slickStart() {
        $("#page #rm-popular-songs .songs").slick({
            infinite: true,
            centerMode: true,
            slidesToShow: 6,
            responsive: [{
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "30px"
                }
            }
            ]
        });
    }

    // +++++++++++++++++++++++++++
    //   Songs API
    // +++++++++++++++++++++++++++
    function showRanking() {
        $.ajax({
            url: "https://api.music.rakuten.co.jp/api/web_content/ranking/weekly?access_key=Taf6DJgW6Ny4uR5N&limit=10",
            dataType: "json",
            success: function (data) {
                $("#page #rm-popular-songs .songs-rank")
                    .children()
                    .remove();

                for (var i = 0; i < 10; i++) {
                    var rank = i + 1;
                    $("#page #rm-popular-songs .songs-rank").append(
                        [
                            "<div>",
                            '<a href="' + 'https://music.rakuten.co.jp/link/album/' + data.body.rankings[i].album.id + '/song/' + data.body.rankings[i].song.id + '' + '">',
                            "<figure>",
                            '<img src="' + data.body.rankings[i].images[0].s2 + '">',
                            "</figure>",
                            "<p>",
                            "<strong>",
                            i + 1,
                            " </strong>",
                            data.body.rankings[i].song.name,
                            "</p>",
                            "<p>" + data.body.rankings[i].artist.name + "</p>",
                            "</a>",
                            "</div>"
                        ].join("")
                    );
                    if (i > 8) {
                        slickStart();
                    }
                }
            }
        });
    }

    function showNewSongs() {
        $.ajax({
            url: "https://api.music.rakuten.co.jp/api/web_content/new?access_key=Taf6DJgW6Ny4uR5N&&new_content_count=10",
            dataType: "json",
            success: function (data) {
                $("#page #rm-popular-songs .songs-new")
                    .children()
                    .remove();
                for (var i = 0; i < 10; i++) {
                    $("#page #rm-popular-songs .songs-new").append(
                        [
                            "<div>",
                            '<a href="' + 'https://music.rakuten.co.jp/link/album/' + data.body.new_content[i].album.id + '/song/' + data.body.new_content[i].id + '' + '">',
                            "<figure>",
                            '<img src="' + data.body.new_content[i].images[0].s2 + '">',
                            "</figure>",
                            "<p>" + data.body.new_content[i].name + "</p>",
                            "<p>" + data.body.new_content[i].artist.name + "</p>",
                            "</a>",
                            "</div>"
                        ].join("")
                    );
                    if (i > 8) {
                        showRanking();
                    }
                }
            }
        });
    }
    showNewSongs();

    // +++++++++++++++++++++++++++
    //   Input Store Code
    // +++++++++++++++++++++++++++

    function doTrim(el) {
        el.value = el.value.replace(/^\s+|\s+$/g, "");
    }

    function isInput(el) {
        return el.value.length != 0;
    }

    function isNum(el) {
        return el.value == "" || /^[0-9]+$/.test(el.value);
    }

    function isRange(el, min, max) {
        return (
            el.value == "" ||
            (/^[0-9]+$/.test(el.value) && min <= el.value && el.value <= max)
        );
    }

    function isLength(el, len) {
        if ("え".length == 2) {
            len *= 2;
        }
        return el.value.length <= len;
    }

    function zen2han(el) {
        el.value = el.value.replace(/[０]/g, "0");
        el.value = el.value.replace(/[１]/g, "1");
        el.value = el.value.replace(/[２]/g, "2");
        el.value = el.value.replace(/[３]/g, "3");
        el.value = el.value.replace(/[４]/g, "4");
        el.value = el.value.replace(/[５]/g, "5");
        el.value = el.value.replace(/[６]/g, "6");
        el.value = el.value.replace(/[７]/g, "7");
        el.value = el.value.replace(/[８]/g, "8");
        el.value = el.value.replace(/[９]/g, "9");
    }

    function checkForm() {
        var el;
        var obj = document.enenForm;

        el = obj.elements["answers[35316_242792]"];
        doTrim(el);
        zen2han(el);
        if (!isInput(el)) {
            alert("店舗コードを入力してください。");
            return false;
        }
        if (!isNum(el)) {
            alert("店舗コードは数値で入力してください。");
            return false;
        }
        if (!isRange(el, 1, 9999)) {
            alert("店舗コードは1～9999の範囲で入力してください。");
            return false;
        }
        // if (!isLength(el, 256)) {
        //   alert("店舗コードは256文字以内で入力してください。");
        //   return false;
        // }
    }

    // +++++++++++++++++++++++++++
    //   FAQ
    // +++++++++++++++++++++++++++
    $("#page #rm-faq .l-inner dl dt").on("click", function () {
        var faqIndex = $("#page #rm-faq .l-inner dl dt").index(this);
        $("#page #rm-faq .l-inner dl dt").removeClass("open");
        $(this).addClass("open");
        $("#page #rm-faq .l-inner dl dd").slideUp("fast");
        $("#page #rm-faq .l-inner dl dd")
            .eq(faqIndex)
            .slideDown("fast");
    });
});