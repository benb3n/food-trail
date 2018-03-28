angular.module('TrailCtrl', ['appConstants'])
.controller('TrailController', function ($scope, $q, $timeout, GOOGLE_MAPS_KEY, NgMap) { 
    document.getElementById("navbar").style.visibility = "visible";
    document.getElementById("body_content").setAttribute('class', '');
    
    $(document).ready(function() {

        /*if (hasGetUserMedia()) {
            // Good to go!
        } else {
            alert('getUserMedia() is not supported by your browser');
        }*/
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

    function hasGetUserMedia() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      }

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
            watchPosition: {},
            geocoder:{}
        }

        vm.read_once = 0;

        vm.data = {
            locations: [
                /*{{lat: 1.281035, lng: 103.840953, name: "Singapore Kong Chow Wui Koon", address: "321 New Bridge Rd, Singapore", icon: "cafe",
                category: "tea", hours: "10am - 6pm", description: "Modern twists on classic pastries. We're part of a larger chain of patisseries and cafes.", 
                phone: "+65 " , img: "../assets/img/tong_heng_logo.jpg"},
                {lat: 1.283505, lng: 103.844348, name: "Chinatown Heritage Centre", address: "48 Pagoda St, Singapore 059207", icon: "restaurant", 
                category: "tea", hours: "10am - 6pm", description: "Modern twists on classic pastries. We're part of a larger chain of patisseries and cafes.", 
                phone: "+65" , img: "../assets/img/tong_heng_logo.jpg"},
                {lat: 1.317290, lng: 103.832748, name: "HOME", address: "133 New Bridge Road, #01-45 Chinatown Point, Singapore 059413", icon: "cafe",
                category: "tea", hours: "10am - 10pm", description: "Modern twists on classic pastries. We're part of a larger chain of patisseries and cafes.", 
                phone: "+65 62233649" , img: "../assets/img/tong_heng_logo.jpg"},*/
                
                //SOB Coorindates
                {lat: 1.295258, lng: 103.850578, name: "Eu Yan Sang", address: "273 South Bridge Rd, Singapore 058822", icon: "cafe", 
                category: "tea", hours: "Mon - Fri (8.30am - 6pm) ", 
                description: "Eu Yan Sang aims to be a leading and trusted integrative health and wellness company with a unique heritage in Chinese Medicine.", 
                phone: "+65 62233649" , img: "../assets/img/eu_yan_sang.png"},
                
                {lat: 1.28187, lng: 103.8452, name: "Eu Yan Sang", address: "273 South Bridge Rd, Singapore 058822", icon: "cafe",
                category: "tcm", hours: "Monday, Tuesday, Thursday & Friday: 8:30am - 6pm Wednesday: 9am - 6pm Saturday: 8:30am - 7:30pm", 
                description: "Eu Yan Sang aims to be a leading and trusted integrative health and wellness company with a unique heritage in Chinese Medicine.", 
                phone: "+65 6223 5085" , img: "../assets/img/eu_yan_sang.png"},

                {lat: 1.284836, lng: 103.844361, name: "Pek Sin Choon", address: "36 Mosque St, Singapore 059514", icon: "cafe",
                category: "tea", hours: "10am - 10pm", 
                description: "The company was established in 1925, and is one of the oldest tea merchant in Singapore. One of the few in Singapore which blended their own tea leaves using the traditional style", 
                phone: "+65 66048858" , img: "../assets/img/thye moh chan.png"},

                {lat: 1.281615, lng: 103.844961, name: "Tong Heng", address: "285 South Bridge Rd, 058833", icon: "cafe",
                category: "patisserie", hours: "9am - 10pm", 
                description: "Modern twists on classic pastries. We're part of a larger chain of patisseries and cafes.", 
                phone: "+65 62233649", img: "../assets/img/tong_heng_logo.jpg"},

                {lat: 1.280222, lng: 103.843555, name: "Lian He Ben Ji Claypot Rice", address: "335 Smith Street, Chinatown Complex, Singapore 050335", icon: "cafe",
                category: "tea", hours: "4:30pm - 10:30pm, Closed on Thursdays", 
                description: "Started back in 1979, one of the rare few places that still cook over charcoal fire", 
                phone: "+65 6227 2470" , img: "../assets/img/tea_chapter_logo.png"},
                
                {lat: 1.281951, lng: 103.8439, name: "Toh Kee Roast Duck", address: "34 Sago St, Singapore 059026", icon: "cafe",
                category: "food", hours: "10:30am to 7pm, Closed on mondays", 
                description: "One of Singapore's most famous roast duck, their roast duck is made with a more unique dark colour than other stalls, made by an antique brick linen oven", 
                phone: "+65 " , img: "../assets/img/tea_chapter_logo.png"},
            ],
            locations_by_name:{}
        }

        

        vm.dynMarkers = [];
        NgMap.getMap('map').then(function(map) {

            google.maps.event.trigger(map, "resize");

            vm.map.geocoder = new google.maps.Geocoder();
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
    vm.uploadQR = uploadQR;

    var fileInput = document.getElementById("file_input_file");
    fileInput.addEventListener('change', uploadQR);
    function uploadQR(){
        var file = document.getElementById('file_input_file').files[0];
        var code = jsQR(file, 250, 250);

        console.log(code)
    }

    function submitQuiz(){
        vm.map.watchPosition = navigator.geolocation.watchPosition(success, error, option);

    }

    function closeModal(){
        vm.read_once = 0;
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

                    //if(result[0] < 300){
                        navigator.geolocation.clearWatch(vm.map.watchPosition);
                        console.log(result[1])
                        vm.location = {};
                        vm.location.name = result[1].description.name
                        vm.location.description  = result[1].description.description 
                        vm.location.img = result[1].description.img 
                        vm.location.hours = result[1].description.hours 

                        var video = document.createElement("video");
                        var canvasElement = document.getElementById("canvas");
                        var canvas = canvasElement.getContext("2d");
                        var loadingMessage = document.getElementById("loadingMessage");
                        var outputContainer = document.getElementById("output");
                        var outputMessage = document.getElementById("outputMessage");
                        var outputData = document.getElementById("outputData");

                        function drawLine(begin, end, color) {
                        canvas.beginPath();
                        canvas.moveTo(begin.x, begin.y);
                        canvas.lineTo(end.x, end.y);
                        canvas.lineWidth = 4;
                        canvas.strokeStyle = color;
                        canvas.stroke();
                        }

                        // Use facingMode: environment to attemt to get the front camera on phones
                        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
                        video.srcObject = stream;
                        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
                        video.play();
                        requestAnimationFrame(tick);
                        });

                        function tick() {
                        loadingMessage.innerText = "⌛ Loading video..."
                        if (video.readyState === video.HAVE_ENOUGH_DATA) {
                            loadingMessage.hidden = true;
                            canvasElement.hidden = false;
                            outputContainer.hidden = false;

                            canvasElement.height = 250 //video.videoHeight;
                            canvasElement.width = 250 //video.videoWidth;
                            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                            var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                            var code = jsQR(imageData.data, imageData.width, imageData.height);
                            
                            if (code) {
                                if(code.data == "Tong Heng Pastries" && vm.read_once == 0){
                                    drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
                                    drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
                                    drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
                                    drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
                                    outputMessage.hidden = true;
                                    outputData.parentElement.hidden = false;
                                    outputData.innerText = code.data;

                                    vm.read_once++;
                                    $('#info_modal').modal('close');
                                    $('.location-collapse').sideNav({
                                        menuWidth: (window.innerWidth < 500) ? window.innerWidth : 300,
                                        edge: 'right', // Choose the horizontal origin
                                        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
                                    });
                                    $('.location-collapse').sideNav('show');
                                }

                            } else {
                            outputMessage.hidden = false;
                            outputData.parentElement.hidden = true;
                            }
                        }
                        requestAnimationFrame(tick);
                        }


                       

                        $('.modal').modal();
                        $('#info_modal').modal('open');

                        //watchPosition = navigator.geolocation.watchPosition(success, error, option);
                    //}
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
        "<img style='float:left; width:80px; margin-top:0px; margin-right:5px' src='"+ location.img +"'> " +
        "<div style='margin-left:50px; margin-bottom:20px;'> " +
        "<h6>"+ location.name +"</h6>" +//<p>"+ location.description +"</p> " +
        //"<p><b>Open:</b> "+ location.hours +"<br/><b>Phone:</b> "+ location.phone +"</p> " +
        "Find Out More <a href='#' id='a' data-activates='slide-out' class='location-collapse'><i class='material-icons'>search</i></a>" +
        //"<p><img style='margin-top:5px' src='https://maps.googleapis.com/maps/api/streetview?size=300x120&location="+ location.lat + "," + location.lng +"&key="+GOOGLE_MAPS_KEY+"'    ></p>" +
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
            vm.location.lat = location.lat 
            vm.location.lng = location.lng 
            vm.location.key = GOOGLE_MAPS_KEY

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