$(function () {
    $('.l-footer').on('inview', function (event, isInView) {
        if (isInView) {
            $('#page #sticky-apply-btn').addClass('is-hidden');
        } else {
            $('#page #sticky-apply-btn').removeClass('is-hidden');
        }
    });

    var linkProfileTxt = document.getElementsByClassName('link-profile-txt');
    var artistProfileText = document.getElementsByClassName('artist-profile-text')[0];
    var artistProfileTextApollo = document.getElementsByClassName('a-p-t-apollo')[0];
    var artistProfileTextTsuna = document.getElementsByClassName('a-p-t-tsuna')[0];
    var artistProfileClose = document.getElementsByClassName('artist-profile-text-close')[0];

    linkProfileTxt[0].addEventListener('click', function () {
        console.log('hey');
        artistProfileText.style.opacity = '0';
        artistProfileText.style.transition = 'opacity 0.5s';

        // displayプロパティを修正してフェードインを開始
        artistProfileText.style.display = 'block';
        artistProfileTextApollo.style.display = 'block';

        setTimeout(function () {
            artistProfileText.style.opacity = '1';
            artistProfileTextApollo.style.opacity = '1';
        }, 100);
    });

    linkProfileTxt[1].addEventListener('click', function () {
        artistProfileText.style.opacity = '0';
        artistProfileText.style.transition = 'opacity 0.5s';

        // displayプロパティを修正してフェードインを開始
        artistProfileText.style.display = 'block';
        artistProfileTextTsuna.style.display = 'block';

        setTimeout(function () {
            artistProfileText.style.opacity = '1';
            artistProfileTextTsuna.style.opacity = '1';
        }, 100);
    });

    artistProfileClose.addEventListener('click', function () {

        // displayプロパティを修正してフェードインを開始
        setTimeout(function () {
            artistProfileText.style.opacity = '0';
            artistProfileTextApollo.style.opacity = '0';
            artistProfileTextTsuna.style.opacity = '0';
            artistProfileText.style.display = 'none';
            artistProfileTextApollo.style.display = 'none';
            artistProfileTextTsuna.style.display = 'none';
        }, 100);

    });

});