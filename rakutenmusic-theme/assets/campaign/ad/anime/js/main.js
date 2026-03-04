$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    $('#amine-song-list').on('inview', function (event, isInView) {
        if (isInView) {
            $('.anime-song-list').slick({
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
    });

    var clipboard = new ClipboardJS('.btn-copy-code');

    clipboard.on('success', function (e) {
        alert('キャンペーンコードをコピーしました。初回30日間無料お試しへお進みください。');
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

    // +++++++++++++++++++++++++++
    //   Modal
    // +++++++++++++++++++++++++++

    // モーダルを表示する関数
    function showModal() {
        console.log('show');
        $("#modal").fadeIn();
    }

    // モーダルを非表示にする関数
    function closeModal() {
        console.log('close');
        $("#modal").fadeOut();
    }

    // aタグがクリックされたらモーダルを表示する
    $("#showModal").on("click", function (e) {
        e.preventDefault();
        showModal();

        // test.jsを読み込む
        var script = document.createElement('script');
        script.src = '/assets/campaign/common/js/stack-howtoapplycampaigncode.js';
        document.head.appendChild(script);
    });

    // モーダルの閉じるボタンがクリックされたらモーダルを非表示にする
    $("#closeModal").on("click", function () {
        closeModal();
    });
});