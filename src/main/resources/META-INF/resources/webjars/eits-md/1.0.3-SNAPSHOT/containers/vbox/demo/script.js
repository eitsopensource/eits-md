angular.module('eits.containers.vbox.sample', [
    'ngMaterial',
    'eits.containers.vbox',
    'eits.containers.hbox'
])
    .controller('AppCtrl', function ($scope) {

        $scope.gap = 20;
        $scope.paddingTop = 0;
        $scope.paddingRight = 0;
        $scope.paddingLeft = 0;
        $scope.paddingBottom = 0;
        $scope.verticalAlign = "center";
        $scope.horizontalAlign = "center";

    });