$(function () {
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

        /**
         * Slick Slider
         */
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
});
