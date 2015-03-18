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
			compile: compileHandler,
			controller: function() {
			}
		};
		
		/**
		 * 
		 */
		function compileHandler( element, attributes, transclude ) {
			return {
				pre: function preLink( scope, element, attributes, controller ) { 
				},
				post: function postLink( scope, element, attributes, controller ) {

					var observer = attributes.$observe( "width", function( value ){
						updateSize( element, value );
					});
					element.on('$destroy', function() {
						observer();//unwatch
					});
				}
			}

			updateSize( element, attributes.width );
		}
		
		/**
		 * 
		 */
		function updateSize( element, value ) {
			if ( value ) {
        		if ( value.indexOf('%') > 0 ) {
        			element[0].style.width = value;
        		}
        		else {
        			element[0].style.width = value+"px";
        		}
        	}
			else {
				element[0].style.width = null;				
			}
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
			compile: compileHandler,
			controller: function() {
			}
		};
		
		/**
		 * 
		 */
		function compileHandler( element, attributes, transclude ) {
			return {
				pre: function preLink( scope, element, attributes, controller ) { 
				},
				post: function postLink( scope, element, attributes, controller ) {

					var observer = attributes.$observe( "height", function( value ){
						updateSize( element, value );
					});
					element.on('$destroy', function() {
						observer();//unwatch
					});
				}
			}

			updateSize( element, attributes.height );
		}
		
		/**
		 * 
		 */
		function updateSize( element, value ) {
			if ( value ) {
        		if ( value.indexOf('%') > 0 ) {
        			element[0].style.height = value;
        		}
        		else {
        			element[0].style.height = value+"px";
        		}
        	}
			else {
				element[0].style.height = null;				
			}
		}
	};
	

})();