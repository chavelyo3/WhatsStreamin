/* eslint-disable */

$(document).ready(() => {
  $(document).on("click", "#apiSearch", searchShow);

  async function searchShow(event) {
    event.preventDefault();
    const title = $("#show")
      .val();
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
        "x-rapidapi-key": "2ea62f711cmsh6d04febc3541441p15aa67jsn0ff1ac91439d",
      },
    };

    //Checking for Netflix platform
    const netflixAPI = await callAPI(settings,"Netflix","Netflix");
    //Checking for Hulu platform
    const huluAPI = await callAPI(settings,"Hulu","Hulu");
    //Checking for HBO
    const amazonAPI = await callAPI(settings,"Amazon Instant Video","Amazon Prime Video");

    let obj = {
      movie_title: title,
      netflix: netflixAPI,
      userId: id
    };

    $.post("/api/watchlist", obj)
      .then(location.reload());
  } //end searchShow function

  function callAPI(settings,location,location2) {
    return $.ajax(settings).then((data) => {
      // console.log(data);
      let truth = false;

      for (let i = 0; i < data.results.length; i++) {
        let platforms = data.results[i];
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
}); //end .ready()
