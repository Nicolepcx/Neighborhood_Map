var flickrJSON;

//Binds click handler to flickr image to open modal
$("#flickr").click(function() {
    $(".modal").css("z-index", "3");
    $(".modal").show();
});

//Binds click handler to x button to close modal
$("#exit-modal").click(function() {
    $(".modal").css("z-index", "4");
    $(".modal").hide();
    $('.flickr-image-container img').hide();
    imagesAreSet = true;
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
var imagesAreSet = false;

//Get 200 random images from flickr JSON
//Store image data in flickrPhotoArray
//Hide all images except the first
function setFlickrImages() {
  if(imagesAreSet === false) {
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