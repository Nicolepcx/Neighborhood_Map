//map
var map;

//Creates a marker for each location
var marker;

// Creates a new map an changes the styles and color
function initMap() {
    var styles = [
          {
            featureType: 'water',
            stylers: [
              { color: '#29b2ea' }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#ffffff' },
              { weight: 4 }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -40 }
            ]
          },{
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#13c7e8' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              { visibility: 'off' }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              { lightness: 100 }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              { lightness: -100 }
            ]
          },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#f0e4d3' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -35 }
            ]
          }
        ];

    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(37.387474, -122.057543),
        mapTypeControl: true,
        scrollwheel: true,
        disableDefaultUI: false,
        styles: styles,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: true
    };

//Creates a new infowindow
  var infowindow = new google.maps.InfoWindow();

  // Changes the marker style.
  var defaultIcon = makeMarkerIcon('0091ff');

  // Changes the marker style to "highlighted " marker by mouseover.
    var highlightedIcon = makeMarkerIcon('07eee6');

//Sets the Knockout.js observables
var Place = function(data, foursquare, map){
    var self = this;
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.city = ko.observable(data.city);
    this.url = ko.observable(data.url);
    this.geekyPlaces = ko.observableArray([]);
    this.marker = ko.observable();
    this.rating = ko.observable();
    this.checkinCount = ko.observable();
    this.state = ko.observable();
    this.postCode = ko.observable();
    this.country = ko.observable();
    this.localWeather = ko.observable();
};


var ViewModel = function() {
  var self = this;

  this.placeList = ko.observableArray([]);


//Creates objects for each item in the Location Array
  geekyPlaces.forEach(function(locationItem){
    self.placeList.push( new Place(locationItem) );
  });


  self.placeList().forEach(function(locationItem){

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locationItem.lat(),locationItem.lng()),
      map: map,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      title: locationItem.name()
    });
    locationItem.marker = marker;


//JSON get foursquaredata

        var foursquareUrl = 'https://api.foursquare.com/v2/venues/explore?limit=1&ll=' +
                              locationItem.lat() + ',' + locationItem.lng() +
                              '&intent=self&query=' + locationItem.name() +
                              '&client_id=PBLIDC53NETDZSL1OEND4SCI1AOPHG4MMTQ2PYV3O4I4EWDO&client_secret=I0IE4GRUSALOGYMYFQGF2IMSNMJJ52TH4AVLADMJAP5N01XJ&v=20140806';
        $.getJSON(foursquareUrl, function(data){
            results = data.response.groups[0].items[0].venue;
            locationItem.name = results.name;
            locationItem.rating = results.rating;
            locationItem.rating = results.rating ? results.rating : "Rating unavailable";
            locationItem.checkinCount = results.stats.checkinsCount;
            locationItem.rcheckinCount = results.stats.checkinsCount ? results.stats.checkinsCount : "Check ins unavailable";
        }).fail(function(jqxhr, textStatus, error)
            { alert('There was an errors when retrieving the data. Please try refresh page or try again later.');
        });


          // Two event listeners - one for mouseover, one for mouseout,
          // to change the colors back and forth.
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });

    //Toggles the bounce animation on the marker
    function toggleBounce() {
      if(locationItem.marker.getAnimation() !== null) {
        locationItem.marker.setAnimation(null);
      } else {
        locationItem.marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }



// By click animate the marker and then show the infowindow
    google.maps.event.addListener(locationItem.marker, 'click', function(){
      toggleBounce();
      setTimeout(toggleBounce, 2000);
      setTimeout(function(){
                infowindow.setContent('<h3>' + locationItem.name +
                '</h3>\n<h5>FourSquare-Infos:</h5>\n<p><span class="glyphicon glyphicon-thumbs-up"></span> <span>: </span>' +
                locationItem.rating +
                '</p>\n<p><span class="glyphicon glyphicon-home"></span> <span>: </span>' +
                locationItem.checkinCount);
                infowindow.open(map, locationItem.marker);
        map.setZoom(14);
      }, 200);
    });
  });


//opens the marker if clicked
  self.show_info = function(locationItem){
    google.maps.event.trigger(locationItem.marker,'click');
  };

infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
            map.setZoom(12);
          });



  self.filterText = ko.observable("");

  self.filteredList = ko.computed(function() {
    var filterText = self.filterText().toLowerCase();
    if (self.filterText().length > 0) {
      return ko.utils.arrayFilter(self.placeList(), function(location) {
        console.log(location.name);
        var name = location.name.toLowerCase();
        return name.indexOf(filterText) > -1;
        return locationItem.marker.setMap(null);
      });
    } else {
      return self.placeList();
      return self.placeList().marker.setMap;
      locationItem.marker().setMap(map);
    }
  });
}


// This function takes in a color, and then creates a new marker
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

  google.maps.event.addDomListener(window,'resize', function(){
    map.setCenter(new google.maps.LatLng(37.387474, -122.057543));
  });


  $.ajax({
    url: "http://api.wunderground.com/api/e6f14835285d1ad3/conditions/q/CA/San_Francisco.json",
    dataType: "json",
    success: function(url) {
      console.log(url);
      var location = 'Silicon Valley';
      var temp_c = url.current_observation.temp_c;
      $(".conditions").html("Current temperature is: " + temp_c + "ºC" );
    },
    error:function(url) {
            alert("Try to refresh the page, weather information could not be load");
            }
});

map = new google.maps.Map(document.getElementById('map'), mapOptions);


// binding handler that init the ViewModel
  ko.applyBindings(new ViewModel());
}
