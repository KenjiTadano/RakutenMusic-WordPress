$(function () {
    let data_a = [],
        data_b = [],
        data_c = [];
    let isProd = window.location.origin === 'https://music.rakuten.co.jp';
    let accessKey = 'Taf6DJgW6Ny4uR5N';
    let rankLength = 30;
    let APIHost = 'https://api.music.rakuten.co.jp/';

    function realtimeRankingApiCall() {
        $.when(
            $.getJSON(
                APIHost +
                'api/web_content/ranking/hourly?access_key=' + accessKey + '&limit=' + rankLength
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
                'api/web_content/ranking/monthly?access_key=' + accessKey + '&limit=' + rankLength
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

        var inputElement = document.getElementById('search-key');
        var initialPlaceholder = inputElement.getAttribute('placeholder'); // 初期のplaceholder値を取得

        inputElement.addEventListener('focus', function () {
            this.placeholder = ''; // フォーカス時にplaceholderをクリア
        });

        inputElement.addEventListener('blur', function () {
            if (this.value === '') {
                this.placeholder = initialPlaceholder; // 初期のplaceholder値を復元
            }
        });

        const RMUSIC_URI_HOST = 'https://music.rakuten.co.jp';

        /**
         * 検索画面呼出
         *
         * @param {string} keyword 検索KWD
         */
        const searchWebPleyer = (keyword) => {
            let resultUri = RMUSIC_URI_HOST + '/link/search/'
            if (keyword) {
                // クエリパラメタを組み立て
                // 検索KWDの両端スペースを削除&スペースで分割&各KWDをパーセントエンコーディング
                let searchPageParameter = keyword.trim().split(' ').map((str) => encodeURIComponent(str)).join('+');
                resultUri += '?q=' + searchPageParameter;
            }
            window.open(resultUri);
        };

        /**
         * 検索フォームEnterキーハンドラ
         */
        const $SEARCH_BOX = $('#search-key');
        $SEARCH_BOX.keyup((e) => { if (e.which === 13) { searchWebPleyer($SEARCH_BOX.val()); } });

        /**
         * 検索ボタンイベントハンドラ
         */
        const $SEARCH_BUTTON = $('.searchIcon');
        $SEARCH_BUTTON.click(() => { searchWebPleyer($SEARCH_BOX.val()); });

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

        $('#top-section-campaign').one('inview', function (event, isInView) {
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

        $('#top-section-others').one('inview', function (event, isInView) {
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

        $('#top-section-groupservices').one('inview', function (event, isInView) {
            if (isInView) {
                $('.group-service-bnr').slick({
                    dots: true,
                    arrows: true,
                    infinite: true,
                    speed: 300,
                    centerMode: true,
                    slidesToShow: 8,
                    responsive: [
                        {
                            breakpoint: 769,
                            settings: {
                                slidesToShow: 3
                            },
                            breakpoint: 441,
                            settings: {
                                slidesToShow: 2
                            }
                        }
                    ]
                });
            }
        });
    });

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
        $(elementname).on('init', function (event, slick) {
            $('.slick-track').addClass('slick-track-initial');
        });
        $(elementname).slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            centerMode: false,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                    }
                }
            ]
        }).on('afterChange', function (event, slick, currentSlide) {
            if (currentSlide === 0) {
                $('.slick-track').addClass('slick-track-initial');
            } else {
                $('.slick-track').removeClass('slick-track-initial');
            }
        });

    }
});
