
var topics = ["full house", "roseanne", "the facts of life", "punky brewster", "the wonder years", "charles in charge", "diff'rent strokes", "family ties", "growing pains", "alf"];
var newTopics = [];
    
  clickButtons();
  function clickButtons(buttonEntry) {
        
    for (i=0; i<topics.length; i++) {

        if (topics.length === 10) {
         showButton = $("<button>");
         showButton.text(topics[i]);
         var string = JSON.stringify(topics[i]);
         var stringReplace = string.replace(/\"/g, "");
         showButton.attr("data-button", stringReplace);
       $("#80sbuttons").append(showButton);}
        }

       if (topics.length > 10) {
        var newShow = topics.slice(-1)[0];
        newTopics.push(newShow);
        for (i=0; i<newTopics.length; i++) {
        showButton = $("<button>");
        showButton.text(newTopics[i]);
        console.log(newTopics);
        var string = JSON.stringify(newTopics[i]);
        var stringReplace = string.replace(/\"/g, "");
        showButton.attr("data-button", stringReplace);
        $("#80sbuttons").append(showButton);
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

         

    // var searchTerm = $("#shows-input").val().trim();
    
        $.ajax({
         url: queryURL,
         method: "GET" 
       }) 
   
       .then(function(response) {
   
        var gifDiv = $("<div class='chosengif'>");

        var results = response.data;

        for (i=0; i<results.length; i++) {

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var gif = $("<img>").attr("src", results[i].images.fixed_height.url);

        gifDiv.append(p);
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
   console.log(showName);

  // buttonEntry = show.split(' ').join('+');

   topics.push(showName);
   clickButtons(showName);
})
   
function clear() {
    $("#showsDiv").empty();
  }
         