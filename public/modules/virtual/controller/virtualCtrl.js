angular.module('VirtualCtrl', [])
.controller('VirtualController', function ($scope, $q, $timeout) { 
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
        
        // Custom states.
        /*var clickedEl = null;
        var els = document.querySelectorAll('a-entity');
        Array.prototype.forEach.call(els, function (el) {
            el.addEventListener('click', function () {
            if (clickedEl && clickedEl !== el) {
                clickedEl.removeState('selected');
            }
            if (!el.classList.contains('clickable')) { return; }
                clickedEl = el;
                clickedEl.addState('selected');
            });
        });

        //Products
        var productCube = document.querySelector('#productCube');
   
        productCube.addEventListener('mouseenter', function (evt) {
            var productText = document.querySelector('#productText');
            productText.setAttribute('visible','');
            //productCube.setAttribute('mixin','cube-hovered')
            var productDetail = document.querySelector('#productDetail');
            productDetail.setAttribute('visible','');
            productDetail.setAttribute('text','hihi');
        })
        productCube.addEventListener('mouseleave', function (evt) {
            var productText = document.querySelector('#productText');
            productText.setAttribute('visible','false');
            //productCube.setAttribute('mixin','cube-hovered')
            var productDetail = document.querySelector('#productDetail');
            productDetail.setAttribute('visible','false');
        })

         // testing mouseenter and mouseleave
        var answer1 = document.querySelector('#answer1');
        answer1.addEventListener('mouseenter', function (evt) {
            answer1.setAttribute('mixin','cube cube-hovered')
        })
        answer1.addEventListener('mouseleave', function (evt) {
            answer1.setAttribute('mixin','green cube')
        })
        var answer2 = document.querySelector('#answer2');
        answer2.addEventListener('mouseenter', function (evt) {
            answer2.setAttribute('mixin','cube cube-hovered')
        })
        answer2.addEventListener('mouseleave', function (evt) {
            answer2.setAttribute('mixin','green cube')
        })
        var answer3 = document.querySelector('#answer3');
        answer3.addEventListener('mouseenter', function (evt) {
            answer3.setAttribute('mixin','cube cube-hovered')
        })
        answer3.addEventListener('mouseleave', function (evt) {
            answer3.setAttribute('mixin','green cube')
        })
        
        answer1.addEventListener('click', function (evt) {
            console.log("SEE")
            var scene = document.querySelector('a-scene');
            var clickRing = document.createElement('a-entity');
            clickRing.id = 'clickRing-'+new Date().getTime();
            clickRing.setAttribute('material','color: magenta; transparent: true; opacity: 0.6');
            clickRing.setAttribute('geometry','primitive: ring; radius-inner: 0.5; radius-outer: 0.6');
            clickRing.setAttribute('position',evt.detail.intersection.point);
            var opacityAnimation = document.createElement('a-animation');
            opacityAnimation.setAttribute('attribute','material.opacity');
            opacityAnimation.setAttribute('to',0);
            opacityAnimation.setAttribute('duration','300');
            opacityAnimation.setAttribute('easing','ease-out-quad');
            var scaleAnimation = document.createElement('a-animation');
            scaleAnimation.setAttribute('attribute','scale');
            scaleAnimation.setAttribute('to','3 3 3');
            scaleAnimation.setAttribute('duration','250');
            scaleAnimation.setAttribute('easing','ease-out-quad');
            var onAnimationEnd = function () {
              scene.removeChild(document.querySelector('#'+clickRing.id))
            }
 
            scaleAnimation.addEventListener('animationend', onAnimationEnd.bind(this))
            clickRing.appendChild(opacityAnimation);
            clickRing.appendChild(scaleAnimation);
            scene.appendChild(clickRing);
        })

        // Responding to mouse events.
        var cubes = document.querySelectorAll('a-entity[mixin*=cube]');
        var i;
        for (i = 0; i < cubes.length; ++i) {
          cubes[i].addEventListener('click', function () {
            var href = this.getAttribute('href');
            if (!href) { return; }
            window.top.postMessage({type: 'navigate', data: {url: href}}, '*');
          })
        }
        
        var vid = document.getElementById('video');
        console.log(vid);

        document.getElementById('pause-button').style.visibility = 'hidden'
        document.getElementById('play-button').addEventListener("click", function(e){
            
            this.style.visibility = 'hidden';
            document.getElementById('pause-button').style.visibility = "visible"
            vid.play();
        }, false);
        document.getElementById('pause-button').addEventListener("click", function(e){
            this.style.visibility = 'hidden';
            document.getElementById('play-button').style.visibility = "visible"
            vid.pause();
        }, false);*/

    }


  

})