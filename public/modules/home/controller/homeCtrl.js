angular.module('HomeCtrl', [])
.controller('HomeController', function ($scope, $q, $timeout) { 
    document.getElementById("navbar").style.visibility = "hidden";
    document.getElementById("body_content").setAttribute('class', 'body-home');
    var vm = this;
    

    $(document).ready(function(){
        $('.tooltipped').tooltip({delay: 50});
    });
})