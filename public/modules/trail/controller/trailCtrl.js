angular.module('TrailCtrl', ['appConstants'])
.controller('TrailController', function ($scope, $q, $timeout, GOOGLE_MAPS_KEY, NgMap) { 
    document.getElementById("navbar").style.visibility = "visible";
    document.getElementById("body_content").setAttribute('class', '');
    
    $(document).ready(function() {
        // TABS
        $('ul.tabs').tabs();
        $('.button-collapse').sideNav({
            menuWidth: 300, // Default is 240
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            });
        $('select').material_select();
        $('.modal').modal();
        $('.tooltipped').tooltip({delay: 50});
    });

    var vm = this;

    initController();
    function initController(){
        vm.googleMapUrl = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAPS_KEY;

        vm.map = {
            map: {},
            infoWindow: {},
            directionsService: {},
            directionsDisplay: {},
            markers: []
        }

        vm.dynMarkers = [];
        NgMap.getMap('map').then(function(map) {
            google.maps.event.trigger(map, "resize");

            vm.map.directionsService = new google.maps.DirectionsService;
            vm.map.directionsDisplay = new google.maps.DirectionsRenderer;
            vm.map.infoWindow = new google.maps.InfoWindow;
            vm.map.directionsDisplay.setMap(map);
            //CREATE MARKET
            createMarker(new google.maps.LatLng(1.281035, 103.840953), "Kong Chow Wui Koon", "321 New Bridge Road (S)088758, 088758", "cafe", map)
            createMarker(new google.maps.LatLng(1.283505, 103.844348), "48 Pagoda Street Singapore 059207", "Chinatown Heritage Centre", "restaurant", map)

        });
   
        
    }

      
    /**********************
        BUTTON CLICKS
    **********************/
    vm.getRoute = getRoute;
      
    function getRoute(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                NgMap.getMap('map').then(function(map) {
                    vm.map.infoWindow.setPosition(pos);
                    vm.map.infoWindow.setContent('Location found.');
                    vm.map.infoWindow.open(map);
                    map.setCenter(pos);
                    calculateAndDisplayRoute(vm.map.directionsService, vm.map.directionsDisplay, pos);
                });
               
                
            }, function() {
                handleLocationError(true, vm.map.infoWindow, vm.map.map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, vm.map.infoWindow, vm.map.map.getCenter());
        }
    }
    

    /************************    
        HELPER FUNCTIONS        
    ************************/
    function calculateAndDisplayRoute(directionsService, directionsDisplay, pos) {
        var waypts = [];

        waypts.push({
          location: vm.map.markers[0].position,
          stopover: true
        });
        waypts.push({
          location: vm.map.markers[1].position,
          stopover: true
        });

        //console.log(pos)
        directionsService.route({
          origin: new google.maps.LatLng(pos.lat, pos.lng), //document.getElementById('start').value,
          destination: "Chinatown MRT", //new google.maps.LatLng(pos.lat, pos.lng), //document.getElementById('end').value,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
              summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                  '</b><br>';
              summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
              summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    }

    function createMarker(latlng, name, address, feature, map) {
        var iconBase = 'https://maps.google.com/mapfiles/kml/pal2/';
        var icons = {
          cafe: {
            icon: iconBase + 'icon54.png'
          },
          restaurant: {
            icon: iconBase + 'icon55.png'
          }
        }

        var html = "<b>" + name + "</b> <br/>" + address;
        var marker = new google.maps.Marker({
          map: map,
          position: latlng,
          icon: icons[feature].icon
        });

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
        });
        vm.map.markers.push(marker);
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        vm.map.infoWindow.setPosition(pos);
        vm.map.infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        vm.map.infoWindow.open(map);
    }
})