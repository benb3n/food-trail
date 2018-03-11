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
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true
        });
        $('.location-collapse').sideNav({
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            menuWidth: (window.innerWidth < 500) ? window.innerWidth : 300,
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
            markers: [],
            watchPosition: {}
        }
        vm.data = {
            locations: [
                /*{{lat: 1.281035, lng: 103.840953, name: "Singapore Kong Chow Wui Koon", address: "321 New Bridge Rd, Singapore", icon: "cafe",
                category: "tea", hours: "10am - 6pm", description: "Modern twists on classic pastries. We're part of a larger chain of patisseries and cafes.", 
                phone: "+65 " , img: "../assets/img/tong_heng_logo.jpg"},
                {lat: 1.283505, lng: 103.844348, name: "Chinatown Heritage Centre", address: "48 Pagoda St, Singapore 059207", icon: "restaurant", 
                category: "tea", hours: "10am - 6pm", description: "Modern twists on classic pastries. We're part of a larger chain of patisseries and cafes.", 
                phone: "+65" , img: "../assets/img/tong_heng_logo.jpg"},*/
                {lat: 1.317290, lng: 103.832748, name: "HOME", address: "133 New Bridge Road, #01-45 Chinatown Point, Singapore 059413", icon: "cafe",
                category: "tea", hours: "10am - 10pm", description: "Modern twists on classic pastries. We're part of a larger chain of patisseries and cafes.", 
                phone: "+65 6604 8858" , img: "../assets/img/thye moh chan.png"},

                {lat: 1.295258, lng: 103.850578, name: "SMU SOB", address: "31 Victoria St, Singapore 187997", icon: "cafe", 
                category: "tea", hours: "10am - 6pm", description: "SOBBB", 
                phone: "+65 " , img: "../assets/img/tong_heng_logo.jpg"},
                
                {lat: 1.284836, lng: 103.844361, name: "Thye Moh Chan", address: "133 New Bridge Road, #01-45 Chinatown Point, Singapore 059413", icon: "cafe",
                category: "tea", hours: "10am - 10pm", description: "Modern twists on classic pastries. We're part of a larger chain of patisseries and cafes.", 
                phone: "+65 66048858" , img: "../assets/img/thye moh chan.png"},
                {lat: 1.281615, lng: 103.844961, name: "Tong Heng Pastries", address: "285 South Bridge Rd, 058833", icon: "cafe",
                category: "patisserie", hours: "9am - 10pm", description: "Modern twists on classic pastries. We're part of a larger chain of patisseries and cafes.", 
                phone: "+65 62233649", img: "../assets/img/tong_heng_logo.jpg"},
                {lat: 1.280222, lng: 103.843555, name: "Tea Chapter Trading Pte Ltd", address: "9 & 11 Neil Road, Singapore 088808", icon: "cafe",
                category: "tea", hours: "11am - 9pm", description: "Dedicated to the education on Chinese Tea Appreciation, as well as the highest levels of service standards.", 
                phone: "+65 62261175" , img: "../assets/img/tea_chapter_logo.png"},

                {lat: 1.281951, lng: 103.8439, name: "Tai Chong Kok", address: "34 Sago St, Singapore 059026", icon: "cafe",
                category: "tea", hours: "", description: "", 
                phone: "+65 " , img: "../assets/img/tea_chapter_logo.png"},
            ],
            locations_by_name:{}
        }

        

        vm.dynMarkers = [];
        NgMap.getMap('map').then(function(map) {

            google.maps.event.trigger(map, "resize");

            vm.map.directionsService = new google.maps.DirectionsService;
            vm.map.directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions:{strokeColor:"#4a4a4a",strokeWeight:3}});
            vm.map.infoWindow = new google.maps.InfoWindow;
            vm.map.directionsDisplay.setMap(map);
            //CREATE MARKET
            vm.data.locations.forEach(function(location, index){
                vm.data.locations_by_name[''+location.address] = location;
                createMarker(new google.maps.LatLng( parseFloat(location.lat), parseFloat(location.lng) ), location.name, location.address, location.icon, location, map)
            })
  
        });
   
        
    }

      
    /**********************
        BUTTON CLICKS
    **********************/
    vm.getRoute = getRoute;
    vm.submitQuiz = submitQuiz;
    vm.closeModal = closeModal;
    vm.onQRReaderSuccess = onQRReaderSuccess;
    vm.onQRReaderError = onQRReaderError;

    var read_once = 0;
    function onQRReaderSuccess(data) {
        console.log("S ", data)
        
        //if(data == vm.location.name && read_once == 0){
        if(read_once == 0){
            $('#info_modal').modal('close');
 
            read_once++;

            $('.location-collapse').sideNav({
                menuWidth: (window.innerWidth < 500) ? window.innerWidth : 300,
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            });
            $('.location-collapse').sideNav('show');
        }else{
            $('#qr_error').val("Invalid Code")
        }
    }

    function onQRReaderError(data){
        console.log("E ", data)
        $('#qr_error').val("Invalid Code")
    }

    function submitQuiz(){
        vm.map.watchPosition = navigator.geolocation.watchPosition(success, error, option);

    }

    function closeModal(){
        read_once = 0;
        $('.location-collapse').sideNav('hide');
    }

    function getRoute(){
        if (navigator.geolocation) {

            //$timeout(function(){
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                NgMap.getMap('map').then(function(map) {
                    /*vm.map.infoWindow.setPosition(pos);
                    vm.map.infoWindow.setContent('Location found.');
                    vm.map.infoWindow.open(map);*/
                    map.setCenter(pos);

                    /*var icon= {
                        url: "../assets/img/markers/Arrow_3.png",
                        scaledSize: new google.maps.Size(50, 50), // scaled size
                    }
                    var marker = new google.maps.Marker({
                        map: map,
                        position: pos,
                        animation: google.maps.Animation.DROP,
                        icon: icon
                    });
              
                      google.maps.event.addListener(marker, 'click', function() {
                        vm.map.infoWindow.setContent(html);
                        vm.map.infoWindow.open(map, marker);
                      });*/
                    calculateAndDisplayRoute(vm.map.directionsService, vm.map.directionsDisplay, pos);
                });
               
                var option ={
                    enableHighAccuracy: true,
                    //timeout: Infinity,
                    //maximumAge : 0
                }
                vm.map.watchPosition = navigator.geolocation.watchPosition(success, error, option);
                //console.log(watchPosition)
                
                function toggleBounce() {
                    if (marker.getAnimation() !== null) {
                      marker.setAnimation(null);
                    } else {
                      marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                }
            

                function success(position){
                    var result = find_closest_marker(position)
                    console.log(result[0])
                    //console.log(position)
                    NgMap.getMap('map').then(function(map) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        vm.map.infoWindow.setPosition(pos);
                        vm.map.infoWindow.setContent('You are HERE NOW.');
                        vm.map.infoWindow.open(map);
              
                    });

                    if(result[0] < 200){
                        navigator.geolocation.clearWatch(vm.map.watchPosition);
                        console.log(result[1])
                        vm.location = {};
                        vm.location.name = result[1].description.name
                        vm.location.description  = result[1].description.description 
                        vm.location.img = result[1].description.img 
                        vm.location.hours = result[1].description.hours 

                        $('.modal').modal();
                        $('#info_modal').modal('open');
                        //watchPosition = navigator.geolocation.watchPosition(success, error, option);
                    }
                }
                function error(err) {
                    console.warn('ERROR(' + err.code + '): ' + err.message);
                }
                
            }, function() {
                handleLocationError(true, vm.map.infoWindow, vm.map.map.getCenter());
            });
            //}, 5000)
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, vm.map.infoWindow, vm.map.map.getCenter());
        }
    }
    

    /************************    
        HELPER FUNCTIONS        
    ************************/
    function rad(x) {return x*Math.PI/180;}
    
    function find_closest_marker( event ) {
        var lat = event.coords.latitude;
        var lng = event.coords.longitude;
        var R = 6371; // radius of earth in km
        var distances = [];
        var closest = -1;
        vm.map.markers.forEach(function(marker, index){
            var mlat = marker.position.lat();
            var mlng = marker.position.lng();
            var dLat  = rad(mlat - lat);
            var dLong = rad(mlng - lng);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;
            distances[index] = d;
            if ( closest == -1 || d < distances[closest] ) {
                closest = index;
            }
        })
        //console.log(closest)
        return [(distances[closest]*1000), vm.map.markers[closest]]
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay, pos) {
        var waypts = [];

        vm.map.markers.forEach(function(marker, index){
            waypts.push({
                location: marker.position,
                stopover: true
              });
        })

        directionsService.route({
          origin: new google.maps.LatLng(pos.lat, pos.lng), //document.getElementById('start').value,
          destination: "Chinatown MRT", //new google.maps.LatLng(pos.lat, pos.lng), //document.getElementById('end').value,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            //directionsDisplay.setOptions( { suppressMarkers: true } );
            
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
                summaryPanel.innerHTML += (typeof vm.data.locations_by_name[route.legs[i].start_address] != 'undefined') ? vm.data.locations_by_name[route.legs[i].start_address].name + ' to ' : route.legs[i].start_address + ' to ';
                //summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += (i == route.legs.length-1)? "Chinatown MRT" : (typeof vm.data.locations_by_name[route.legs[i].end_address] != 'undefined') ? vm.data.locations_by_name[route.legs[i].end_address].name + '<br>': route.legs[i].end_address + '<br>';
                //summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + ' (' + route.legs[i].duration.text + ') <br><br>';
            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    }

    function createMarker(latlng, name, address, feature, location,  map) {
        var iconBase = 'https://maps.google.com/mapfiles/kml/pal2/';
        var icons = {
          cafe: {
            icon: {
                url: "../assets/img/markers/Shop_5.png",
                scaledSize: new google.maps.Size(50, 50), // scaled size
            }
            //icon: iconBase + 'icon54.png'
          },
          restaurant: {
            icon: {
                url: "../assets/img/markers/Shop_7.png",
                scaledSize: new google.maps.Size(50, 50), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            }
            //icon: iconBase + 'icon55.png'
          }
        }

        var screen_width = window.innerWidth - 100;

        var html = //<b>" + name + "</b> <br/>" + address
        "<div style='width:"+ screen_width +"px'>" +
        "<img style='float:left; width:70px; margin-top:0px' src='"+ location.img +"'> " +
        "<div style='margin-left:50px; margin-bottom:20px;'> " +
        "<h6>"+ location.name +"</h6> <p>"+ location.description +"</p> " +
        //"<p><b>Open:</b> "+ location.hours +"<br/><b>Phone:</b> "+ location.phone +"</p> " +
        "Find Out More <a href='#' id='a' data-activates='slide-out' class='location-collapse'><i class='material-icons'>search</i></a>" +
        //"<p><img src='https://maps.googleapis.com/maps/api/streetview?size=250x120&location="+ location.lat + "," + location.lng +"&key="+GOOGLE_MAPS_KEY+"'    ></p>" +
        "</div></div> ";

        var marker = new google.maps.Marker({
          map: map,
          position: latlng,
          animation: google.maps.Animation.DROP,
          icon: icons[feature].icon,
          description: location
        });

        google.maps.event.addListener(marker, 'click', function() {
            vm.map.infoWindow.setContent(html);
            vm.map.infoWindow.open(map, marker);

            vm.location = {};
            vm.location.name = location.name
            vm.location.description  = location.description 
            vm.location.img = location.img 
            vm.location.hours = location.hours 

            $timeout(function(){
                $('.location-collapse').sideNav({
                    menuWidth: (window.innerWidth < 500) ? window.innerWidth : 300,
                    edge: 'right', // Choose the horizontal origin
                    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
                });
            });
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