$(function () {
  /* Functions
 --------------------------------------------------------*/
  /* public */
  // Load json data
  // --------------------------------------------------------
  let data = [],
    data2 = [];

  async function newContentApiCall() {
    let result = [],
      response;

    response = await $.ajax({
      url:
        'https://api.music.rakuten.co.jp/' +
        'api/web_content/new?access_key=Taf6DJgW6Ny4uR5N&' +
        '&new_content_count=10',
      dataType: 'json',
    });
    if (response) result.push(response.body);
    return result;
  }

  async function rankingApiCall() {
    let result2 = [],
      response2;

    response2 = await $.ajax({
      url:
        'https://api.music.rakuten.co.jp/' +
        'api/web_content/ranking/weekly?access_key=Taf6DJgW6Ny4uR5N' +
        '&limit=10',
      dataType: 'json',
    });
    if (response2) result2.push(response2.body);
    return result2;
  }

  function showNewSongs(data) {
    let new_content =
      data[0] && data[0].new_content && data[0].new_content.slice(0, 10);

    for (var i = 0; i < 10; i++) {
      $('#new_content').append([
        '<li class="item__card">' +
        '<a href="/link/album/' +
        new_content[i].album.id +
        '/">' +
        '<figure class="item__card__image">' +
        '<img src="' +
        new_content[i].images[0].s2 +
        '" alt="' +
        new_content[i].name +
        '"><figcaption class="item__card__title"><p><b>' +
        new_content[i].name +
        '</b></p><p>' +
        new_content[i].artist.name +
        '</p></figcaption></figure></a></li>'
      ].join(''));
    }
  }

  function showPopularSongs(data2) {
    let rankings =
      data2[0] && data2[0].rankings && data2[0].rankings.slice(0, 10);

    for (var i = 0; i < 10; i++) {
      $('#rankings').append([
        '<li class="item__card">' +
        '<a href="/link/album/' +
        rankings[i].album.id +
        '/">' +
        '<figure class="item__card__image">' +
        '<img src="' +
        rankings[i].images[0].s2 +
        '" alt="' +
        rankings[i].song.name +
        '"><figcaption class="item__card__title"><p><b>' +
        rankings[i].song.name +
        '</b></p><p>' +
        rankings[i].artist.name +
        '</p></figcaption></figure></a></li>'
      ].join(''));
    }
  }

  /* Events
  --------------------------------------------------------*/
  // Load
  // --------------------------------------------------------
  $(document).ready(function () {
    newContentApiCall()
      .then((result) => {
        data = result;
        showNewSongs(data);
      })
      .catch((error) => {
        console.log(error);
      });
    rankingApiCall()
      .then((result2) => {
        data2 = result2;
        showPopularSongs(data2);
      })
      .catch((error) => {
        console.log(error);
      });
  });

});