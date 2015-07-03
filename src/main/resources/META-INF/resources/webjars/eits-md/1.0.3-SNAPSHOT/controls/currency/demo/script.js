angular.module('eits-currency.sample', [
    'ngMaterial',
    'eits.controls.currency'
])
    .controller('AppCtrlCurrency', function ($scope) {

        $scope.model = {
            input: null
        };

    });