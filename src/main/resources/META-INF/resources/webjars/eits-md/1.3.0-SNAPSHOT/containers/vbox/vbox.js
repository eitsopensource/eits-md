(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name material.components.list
     * @description
     * List module
     */
    angular.module('eits.containers.vbox', [
        'eits.material.core',
        'material.core',
    ])
        .directive('eitsVbox', EitsVBoxDirective);

    /**
     * @ngdoc directive
     * @name eitsVBox
     * @module eits.containers.vbox
     *
     * @restrict E
     *
     * @description
     * The `<eits-vbox>` directive is a list container for 1..n components.
     *
     * @usage
     */
    function EitsVBoxDirective($CONFIG) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                verticalAlign: "@?",
                horizontalAlign: "@?",
                gap: "@?",
                paddingTop: "@?",
                paddingRight: "@?",
                paddingBottom: "@?",
                paddingLeft: "@?"
            },
            transclude: true,
            compile: CompileHandler,
            templateUrl: getTemplate,
            controller: Controller
        };

        /**
         *
         */
        function getTemplate(element, attributes) {
            return $CONFIG.path + '/containers/vbox/vbox-template.html';
        }

        /**
         *
         */
        function CompileHandler() {

            return {
                pre: function (scope, element, attributes) {
                },
                post: function (scope, element) {

                    element.css('display', 'flex');

                    // Tratamento dos atributos
                    scope.verticalAlign = scope.verticalAlign != undefined ? scope.verticalAlign : null;
                    scope.horizontalAlign = scope.horizontalAlign != undefined ? scope.horizontalAlign : null;
                    scope.gap = scope.gap != undefined ? sizeStringFormatter(scope.gap) : null;
                    scope.paddingTop = scope.paddingTop != undefined ? sizeStringFormatter(scope.paddingTop) : null;
                    scope.paddingRight = scope.paddingRight != undefined ? sizeStringFormatter(scope.paddingRight) : null;
                    scope.paddingBottom = scope.paddingBottom != undefined ? sizeStringFormatter(scope.paddingBottom) : null;
                    scope.paddingLeft = scope.paddingLeft != undefined ? sizeStringFormatter(scope.paddingLeft) : null;

                    // Aplicação dos padding's definidos nos atributos
                    if (scope.paddingTop != null) {
                        element.css('padding-top', scope.paddingTop);
                    }
                    if (scope.paddingRight != null) {
                        element.css('padding-right', scope.paddingRight);
                    }
                    if (scope.paddingBottom != null) {
                        element.css('padding-bottom', scope.paddingBottom);
                    }
                    if (scope.paddingLeft != null) {
                        element.css('padding-left', scope.paddingLeft);
                    }

                    // Tratamento dos elementos filhos
                    if (scope.gap != null) {
                        // Array com os elementos dentro da HBox
                        var children = element.children();
                        setGapBetweenElements(children, scope.gap);
                    }

                    // Trata o alinhamento vertical
                    setVerticalAlign(element, scope.verticalAlign);

                    // Trata o alinhamento horizontal
                    setHorizontalAlign(element, scope.horizontalAlign);
                }
            }
        }

        function Controller($scope, $element) {

            $scope.$watch('paddingTop', function (newValue, oldValue) {
                if (newValue != oldValue) $element.css('padding-top', sizeStringFormatter(newValue));
            });
            $scope.$watch('paddingRight', function (newValue, oldValue) {
                if (newValue != oldValue) $element.css('padding-right', sizeStringFormatter(newValue));
            });
            $scope.$watch('paddingBottom', function (newValue, oldValue) {
                if (newValue != oldValue) $element.css('padding-bottom', sizeStringFormatter(newValue));
            });
            $scope.$watch('paddingLeft', function (newValue, oldValue) {
                if (newValue != oldValue) $element.css('padding-left', sizeStringFormatter(newValue));
            });
            $scope.$watch('horizontalAlign', function (newValue, oldValue) {
                if (newValue != oldValue) setHorizontalAlign($element, newValue);
            });
            $scope.$watch('verticalAlign', function (newValue, oldValue) {
                if (newValue != oldValue) setVerticalAlign($element, newValue);
            });
            $scope.$watch('gap', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    var children = $element.children();
                    setGapBetweenElements(children, newValue);
                }
            });
        }

        /**
         *
         * @param element
         * @param value
         */
        function setVerticalAlign(element, value) {
            if (value == 'top') {
                element.css('justify-content', 'flex-start');
                element.css('-webkit-justify-content', 'flex-start');
                element.css('-ms-flex-pack', 'flex-start');
            } else if (value == 'bottom') {
                element.css('justify-content', 'flex-end');
                element.css('-webkit-justify-content', 'flex-end');
                element.css('-ms-flex-pack', 'flex-end');
            } else if (value == 'center') {
                element.css('justify-content', 'center');
                element.css('-webkit-justify-content', 'center');
                element.css('-ms-flex-pack', 'center');
            }
        }

        /**
         *
         * @param element
         * @param value
         */
        function setHorizontalAlign(element, value) {
            if (value == 'left') {
                element.css('align-items', 'flex-start');
                element.css('-webkit-align-items', 'flex-start');
                element.css('-ms-flex-align', 'flex-start');
            } else if (value == 'right') {
                element.css('align-items', 'flex-end');
                element.css('-webkit-align-items', 'flex-end');
                element.css('-ms-flex-align', 'flex-end');
            } else if (value == 'center') {
                element.css('align-items', 'center');
                element.css('-webkit-align-items', 'center');
                element.css('-ms-flex-align', 'center');
            }
        }

        /**
         *
         * @param elements
         * @param gapValue
         */
        function setGapBetweenElements(elements, gapValue) {
            for (var i = 0; elements.length > i; i++) {

                var child = angular.element(elements[i]);
                var formattedValue = sizeStringFormatter(gapValue);

                if (i > 0) child.css('margin-top', formattedValue);
                if (i < elements.length - 1) child.css('margin-bottom', formattedValue);
            }
        }

        /**
         *
         * @param value
         * @returns {*}
         */
        function sizeStringFormatter(value) {
            var formattedValue = angular.copy(value);
            var type = typeof formattedValue;

            if (type == 'number' || type != "string") {
                formattedValue = String(formattedValue);
            }
            if (value) {
                if (formattedValue.indexOf('%') > 0 || formattedValue.indexOf('px') > 0) return formattedValue;
                return formattedValue + "px";
            }
            return "0px";
        }
    };

})();