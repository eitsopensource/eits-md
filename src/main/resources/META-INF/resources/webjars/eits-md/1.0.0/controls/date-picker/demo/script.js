angular.module('eits.create.date.picker', [
    'ngMaterial',
    'eits.date.picker',
    'eits-material-core',
    'eits.containers.box'
])
    .controller('AppCtrlDatePicker', function($scope) {

        $scope.list = function( listTags ){
            console.log(listTags);
        };
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.definePalette('amazingPaletteName', {
            '50': 'FFEBEE',
            '100': 'FFCDD2',
            '200': 'EF9A9A',
            '300': 'E57373',
            '400': 'EF5350',
            '500': 'F44336',
            '600': 'E53935',
            '700': 'D32F2F',
            '800': 'C62828',
            '900': 'B71C1C',
            'A100': 'FF8A80',
            'A200': 'FF5252',
            'A400': 'FF1744',
            'A700': 'D50000',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('amazingPaletteName')
            .backgroundPalette('amazingPaletteName')
    });

//.config(function($mdThemingProvider) {
//    $mdThemingProvider.definePalette('amazingPaletteName', {
//        '50': '84ffff',
//        '100': '18ffff',
//        '200': '00e5ff',
//        '300': '00b8d4',
//        '400': '29b6f6',
//        '500': '03a9f4',
//        '600': '039be5',
//        '700': '0288d1',
//        '800': '0277bd',
//        '900': '01579b',
//        'A100': '80d8ff',
//        'A200': '40c4ff',
//        'A400': '00b0ff',
//        'A700': '0091ea',
//        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
//                                            // on this palette should be dark or light
//        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
//            '200', '300', '400', 'A100'],
//        'contrastLightColors': undefined    // could also specify this if default was 'dark'
//    });
//    $mdThemingProvider.theme('default')
//        .primaryPalette('amazingPaletteName')
//});

