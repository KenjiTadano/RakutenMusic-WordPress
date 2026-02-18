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
        data_c = [];
    let isProd = window.location.origin === 'https://music.rakuten.co.jp';
    let accessKey = 'Taf6DJgW6Ny4uR5N';
    let rankLength = 30;
    let APIHost = 'https://api.music.rakuten.co.jp/';

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

    function realtimeRankingApiCall() {
        $.when(
            $.getJSON(
                APIHost +
                'api/web_content/ranking/monthly?access_key=' + accessKey + '&limit=' + rankLength
            )
        )
            .done(function (hourly) {
                data_a = hourly.body.rankings;
                createRankingContent(data_a, null, null, rankLength);
            })
            .fail(function () {
                // エラーがあった時
                console.log('error');
            });
    }

    function weeklyRankingApiCall() {
        $.when(
            $.getJSON(
                APIHost +
                'api/web_content/ranking/weekly?access_key=' + accessKey + '&limit=' + rankLength
            )
        )
            .done(function (weekly) {
                data_b = weekly.body.rankings;
                createRankingContent(null, data_b, null, rankLength);
            })
            .fail(function () {
                // エラーがあった時
                console.log('error');
            });
    }

    function monthlyRankingApiCall() {
        $.when(
            $.getJSON(
                APIHost +
                'api/web_content/ranking/hourly?access_key=' + accessKey + '&limit=' + rankLength
            )
        )
            .done(function (monthly) {
                data_c = monthly.body.rankings;
                createRankingContent(null, null, data_c, rankLength);
            })
            .fail(function () {
                // エラーがあった時
                console.log('error');
            });
    }

    //on load make api call
    $(document).ready(function () {
        realtimeRankingApiCall();

        var weeklyClicked = false; // 'b'がクリックされたかどうかのフラグ
        var monthlyClicked = false; // 'c'がクリックされたかどうかのフラグ

        // クリックするたびにランキングのタブを切り替え
        var tabs = document.querySelectorAll("ul.ranking-term > li");
        tabs.forEach(function (tab) {
            tab.addEventListener("click", function (event) {
                $('ul.ranking-term > li.is-selected').removeClass('is-selected');
                $(this).addClass('is-selected');

                var dataValue = $(this).find('a').data('value');
                $('.ranking-items > div').removeClass('is-hidden');
                $('.ranking-items > div').each(function () {
                    if (!$(this).hasClass(dataValue)) {
                        $(this).addClass('is-hidden');
                    }
                });


                // data-valueが'weekly'の場合の処理
                if (dataValue === 'ranking-item--weekly' && !weeklyClicked) {
                    weeklyRankingApiCall();
                    weeklyClicked = true; // 'weekly'がクリックされたことを記録
                }

                // data-valueが'monthly'の場合の処理
                if (dataValue === 'ranking-item--monthly' && !monthlyClicked) {
                    monthlyRankingApiCall();
                    monthlyClicked = true; // 'monthly'がクリックされたことを記録
                }

                event.preventDefault();
            });
        });



        // top-section-campaign
        $('#top-section-campaign').on('inview', function (event, isInView) {
            if (isInView) {
                $('.cp-for-newsubscriber').slick({
                    dots: true,
                    arrows: true,
                    infinite: true,
                    speed: 300,
                    centerMode: true,
                    slidesToShow: 3,
                    responsive: [
                        {
                            breakpoint: 769,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            }
        });

        $('#top-section-others').on('inview', function (event, isInView) {
            if (isInView) {
                $('.cp-for-subscriber').slick({
                    dots: true,
                    arrows: true,
                    infinite: true,
                    speed: 300,
                    centerMode: true,
                    slidesToShow: 3,
                    responsive: [
                        {
                            breakpoint: 769,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            }
        });

        $('#top-section-groupservices').on('inview', function (event, isInView) {
            if (isInView) {
                $('.group-service-bnr').slick({
                    dots: true,
                    arrows: true,
                    infinite: true,
                    speed: 300,
                    centerMode: true,
                    slidesToShow: 6,
                    responsive: [
                        {
                            breakpoint: 769,
                            settings: {
                                slidesToShow: 3
                            },
                            breakpoint: 420,
                            settings: {
                                slidesToShow: 2
                            }
                        }
                    ]
                });
            }
        });
    });

    // function init(_ua) {
    //     // ランキング 週
    //     var rankWeek = $(
    //         '#page #songs .inner > div > ol > li.songs-ranking .songs-tab li'
    //     );
    //     rankWeek.on('click', function () {
    //         rankWeek.removeClass('on');
    //         var index = rankWeek.index(this);
    //         rankWeek.eq(index).addClass('on');
    //     });
    //     // アーティスト
    //     var artistTab = $(
    //         '#page #songs .inner > div > ol > li.songs-artist .songs-tab li'
    //     );
    //     artistTab.on('click', function () {
    //         artistTab.removeClass('on');
    //         var index = artistTab.index(this);
    //         artistTab.eq(index).addClass('on');
    //     });
    //     var categoryTab = $('#songs > .inner > ol > li');
    //     categoryTab.on('click', function () {
    //         var index = categoryTab.index(this);
    //         if (index == 0) {
    //             // 新着
    //             showNewSongs();
    //             setTimeout(() => {
    //                 $('.songs-new .song').scrollLeft(0);
    //                 $('.songs-new .songs-tab').scrollLeft(0);
    //             })
    //         } else if (index == 1) {
    //             // ランキング
    //             setTimeout(() => {
    //                 $('.songs-ranking .song').scrollLeft(0);
    //             });
    //         } else {
    //             // アーティスト
    //             getArtist();
    //         }
    //     });
    //     // タブ
    //     var songsTab = $('#page #songs .inner > ol li');
    //     var songsContent = $('#page #songs .inner > div > ol > li');
    //     songsTab.on('click', function (_ua) {
    //         songsTab.removeClass('on');
    //         songsContent.hide();
    //         var index = songsTab.index(this);
    //         songsTab.eq(index).addClass('on');
    //         songsContent.eq(index).fadeIn();
    //     });
    //     if (_ua.Mobile || _ua.Tablet) {
    //         var songsContentOnHeight = songsContent.eq(1).height();
    //         songsContentOnHeight =
    //             songsContentOnHeight + $('#page #songs .inner').height() * 2;
    //         $('#songs').css('height', songsContentOnHeight);
    //     }
    // }

    // function getAlbumUrl(data) {
    //     return (
    //         "'/link/album/" +
    //         (data.album && data.album.id ? data.album.id : data.id) +
    //         "/'"
    //     );
    // }

    // function showNewSongs() {
    //     //新着 最初の表示
    //     if (
    //         $('.songs-new .songs-tab , .songs-new .song') &&
    //         $('.songs-new .songs-tab , .songs-new .song').children()
    //     ) {
    //         $('.songs-new .songs-tab , .songs-new .song').children().remove();
    //     }
    //     // ジャンルの表示
    //     for (var i in genre_id_list) {
    //         if (i < 1) {
    //             let new_content =
    //                 data[i] && data[i].new_content && data[i].new_content.slice(0, 10);
    //             // 1ページ目 J-POPの表示
    //             $('.songs-new .songs-tab').append(
    //                 [
    //                     '<li class="on"><a href="javascript:void(0)">' +
    //                     genre_id_list[i].genre +
    //                     '</a></li>',
    //                 ].join('')
    //             );
    //             if (new_content && new_content.length > 0) {
    //                 for (var j = 0; j < new_content.length; j++) {
    //                     $('.songs-new .song').append(
    //                         [
    //                             "<li><a class='artistLink' target='_blank' href=" +
    //                             getAlbumUrl(new_content[j]) +
    //                             '>',
    //                             '<figure>',
    //                             '<img src="',
    //                             new_content[j].images[0].s2,
    //                             '" alt="',
    //                             new_content[j].artist.name,
    //                             '">',
    //                             '</figure>',
    //                             '<p>',
    //                             new_content[j].name,
    //                             '</p>',
    //                             '</a>',
    //                             "<a class='artistLink' target='_blank' href='/link/artist/" +
    //                             new_content[i].artist.id +
    //                             "/'>",
    //                             new_content[j].artist.name,
    //                             '</a>',
    //                             '</li>',
    //                         ].join('')
    //                     );
    //                 }
    //             } else {
    //                 $('.songs-new .song').append(
    //                     "<p class='noResultError'>該当する結果は見つかりませんでした</p>"
    //                 );
    //             }
    //         } else {
    //             $('.songs-new .songs-tab').append(
    //                 [
    //                     '<li><a href="javascript:void(0)">' +
    //                     genre_id_list[i].genre +
    //                     '</a></li>',
    //                 ].join('')
    //             );
    //         }
    //     }
    //     // 新着 ジャンル切り替え
    //     $(document).on(
    //         'click',
    //         '#page #songs .inner > div > ol > li.songs-new .songs-tab li',
    //         function () {
    //             $('.songs-new .song').scrollLeft(0);
    //             $('.songs-new .song').children().remove();
    //             var index = $(
    //                 '#page #songs .inner > div > ol > li.songs-new .songs-tab li'
    //             ).index(this);
    //             let content =
    //                 data[index] &&
    //                 data[index].new_content &&
    //                 data[index].new_content.slice(0, 10);
    //             if (content && content.length > 0) {
    //                 for (var k = 0; k < content.length; k++) {
    //                     $('.songs-new .song').append(
    //                         [
    //                             "<li><a class='artistLink' target='_blank' href=" +
    //                             getAlbumUrl(content[k]) +
    //                             '>',
    //                             '<figure>',
    //                             '<img src="',
    //                             content[k].images[0].s2,
    //                             '" alt="',
    //                             content[k].artist.name,
    //                             '">',
    //                             '</figure>',
    //                             '<p>',
    //                             content[k].name,
    //                             '</p>',
    //                             '</a>',
    //                             "<a class='artistLink' target='_blank' href='/link/artist/" +
    //                             content[k].artist.id +
    //                             "/'>",
    //                             content[k].artist.name,
    //                             '</a>',
    //                             '</li>',
    //                         ].join('')
    //                     );
    //                 }
    //             } else {
    //                 $('.songs-new .song').append(
    //                     "<p class='noResultError'>該当する結果は見つかりませんでした</p>"
    //                 );
    //             }
    //             $(
    //                 '#page #songs .inner > div > ol > li.songs-new .songs-tab li'
    //             ).removeClass('on');
    //             var index = $(this).index(this);
    //             $(this).eq(index).addClass('on');
    //         }
    //     );
    // }

    // function showAppScreenSong(data_a) {
    //     console.log(data_a);
    //     var i = Math.floor(Math.random() * 11);
    //     console.log(data_a[i].images[0].s1);
    //     console.log(data_a[i].song.name);
    //     console.log(data_a[i].artist.name);
    //     $('#fv_song_img').css('background-image', 'url(' + data_a[i].images[0].s1 + ')');
    //     $('#fv_song_title').text(data_a[i].song.name);
    //     $('#fv_song_artist').text(data_a[i].artist.name);
    //     setTimeout(function () {
    //         $('#page #top .main_contents > div.app_screen .song').fadeIn();
    //     }, 200);

    // }



    function createRankingContent(data_a, data_b, data_c, rankLength) {

        if (data_a !== null) {
            rendarRankingContent('.ranking-item--hourly', data_a, rankLength);
        } else if (data_b !== null) {
            rendarRankingContent('.ranking-item--weekly', data_b, rankLength);
        } else if (data_c !== null) {
            rendarRankingContent('.ranking-item--monthly', data_c, rankLength);
        } else {
            console.log("error");
        }

    }

    function rendarRankingContent(elementname, data, rankLength) {

        var targetElement = document.querySelector(elementname);

        for (let i = 0; i < rankLength; i++) {
            // 新しい .song-item 要素を作成
            var songItem = document.createElement('div');
            songItem.classList.add('song-item');
            songItem.textContent = `Song ${i + 1}`;

            // .ranking-items要素に .song-item 要素を追加
            targetElement.appendChild(songItem);

            songItem.innerHTML = `
                <a target="_blank" href="https://music.rakuten.co.jp/link/album/${data[i].album.id}/song/${data[i].song.id}/">
                <p class="rank-num font-rakuten-b">${data[i].rank}</p>
                <img src="${data[i].images[0].s2}"
                    alt="${data[i].artist.name} 『${data[i].song.name}』">
                <div class="song-item-txt">
                    <p class="song-ttl">${data[i].song.name}</p>
                    <p class="song-artist">${data[i].artist.name}</p>
                </div>
                </a>
            `;

            // 3つの .song-item 要素が .ranking-item-group に追加される場合
            if ((i + 1) % 3 === 0) {
                // 新しい .ranking-item-group 要素を作成
                var rankingItemGroup = document.createElement('div');
                rankingItemGroup.classList.add('ranking-item-group');

                // 直近の3つの .song-item 要素を .ranking-item-group に移動
                for (let j = 0; j < 3; j++) {
                    var lastSongItem = targetElement.lastChild;
                    if (lastSongItem) {
                        rankingItemGroup.insertBefore(lastSongItem, rankingItemGroup.firstChild);
                    }
                }

                // .ranking-items要素に .ranking-item-group 要素を追加
                targetElement.appendChild(rankingItemGroup);
            }
        }
        // return;

        // Slick Slider
        $(elementname).slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            centerMode: true,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
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
