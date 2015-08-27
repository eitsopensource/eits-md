angular.module('eits.containers.hbox.sample', [
    'ngMaterial',
    'eits.containers.hbox'
])
    .controller('AppCtrl', function ($scope) {

        $scope.gap = 50;
        $scope.paddingTop = 10;
        $scope.paddingRight = 10;
        $scope.paddingLeft = 10;
        $scope.paddingBottom = 10;
        $scope.verticalAlign = "center";
        $scope.horizontalAlign = "center";

    });