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
	.directive('x', EitsXPositionDirective)
	.directive('y', EitsYPositionDirective)
	.directive('left', EitsLeftPositionDirective)
	.directive('right', EitsRightPositionDirective)
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
		function linkHandler( scope, element, attributes, controller, transcludeFn ) {
			angular.forEach( element[0].children, function(elementChild) {
				elementChild.style.position = "absolute";
			});
		}
	};
	
	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function EitsXPositionDirective() {
		return {
			restrict: 'A',
			link: linkHandler,
		};
		
		/**
		 * 
		 */
		function linkHandler( scope, element, attributes, controller, transcludeFn ) {
            var observer = attributes.$observe( "x", function( value ){
            	element[0].style.top = attributes.x+"px";
            });
            
			element.on('$destroy', function() {
				observer();
			});
		}
	};
	
	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function EitsYPositionDirective() {
		return {
			restrict: 'A',
			link: linkHandler,
		};
		
		/**
		 * 
		 */
		function linkHandler( scope, element, attributes, controller, transcludeFn ) {
            var observer = attributes.$observe( "y", function( value ){
            	element[0].style.left = attributes.y+"px";
            });
            
			element.on('$destroy', function() {
				observer();
			});
		}
	};
	
	
	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function EitsLeftPositionDirective() {
		return {
			restrict: 'A',
			link: linkHandler,
		};
		
		/**
		 * 
		 */
		function linkHandler( scope, element, attributes, controller, transcludeFn ) {
            var observer = attributes.$observe( "left", function( value ){
            	element[0].style.left = attributes.left+"px";
            });
            
			element.on('$destroy', function() {
				observer();
			});
		}
	};
	
	
	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function EitsRightPositionDirective() {
		return {
			restrict: 'A',
			link: linkHandler,
		};
		
		/**
		 * 
		 */
		function linkHandler( scope, element, attributes, controller, transcludeFn ) {
            var observer = attributes.$observe( "right", function( value ){
            	element[0].style.right = attributes.right+"px";
            });
            
			element.on('$destroy', function() {
				observer();
			});
		}
	};

})();