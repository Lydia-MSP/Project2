// Show that we've loaded the JavaScript file
console.log("Loaded other.js");


function start() {

  console.log("inside start menu of other.js");
  // select dropdown menu 
  // read the data 
  $.getJSON("/static/data/Host_City.json", function(data) {
  console.log("inside JQUERY");

  obj_year = [];
  obj_city=[];
  obj_Num_Par_Countries=[];
  obj_Lat =[];
  obj_Long =[];
  obj_location =[];


  console.log(data); //json output   

  for(i = 0; i < data.length; i++) {
        obj_year[i] = data[i]['Year'];   
        obj_city[i] = data[i]['City'];
        obj_Num_Par_Countries[i] = parseFloat(data[i]['Num_Par_Countries']);
        obj_Lat[i]=parseFloat(data[i]['Latitude']);
        obj_Long[i]=parseFloat(data[i]['Longitude']);
        obj_location[i] = parseFloat(data[i]['Latitude'])+', '+parseFloat(data[i]['Longitude']);                       
  }
  console.log("Year",obj_year);
  console.log("City",obj_city);
  console.log("Participating Countries",obj_Num_Par_Countries);
  console.log("Latitude",obj_Lat);
  console.log("Longitude",obj_Long);
  console.log("location",obj_location)
  console.log("API KEY",API_KEY);
  showanimation(obj_city,obj_year,obj_Num_Par_Countries);
  //showBar(obj_year,obj_city,obj_Num_Par_Countries);
  showMap(obj_year,obj_city,obj_Num_Par_Countries,obj_Lat,obj_Long,obj_location);
  
});  
}

function showMap(obj_year,obj_city,obj_Num_Par_Countries,obj_Lat,obj_Long,obj_location){     
  
  console.log("inside showmap");
  console.log(API_KEY);
  // Create a map object
  var myMap = L.map("map", {
  center: [41.38, 2.17],
  zoom: 2
  });

  // Add a tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 6,
  id: "mapbox.streets",
  accessToken: API_KEY
  }).addTo(myMap);  

  
  
  //L.marker[40, -80]
    //.bindPopup("<h1>" + obj_city[i] + "</h1> <hr> <h3>Year : " + obj_year[i] + "</h3>")
    //.addTo(myMap);

  //console.log("YEARGDFGFGFD",obj_city)
  // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
  for (var i = 0; i < obj_year.length; i++) {
  console.log(obj_Lat[i]) ;
  console.log(obj_Long[i]) ;
 

  L.marker(([obj_Lat[i],obj_Long[i] ]))
    .bindPopup("<h1>" + obj_city[i] + "</h1> <hr> <h3>Year : " + obj_year[i] + "</h3>")
    .addTo(myMap);
} 
}     

function showBar(obj_year,obj_city,obj_Num_Par_Countries,obj_Lat,obj_Long,obj_location){


  //Create the trace
  var trace = {
    x: obj_year,
    y: obj_Num_Par_Countries,
    type: "bar",
    };

    // Put the trace into an array (which allows us to graph
    // multiple traces, if we wish)
    var data = [trace];

     //var transition = {
    // duration: 20,
    // easing: 'cubic-in-out'
    //}

    // Define a layout object
    var layout = {
    title: "'Bar' Chart",
    xaxis: { title: "Year"},
             yaxis: { title: "Participating Countries"}
             //transition: transition,
             //anim: true
    };

    // Create the plot
    //Plotly.animate("plot", data, layout)
    Plotly.newPlot("bar", data, layout);
   // function randomize() {
    //  Plotly.animate('plot', {
    //    data: [{y: [Math.random(), Math.random(), Math.random()]}],
    //    traces: [0],
    //    layout: {}
    //  }, {
    //    transition: {
    //      duration: 500,
    //      easing: 'cubic-in-out'
    //    },
    //    frame: {
    //      duration: 500
    //    }
    //  })
    //}
}  

function showanimation(obj_city,obj_year,obj_Num_Par_Countries){
  var data = {
    labels: 
      obj_year
    ,
    series: [
      obj_Num_Par_Countries
      ]   
  };
  
  var chart = new Chartist.Bar('.ct-chart', data );
  chart.on('draw', function(data) {
    if(data.type == 'bar') {
        data.element.animate({
            y2: {
                dur: '5s',
                from: data.y1,
                to: data.y2
            }
        });
    }
});


}



start();
