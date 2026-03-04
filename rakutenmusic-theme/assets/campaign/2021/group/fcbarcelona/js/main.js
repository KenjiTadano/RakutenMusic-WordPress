$(function () {

    // ******************************
    // Slick slide
    // ******************************

    $('#page .slick-mypage').slick({
        autoplay: false,
        infinite: false,
        adaptiveHeight: true
    });

    // ******************************
    // Get playlist
    // ******************************

    function init() {

        $('#page #playlist .l-inner table tbody').empty();

        var results = [];

        $.ajax({
            url: 'https://music.r10s.jp/external/prod/assets/campaign/2020/group/rakuteneagles/csv/playlist_fix.csv',
            dataType: 'text',
            success: function (responce) {
                results.push(responce);
                allDone(results);
            }
        });
    }

    function allDone(results) {

        tmp = results[0].split("\n");

        for (var i = 0; i < 5; i++) {

            albumId = tmp[i].split(",")[0]
            songId = tmp[i].split(",")[1]
            title = tmp[i].split(",")[2]
            artist = tmp[i].split(",")[3]
            playerNumber = tmp[i].split(",")[4]
            playerName = tmp[i].split(",")[5]

            appendSongs(albumId, songId, title, artist, playerNumber, playerName);

        }

        var num = 0;
        var j = 0;
        $('#page #playlist .l-inner .playlist-more').on('click', function () {
            $(this).data("click", ++num);
            var click = $(this).data("click");
            if (click >= 2) {
                if (j < tmp.length / 5 - 2) {
                    j++;
                    for (var k = 5 * j; k < 5 * j + 5; k++) {

                        albumId = tmp[k].split(",")[0]
                        songId = tmp[k].split(",")[1]
                        title = tmp[k].split(",")[2]
                        artist = tmp[k].split(",")[3]
                        playerNumber = tmp[k].split(",")[4]
                        playerName = tmp[k].split(",")[5]

                        appendSongs(albumId, songId, title, artist, playerNumber, playerName);
                    }
                } else {
                    albumId = tmp[tmp.length - 1].split(",")[0]
                    songId = tmp[tmp.length - 1].split(",")[1]
                    title = tmp[tmp.length - 1].split(",")[2]
                    artist = tmp[tmp.length - 1].split(",")[3]
                    playerNumber = tmp[tmp.length - 1].split(",")[4]
                    playerName = tmp[tmp.length - 1].split(",")[5]

                    appendSongs(albumId, songId, title, artist, playerNumber, playerName);
                    $('#page #playlist .l-inner .playlist-more').remove();
                }
            } else {
                j += 1;
                for (var k = 5 * j; k < 5 * j + 5; k++) {

                    albumId = tmp[k].split(",")[0]
                    songId = tmp[k].split(",")[1]
                    title = tmp[k].split(",")[2]
                    artist = tmp[k].split(",")[3]
                    playerNumber = tmp[k].split(",")[4]
                    playerName = tmp[k].split(",")[5]

                    appendSongs(albumId, songId, title, artist, playerNumber, playerName);
                }
            }
            return false;
        });

        var pager = 1;
        var playlistBtn = document.querySelectorAll('#page #playlist .l-inner .playlist-btn');
        Array.prototype.forEach.call(playlistBtn, function (target) {
            target.addEventListener('click', function () {
                if ($(this).hasClass('disabled')) {
                    return false;
                } else if ($(this).hasClass('playlist-btn--prev')) {
                    pager -= 1;
                    switch (pager) {
                        case 1:
                            $('#page #playlist .l-inner .playlist-btn.playlist-btn--prev').addClass('disabled');
                            break;
                        case 14:
                            $('#page #playlist .l-inner .playlist-btn.playlist-btn--next').removeClass('disabled');
                            break;
                    }
                    songloadPC(tmp, pager);
                } else if ($(this).hasClass('playlist-btn--next')) {
                    pager += 1;
                    switch (pager) {
                        case 2:
                            $('#page #playlist .l-inner .playlist-btn.playlist-btn--prev').removeClass('disabled');
                            break;
                        case 15:
                            $('#page #playlist .l-inner .playlist-btn.playlist-btn--next').addClass('disabled');
                            break;
                    }
                    songloadPC(tmp, pager);
                }
            })
        });
    }

    function songloadPC(tmp, pager) {
        $('#page #playlist .l-inner table tbody').empty();

        for (var k = 5 * pager - 5; k < 5 * pager; k++) {

            albumId = tmp[k].split(",")[0]
            songId = tmp[k].split(",")[1]
            title = tmp[k].split(",")[2]
            artist = tmp[k].split(",")[3]
            playerNumber = tmp[k].split(",")[4]
            playerName = tmp[k].split(",")[5]

            appendSongs(albumId, songId, title, artist, playerNumber, playerName);
        }
    }

    function appendSongs(albumId, songId, title, artist, playerNumber, playerName) {
        $('#page #playlist .l-inner table tbody').append([
            '<tr>',
            '<td><a href="https://music.rakuten.co.jp/link/album/' + albumId + '/song/' + songId + '/">' + title + '</a></td>',
            '<td>' + artist + '</td>',
            '<td>#' + playerNumber + '</td>',
            '<td>' + playerName + '</td>',
            '</tr>'
        ].join(""));
    }

    init();

});