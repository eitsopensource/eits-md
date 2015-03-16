(function() {
'use strict';

	/**
	 * @ngdoc module
	 * @name material.components.list
	 * @description
	 * List module
	 */
	angular.module('eits.containers.hbox', [
	  'eits-material-core',
	  'material.core',
	])
	.directive('eitsHBox', EitsHBoxDirective);

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
	 */
	function EitsHBoxDirective( $CONFIG ) {
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
			return $CONFIG.path+'/containers/hbox/hbox-template.html';
		}
		
		/**
		 * 
		 */
		function linkHandler( scope, element, attributes, controller, transcludeFn ) {
			
		}
	};

})();