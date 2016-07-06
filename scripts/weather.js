
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
weatherContainer.click(function() {
    if(WeatherisVisible === false) {
        if($(window).width() < 320) {
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