$(document).ready(() => {
  $(document).on("click", "#apiSearch", searchShow);
  $(document).on("click", "#deleteUser", deleteUser);
  $(document).on("click", "#deleteWatch", deleteWatch);

  async function searchShow(event) {
    event.preventDefault();
    const title = $("#show").val();
    const id = $("#apiSearch").data("id");

    const settings = {
      async: true,
      crossDomain: true,
      url:
        "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" +
        title,
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": "2ea62f711cmsh6d04febc3541441p15aa67jsn0ff1ac91439d"
      }
    };

    //Checking for Netflix platform
    const netflixAPI = await callAPI(settings, "Netflix", "Netflix");
    //Checking for Hulu platform
    const huluAPI = await callAPI(settings, "Hulu", "Hulu");
    //Checking for HBO
    const amazonAPI = await callAPI(
      settings,
      "Amazon Instant Video",
      "Amazon Prime Video"
    );

    const obj = {
      // eslint-disable-next-line camelcase
      movie_title: title,
      netflix: netflixAPI,
      hulu: huluAPI,
      amazon: amazonAPI,
      userId: id
    };

    $.post("/api/watchlist", obj).then(location.reload());
  } //end searchShow function

  function callAPI(settings, location, location2) {
    return $.ajax(settings).then(data => {
      // console.log(data);
      let truth = false;

      for (let i = 0; i < data.results.length; i++) {
        const platforms = data.results[i];
        for (let j = 0; j < platforms.locations.length; j++) {
          if (platforms.locations[j].display_name === (location || location2)) {
            // console.log(platforms.name);
            truth = true;
          }
        }
      }
      return truth;
    });
  } //end callAPI function

  function deleteUser(event) {
    event.preventDefault();
    const id = $("#deleteUser").data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/users/delete/" + id
    }).then(location.reload());
  }

  function deleteWatch(event) {
    event.preventDefault();
    const id = $(this).data("id");

    $.ajax({
      method: "DELETE",
      url: "/api/watchlist/delete/" + id
    }).then(location.reload());
  }
}); //end .ready()
