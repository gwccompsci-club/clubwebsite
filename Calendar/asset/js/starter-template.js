var map;

// Initialize map
function initialize() {
  var myCenter = new google.maps.LatLng(33.736323, -118.000299);
  var mapProp = {
    center: myCenter,
    zoom: 12,
    // mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), mapProp);

  var geocoder = new google.maps.Geocoder();

  // Address of event
  var address = "15744 Goldenwest St, Huntington Beach";

  // Description of event
  var description = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h2 id="firstHeading" class="firstHeading">Uluru</h2>'+
          '<div id="bodyContent">'+
          '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
          'sandstone rock formation in the southern part of the '+
          'Northern Territory, central Australia. It lies 335 km (208 mi) '+
          'south west of the nearest large town, Alice Springs; 450 km '+
          '(280 mi) by road. Kata Tjuta and Uluru are the two major '+
          'features of the Uluru - Kata Tjuta National Park. Uluru is '+
          'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
          'Aboriginal people of the area. It has many springs, waterholes, '+
          'rock caves and ancient paintings. Uluru is listed as a World '+
          'Heritage Site.</p>'+
          '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
          'http://en.wikipedia.org/w/index.php?title=Uluru</a> (last visited June 22, 2009).</p>'+
          '</div>'+
          '</div>';

  // Using Geocoding
  geocodeAddress(map, geocoder, address, description);
};

google.maps.event.addDomListener(window, 'load', initialize);

google.maps.event.addDomListener(window, "resize", resizingMap());

$('#myMapModal').on('show.bs.modal', function() {
  //Must wait until the render of the modal appear, thats why we use the resizeMap and NOT resizingMap!! ;-)
  resizeMap();
})

function resizeMap() {
  if (typeof map == "undefined") return;
  setTimeout(function() {
    resizingMap();
  }, 400);
}

function resizingMap() {
  if (typeof map == "undefined") return;
  var center = map.getCenter();
  google.maps.event.trigger(map, "resize");
  map.setCenter(center);
}

/**
 * Get Google Map of event through the address
 * @param  {map} resultsMap  The result map
 * @param  {GeoCoder} geocoder    The geocoder of Google Map API
 * @param  {string} address     The address of event
 * @param  {string} description The description of event
 * @return {map}             update the map
 */
function geocodeAddress(resultsMap, geocoder, address, description) {
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var infowindow = new google.maps.InfoWindow({
        content: description
      });
      var marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: resultsMap,
        title: 'Click to show description'
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
