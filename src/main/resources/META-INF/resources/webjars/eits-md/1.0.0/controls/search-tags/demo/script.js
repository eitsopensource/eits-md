angular.module('eits.create.search.tags', [
	'ngMaterial',
    'eits.search.tags',
    'eits-material-core',
    'eits.containers.box'
])
.controller('AppCtrlSearchTags', function($scope) {

    $scope.list = function( listTags ){
        console.log(listTags);
    };
});