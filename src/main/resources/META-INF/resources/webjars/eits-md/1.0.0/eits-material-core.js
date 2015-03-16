(function() {
'use strict';

	/**
	 * @ngdoc module
	 * @name material.components.list
	 * @description
	 * List module
	 */
	angular.module('eits-material-core', [
	])
	.constant("$CONFIG", {
        "version": "1.0.0",
        "path": "/webjars/eits-md/1.0.0",
    })
    .directive('width', EitsWidthDirective)
	.directive('height', EitsHeightDirective);
	
	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function EitsWidthDirective() {
		return {
			restrict: 'A',
			link: linkHandler,
		};
		
		/**
		 * 
		 */
		function linkHandler( scope, element, attributes, controller, transcludeFn ) {
            var observer = attributes.$observe( "width", function( value ){
            	if ( value ) {
            		if ( value.indexOf('%') > 0 ) {
            			element[0].style.width = value;
            		}
            		else {
            			element[0].style.width = value+"px";            			
            		}
            	}
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
	function EitsHeightDirective() {
		return {
			restrict: 'A',
			link: linkHandler,
		};
		
		/**
		 * 
		 */
		function linkHandler( scope, element, attributes, controller, transcludeFn ) {
			var observer = attributes.$observe( "height", function( value ){
            	if ( value ) {
            		if ( value.indexOf('%') > 0 ) {
            			element[0].style.height = value;
            		}
            		else {
            			element[0].style.height = value+"px";            			
            		}
            	}
			});
			
			element.on('$destroy', function() {
				observer();
			});
		}
	};

})();