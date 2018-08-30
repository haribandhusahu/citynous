var map, infoWindow, pos;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4
    });

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
            });
            //
            var geocoder = new google.maps.Geocoder;
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    google.maps.event.addListener(map, 'click', function (event) {
        alert("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
        var pos = event.latLng;
        var marker = new google.maps.Marker({
            position: pos,
            map: map,
        });
        map.setCenter(pos);

        infoWindow.open(map, marker);

        var geocoder = new google.maps.Geocoder;


        geocoder.geocode({ 'location': pos }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    map.setZoom(8);
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map
                    });
                    infoWindow.setContent(results[0].formatted_address);
                    window.alert(result[0].formatted_address);
                    infoWindow.open(map, marker);
                }
                else {
                    window.alert('No results found');
                }
            }
            else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
        //

    });

}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

