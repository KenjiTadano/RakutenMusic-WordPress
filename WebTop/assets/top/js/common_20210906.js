$(function () {
    // =================
    // slide banner
    // =================
    unwrapFlug = false;
    function unwrapFunc() {
        $('.s-campaign-list .heading').remove();
        $('.s-campaign-list ul')
            .unwrap()
            .removeClass('campaign-list')
            .addClass('slide-bnr');
        $('.s-campaign-list ul li').removeClass('campaign__item');
        $('.s-campaign-list ul li .campaign__title').remove();
        unwrapFlug = true;
    }
    unwrapFunc();
    if (unwrapFlug == true) {
        $('.slide-bnr').slick({
            autoplay: true,
            dots: true,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: false,
                        centerMode: false,
                    },
                },
            ],
        });
    }
    // // =================
    // // init
    // // =================
    var _ua = (function (u) {
        return {
            Tablet:
                (u.indexOf('windows') != -1 &&
                    u.indexOf('touch') != -1 &&
                    u.indexOf('tablet pc') == -1) ||
                u.indexOf('ipad') != -1 ||
                (u.indexOf('android') != -1 && u.indexOf('mobile') == -1) ||
                (u.indexOf('firefox') != -1 && u.indexOf('tablet') != -1) ||
                u.indexOf('kindle') != -1 ||
                u.indexOf('silk') != -1 ||
                u.indexOf('playbook') != -1,
            Mobile:
                (u.indexOf('windows') != -1 && u.indexOf('phone') != -1) ||
                u.indexOf('iphone') != -1 ||
                u.indexOf('ipod') != -1 ||
                (u.indexOf('android') != -1 && u.indexOf('mobile') != -1) ||
                (u.indexOf('firefox') != -1 && u.indexOf('mobile') != -1) ||
                u.indexOf('blackberry') != -1,
        };
    })(window.navigator.userAgent.toLowerCase());

    let data_a = [],
        data_b = [],
        data_c = [],
        data = [];
    let isProd = window.location.origin === 'https://music.rakuten.co.jp';

    function getAPIHost() {
        return isProd
            ? 'https://api.music.rakuten.co.jp/'
            : 'https://api.stg.r-music.sockets.tv/';
    }

    const genre_id_list = [
        {
            genre: '全てのジャンル',
        },
        {
            id: isProd ? 361 : 54,
            genre: 'J-POP',
        },
        {
            id: isProd ? 362 : 55,
            genre: 'J-ROCK',
        },
        {
            id: isProd ? 363 : 56,
            genre: 'POPS/ROCK/DANCE',
        },
        {
            id: isProd ? 364 : 57,
            genre: 'HIPHOP/R&B/REGGAE',
        },
        {
            id: isProd ? 365 : 58,
            genre: 'アニメ/ファミリー',
        },
        {
            id: isProd ? 366 : 59,
            genre: 'JAZZ',
        },
        {
            id: isProd ? 367 : 60,
            genre: 'CLASSIC',
        },
    ];

    function rankingApiCall() {
        $.when(
            $.getJSON(
                getAPIHost() +
                'api/web_content/ranking/monthly?access_key=Taf6DJgW6Ny4uR5N&limit=10'
            ),
            $.getJSON(
                getAPIHost() +
                'api/web_content/ranking/weekly?access_key=Taf6DJgW6Ny4uR5N&limit=10'
            ),
            $.getJSON(
                getAPIHost() +
                'api/web_content/ranking/hourly?access_key=Taf6DJgW6Ny4uR5N&limit=10'
            )
        )
            .done(function (monthly, weekly, hourly) {
                data_a = monthly[0].body.rankings;
                data_b = weekly[0].body.rankings;
                data_c = hourly[0].body.rankings;
            })
            .fail(function () {
                // エラーがあった時
                console.log('error');
            });
    }

    async function newContentApiCall() {
        let result = [],
            response;
        for (var i = 0; i < genre_id_list.length; i++) {
            response = await $.ajax({
                url:
                    getAPIHost() +
                    'api/web_content/new?access_key=Taf6DJgW6Ny4uR5N&' +
                    (i === 0 ? '' : '&genre_id=' + genre_id_list[i].id) +
                    '&new_content_count=10',
                dataType: 'json',
            });
            if (response) result.push(response.body);
        }
        return result;
    }

    //on load make api call
    $(document).ready(function () {
        rankingApiCall();
        newContentApiCall()
            .then((result) => {
                data = result;
                init(_ua);
            })
            .catch((error) => {
                init(_ua);
                console.log(error);
            });
    });

    function init(_ua) {

        // FV
        showAppScreenSong(data_a);

        // ランキングをデフォルトで表示
        createRankingTabs();

        // ランキング 週
        var rankWeek = $(
            '#page #songs .inner > div > ol > li.songs-ranking .songs-tab li'
        );
        rankWeek.on('click', function () {
            rankWeek.removeClass('on');
            var index = rankWeek.index(this);
            rankWeek.eq(index).addClass('on');
        });
        // アーティスト
        var artistTab = $(
            '#page #songs .inner > div > ol > li.songs-artist .songs-tab li'
        );
        artistTab.on('click', function () {
            artistTab.removeClass('on');
            var index = artistTab.index(this);
            artistTab.eq(index).addClass('on');
        });
        var categoryTab = $('#songs > .inner > ol > li');
        categoryTab.on('click', function () {
            var index = categoryTab.index(this);
            if (index == 0) {
                // 新着
                showNewSongs();
                setTimeout(() => {
                    $('.songs-new .song').scrollLeft(0);
                    $('.songs-new .songs-tab').scrollLeft(0);
                })
            } else if (index == 1) {
                // ランキング
                createRankingTabs();
                setTimeout(() => {
                    $('.songs-ranking .song').scrollLeft(0);
                });
            } else {
                // アーティスト
                getArtist();
            }
        });
        // タブ
        var songsTab = $('#page #songs .inner > ol li');
        var songsContent = $('#page #songs .inner > div > ol > li');
        songsTab.on('click', function (_ua) {
            songsTab.removeClass('on');
            songsContent.hide();
            var index = songsTab.index(this);
            songsTab.eq(index).addClass('on');
            songsContent.eq(index).fadeIn();
        });
        if (_ua.Mobile || _ua.Tablet) {
            var songsContentOnHeight = songsContent.eq(1).height();
            songsContentOnHeight =
                songsContentOnHeight + $('#page #songs .inner').height() * 2;
            $('#songs').css('height', songsContentOnHeight);
            console.log(songsContentOnHeight);
        }
    }

    function getAlbumUrl(data) {
        return (
            "'/link/album/" +
            (data.album && data.album.id ? data.album.id : data.id) +
            "/'"
        );
    }

    function showNewSongs() {
        //新着 最初の表示
        if (
            $('.songs-new .songs-tab , .songs-new .song') &&
            $('.songs-new .songs-tab , .songs-new .song').children()
        ) {
            $('.songs-new .songs-tab , .songs-new .song').children().remove();
        }
        // ジャンルの表示
        for (var i in genre_id_list) {
            if (i < 1) {
                let new_content =
                    data[i] && data[i].new_content && data[i].new_content.slice(0, 10);
                // 1ページ目 J-POPの表示
                $('.songs-new .songs-tab').append(
                    [
                        '<li class="on"><a href="javascript:void(0)">' +
                        genre_id_list[i].genre +
                        '</a></li>',
                    ].join('')
                );
                if (new_content && new_content.length > 0) {
                    for (var j = 0; j < new_content.length; j++) {
                        $('.songs-new .song').append(
                            [
                                "<li><a class='artistLink' target='_blank' href=" +
                                getAlbumUrl(new_content[j]) +
                                '>',
                                '<figure>',
                                '<img src="',
                                new_content[j].images[0].s2,
                                '" alt="',
                                new_content[j].artist.name,
                                '">',
                                '</figure>',
                                '<p>',
                                new_content[j].name,
                                '</p>',
                                '</a>',
                                "<a class='artistLink' target='_blank' href='/link/artist/" +
                                new_content[i].artist.id +
                                "/'>",
                                new_content[j].artist.name,
                                '</a>',
                                '</li>',
                            ].join('')
                        );
                    }
                } else {
                    $('.songs-new .song').append(
                        "<p class='noResultError'>該当する結果は見つかりませんでした</p>"
                    );
                }
            } else {
                $('.songs-new .songs-tab').append(
                    [
                        '<li><a href="javascript:void(0)">' +
                        genre_id_list[i].genre +
                        '</a></li>',
                    ].join('')
                );
            }
        }
        // 新着 ジャンル切り替え
        $(document).on(
            'click',
            '#page #songs .inner > div > ol > li.songs-new .songs-tab li',
            function () {
                $('.songs-new .song').scrollLeft(0);
                $('.songs-new .song').children().remove();
                var index = $(
                    '#page #songs .inner > div > ol > li.songs-new .songs-tab li'
                ).index(this);
                let content =
                    data[index] &&
                    data[index].new_content &&
                    data[index].new_content.slice(0, 10);
                if (content && content.length > 0) {
                    for (var k = 0; k < content.length; k++) {
                        $('.songs-new .song').append(
                            [
                                "<li><a class='artistLink' target='_blank' href=" +
                                getAlbumUrl(content[k]) +
                                '>',
                                '<figure>',
                                '<img src="',
                                content[k].images[0].s2,
                                '" alt="',
                                content[k].artist.name,
                                '">',
                                '</figure>',
                                '<p>',
                                content[k].name,
                                '</p>',
                                '</a>',
                                "<a class='artistLink' target='_blank' href='/link/artist/" +
                                content[k].artist.id +
                                "/'>",
                                content[k].artist.name,
                                '</a>',
                                '</li>',
                            ].join('')
                        );
                    }
                } else {
                    $('.songs-new .song').append(
                        "<p class='noResultError'>該当する結果は見つかりませんでした</p>"
                    );
                }
                $(
                    '#page #songs .inner > div > ol > li.songs-new .songs-tab li'
                ).removeClass('on');
                var index = $(this).index(this);
                $(this).eq(index).addClass('on');
            }
        );
    }

    function showAppScreenSong(data_a) {
        console.log(data_a);
        var i = Math.floor(Math.random() * 11);
        console.log(data_a[i].images[0].s1);
        console.log(data_a[i].song.name);
        console.log(data_a[i].artist.name);
        $('#fv_song_img').css('background-image', 'url(' + data_a[i].images[0].s1 + ')');
        $('#fv_song_title').text(data_a[i].song.name);
        $('#fv_song_artist').text(data_a[i].artist.name);
        setTimeout(function () {
            $('#page #top .main_contents > div.app_screen .song').fadeIn();
        }, 200);

    }

    function createRankingTabs() {
        // すべて成功した時の処理
        // init
        $('.songs-ranking .songs-tab').children().removeClass('on');
        $('.songs-ranking .songs-tab').children().eq(0).addClass('on');
        // create tab
        $('.songs-ranking .songs-tab')
            .children()
            .eq(0)
            .html(['<a href="javascript:void(0)">マンスリー</a>'].join(''));
        $('.songs-ranking .songs-tab')
            .children()
            .eq(1)
            .html(['<a href="javascript:void(0)">ウィークリー</a>'].join(''));
        $('.songs-ranking .songs-tab')
            .children()
            .eq(2)
            .html(['<a href="javascript:void(0)">リアルタイム</a>'].join(''));
        if ($('.songs-ranking .song').children())
            $('.songs-ranking .song').children().remove();
        showRanking(data_a);
        changeRankingTabs(data_a, data_b, data_c);
    }

    function showRanking(rankData) {
        if (rankData && rankData.length > 0) {
            for (var i = 0; i < 10; i++) {
                $('.songs-ranking .song').append(
                    [
                        "<li><a class='artistLink' target='_blank' href='/link/album/" +
                        rankData[i].album.id +
                        '/song/' +
                        rankData[i].song.id +
                        "/'>",
                        '<figure>',
                        '<img src="',
                        rankData[i].images[0].s2,
                        '" alt="',
                        rankData[i].artist.name,
                        '">',
                        '</figure>',
                        '<p><strong>',
                        i + 1,
                        '</strong>',
                        rankData[i].song.name,
                        '</p>',
                        '</a>',
                        "<a class='artistLink' target='_blank' href='/link/artist/" +
                        rankData[i].artist.id +
                        "/'>",
                        rankData[i].artist.name,
                        '</a>',
                        '</li>',
                    ].join('')
                );
            }
        } else {
            $('.songs-ranking .song').append(
                "<p class='noResultError'>該当する結果は見つかりませんでした</p>"
            );
        }
    }

    function changeRankingTabs(data_a, data_b, data_c) {
        $('.songs-ranking .songs-tab')
            .children()
            .on('click', function () {
                $('.songs-ranking .song').children().remove();
                var key = $(this).attr('data-key');
                $('.songs-ranking .song').scrollLeft(0);
                showRanking(eval('data_' + key));
            });
    }

    function getArtist() {
        $.ajax({
            url: 'https://music.r10s.jp/external/prod/json/artistlist_new.json',
            dataType: 'json',
            error: function () {
                $('.artist-list').html(
                    '<li>アーティストの読み込みに失敗しました。</li>'
                );
            },
            success: function (data) {
                var num = 100;
                getArtistFromAPI(data, num);
            },
        });
    }

    function getArtistFromAPI(data, num) {
        for (var i = num - 100; i < num + 1; i++) {
            $('.artist-list').append(['<li>', data[i].artist_name, '</li>'].join(''));
            if (i > num - 1) {
                getArtistWhenScrolling(data, num);
            }
        }
    }

    function getArtistWhenScrolling(data, num) {
        var getNextArtistListFlag = false;
        $('.artist-list').bottom();
        $('.artist-list').bind('bottom', function () {
            var obj = $(this);
            if (obj) {
                if (getNextArtistListFlag == false) {
                    num = num + 100;
                    getNextArtistListFlag = true;
                    getArtistFromAPI(data, num);
                }
            }
        });
    }

    function campaignPopup() {
        $('.ajax-popup-link').magnificPopup({
            type: 'ajax',
            fixedContentPos: true,
            closeMarkup:
                '<div class="icon-24 btn btn-close closePopup"><span class="icon-close"></span></div>',
        });
        $(document).on('click', '.closePopup', function () {
            $.magnificPopup.close();
        });
    }
    campaignPopup();
});
