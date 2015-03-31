angular.module('eits.controls.table.sample', [
    'ngMaterial',
    'eits-material-core',
    'eits.controls.table',
])
    .controller('AppCtrl', function ($scope, $log, $http) {

        $scope.content = [
            {
                id: 1,
                name: 'Bruno Mars',
                description: 'Human',
                last_modified: 'Jun 5, 2014'
            },
            {
                id: 2,
                name: 'AT-AT',
                description: 'Robot',
                last_modified: 'Jun 5, 2014'
            },
            {
                id: 3,
                name: 'Mark Ronson',
                description: 'Human',
                last_modified: 'Jun 5, 2014'
            },
            {
                id: 4,
                name: 'Daft Punk',
                description: 'Human-Robot',
                last_modified: 'Jun 5, 2014'
            },
            {
                id: 5,
                name: 'Lady Gaga',
                description: 'Undefined',
                last_modified: 'Jun 5, 2014'
            },
            {
                id: 6,
                name: 'Mark Ronson',
                description: 'Human',
                last_modified: 'Jun 5, 2014'
            },
            {
                id: 7,
                name: 'Mark Ronson',
                description: 'Human',
                last_modified: 'Jun 5, 2014'
            }];

        $scope.sortable = ['name', 'description', 'last_modified'];

        //
        $scope.updateSelectedItens = function (selectedItens) {
            $log.log(selectedItens);
        };

        //
        $scope.openDetail = function (item) {
            $log.log(item);
        };

        $scope.onScrollEnd = function (first, max, pager) {
            //load async
            //function( result ) {
            //    pager.load( result );
            //}
            //content.push( result);
        }

        $scope.sendMoreData = function (page) {

            $log.log(page);
            $http.get('http://echo.jsontest.com/id/8/name/Henrique/description/Cara_legal/last_modified/June')
                .success(function (data, status, headers, config) {
                    $scope.content.push(data);
                })
                .error(function (data, status, headers, config) {

                });

        }
    });