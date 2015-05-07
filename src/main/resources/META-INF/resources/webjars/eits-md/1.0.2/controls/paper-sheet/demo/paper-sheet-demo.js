angular.module('eits.controls.paper-sheet.sample', [
    'ngMaterial',
    'eits.material.core',
    'eits.controls.paper-sheet'
])
    .controller('AppCtrl', function ($scope, $log) {
        $scope.onOpenEventHandler = function () {
            $log.log("abriu");
        }

        $scope.onCloseEventHandler = function () {
            $log.log("fechou");
        }

        $scope.closePaper = function () {
            myPaperSheet0.close()
        }
    });