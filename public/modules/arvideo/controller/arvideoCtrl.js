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
        AFRAME.registerComponent('artoolkit', { init: function () { 
            var sceneEl = document.querySelector('a-scene').querySelector('a-assets'); 
            var video = sceneEl.querySelector('video'); 
            var canvas = document.getElementsByClassName('a-canvas'); 
            canvas[0].addEventListener('click', function () { console.log("YEAH HERE NOW") 
                if (video.paused == true) { 
                     video.play(); 
                } else {  
                    video.pause(); 
                } 
            }, false); 
        } });
    }

})