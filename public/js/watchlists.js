/* eslint-disable */

$(document).ready(() => {
  $(document).on("click", "#apiSearch", searchShow);

  async function searchShow(event) {
    event.preventDefault();
    const title = $("#show")
      .val()
      .toLowerCase();

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

    const call = await callAPI(settings);
    alert("Outside API IS " + call);
  } //end function

  function callAPI(settings) {
    return $.ajax(settings).then((data) => {
      // console.log(data);
      let truth = false;

      for (let i = 0; i < data.results.length; i++) {
        let platforms = data.results[i];
        for (let j = 0; j < platforms.locations.length; j++) {
          if (platforms.locations[j].display_name === "Netflix") {
            truth = true;
          }
        }
      }
        alert("INSIDE API IS " + truth);
        return truth;
    });
  } //end callAPI function
}); //end .ready()
