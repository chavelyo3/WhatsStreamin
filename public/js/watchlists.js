/* eslint-disable */

$(document).ready(() => {
  $(document).on("click", "#apiSearch", searchShow);

  function searchShow(event) {
    event.preventDefault();
    const title = $("#show").val();


    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + title,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": "2ea62f711cmsh6d04febc3541441p15aa67jsn0ff1ac91439d"
      }
    }

    $.ajax(settings).then(data => {
        console.log(data);
    });




  } //end function
}); //end .ready()
