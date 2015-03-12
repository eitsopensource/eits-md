(function() {
'use strict';

	/**
	 * @ngdoc module
	 * @name material.components.list
	 * @description
	 * List module
	 */
	angular.module('eits.containers.box', [
	  'eits-material-core',
	  'material.core',
	])
	.directive('eitsBox', EitsBoxDirective);

	/**
	 * @ngdoc directive
	 * @name eitsBox
	 * @module eits.containers.box
	 *
	 * @restrict E
	 *
	 * @description
	 * The `<eits-box>` directive is a list container for 1..n components.
	 *
	 * @usage
	 * 
	 * TODO
	 */
	function EitsBoxDirective( $CONFIG ) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			link: linkHandler,
			templateUrl: getTemplate,
		};
	
		/**
		 * 
		 */
		function getTemplate( element, attributes ) {
			return $CONFIG.path+'/containers/box/box-template.html';
		}
		
		/**
		 * 
		 */
		function linkHandler( scope, element, attributes ) {
			//console.log( document.querySelector("body") );
			
			for ( var i = 0; i<element[0].children.length; i++ ) {
				element[0].children[i].style.position = "absolute";
				//element[0].children[i].style.top = 0;
				//element[0].children[i].style.left = 0;
			}
		}
	};

})();