$(function () {
    $('.trial-period').text('90');
    var trialCaption = $('#page .stack-characteristic .l-inner .stack-characteristic--content + p.small')[0];
    var trialCaptionEdited = trialCaption.innerText.replace('のお申し込み（アプリ内課金は対象外）が必要', 'のお申し込み（アプリ内課金は対象外）とキャンペーンコードの入力が必要');
    trialCaption.innerText = trialCaptionEdited;

    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('is-hidden');
        } else {
            $('#page #sticky-apply-btn').removeClass('is-hidden');
        }
    });

    var clipboard = new ClipboardJS('.btn-copy-code');

    clipboard.on('success', function (e) {
        alert('キャンペーンコードをコピーしました。楽天ミュージックのお申し込みへお進みください。');
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

    $('.cnp-apply-steps').on('inview', function (event, isInView) {
        if (isInView) {
            $('.cnp-apply-steps').slick({
                dots: true,
                arrows: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
    });

    $('.bu-cnp-bnr').on('inview', function (event, isInView) {
        if (isInView) {
            $('.bu-cnp-bnr').slick({
                dots: false,
                slidesToShow: 4,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            dots: true,
                            arrows: true,
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        }
    });

    // Accordion - Container
    var $listContainer = $('dl.cnp-flow--steps-mno');
    $('dl.cnp-flow--steps-mno dd').hide();

    $listContainer.on('click', 'dt:not(.active)', function () {
        $listContainer.find('dt.active').removeClass('active');
        $(this).addClass('active border-upper-radius').next('dd').slideDown();
    });

    $listContainer.on('click', 'dt.active', function () {
        $(this).removeClass('active border-upper-radius').next('dd').slideUp();
    });


    $('section.s-campaign-detail tr').addClass('is-open');

});

