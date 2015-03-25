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
	.directive('x', XPositionDirective)
	.directive('y', YPositionDirective)
	.directive('left', LeftPositionDirective)
	.directive('right', RightPositionDirective)
	.directive('bottom', BottomPositionDirective)
	.directive('top', TopPositionDirective)
	.directive('horizontalCenter', HorizontalCenterDirective)
	.directive('verticalCenter', VerticalCenterDirective)
	.directive('eitsBox', BoxDirective);

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
	function BoxDirective( $CONFIG ) {
		return {
			restrict : 'E',
			replace : true,
			transclude : true,
			compile : CompileHandler,
			templateUrl: Template,
			controller: Controller,
		};
		
		/**
		 * 
		 */
		function CompileHandler( element, attributes, transclude ) {
			return {
				
				pre: function preLink( scope, element, attributes, controller ) {
				},
				post: function postLink( scope, element, attributes, controller ) {
					angular.forEach(element[0].children, function(elementChild) {
						elementChild.style.position = "absolute";
					});
				}
			}
		}

		/**
		 * 
		 */
		function Template( element, attributes ) {
			return $CONFIG.path + '/containers/box/box-template.html';
		}
		
		/**
		 * 
		 */
		function Controller() {
		}
	}

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function XPositionDirective() {
		return {
			restrict : 'A',
			compile : CompileHandler,
			controller: Controller,
		};
		
		/**
		 * 
		 */
		function CompileHandler( element, attributes, transclude ) {
			return {
				
				pre: function preLink( scope, element, attributes, controller ) {
				},
				post: function postLink( scope, element, attributes, controller ) {
					
					var observer = attributes.$observe("x", function(value) {
						element.css('left', value+'px');
					});

					element.on('$destroy', function() {
						observer();
					});
				}
			}
		}
		
		/**
		 * 
		 */
		function Controller() {
		}
	}

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function YPositionDirective() {
		return {
			restrict : 'A',
			compile : CompileHandler,
			controller: Controller,
		};
		
		/**
		 * 
		 */
		function CompileHandler( element, attributes, transclude ) {
			return {
				
				pre: function preLink( scope, element, attributes, controller ) {
				},
				post: function postLink( scope, element, attributes, controller ) {
					
					var observer = attributes.$observe("y", function(value) {
						element.css('top', value+"px");
					});

					element.on('$destroy', function() {
						observer();
					});
				}
			}
		}
		
		/**
		 * 
		 */
		function Controller() {
		}
	}

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function LeftPositionDirective() {
		return {
			restrict : 'A',
			compile : CompileHandler,
			controller: Controller,
		};

		/**
		 * 
		 */
		function CompileHandler( element, attributes, transclude ) {
			return {
				
				pre: function preLink( scope, element, attributes, controller ) {
				},
				post: function postLink( scope, element, attributes, controller ) {
					
					var observer = attributes.$observe("left", function(value) {
						element.css('left', value+'px');
					});

					element.on('$destroy', function() {
						observer();
					});
				}
			}
		}
		
		/**
		 * 
		 */
		function Controller() {
		}
	}

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function RightPositionDirective() {
		return {
			restrict : 'A',
			compile : CompileHandler,
			controller: Controller,
		};
		
		/**
		 * 
		 */
		function CompileHandler( element, attributes, transclude ) {
			return {
				
				pre: function preLink( scope, element, attributes, controller ) {
				},
				post: function postLink( scope, element, attributes, controller ) {
					
					var observer = attributes.$observe("right", function(value) {
						element.css('right', value+'px');
					});

					element.on('$destroy', function() {
						observer();
					});
				}
			}
		}
		
		/**
		 * 
		 */
		function Controller() {
		}
	}

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function TopPositionDirective() {
		return {
			restrict : 'A',
			compile : CompileHandler,
			controller: Controller,
		};

		/**
		 * 
		 */
		function CompileHandler( element, attributes, transclude ) {
			return {
				
				pre: function preLink( scope, element, attributes, controller ) {
				},
				post: function postLink( scope, element, attributes, controller ) {
					
					var observer = attributes.$observe("top", function(value) {
						element.css('top', value+'px');
					});

					element.on('$destroy', function() {
						observer();
					});
				}
			}
		}
		
		/**
		 * 
		 */
		function Controller() {
		}
	}

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function BottomPositionDirective() {
		return {
			restrict : 'A',
			compile : CompileHandler,
			controller: Controller,
		};
		
		/**
		 * 
		 */
		function CompileHandler( element, attributes, transclude ) {
			return {
				
				pre: function preLink( scope, element, attributes, controller ) {
				},
				post: function postLink( scope, element, attributes, controller ) {
					
					var observer = attributes.$observe("bottom", function(value) {
						element.css('bottom', value+'px');
					});

					element.on('$destroy', function() {
						observer();
					});
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
	function HorizontalCenterDirective( $log, $window ) {
		return {
			restrict : 'A',
			compile : CompileHandler,
			controller: Controller,
		}
		
		/**
		 * 
		 */
		function CompileHandler( element, attributes, transclude ) {
			return {
				
				pre: function preLink( scope, element, attributes, controller ) {
				},
				post: function postLink( scope, element, attributes, controller ) {
					
					var window = angular.element($window);
					window.bind("resize", function() {
						updatePosition( element, attributes.horizontalCenter );
					});

					var observer = attributes.$observe("horizontalCenter", function(value) {
						updatePosition( element, value );
					});
					element.on('$destroy', function() {
						observer();//unwatch
						window.unbind("resize");
					});
				}
			}
			
			/**
			 *
			 */
			function updatePosition( element, value ) {
				value = parseInt(value);
				
				if ( typeof value != 'number' ) {
					$log.warn("Error: the value of <horizontal-center> must be a number!");
					return false;
				}
				
				var parentElement = element.parent();
				var parentWidth = parentElement.width();
				
				var elementWidth = element.width();

				element.css('left', ((parentWidth/2) - (elementWidth/2) + value)+'px');
			}
		}
		
		/**
		 * 
		 */
		function Controller() {
		}
	}
	

	/**
	 * @ngdoc directive
	 * 
	 * @usage
	 */
	function VerticalCenterDirective( $log, $window ) {
		return {
			restrict : 'A',
			compile : CompileHandler,
			controller: Controller,
		}
		
		/**
		 * 
		 */
		function CompileHandler( element, attributes, transclude ) {
			return {
				
				pre: function preLink( scope, element, attributes, controller ) {
				},
				post: function postLink( scope, element, attributes, controller ) {

					var window = angular.element($window);
					window.bind("resize", function() {
						updatePosition( element, attributes.verticalCenter );
					});

					var observer = attributes.$observe("verticalCenter", function(value) {
						updatePosition( element, value );
					});

					element.on('$destroy', function() {
						observer();//unwatch
						window.unbind("resize");
					});
				}
			}
			
			/**
			 *
			 */
			function updatePosition( element, value ) {
				value = parseInt(value);
				
				if ( typeof value != 'number' ) {
					$log.warn("Error: the value of <vertical-center> must be a number!");
					return false;
				}
				
				var parentElement = element.parent();
				var parentHeight = parentElement.height();
				
				var elementHeight = element.height();

				element.css('top', ((parentHeight/2) - (elementHeight/2) + value)+'px');
			}
		}
		
		/**
		 * 
		 */
		function Controller() {
		}
	}

})();