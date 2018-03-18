angular.module('ArvideoCtrl', [])
.controller('ArvideoController', function ($scope, $q, $timeout) { 
    document.getElementById("navbar").style.visibility = "visible";
    document.getElementById("body_content").setAttribute('class', '');
    var vm = this;
    
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
        $('.carousel').carousel();
    });

    initController();
    function initController(){
        /*AFRAME.registerComponent('artoolkit', { init: function () { 
            var sceneEl = document.querySelector('a-scene').querySelector('a-assets'); 
            var video = sceneEl.querySelector('video'); 
            //var canvas = document.getElementsByClassName('a-assets'); 
            //console.log(canvas)
            //canvas[0].addEventListener('click', function () { console.log("YEAH HERE NOW") 
                //if (video.paused == true) { 
                     video.play(); 
                //} else {  
                //    video.pause(); 
                //} 
            //}, false); 
        } });*/
        /*AFRAME.registerComponent('yeah', { init: function () { 
            this.el.addEventListener('click', function (evt) { 
                //console.log ("CLICK ON CURSOR LISTENER"); 
                alert("CLICK ME")
                var sceneEl = document.querySelector('a-scene').querySelector('a-assets'); 
                var video = sceneEl.querySelector('video'); 
                video.play(); 
                //lightning.play(); 
            }); 
        } });*/
        var vid = document.getElementById('video');
        console.log(vid);

        document.getElementById('play-button').style.visibility = 'hidden'
        document.getElementById('play-button').addEventListener("click", function(e){
            this.style.visibility = 'hidden';
            document.getElementById('pause-button').style.display = "visible"
            vid.play();
        }, false);
        document.getElementById('pause-button').addEventListener("click", function(e){
            this.style.visibility = 'hidden';
            document.getElementById('play-button').style.display = "visible"
            vid.pause();
        }, false);

    }

})