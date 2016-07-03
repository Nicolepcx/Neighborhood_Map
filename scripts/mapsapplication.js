//map
var map;

//Creates a marker for each location
var marker;

//Locations to visit
var geekyPlaces = [
    {
        name: "Ames Research Center",
        lat: 37.414869,
        lng: -122.048589,
        url: "https://www.nasa.gov/centers/ames/home/index.html",
        city: "Mountain View"
    },
    {
        name: "The Computer History Museum",
        lat: 37.41441,
        lng: -122.07699,
        url: "http://www.computerhistory.org/",
        city: "Mountain View"
    },
    {
        name: "The Tech Museum",
        lat: 37.3999,
        lng: -122.10840,
        url: "http://www.thetech.org",
        city: "San Jose"
    },
    {
        name: "HP Garage",
        lat: 37.44303,
        lng: -122.15466,
        url: "http://www8.hp.com",
        city: "Palo Alto"
    },
    {
        name: "Steve Jobs Garage",
        lat: 37.34035,
        lng: -122.06895,
        url: "http://www.apple.com/stevejobs/",
        city: "Los Altos"
    },
    {
        name: "Apple Headquarters",
        lat: 37.33144,
        lng: -122.03063,
        url: "http://www.apple.com",
        city: "Cupertino"
    },
    {
        name: "Facebook Headquarters",
        lat: 37.48319,
        lng: -122.15011,
        url: "http://www.facebook.com",
        city: "Menlo Park"
    },
    {
        name: "Google Headquarters",
        lat: 37.4214,
        lng: -122.08537,
        url: "https://www.google.com/about/company/",
        city: "Mountain View"
    }
];


//Sets the Knockout.js observables
var Place = function(data, foursquare){
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.city = ko.observable(data.city);
    this.url = ko.observable(data.url);
    this.marker = ko.observable();
    this.rating = ko.observable();
    this.checkinCount = ko.observable();
    this.state = ko.observable();
    this.postCode = ko.observable();
    this.country = ko.observable();
};

// Creates a new map
function init() {
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(37.387474, -122.057543),
        mapTypeControl: true,
        disableDefaultUI: false,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        streetViewControl: true
    };

map = new google.maps.Map(document.getElementById('map'), mapOptions);

// overlays the map with the traffic layer
var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

//View Model
var ViewModel = function() {
    var match = this;

    this.placeList = ko.observableArray([]);

//Creates objects for each item in the geekyPlaces
    geekyPlaces.forEach(function(locationItem){
        match.placeList.push( new Place(locationItem) );
    });

//Creates a new infowindow object
var infowindow = new google.maps.InfoWindow();

// Changes the marker style.
var defaultIcon = makeMarkerIcon('0091ff');

// Changes the marker style to "highlighted " marker by mouseover.
var highlightedIcon = makeMarkerIcon('07eee6');

    match.placeList().forEach(function(locationItem){

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locationItem.lat(),locationItem.lng()),
            map: map,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            title: locationItem.name()
        });

        locationItem.marker = marker;

        //JSON get foursquaredata
        var foursquareUrl = 'https://api.foursquare.com/v2/venues/explore?limit=1&ll=' + locationItem.lat() + ',' + locationItem.lng() + '&intent=match&query=' + locationItem.name() + '&client_id=PBLIDC53NETDZSL1OEND4SCI1AOPHG4MMTQ2PYV3O4I4EWDO&client_secret=I0IE4GRUSALOGYMYFQGF2IMSNMJJ52TH4AVLADMJAP5N01XJ&v=20140806';
        var results, name, rating, streetName, city;
        $.getJSON(foursquareUrl, function(data){
            results = data.response.groups[0].items[0].venue;
            locationItem.name = results.name;
            locationItem.rating = results.rating;
            locationItem.checkinCount = results.stats.checkinsCount;
        }).error(function(e){
            $('#foursquare-API-error').html('<h2>There is an errors when retrieving the data. Please try refresh page or try later.</h2>');
        });

          // Two event listeners to change the marker color one for mouseover, one for mouseout,
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });

 //bounce animation on the marker
        function Bounce() {
            if(locationItem.marker.getAnimation() === null) {
                locationItem.marker.setAnimation(null);
            } else {
                locationItem.marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }


// By click animate the marker and then show the infowindow
        google.maps.event.addListener(locationItem.marker, 'click', function(){
            Bounce();
            setTimeout(Bounce, 50);
            setTimeout(function(){
                infowindow.setContent('<h3>' + locationItem.name + '</h3>\n<h5>FourSquare-Infos:</h5>\n<p><b>Rating: </b>' + locationItem.rating + '</p>\n<p><b>Check Ins: </b>' + locationItem.checkinCount);
                infowindow.open(map, locationItem.marker);
                map.setZoom(14);
            }, 200);
        });
    });

// This function takes in a COLOR, and then creates a new marker
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }

    //opens the marker if clicked
    match.show_details = function(locationItem){
        google.maps.event.trigger(locationItem.marker,'click');
    };

//Filters map markers
    match.filter = function() {
    var search = $('#searchField').val();
    console.log(search.toLowerCase().replace(/\b[a-z]/g,"kc"));
    search = search.toLowerCase().replace(/\b[a-z]/g, function(match) {
        console.log(match.toUpperCase());
        return match.toUpperCase();
    }); $(".locList > li").each(function() {
        console.log(this);
        $(this).text().search(search) > -1 ? $(this).show() : $(this).hide();
    });
    for(var i = 0; i < match.placeList().length; i++) {
        console.log(match.map);
        match.placeList()[i].marker.setMap(match.placeList()[i].marker.title.search(search) > -1 ? map : null);
        }
    };
};

//JSON get weather.underground-infos | //Display message if error getting weatherunderground JSON
var weatherUrl = "http://api.wunderground.com/api/e6f14835285d1ad3/conditions/q/CA/San_Francisco.json";

$.getJSON(weatherUrl, function(data) {
    var list = $(".forecast ul");
    detail = data.current_observation;
    list.append('<div>Temperature: ' + detail.temp_c + '° C</div>');
    list.append('<div><img style="width: 30px" src="' + detail.icon_url + '"> ' + detail.icon + '</div>');
}).error(function(e){
        $(".forecast").append('<p style="text-align: center;">Sorry! Weather Underground</p><p style="text-align: center;">Could Not Be Loaded</p>');
    });

//Handels the weather container
var weatherContainer = $("#weather-image-container");
var WeatherisVisible = false;
weatherContainer.dblclick(function() {
    if(WeatherisVisible === false) {
        if($(window).width() < 768) {
            $(".forecast div").css("display", "center");
            weatherContainer.animate({
                width: "320"
            }, 500);
        } else {
            $(".forecast div").css("display", "inline-block");
            weatherContainer.animate({
                width: "380"
            }, 500);
        }
        WeatherisVisible = true;
    } else {
        weatherContainer.animate({
        width: "100"
    }, 500);
        WeatherisVisible = false;
    }
});


var flickrJSON;

//Binds click handler to flickr image to open modal
$("#flickr").click(function() {
    $(".modal").css("z-index", "4");
    $(".modal").show();
});

//Binds click handler to x button to close modal
$("#exit-modal").click(function() {
    $(".modal").css("z-index", "4");
    $(".modal").hide();
    $('.flickr-image-container img').hide();
    SetflickrImages = true;
});

//jQuery fix for older Browser--> Index
$(function() {
       var zIndexNumber = 1000;
       // Put your target element(s) in the selector below!
       $("div").each(function() {
               $(this).css('zIndex', zIndexNumber);
               zIndexNumber -= 10;
       });
});

//GET JSON from flickr
function getFlickrImages() {
    var flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4de575dcd8b72dea79a16af98619fdcc&text=Silicon+Valley&accuracy=16&lat=37.387474&lon=-122.057543&format=json';
        $.ajax({
            url: flickrUrl,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: function(data) {
                var photo = data.photos.photo;
                flickrJSON = photo;
            },
//Display message if error getting flickr JSON
            error: function() {
        $('.flickr-image-container').append('<h2 style="text-align: center;">Error!</h2><br><p style="text-align: center;"> Images could not be loaded pls try again later!</p>');
        $("#right-arrow").hide();
        $("#left-arrow").hide();

        }
        });
}
getFlickrImages();


var flickrPhotoArray = [];
var counter = 0;
var SetflickrImages = false;

//Shows 200 random images from flickr
function setFlickrImages() {
  if(SetflickrImages === false) {
    for(var i=0; i < 200; i++) {
      var number = Math.floor((Math.random() * 250) + 1);
      var photo = 'https://farm' + flickrJSON[number].farm + '.staticflickr.com/' + flickrJSON[number].server + '/' + flickrJSON[number].id + '_' + flickrJSON[number].secret + '.jpg';
      flickrPhotoArray.push(photo);
      $('.flickr-image-container').append('<img id="flickr-image' + i + '" src="' + photo + '" alt="' + flickrJSON[number].title + ' Flickr Image">');
      $("#flickr-image" + i).hide();
      if(i < 1) {
        $("#flickr-image" + i).show();
      }
    }
  } else {
    $("#flickr-image" + counter).show();
  }
}
$("#flickr").click(setFlickrImages);

//Bind click handler to arrow button to view next image
function scrollForward() {
  $('#flickr-image' + counter).hide();
  counter += 1;
  if(counter >= 199) {
    counter = 0;
  }
  $('#flickr-image' + counter).fadeIn(200);
}

//Bind click handler to arrow button to view previous image
function scrollBackWard() {
  $('#flickr-image' + counter).hide();
  counter -= 1;
  if(counter < 0) {
    counter = 199;
  }
  $('#flickr-image' + counter).fadeIn(200);
}

$("#right-arrow").click(scrollForward);
$("#left-arrow").click(scrollBackWard);

var viewModel = {
    query: ko.observable('')
};

    google.maps.event.addDomListener(window,'resize', function(){
        map.setCenter(new google.maps.LatLng(37.387474, -122.057543));
    });


//apply the bindings
    ko.applyBindings(new ViewModel());
}

google.maps.event.addDomListener(window,'load',init);


