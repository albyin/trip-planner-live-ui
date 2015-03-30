$( document ).ready(function() {

      var currDay = 0;
      initialize_gmaps();
    	var map;

      // var restaurantLocations = [];
      // var thingToDoLocations = [];
      // var Day = function(){
      //  this.hotelExists = false;
      //  this.currMarkerId = 0;
      //  this.markersArray = [];
      //  this.lastHotelId= null;
      //  this.bounds = new google.maps.LatLngBounds();
      // };
      // var daysArray = [new Day()];
      // var prevDay;
    	// var count = [0];

    	//when document loads we need to set up map to Day 1

    $('.selection-panel').on('click','button',function(){


    	var $button = $(this);
    	//on click events adding information to the day array.

    	//finding option next to add button, returns DOM element
    	var $selected = $button.siblings('select').find('option:selected');
		// getting name of establishment from DOM element
    	var eName = $selected.text();
      // console.log("eName, ",eName);

      //getting name of category
      typeName = $button.siblings('h4').text();
      // console.log("typeName,", typeName);

      addObjToDay(typeName, eName, currDay);
      //addObjToDay finds object from category in database, saves it to Day

      renderMap(currDay);
      //render Map with newly updated Day

      if(typeName === "Hotels"){
        //remove any hotels in case we are adding another hotel
        //Remember to remove marker as well
        $('#hotels-list .list-group').empty();

      }
      
      addItineraryDOM(typeName, eName);
      //adds list item to DOM under appropriate itinerary category
      
		//************ GOOGLE MAPS MARKER DRAWING SECTION ***************

    //call drawLocation to add a marker on the board based on typeName
    //drawLocation takes an array of coordinates
    //we can get the coordinates by???

    //clear map
    //render entire map using updated Day


  //   var locationArr = result[0].place[0].location;
  //   	if(typeName=='Hotels'){

  //       var opts = {icon: '/images/lodging_0star.png'};

		// 	daysArray[currDay].lastHotelId = 
  //       drawLocation(locationArr, opts, eName, typeName, currDay);
	 //    }
		// else if(typeName=='Restaurants'){

  //       var opts = {icon: '/images/restaurant.png'};
		// 	drawLocation(locationArr, opts,eName, typeName, currDay);
	 //    }
		// else if(typeName=='Things To Do'){
  //     var opts = {icon: '/images/star-3.png'};
		// 	drawLocation(locationArr, opts ,eName, typeName, currDay);

		// }

    });

  var renderMap = function (currDay){
    $.get('/days/'+currDay, function (data){
      console.log("RENDERMAP DATA: ",data);
      //data is the Day object that is at currDay

      var locationArr;

      if (data.hotel){
        console.log(data.hotel.place[0].location);
        var opts = {icon: '/images/lodging_0star.png'};
        var locationArr = data.hotel.place[0].location;
        drawLocation(locationArr, opts);
      }
      if (data.restaurants){
        var opts = {icon: '/images/restaurant.png'};

        for (var i = 0; i < data.restaurants.length; i++) {
          var locationArr = data.restaurants[i].place[0].location;
          drawLocation(locationArr, opts);
        }

      }
      if (data.thingsToDo){
        var opts = {icon: '/images/star-3.png'};
      }

      //get hotel coord
      //get each Restaurant coord
      //get each thing coord
    });
  };

	$('.itinerary-panel').on('click','button',function(){
		// RED X MARKER DELETE BUTTON FOR ITINERARY PANEL

		var $button = $(this);
		var placeName = $button.siblings('span').text();

		// var markerToRemove = getMarker(daysArray[currDay].markersArray, placeName);

		// if(markerToRemove.type[1] =='h'){
		// 	daysArray[currDay].hotelExists =false;
		// }
		// deleteMarker(markerToRemove.id);
		$button.parent().remove();
	});

	$('.day-buttons').on('click','button',function(){
    //DAY Button Panel
		var $button= $(this);
		// find out which day/and what was the last day

		//how many days to we have?
		var numOfDays = $('.day-buttons').children().length-1;

		//if we clicked a plus button- add a new day button/day array/id count
		if($button.text() =='+'){
      //ADD NEW DAY BUTTON
			$button.prev().after('<button class="btn btn-circle day-btn">'+(numOfDays+1)+'</button>');


      $.post('/days', function (data){ console.log("POST RESPONSE DATA", data);});

		}
		else{
			// //switching a day
			// prevDay = currDay;
			// currDay =  parseInt($button.text())-1;

			// //change the title of the day to reflect current day
			// $('#day-title').find('span').text("Day "+(currDay+1));
			// // changes the active 'current day' button
			// $button.siblings().removeClass('current-day');
			// $button.addClass('current-day');
			// removeDay(prevDay);
			// renderDay(currDay);

		}


	});

	//remove  current day and adjust information
		$('#day-title').on('click','button',function(){
			//num of days counts buttons including 'plus', remove another
			// for index 
			// var numOfDays = $('.day-buttons').children().length-2;

			// removeDay(currDay);
			// daysArray.splice(currDay,1);
			// if(currDay==numOfDays) currDay--;
			// renderDay(currDay);

			// $('.day-buttons').find('.btn-plus').prev().remove();
		});

	var removeDay = function(day){
		//removes all itinerary items from current day from dom
	// 	$('.itinerary-item').remove();

	// 	//hide previous days markers
	// 	var markersToRemove = daysArray[day].markersArray;
	// 	markersToRemove.forEach(function(marker){
	// 		marker.setVisible(false);
	// 	});
	};

	var renderDay = function(day){

		//show curr days markers
		//debugger;
		// var currMarkers = daysArray[day].markersArray;

		// currMarkers.forEach(function(marker){
		// 	marker.setVisible(true);
		// 	var typeStr = marker.type;
		// 	var locationName = marker.name;
		// 	var $locationListElement = $(typeStr).children('.list-group');
		// 	$locationListElement
		//     	.append('<div class="itinerary-item"><span class="title">'+locationName+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
		// 	});
	};
	/*********** GOOGLE MAPS API FUNCTIONS ******************/

  //draws and creates marker
  function drawLocation (location, opts) {
      if (typeof opts !== 'object') opts = {};
      opts.position = new google.maps.LatLng(location[0], location[1]);
      opts.map = map;

      // opts.id = daysArray[currDay].currMarkerId++;
      // opts.name = locationName;
      // opts.type = typeStr;

      var marker = new google.maps.Marker(opts);

      // daysArray[currDay].markersArray[opts.id] = marker;
      // daysArray[currDay].bounds.extend(marker.position);
      // map.fitBounds(daysArray[currDay].bounds);
      //markers[opts.id]= marker;
      // return marker.id;

  }

  var deleteMarker = function(id){
     //  var marker = daysArray[currDay].markersArray[id];
     //  marker.name = null;
     //  marker.setVisible(false);
     //  marker.setMap(null);
  	  // narrowBounds();

  };

  var narrowBounds = function(){
  	//debugger;
  // 	var day = daysArray[currDay];
  // 	temp = new google.maps.LatLngBounds();

  // 	day.markersArray.forEach(function(marker){
  // 		if(marker.visible){
  // 			var position = marker.position;
  // 			temp.extend(position);

  // 		}
  		
  // 	});
  // 	if(!temp.isEmpty()){
  // 		day.bounds = temp;
  // 		map.fitBounds(day.bounds);
    // }

  };

  function initialize_gmaps() {

    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
    // set the map options hash
    var mapOptions = {
      center: myLatlng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: styleArr
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, mapOptions);

    console.log("got here");
    $.get("/days/", function (days){
      console.log("entered $.get/days in gmaps", days);
      if (days.length > 0){
        renderMap();
      }
      else {
        console.log("should be here");
        $.post("/days/");
      }
    });

  }

  var styleArr = [
    {
      'featureType': 'landscape',
      'stylers': [
        { 'saturation': -100 },
        { 'lightness': 60 }
      ]
    },
    {
      'featureType': 'road.local',
      'stylers': [
        { 'saturation': -100 },
        { 'lightness': 40 },
        { 'visibility': 'on' }
      ]
    },
    {
      'featureType': 'transit',
      'stylers': [
        { 'saturation': -100 },
        { 'visibility': 'simplified' }
      ]
    },
    {
      'featureType': 'administrative.province',
      'stylers': [
        { 'visibility': 'off' }
      ]
    },
    {
      'featureType': 'water',
      'stylers': [
        { 'visibility': 'on' },
        { 'lightness': 30 }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry.fill',
      'stylers': [
        { 'color': '#ef8c25' },
        { 'lightness': 40 }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry.stroke',
      'stylers': [
        { 'visibility': 'off' }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'geometry.fill',
      'stylers': [
          { 'color': '#b6c54c' },
          { 'lightness': 40 },
          { 'saturation': -40 }
      ]
    }
  ];

});


function addObjToDay(type, name, currDay) {

  switch (type) {
     case 'Hotels':
          $.get("/attractions/hotels/"+name, function (hotel){
            $.ajax({
              type: "POST",
              url: '/days/'+currDay+'/hotel',
              data: hotel,
              success: function (data) {}
            });
            console.log("HOTEL INSIDE addObjToDay:",hotel);
            return hotel;
          });
          break;

     case 'Restaurants':
          $.get("/attractions/restaurants/"+name, function (restaurant){
            $.ajax({
              type: "POST",
              url: '/days/'+currDay+'/restaurants',
              data: restaurant,
              success: function (data) {}
            });
            return restaurant;
          });
          break;

     case 'Things To Do':
          $.get("/attractions/things/"+name, function (thingToDo){
            $.ajax({
              type: "POST",
              url: '/days/'+currDay+'/thingsToDo',
              data: thingToDo,
              success: function (data) {}
            });
            return thingToDo;    
          });
          break;
   }
}

 addItineraryDOM = function (typeName, eName) {
  var typeId = typeName.toLowerCase().split(" ")[0];
  typeId = "#" + typeId + "-list";
  var $locationListElement = $(typeId).children('.list-group');
  console.log($locationListElement);
  
  $locationListElement
     .append('<div class="itinerary-item"><span class="title">'
       + eName 
       +'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
 };

var getMarker = function(markers, eName){
	return $.grep(markers, function(marker){
    		return marker.name==eName;
    	})[0];
};
