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
              // Debug logs
              // console.log(value.name);
              // console.log(value.url);
              // console.log(key);
              $('.left-panel').append(" \
                <div class='pokemon' data-id=" + (key + 1) + " + data-name=" + value.name + "> \
                          <a class='pokemon-url' href='#'> \
                              <div class='pokemon-name'>" + value.name + "</div> \
                          </a> \
                      </div>")
          });
          //Pokemon click handler
          $('a.pokemon-url').click(function() {
              // Start variables with a $ if it's a JQuery Object
              let $pokeID = $(this).parent().attr('data-id');
              let pokeURL = "https://pokeapi.co/api/v2/pokemon/" + $pokeID;

              $.ajax({
                dataType: 'json',
                url: pokeURL,
                type: "GET",
                success: function(data) {
                  console.log("success");
                  $('.right-panel').empty();

                  let pokeStats = data.stats;
                  let pokeName = data.name;
                   $('.right-panel').append(" \
                        <div class='pokemon-name'> \
                            " + pokeName + " \
                        </div>");
                  $.each(pokeStats, function(key, value) {
                      let pokeStatName = value.stat.name;
                      let pokeStatValue = value.base_stat;

                      $('.right-panel').append(" \
                        <div class='pokemon-stats'> \
                            <div class='stat-name'> \
                              " + pokeStatName + " \
                            </div> \
                            <div class='stat-value'> \
                              " + pokeStatValue + " \
                            </div> \
                        </div>");
                  });
                },
                error: function(data) {
                  console.log("fail");
                  console.log(data);
                }
              });
          })
        },
        error: function(data) {
          console.log("fail");
          console.log(data);
        }
      });
    })();

    
});