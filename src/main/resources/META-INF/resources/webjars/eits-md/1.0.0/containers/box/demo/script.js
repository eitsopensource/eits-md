angular.module('eits.containers.box.sample', [ 
	'ngMaterial',
	'eits.containers.box'
])
.controller('AppCtrl', function($scope) {
	
	$scope.changePosition = function() {
		//angular.element('#bt')[0].attributes.x.value = 100;
		console.log( $('#bt') );
		$('#bt').attr('x', 100);
	}
});