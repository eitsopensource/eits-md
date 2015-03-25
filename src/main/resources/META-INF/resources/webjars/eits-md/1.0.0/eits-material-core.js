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
    .directive('width', WidthDirective)
	.directive('height', HeightDirective);
	
	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function WidthDirective() {
		return {
			restrict: 'A',
			compile: CompileHandler,
			controller: Controller,
		};
		
		/**
		 * 
		 */
		function CompileHandler( element, attributes, transclude ) {
			return {
				pre: function preLink( scope, element, attributes, controller ) { 
					var observer = attributes.$observe( "width", function( value ){
						updateSize( element, value );
					});
				},
				post: function postLink( scope, element, attributes, controller ) {
					element.on('$destroy', function() {
						observer();//unwatch
					});
				}
			}

			updateSize( element, attributes.width );
			
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
		}
		
		/**
		 * 
		 */
		function Controller() {
		}
	};
	
	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function HeightDirective() {
		return {
			restrict: 'A',
			compile: CompileHandler,
			controller: Controller,
		};
		
		/**
		 * 
		 */
		function CompileHandler( element, attributes, transclude ) {
			return {
				pre: function preLink( scope, element, attributes, controller ) { 
					var observer = attributes.$observe( "height", function( value ){
						updateSize( element, value );
					});
				},
				post: function postLink( scope, element, attributes, controller ) {
					element.on('$destroy', function() {
						observer();//unwatch
					});
				}
			}

			updateSize( element, attributes.height );
			
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
		}
		
		/**
		 * 
		 */
		function Controller() {
		}
	};

})();