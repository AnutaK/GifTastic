// Initial array of animals
var topics = ["dog", "cat", "bird", "dolphin","snake", "elephant", "shark", "tiger","lion", "monkey", "fish", "frog","iguana","cheetah","blue whale","snail","bear","deer","crab","butterfly"];
// Function for displaying animal data
function renderButtons() {
  // Deleting the animal buttons prior to adding new animal buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#animalButtons").empty();

  $.each(topics, function(index, value) {
   var a = $("<button>");
    // Adding a class
    a.addClass("animal-button");
    // Adding a data-attribute with a value 
    a.attr("data-name", value);
    // Providing the button's text with a value 
    a.text(value);
    $("#animalButtons").append(a);
  })

}
// This function handles events where one button is clicked
$("#addAnimal").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();
  // This line will grab the text from the input box
  var animal = $("#animal-input").val().trim();
  // The animal from the textbox is then added to our array
  topics.push(animal);
  // calling renderButtons which handles the processing of our animal array
  renderButtons();
});

function displayAnimalGif() {

  $("#gif-view").empty()
  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=MaHCsxXa0NMcEOx3d8CuZ2RnC5GOZM1o&limit=10";
  
  // Creating an AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(response) {
    console.log(response)

    // Storing the results data
    var results = response.data;
    
    for(var i = 0; i < results.length; i++){

      var animalDiv = $("<div class='animal'>");

      var urlStill = results[i].images.fixed_height_still.url
      var urlAnimate= results[i].images.fixed_height.url

      var title = results[i].title;
      var rating = results[i].rating;
    
      var t = $("<p>").text("Title: " + title);
      var p = $("<p>").text("Rating: " + rating);

      var img = $("<img>").attr("src", urlStill);
      img.addClass("image");

      img.attr('data-still', urlStill)
      img.attr('data-animate', urlAnimate)
      img.attr('data-state', "still") 

      animalDiv.prepend(t);
      animalDiv.append(p);
      animalDiv.prepend(img);

      $("#gif-view").prepend(animalDiv);

    }

  });
}//function end

function switchSource(){

  console.log(this)
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } 
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      } 
    }


// Calling the renderButtons function at least once to display the initial list of topics 
renderButtons();
$(document).on("click",".animal-button", displayAnimalGif)
$(document).on("click", ".image", switchSource)

