(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name
     * @description
     */
    angular.module('eits.controls.infinite-scroll',
        ['eits.material.core', 'material.core'])
        .directive('infiniteScroll', InfiniteScrollDirective);

    /**
     * @ngdoc directive
     * @name infiniteScroll
     * @module eits.controls.infinite-scroll
     *
     * @restrict A
     *
     * @description The `<eits-infinite-scroll>` directive calls an event when the bottom of it's element is reached.
     *
     * @usage
     */

    /**
     * @ngdoc directive
     *
     * @usage
     */
    function InfiniteScrollDirective() {
        return {
            restrict: 'A',
            scope: {
                infiniteScroll: '&',
                bottomOffset: '=?'
            },
            compile: CompileHandler
        };

        /**
         *
         */
        function CompileHandler($window ) {
            return {
                pre: function preLink(scope, iElement, iAttrs) {
                },
                post: function postLink(scope, iElement, iAttrs) {
                    scope.bottomOffset = scope.bottomOffset != undefined ? scope.bottomOffset : 0;
                    var onScrollEvent = function (event) {
                        if (iElement.scrollTop() + iElement.innerHeight() >= (iElement[0].scrollHeight - scope.bottomOffset)) {
                            scope.infiniteScroll();
                            scope.$apply();
                        }
                    }

                    // Método assíncrono que é ativado ao atingir o fundo da grid através do evento de scroll do mouse.
                    // Ele faz uma requisição ao para a aplicação passando o número da próxima página do conteúdo.
                    angular.element($window).on("scroll", onScrollEvent);

                    iElement.on("$destroy", function () {
                        angular.element($window).off("scroll", onScrollEvent);
                    });
                }
            };
        }
    }

})();