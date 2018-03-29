
    
    var topics = ["full house", "roseanne", "the facts of life", "punky brewster", "the wonder years"];
    
    
    for (i=0; i<topics.length; i++) {
             
         showButton = $("<button>");
 
         showButton.text(topics[i]);
         var string = JSON.stringify(topics[i]);
         var stringReplace = string.replace(/\"/g, "");
         showButton.attr("data-button", stringReplace);

       $("#80sbuttons").append(showButton);
    }
    
        
    $("button").on("click", function() {

        clear();

        var show = $(this).attr("data-button");
        console.log(this);

        //Splits it into substrings and then adds an + between the words so that they can fill the queryURL for the search
        var buttonEntry = show.split(' ').join('+');
        console.log(buttonEntry);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonEntry + "&api_key=mcfoMoI0yxAtwb46m31d1FWrixVlfsL4&limit=10";


    // var searchTerm = $("#shows-input").val().trim();
    

    //topics.push(buttonEntry);
 
        $.ajax({
         url: queryURL,
         method: "GET" 
       }) 
   
       .then(function(response) {
   
      console.log(response.data);

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

    function clear() {
        $("#showsDiv").empty();
    }


  