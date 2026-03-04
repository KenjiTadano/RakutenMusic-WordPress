$(function () {
    function init() {
        var request = [
            { url: '/assets/news/playlist/setlist/csv/setlist_01.csv' },
            { url: '/assets/news/playlist/setlist/csv/setlist_02.csv' },
            { url: '/assets/news/playlist/setlist/csv/setlist_03.csv' },
            { url: '/assets/news/playlist/setlist/csv/setlist_04.csv' },
            { url: '/assets/news/playlist/setlist/csv/archive_new.csv' },
        ];

        var results = [];
        var doneCount = 0;

        for (var i = 0; i < request.length; i++) {
            $.ajax({
                url: request[i].url,
                dataType: 'text',
                success: function (responce) {
                    results.push(responce);
                    doneCount++;
                    if (doneCount == request.length) {
                        allDone(results);
                    }
                }
            });
        }
    }

    function allDone(results) {

        // Latest
        for (var i = 0; i < 4; i++) {
            tmp = results[i].split("\n");

            playlistName = tmp[0].split(",")[0]
            playlistArtist = tmp[1].split(",")[0]
            playlistImage_1 = tmp[2].split(",")[0]
            playlistImage_2 = tmp[3].split(",")[0]
            playlistImage_3 = tmp[4].split(",")[0]
            playlistImage_4 = tmp[5].split(",")[0]

            // Set Images
            for (var j = 0; j < 4; j++) {
                $('#page #latest li:nth-of-type(' + (i + 1) + ')').find('img').eq(j).attr('src', eval("playlistImage_" + (j + 1)))
            }

            // Set Playlist Name and Artist Name
            $('#page #latest li:nth-of-type(' + (i + 1) + ') a p').html('<b>' + playlistName + '</b><br>' + playlistArtist)

            if (i > 2) {
                showLatestPlaylistDetails(results)
            }
        }

        // Archive
        $('#page #archive').empty();
        tmp2 = results[4].split("\n");
        for (var k = 0; k < 20; k++) {
            archivePlaylistName = tmp2[k].split(",")[0]
            archivePlaylistId = tmp2[k].split(",")[1]
            archivePlaylistArtist = tmp2[k].split(",")[2]
            archivePlaylistImage_1 = tmp2[k].split(",")[3]
            archivePlaylistImage_2 = tmp2[k].split(",")[4]
            archivePlaylistImage_3 = tmp2[k].split(",")[5]
            archivePlaylistImage_4 = tmp2[k].split(",")[6]

            $('#page #archive').append([
                '<li>',
                '<a href="https://music.rakuten.co.jp/link/playlist/' + archivePlaylistId + '/">',
                '<figure>',
                '<img src="' + archivePlaylistImage_1 + '" />',
                '<img src="' + archivePlaylistImage_2 + '" />',
                '<img src="' + archivePlaylistImage_3 + '" />',
                '<img src="' + archivePlaylistImage_4 + '" />',
                '</figure>',
                '<p>',
                '<b>' + archivePlaylistName + '</b><br />' + archivePlaylistArtist,
                '</p>',
                '</a>',
                '</li>'
            ].join(''));

        }


    }

    init();

    function showLatestPlaylistDetails(results) {
        var index = 0;
        $('#page #latest li').on('click', function () {
            index = $('#page #latest li').index(this);
            $('#page .modal .l-inner .songs ul').empty();

            tmp = results[index].split("\n");

            playlistName = tmp[0].split(",")[0]
            playlistArtist = tmp[1].split(",")[0]
            playlistImage_1 = tmp[2].split(",")[0]
            playlistImage_2 = tmp[3].split(",")[0]
            playlistImage_3 = tmp[4].split(",")[0]
            playlistImage_4 = tmp[5].split(",")[0]


            // Set Images
            for (var i = 0; i < 4; i++) {
                $('#page .modal .l-inner .title figure div:nth-of-type(' + (i + 1) + ')').find('img').attr('src', eval("playlistImage_" + (i + 1)))
            }

            // Set Playlist Name and Artist Name
            $('#page .modal .l-inner .title h1').html(playlistName)
            $('#page .modal .l-inner .title h1 + p').html(playlistArtist)


            // Set Song List
            for (var j = 6; j < tmp.length; j++) {
                $('#page .modal .l-inner .songs ul').append([
                    '<li>',
                    '<p>',
                    tmp[j].split(",")[0],
                    '</p>',
                    '<p>',
                    tmp[j].split(",")[1],
                    '</p>',
                    '</li>',
                ].join(''));
            }

            modalOpen()
        })

        $('#page .modal .l-inner .close-btn').on('click', modalClose)
        $('#page .modal .click-area').on('click', modalClose)
    }

    function modalOpen() {
        $('#page .modal').fadeIn()
    }

    function modalClose() {
        $('#page .modal .l-inner').scrollTop(0)
        $('#page .modal').fadeOut()
    }




})