
$(document).ready(function() {
var topics = ["full house", "roseanne", "the facts of life", "punky brewster", "the wonder years", "charles in charge", "diff'rent strokes", "family ties", "growing pains", "alf", "dinosaurs", "saved by the bell"];
var newTopics = [];
    
  clickButtons();
  function clickButtons(buttonEntry) {
        
    for (i=0; i<topics.length; i++) {

        if (topics.length === 12) {
         showButton = $("<button>");
         showButton.text(topics[i]);
         var string = JSON.stringify(topics[i]);
         var stringReplace = string.replace(/\"/g, "");
         showButton.attr("data-button", stringReplace);
       $("#buttons80s").append(showButton);}
        }

       if (topics.length > 12) {
        var newShow = topics.slice(-1)[0];
        newTopics.push(newShow);
        for (i=0; i<newTopics.length; i++) {
        showButton = $("<button>");
        showButton.text(newTopics[i]);
        console.log(newTopics);
        var string = JSON.stringify(newTopics[i]);
        var stringReplace = string.replace(/\"/g, "");
        showButton.attr("data-button", stringReplace);
        $("#buttons80s").append(showButton);
        topics.push(newShow);
        newTopics = [];
    }
    }
        
    $("button").on("click", function() {

        clear();

        var show = $(this).attr("data-button");

        //Splits it into substrings and then adds an + between the words so that they can fill the queryURL for the search
        var buttonEntry = show.split(' ').join('+');

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonEntry + "&api_key=mcfoMoI0yxAtwb46m31d1FWrixVlfsL4&limit=10";
    
        $.ajax({
         url: queryURL,
         method: "GET" 
       }) 
   
       .then(function(response) {
   
        var results = response.data;
        console.log(response.data);

        for (i=0; i<results.length; i++) {

        var gifDiv = $("<div class='chosengif'>");

        var rating = results[i].rating;

        var h = $("<h3>").text("Rating: " + rating);

        var gif = $("<img>").attr({"src": results[i].images.fixed_height_still.url, "data-still": results[i].images.fixed_height_still.url, "data-animate": results[i].images.fixed_height.url,
        "data-state": "still"});
        gif.addClass('newgif');
        
        gifDiv.append(h);
        gifDiv.append(gif);

        $("#showsDiv").append(gifDiv);
        
       }
    }      
    )})
  }
    
  $("#addShow").on("click", function(event) {
    // Preventing the button from trying to submit the form
   event.preventDefault();
   //The trim() method removes whitespace from both sides of a string.
   var showName = $("#shows-input").val().trim();
   topics.push(showName);
   clickButtons(showName);
})

$(document).on('click', '.newgif', function() {
    var state = $(this).attr("data-state");
    console.log(this);
 
if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }

});

function clear() {
    $("#showsDiv").empty();
  }
         
})