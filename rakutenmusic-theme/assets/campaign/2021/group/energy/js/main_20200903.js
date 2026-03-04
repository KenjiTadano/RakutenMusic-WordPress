$(function () {

    $('.campaign-detail__table .js-toggle').addClass('is-open');

    // ===================================
    // Campaign detail tab
    // ===================================

    $('#page #campaign-about .l-inner dl > div dt').on('click', function () {
        if ($(this).hasClass('on')) {
            return false
        } else {
            var index = $('#page #campaign-about .l-inner dl > div dt').index(this)

            $('#page #campaign-about .l-inner dl > div dt').removeClass('on')
            $('#page #campaign-about .l-inner dl > dd').removeClass('on')

            $(this).addClass('on')
            $('#page #campaign-about .l-inner dl > dd').eq(index).addClass('on')
        }
    })

    // ===================================
    // Modal
    // ===================================

    function campaignCodeModalOpen() {
        console.log('hey')
        $('#page #campaign-code-modal').fadeIn('fast')
    }
    function campaignCodeModalClose() {
        $('#page #campaign-code-modal').fadeOut('fast', showStep1)
    }
    function showStep1() {
        $('#page #campaign-code-modal .l-inner .step').removeClass('hide')
        $('#page #campaign-code-modal .l-inner .step-2').addClass('hide')
    }
    function showStep2() {
        $('#page #campaign-code-modal .l-inner .step').removeClass('hide')
        $('#page #campaign-code-modal .l-inner .step-1').addClass('hide')
    }

    $('#page #campaign-about .l-inner dl > dd .campaign-code-btn').on('click', campaignCodeModalOpen)

    $('#page #campaign-code-modal .click-area').on('click', campaignCodeModalClose)
    $('#page #campaign-code-modal .close-btn').on('click', campaignCodeModalClose)

    $('#page #campaign-code-modal .l-inner .step-1 ul li a.varified').on('click', showStep2)
});