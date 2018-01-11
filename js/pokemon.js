$(document).ready(function(){
    console.log('jQuery loaded');

    // load pokemon into pokedex
    (function() {
      $.ajax({
        dataType: 'json',
        url: "https://pokeapi.co/api/v2/pokemon/?limit=151",
        type: "GET",
        success: function(data) {
          console.log("success");
          
          let results = data.results;

          $.each(results, function(key,value) {
              console.log(value.name);
              console.log(value.url);
              $('.left-panel').append(" \
                <div class='pokemon' data-id=" + (key + 1) + " + data-name=" + value.name + "> \
                          <a class='pokemon-url' href='#'> \
                              <div class='pokemon-name'>" + value.name + "</div> \
                          </a> \
                      </div>")
          });
          //Pokemon click handler
          $("a.pokemon-url").click(function() {
              alert("hi");
          })
        },
        error: function(data) {
          console.log("fail");
          console.log(data);
        }
      });
    })();

    
});