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
            '50': 'E3F2FD',
            '100': 'BBDEFB',
            '200': '90CAF9',
            '300': '64B5F6',
            '400': '42A5F5',
            '500': '2196F3',
            '600': '1E88E5',
            '700': '1976D2',
            '800': '1565C0',
            '900': '0D47A1',
            'A100': '82B1FF',
            'A200': '448AFF',
            'A400': '2979FF',
            'A700': '2962FF',
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

