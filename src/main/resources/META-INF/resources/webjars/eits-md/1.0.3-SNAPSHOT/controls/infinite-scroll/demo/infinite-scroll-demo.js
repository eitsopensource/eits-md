angular.module('eits.controls.infinite-scroll.sample', [
    'ngMaterial',
    'eits.material.core',
    'eits.controls.infinite-scroll',
])
    .controller('AppCtrl', function ($scope, $log, $http) {

        $scope.status = "What a nice day";

        $scope.scrollEvent = function() {
            $scope.status = 'Scrolled to the end';
        }

    });