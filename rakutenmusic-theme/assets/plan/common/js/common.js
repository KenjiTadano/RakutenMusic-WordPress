(function ($) {
    $(document).ready(function () {
        var exDisplayed = false;

        $('#usage-steps--new').on('click', function () {
            $('.usage-steps-group--new').hide().css('display', 'flex').fadeIn();
            $('.usage-steps-group--ex').hide();
            $('.usage-steps-tab button').removeClass('active fade-in-left fade-in-right');
            $(this).addClass('active fade-in-right');
        });

        $('#usage-steps--ex').on('click', function () {
            $('.usage-steps-group--new').hide();
            $('.usage-steps-group--ex').hide().fadeIn(function () {
                if (!exDisplayed) {
                    $('.plan-change').slick({
                        infinite: false,
                        autoplay: false,
                        slidesToShow: 3,
                        responsive: [
                            {
                                breakpoint: 768,
                                settings: { slidesToShow: 1 }
                            }
                        ]
                    });
                    exDisplayed = true;
                }
            });
            $('.usage-steps-tab button').removeClass('active fade-in-left fade-in-right');
            $(this).addClass('active fade-in-left');
        });
    });
})(jQuery);