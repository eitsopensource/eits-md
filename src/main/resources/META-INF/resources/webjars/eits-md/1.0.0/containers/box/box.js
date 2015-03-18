(function() {
	'use strict';

	/**
	 * @ngdoc module
	 * @name material.components.list
	 * @description List module
	 */
	angular.module('eits.containers.box', [ 
		'eits-material-core', 
		'material.core',
	])
	.directive('x', EitsXPositionDirective)
	.directive('y', EitsYPositionDirective)
	.directive('left', EitsLeftPositionDirective)
	.directive('right', EitsRightPositionDirective)
	.directive('bottom', EitsBottomPositionDirective)
	.directive('top', EitsTopPositionDirective)
	.directive('horizontalAlign', EitsHorizontalAlignDirective)
	.directive('verticalAlign', EitsVerticalAlignDirective)
	.directive('eitsBox', EitsBoxDirective);

	/**
	 * @ngdoc directive
	 * @name eitsBox
	 * @module eits.containers.box
	 * 
	 * @restrict E
	 * 
	 * @description The `<eits-box>` directive is a list container for 1..n
	 *              components.
	 * 
	 * @usage
	 */
	function EitsBoxDirective($CONFIG) {
		return {
			restrict : 'E',
			replace : true,
			transclude : true,
			link : linkHandler,
			templateUrl: getTemplate
		};

		/**
		 * 
		 */
		function getTemplate(element, attributes) {
			return $CONFIG.path + '/containers/box/box-template.html';
		}

		/**
		 * 
		 */
		function linkHandler(scope, element, attributes, controller,
				transcludeFn) {
			angular.forEach(element[0].children, function(elementChild) {
				elementChild.style.position = "absolute";
			});
		}
	}
	;

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function EitsXPositionDirective() {
		return {
			restrict : 'A',
			link : linkHandler,
		};

		/**
		 * 
		 */
		function linkHandler(scope, element, attributes, controller,
				transcludeFn) {
			var observer = attributes.$observe("x", function(value) {
				element[0].style.left = value + "px";
			});

			element.on('$destroy', function() {
				observer();
			});
		}
	}
	;

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function EitsYPositionDirective() {
		return {
			restrict : 'A',
			link : linkHandler,
		};

		/**
		 * 
		 */
		function linkHandler(scope, element, attributes, controller,
				transcludeFn) {
			var observer = attributes.$observe("y", function(value) {
				element[0].style.top = value + "px";
			});

			element.on('$destroy', function() {
				observer();
			});
		}
	}
	;

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function EitsLeftPositionDirective() {
		return {
			restrict : 'A',
			link : linkHandler,
		};

		/**
		 * 
		 */
		function linkHandler(scope, element, attributes, controller,
				transcludeFn) {
			var observer = attributes.$observe("left", function(value) {
				element[0].style.left = value + "px";
			});

			element.on('$destroy', function() {
				observer();
			});
		}
	}
	;

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function EitsRightPositionDirective() {
		return {
			restrict : 'A',
			link : linkHandler,
		};

		/**
		 * 
		 */
		function linkHandler(scope, element, attributes, controller,
				transcludeFn) {
			var observer = attributes.$observe("right", function(value) {
				element[0].style.right = value + "px";
			});

			element.on('$destroy', function() {
				observer();
			});
		}
	}
	;

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function EitsTopPositionDirective() {
		return {
			restrict : 'A',
			link : linkHandler,
		};

		/**
		 * 
		 */
		function linkHandler(scope, element, attributes, controller,
				transcludeFn) {
			var observer = attributes.$observe("top", function(value) {
				element[0].style.top = value + "px";
			});

			element.on('$destroy', function() {
				observer();
			});
		}
	}
	;

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function EitsBottomPositionDirective() {
		return {
			restrict : 'A',
			link : linkHandler,
		};

		/**
		 * 
		 */
		function linkHandler(scope, element, attributes, controller,
				transcludeFn) {
			var observer = attributes.$observe("bottom", function(value) {
				element[0].style.bottom = value + "px";
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
	function EitsHorizontalAlignDirective($log, $window) {
		return {
			restrict : 'A',
			require : [ '^width' ],
			link : {
				post : postLinkHandler
			}
		}

		/**
		 * 
		 */
		function postLinkHandler(scope, element, attributes) {
			var updateHorizontalPosition = function (){
				var horizontalAlign = parseInt(attributes.horizontalAlign)
				if (typeof horizontalAlign != 'number') {
					$log
							.error("Error: the value of <horizontal-align> must be a number!");
					return false;
				}
	
				var parentWidth = parseInt(element.parent().css('width'));
				element.css('left',
						 (((parentWidth / 2) - parseInt(element[0].style.width) / 2) + horizontalAlign)
										+ 'px');
			}
			
			var observer = attributes.$observe("horizontalAlign", function(value) {
				updateHorizontalPosition();
			});
			
			var w = angular.element($window);
			w.bind("resize", function(){
				updateHorizontalPosition();
			})
			
			element.on('$destroy', function() {
				observer();
				w.unbind("resize");
			});
		}
	}
	
	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function EitsVerticalAlignDirective($log, $window) {
		return {
			restrict : 'A',
			require : [ '^height' ],
			link : {
				post : postLinkHandler
			}
		}
		
		/**
		 * 
		 */
		function postLinkHandler(scope, element, attributes) {
			
			var updateVerticalPosition = function (){
				var verticalAlign = parseInt(attributes.verticalAlign);
				if (typeof verticalAlign != 'number') {
					$log
							.error("Error: the value of <vertical-align> must be a number!");
					return false;
				}
				
				var parentWidth = parseInt(element.parent().css('height'));
				element.css('top',
								(((parentWidth / 2) - parseInt(element[0].style.height) / 2) + verticalAlign)
										+ 'px');
			}
			
			var observer = attributes.$observe("verticalAlign", function(value) {
				updateVerticalPosition();
			});

			var w = angular.element($window);
			w.bind("resize", function(){
				updateVerticalPosition();
			});
			
			element.on('$destroy', function() {
				observer();
				w.unbind("resize");
			});		
		}
	}

})();