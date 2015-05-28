(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name
     * @description
     */
    angular.module('eits.controls.paper-sheet',
        ['eits.material.core', 'material.core'])
        .directive('eitsPaperSheet', PaperSheetDirective)
        .directive('contentOpened', ContentOpenedDirective)
        .directive('contentClosed', ContentClosedDirective);

    /**
     * @ngdoc directive
     * @name eitsPaperSheet
     * @module eits.controls.paper-sheet
     *
     * @restrict E
     *
     * @description The `<eits-paper-sheet>` directive is a...
     *
     * @usage
     */
    function PaperSheetDirective($CONFIG) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                onClose: '&?',
                onOpen: '&?'
            },
            compile: CompileHandler,
            controller: Controller,
            templateUrl: Template
        }

        /**
         *
         */
        function CompileHandler($compile) {
            return {
                pre: function preLink(scope, iElement) {

                },
                post: function postLink(scope, iElement) {

                    iElement[0].open = function () {
                        iElement.children('.eits-paper-sheet-item').addClass('clicked');
                        scope.onOpen();
                    }

                    iElement[0].close = function () {
                        iElement.children('.eits-paper-sheet-item').removeClass('clicked');
                        scope.onClose();
                    }

                    scope.onOpen = scope.onOpen != undefined ? scope.onOpen : function () {
                    };
                    scope.onClose = scope.onClose != undefined ? scope.onClose : function () {
                    };
                }
            };
        }

        /**
         *
         */
        function Controller($scope, $filter, $window, $templateCache, $element) {

            this.setClosedContent = function (element) {
                var closedContentElement = $element.children('.eits-paper-sheet-item').children('.paper-sheet-closed');
                closedContentElement.html(element);
            };

            this.setOpenedContent = function (element) {
                var openedContentElement = $element.children('.eits-paper-sheet-item').children('.paper-sheet-opened');
                openedContentElement.html(element);
            };

            $element.on('click', function (event) {

                if( $element.find('.paper-sheet-closed').find($(event.target)).length == 1 && $(event.target).closest('button').length == 0) {

                    $.each($('eits-paper-sheet'), function(index, elem){
                        if($(elem).attr('id') != $element.attr('id'))
                            elem.close();
                    });

                    $element.children('.eits-paper-sheet-item').toggleClass('clicked');

                    if( !$element.children('.eits-paper-sheet-item').hasClass('clicked') ) {
                        $scope.onOpen();
                    } else {
                        $scope.onClose();
                    }
                }

                /*if ($.contains($element.find('paper-sheet-closed'), event.target) && $(event.target).closest('button').length == 0 && !$element.children('.eits-paper-sheet-item').hasClass('clicked')) {
                    $element.children('.eits-paper-sheet-item').addClass('clicked');
                    $scope.onOpen();
                }
                if ( !$.contains($element[0], event.target) && $element.children('.eits-paper-sheet-item').hasClass('clicked') ) {
                    $element.children('.eits-paper-sheet-item').removeClass('clicked');
                    $scope.onClose();
                }*/
            });

            /*angular.element($window).on('click', function (event) {

                console.log($element);
                console.log($.contains($element[0], event.target));
                console.log($element.find('.paper-sheet-closed').find($(event.target)).length);

                if (!$.contains($element[0], event.target) && $element.find('.paper-sheet-closed').find($(event.target)).length == 0) {
                    $element.children('.eits-paper-sheet-item').removeClass('clicked');
                    $scope.onClose();
                }
            })*/
        }

        /**
         *
         */
        function Template(element, attributes) {
            return $CONFIG.path + '/controls/paper-sheet/paper-sheet-template.html';
        }
    }

    /**
     *
     */
    function ContentOpenedDirective() {
        return {
            restrict: 'E',
            require: '^eitsPaperSheet',
            link: LinkHandler
        }

        /**
         *
         */
        function LinkHandler(scope, iElement, iAttributes, eitsPaperSheetController) {
            iElement.css('display', 'block');
            eitsPaperSheetController.setOpenedContent(iElement);
        }
    }

    /**
     *
     */
    function ContentClosedDirective() {
        return {
            restrict: 'E',
            require: '^eitsPaperSheet',
            compile: CompileHandler
        }

        /**
         *
         */
        function CompileHandler() {
            return {
                pre: function preLink(scope, iElement) {
                },
                post: function postLink(scope, iElement, iAttributes, eitsPaperSheetController) {
                    eitsPaperSheetController.setClosedContent(iElement);
                }
            }
        }
    }


})();