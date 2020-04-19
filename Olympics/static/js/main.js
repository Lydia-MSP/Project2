// Show that we've loaded the JavaScript file
console.log("Loaded main.js");

function start() {

  console.log("inside start menu");
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");
    i =0;   
    
    // read the data 
    $.getJSON("/static/data/Host_City.json", function(data) {
      console.log("inside JQUERY");

      console.log(data);   

        for(i = 0; i < data.length; i++) {
            obj_year = data[i]['Year'];   
            dropdown.append("option").text(obj_year).property("value");
        }
        dropdown.property("value",obj_year);
        console.log("number of elements",i);
        console.log("Year",obj_year) 
        showPlot(obj_year);       

    });  
       
   
} 

// Change event handler function
function optionChanged(id) {

      console.log("inside optionchanged")

      var container1 = L.DomUtil.get('MapYear');
      if(container1 != null){
      container1._leaflet_id = null;
      }

      var table = document.getElementById("events-table");
      if(table!=null){
            var rowCount = table.rows.length;
            for (var i=0; i < rowCount; i++) {
            table.deleteRow(0);
            }
      var tablebody = d3.select("tbody");
      var row = tablebody.append("tr").style("background-color", "white");      
      var cell = row.append("td");
      var string = "Year"
      cell.text(string);       
      var cell = row.append("td");
      cell.text("Country");  
      var cell = row.append("td");
      cell.text("Event");  
      var cell = row.append("td");
      cell.text("Gender");  
      var cell = row.append("td");
      cell.text("Medal");      
      
      }


      
      
      // clear the contents of the demographic info panel on a refresh
      
      //container2.html("");
      
      
    
    console.log("YEAR CHOSEN",id);

    showPlot(id);
    //showMap(id);
    //ShowEvent(id);
}

function showPlot(year) {
  console.log("inside ShowPlot");
  obj_year  =[];
  obj_participating_countries =[];
  year_chosen = year;
  console.log("CHOSEN YEAR",year_chosen);
          
          
  $.getJSON("/static/data/Winners.json", function(data) {
    console.log("inside JQUERY");
      winner_countries_cd =[]
      Country = []
      Medal_Count = []     

      var data_filter = data.filter( element => element.Year ==year_chosen)
      console.log(data_filter)
      var Country_count = d3.nest()
      .key(function(d) { return d.Country_Cd; 
      })
      .rollup(function(v) { return v.length; })
      .entries(data_filter)
      console.log(JSON.stringify(Country_count));

      let sortedInput = Country_count.slice().sort((a, b) => b.value - a.value);
      console.log(JSON.stringify(sortedInput));

      for(var i = 0; i < 10; i++) {
      Country[i] = sortedInput[i]['key'];
      Medal_Count[i] = sortedInput[i]['value'];
            
    }

    console.log(JSON.stringify(Country));
    console.log(JSON.stringify(Medal_Count));

    bar_color = ['rgba(15, 93, 167, 0.767)','rgb(255,230,0)','black','green','red',
    'rgba(15, 93, 167, 0.767)',
    'rgb(255,230,0)','black','green','red']
    

    // Create the trace
    var trace = {
        x: Country,
        y: Medal_Count,
        type: "bar",
        marker: {
          'color': bar_color}
          
        
        };

    // Put the trace into an array (which allows us to graph
    // multiple traces, if we wish)
    var data = [trace];

      
    // Define a layout object
    var layout = {
    title: `Top 10 Medal Winning countries for the year ${year_chosen}`,
    xaxis: { title: "Country"},
    yaxis: { title: "Medal Count"}    
     };

    // Create the plot
    //Plotly.animate("plot", data, layout)
    Plotly.newPlot("Medal", data, layout); 
    
  });

  console.log("Exiting ShowPlot");
  showMap(year);
}



function showMap(year) {  
  year_chosen = year
  console.log("Inside showMap",year_chosen);
  console.log("year chose",year_chosen);

  $.getJSON("/static/data/Host_City.json", function(data) {
    console.log("inside JQUERY of map");
    console.log("year",year_chosen);

      var data_filter = data.filter( element => element.Year ==year_chosen)
      console.log(data_filter)

      obj_year = data_filter[0]['Year'];   
      obj_city = data_filter[0]['City'];
      obj_Num_Par_Countries = data_filter[0]['Num_Par_Countries'];
      obj_Lat=parseFloat(data_filter[0]['Latitude']);
      obj_Long=parseFloat(data_filter[0]['Longitude']);
      //obj_location = parseFloat(data[i]['Latitude'])+', '+parseFloat(data[i]['Longitude']);     
      console.log("Latitude",obj_Lat);
      console.log("Latitude",obj_Long);
      console.log("obj_year",obj_year);
      console.log("obj_Num_Par_Countries",obj_Num_Par_Countries);
      console.log("obj_city",obj_city);
      console.log(API_KEY);

      var container = L.DomUtil.get('MapYear');

      if(container != null){

      container._leaflet_id = null;

      }

      // Create a map object
      var myMap = L.map("MapYear", {
      center: [41.38, 2.17],
      zoom: 2
      });

      // Add a tile layer
      L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 6,
      id: "mapbox.outdoors",
      accessToken: API_KEY
      }).addTo(myMap);  

      L.marker(([obj_Lat,obj_Long]))
          .bindPopup("<h3>" + obj_city + "</h3> <hr> <h3>Year : " + obj_year + "</h3> <h3>Number of Participating Countries : " + obj_Num_Par_Countries + "</h3>")
          .addTo(myMap);
      }); 
      
      console.log("Trigger ShowEvent")
      ShowEvent(year_chosen);

  
}

function ShowEvent(Id){
  console.log("Inside The Showevent",Id)
  $.getJSON("/static/data/Events.json", function(data) {
    //console.log("Events Data",data);   
    var events_data_filter = data.filter( element => element.Year ==Id)
    console.log("filtered events data",events_data_filter)
    // Get a reference to the table body
    var tablebody = d3.select("tbody");
    

    // UFO  values for each column
    events_data_filter.forEach(function(events) {
        console.log(events);
        // Append one table row `tr` 
        var row = tablebody.append("tr");

        // Use `Object.entries` to console.log each UFO Sighting value
        Object.entries(events).forEach(function([key, value]) {
          console.log(key, value);
          // Append a cell to the row for each value
          var cell = row.append("td");
          cell.text(value);
        });

  });
  });
}


function getcolor(Country){
console.log("Country",Country)
}

anime.timeline({loop: true})
  .add({
    targets: '.ml15 .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
  }).add({
    targets: '.ml15',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

start();



