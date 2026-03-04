$(document).ready(function () {
    let exDisplayed = false; // フラグを初期化

    $('#usage-steps--new').click(function () {
        $('.usage-steps-group--new').hide().css('display', 'flex').fadeIn();
        $('.usage-steps-group--ex').hide();
        $('.usage-steps-tab button').removeClass('active fade-in-left fade-in-right');
        $(this).addClass('active fade-in-right');
    });

    $('#usage-steps--ex').click(function () {
        $('.usage-steps-group--ex').hide().fadeIn(function () {
            if (!exDisplayed) {
                // 初めて表示されたときにのみ実行
                $('.plan-change').slick({
                    infinite: false,
                    autoplay: false,
                    slidesToShow: 3,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                            }
                        }
                    ]
                });
                exDisplayed = true; // フラグを更新
            }
        });
        $('.usage-steps-group--new').hide();
        $('.usage-steps-tab button').removeClass('active fade-in-left fade-in-right');
        $(this).addClass('active fade-in-left');
    });
});