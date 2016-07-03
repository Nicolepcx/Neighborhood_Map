## Neighborhood-Map Project

Project #5 of Udacity's [Front-End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001). The task was to write code to display map markers identifying at least 5 locations that you are interested in. The app should display those locations by default when the page is loaded. Furthermore the app should provide a filter option that uses an input field to filter both the list view and the map markers displayed by default on load. The list view and the markers should update accordingly. Additionally, the app should have a functionality using third-party APIs to provide information when a map marker or list view entry is clicked (ex. Yelp reviews, Wikipedia, Flickr images, etc).

### Show map in your Browser:

#### Locally (Mac)

##### Clone the git repository to your local machine:


* On GitHub, navigate to the main page of the repository:
[Nicole's Repository](https://github.com/Nicolepcx/Neighborhood_Map.git "Neighborhood-Map")
* Under your repository name, click Clone or download.
* In the Clone with HTTPs section, click  to copy the clone URL for the repository.
* Open Terminal
* Change the current working directory to the location where you want the cloned directory to be made.
* Type `git clone`, and then paste the URL you copied at the second point.
* `$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`
* Press Enter. Your local clone will be created.


* Check out the repository:
* To inspect the site on your phone, you can run a local server

  ```bash
  $ cd /path/to/your-project-folder
  $ python -m SimpleHTTPServer 8080
  ```

* Open a browser and visit localhost:8080
* Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $ cd /path/to/your-project-folder
  $ ./ngrok http 8080
  ```

#### if you want to check out the pagespeed:

* Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)


### Project-description

The app is using the Google Maps API to display the Silicon Valley area and some "Geeky" locations.
The markers display many of the main companies of the valley.

#### Functionality of the page:

*   An interactive navigation bar to filter map and
    navigation bar results using knockout.js
*   Display of the current Valley weather
    by using the Weather Underground API.
*   Display random Flickr images from the valley, using
    the Flickr API.
*   Display Foursquare Check-ins & Ratings.
*   Responsive design handles the diffrent media
    queries that need to be used to view the app on different devices (desktop & mobile).


### additional `index.html` optimisations :

##### Gzip compression

Enable the [mod_deflate](http://httpd.apache.org/docs/2.2/mod/mod_deflate.html) (gzip) Apache module on the server.

##### Browser Caching

Leveraged [browser caching](https://developers.google.com/speed/docs/insights/LeverageBrowserCaching) by including an [.htaccess](http://httpd.apache.org/docs/2.2/howto/htaccess.html) file in the root of the website. The file contains expires headers, which sets long expiration times for all CSS, JavaScript and images.


#### Inspiration:

* [A Visitor’s Map to Silicon Valley](https://www.google.com/maps/d/edit?mid=1maozsM2Rx4QulAQicgYwoiCaV-c"geek map")

#### Helpful Resoures:

* [Knockout](http://knockoutjs.com/documentation/introduction.html "knockout")
* [jQuery](http://api.jquery.com/ "jQuery")
* [W3Schools](http://www.w3schools.com/ "w3schools")
* [Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial "google maps")
* [Stackoverflow](http://stackoverflow.com/ "Stackoverflow")
* [Flickr-Api Documentation](https://www.flickr.com/services/api/ "flickr doc")
* [Weatherunderground-Api Documentation](https://www.wunderground.com/weather/api/d/docs "weatherunderground doc")
* [Codeproject](http://www.codeproject.com/Articles/387626/BikeInCity-KnockoutJS-JQuery-Google-Maps"codeproject")
* [CSS Tricks](https://css-tricks.com/almanac/properties/z/z-index/"css tricks")
* [Packt Publishing](https://www.packtpub.com/books/content/using-google-maps-apis-knockoutjs"Maps/Knockout")
* [Validate html](https://validator.w3.org/"validate html")
* [CSS Validator](https://jigsaw.w3.org/css-validator/"CSS Validator")
* [JS Validator](http://www.javascriptlint.com/online_lint.php"JS Validator")





