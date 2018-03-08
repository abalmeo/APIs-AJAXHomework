


var movies =["The Rock", "Kevin Hart"]


function renderButtons() {

    $("#movies-view").empty();

    
    for (var i = 0; i < movies.length; i++) {

      
      var a = $("<button>");
      // Adding a class
      a.addClass("movie");
      // Adding a data-attribute with a value of the movie at index i
      a.attr("data-name", movies[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(movies[i]);
      // Adding the button to the HTML
      $("#movies-view").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-movie").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var movie = $("#movie-input").val().trim();
    // The movie from the textbox is then added to our array
    movies.push(movie);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
    console.log(movies); 
  });

  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();


  




  $("button").on("click", function() {
    var person = $(this).attr("data-name");
    // apiKey generated var apiKey = "pNfiBS9U6OAn1zOSJ5A5GJugEgmd8rJk"
    console.log(person); 

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;
        console.log(response); 

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div with the class "item"
            var gifDiv = $("<div class='item'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var personImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
            
          }
        }
        
      });

      
  });















