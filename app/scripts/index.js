var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');

var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=star+wars&includes=Images,Shop";


fetchJSONP(url, function(data){
  var resultsArray = data.results;
  var newObjectsArray = [];
  resultsArray.forEach(function(item){
    var price = item.price;
    var title = item.title;
    var shopName = item.Shop.shop_name;
    var newObject = {
      'price':price,
      'title':title,
      'shop_name':shopName
    };
    newObjectsArray.push(newObject);
  });
  console.log(resultsArray);
  console.log(newObjectsArray);
});


var stampMold = $('#tile-template').html();
var stamp = handlebars.compile(stampMold);

























/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/
function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
