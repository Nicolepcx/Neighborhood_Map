

//GET Weather Underground
var weatherUrl = "http://api.wunderground.com/api/e6f14835285d1ad3/forecast/q/CA/San_Francisco.json";

$.getJSON(weatherUrl, function(data) {
    var list = $(".forecast ul");
    detail = data.current_observation;
    list.append('<li>Temperature: ' + detail.temp_c + '° </li>');
    list.append('<li><img style="width: 1em" src="' + detail.icon_url + '"> ' + detail.icon + '</li>');
}).error(function(e){
        $(".forecast").append('<p style="text-align: center;">Sorry! Weather Underground</p><p style="text-align: center;">Could Not Be Loaded</p>');
    });

//container to handle the weather window
var weatherContainer = $("#weather-image-container");
var WeatherisVisible = false;
weatherContainer.click(function() {
    if(WeatherisVisible === false) {
        if($(window).width() < 768) {
            $(".forecast li").css("display", "center");
            weatherContainer.animate({
                width: "245"
            }, 500);
        } else {
            $(".forecast li").css("display", "inline-block");
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