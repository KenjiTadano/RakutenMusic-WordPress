$(function () {
    // +++++++++++++++++++++++++++
    //   Slick Slider
    // +++++++++++++++++++++++++++

    function slickStart() {
        $("#page #rm-popular-songs .songs").slick({
            infinite: true,
            centerMode: true,
            slidesToShow: 6,
            responsive: [
                {
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
        $('#page #rm-steps-content .l-inner ol li div.howtouse').slick({
            infinite: false,
            dots: true,
            arrows: true,
            adaptiveHeight: true,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ],
        })
    }

    // +++++++++++++++++++++++++++
    //   Songs API
    // +++++++++++++++++++++++++++
    function showRanking() {
        $.ajax({
            url: "https://music.r10s.jp/external/prod/json/ranking_weekly_3.json",
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
                            "<figure>",
                            '<img src="' + data.ranking[i].images[0].s2 + '">',
                            "</figure>",
                            "<p>",
                            "<strong>",
                            i + 1,
                            " </strong>",
                            data.ranking[i].song_name,
                            "</p>",
                            "<p>" + data.ranking[i].artist_name + "</p>",
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
            url: "https://music.r10s.jp/external/prod/json/new_content.json",
            dataType: "json",
            success: function (data) {
                $("#page #rm-popular-songs .songs-new")
                    .children()
                    .remove();
                for (var i = 0; i < 10; i++) {
                    $("#page #rm-popular-songs .songs-new").append(
                        [
                            "<div>",
                            "<figure>",
                            '<img src="' + data[0].items[i].images[0].s2 + '">',
                            "</figure>",
                            "<p>" + data[0].items[i].name + "</p>",
                            "<p>" + data[0].items[i].artist_name + "</p>",
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

        el = obj.elements["answers[33047_226078]"];
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
