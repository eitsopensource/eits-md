(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name
     * @description
     */
    angular.module('eits.controls.table',
        ['eits-material-core', 'material.core'])
        .directive('eitsTable', TableDirective)
        .directive('columnGroup', ColumnDirective)
        .directive('tableColumn', TableColumnDirective)
        .directive('pager', PagerDirective)
        .directive('infinityScrollPager', InfiniteScrollPagerDirective)
        .directive('numberPager', NumberPagerDirective);

    /**
     * @ngdoc directive
     * @name eitsTable
     * @module eits.controls.table
     *
     * @restrict E
     *
     * @description The `<eits-table>` directive is a...
     *
     * @usage
     */
    function TableDirective($CONFIG) {
        return {
            restrict: 'E',
            terminal: true,
            transclude: true,
            scope: {
                content: '=',
                sortable: '=?',
                multiSelection: '=?',
                onSelectionChange: '&?',
                onItemClick: '&?',
                onScrollEnd: '&?',
                resetSelection: '=?',
                identifier: '@'
            },
            controller: Controller,
            templateUrl: Template
        }

        /**
         *
         */
        function Controller($scope, $filter, $window) {

            // Tratamento inicial de atributos e variáveis.
            var orderBy = $filter('orderBy');
            $scope.tablePage = 1;

            $scope.checkBoxControl = [];
            $scope.selectedItens = [];

            $scope.identifier = $scope.identifier != undefined ? $scope.identifier : 'id';
            $scope.multiSelection = $scope.multiSelection != undefined ? $scope.multiSelection : false;
            $scope.onItemClick = $scope.onItemClick != undefined ? $scope.onItemClick : function(element){};
            $scope.onSelectionChange = $scope.onSelectionChange != undefined ? $scope.onSelectionChange : function(elements){};

            // Setter do atributo de colunas.
            this.setColumns = function(columns) {
                $scope.columns = columns;
            }

            //
            this.configPagerTypeInfiniteScroll = function() {
                // Método assíncrono que é ativado ao atingir o fundo da grid através do evento de scroll do mouse.
                // Ele faz uma requisição ao para a aplicação passando o número da próxima página do conteúdo.
                angular.element($window).bind("scroll", function () {

                    var element = angular.element('.eits-table')
                    var contentHeight = element[0].offsetHeight;
                    var yOffset = window.pageYOffset;
                    var y = yOffset + window.innerHeight;

                    if (y >= contentHeight) {
                        $scope.tablePage++;
                        $scope.onScrollEnd({ page: $scope.tablePage});
                        $scope.$apply();
                    }
                });
            }

            // Ordena o conteúdo a partir do o campo e a ordem(reversa ou não)
            $scope.order = function (predicate, reverse) {
                $scope.content = orderBy($scope.content, predicate, reverse);
                $scope.predicate = predicate;
            };

            // Ordenação inicial de acordo com o primeiro campo dos campos ordenáveis.
            //$scope.order($scope.sortable[0], false);

            // Método que armazena os ítens selecionados em um array separado.
            $scope.selectItem = function (item, incluso) {
                if (incluso) {
                    var i = $scope.content.indexOf(item);
                    $scope.selectedItens.splice(i, 1);

                } else if (!incluso && $scope.selectedItens.length == 0) {
                    $scope.selectedItens.push(item);

                } else if (!incluso) {
                    $scope.selectedItens.push(item);
                }

                // Manda o array de itens selecionados para a aplicação.
                $scope.onSelectionChange({ selectedItens: $scope.selectedItens});
            }

            // Método que recarrega a tabela a partir de um novo conteúdo.
            //$scope.reloadData = function (content) {
            //    $scope.content = angular.copy(content);
            //    $scope.resetSelection();
            //    $scope.tablePage = 1;
            //};

            // Método que limpa a seleção de registros marcados.
            $scope.resetSelection = function () {
                $scope.selectedItens.splice(0, $scope.selectedItens.length);
                $scope.checkBoxControl.splice(0, $scope.checkBoxControl.length);
                $scope.onSelectionChange([]);
            }
        }

        /**
         *
         */
        function Template(element, attributes) {
            return $CONFIG.path + '/controls/table/table-template.html';
        }
    }

    /**
     * @ngdoc directive
     *
     * @usage
     */
    function ColumnDirective() {
        return {
            restrict : 'E',
            scope: true,
            priority: 2,
            require: '^eitsTable',
            compile : LinkHandler,
            controller: Controller
        };

        /**
         *
         */
        function LinkHandler() {
            return {
                pre: function ( scope, element, attrs, eitsTableCtrl ) {
                },
                post: function ( scope, element, attrs, eitsTableCtrl ) {
                    eitsTableCtrl.setColumns(scope.columns);
                }
            }
        }

        /**
         *
         */
        function Controller($scope){
            $scope.columns = [];
            this.setColumn = function(column){
                $scope.columns.push(column);
            }
        }


    }

    /**
     * @ngdoc directive
     *
     * @usage
     */
    function TableColumnDirective() {
        return {
            restrict : 'E',
            require: '^columnGroup',
            priority: 3,
            scope: {
                header: '@',
                field: '@',
                sortable: '=?'
            },
            compile: CompileHandler
        };

        /**
         *
         */
        function CompileHandler() {
            return {
                pre: function preLink(scope, iElement, iAttrs, columnGroupCtrl) {
                    columnGroupCtrl.setColumn({
                        header: scope.header,
                        field: scope.field,
                        sortable: scope.sortable != undefined ? scope.sortable : false
                    })
                },
                post: function postLink(scope, iElement, iAttrs, columnGroupCtrl) {
                }
            };
        }
    }

    /**
     * @ngdoc directive
     *
     * @usage
     */
    function PagerDirective() {
        return {
            restrict : 'E',
            scope: true,
            priority: 4,
            require: '^eitsTable',
            compile : LinkHandler,
            controller: Controller
        };

        /**
         *
         */
        function LinkHandler() {
            return {
                pre: function ( scope, element, attrs, eitsTableCtrl ) {
                },
                post: function ( scope, element, attrs, eitsTableCtrl ) {
                    if (scope.pagerType == 'infinite-scroll') {
                        eitsTableCtrl.configPagerTypeInfiniteScroll();
                    }
                }
            }
        }

        /**
         *
         */
        function Controller($scope){
            $scope.pagerType = 'number';

            this.setPagerTypeInfiniteScrollPager = function(){
                $scope.pagerType = 'infinite-scroll';
            }
        }


    }

    /**
     * @ngdoc directive
     *
     * @usage
     */
    function InfiniteScrollPagerDirective() {
        return {
            restrict : 'A',
            require: '^pager',
            priority: 5,
            scope: true,
            compile: CompileHandler
        };

        /**
         *
         */
        function CompileHandler() {
            return {
                pre: function preLink(scope, iElement, iAttrs, pagerCtrl) {
                    pagerCtrl.setPagerTypeInfiniteScrollPager();
                },
                post: function postLink(scope, iElement, iAttrs, pagerCtrl) {
                }
            };
        }
    }

    /**
     * @ngdoc directive
     *
     * @usage
     */
    function NumberPagerDirective() {
        return {
            restrict : 'E',
            require: '^pager',
            priority: 5,
            scope: true,
            compile: CompileHandler
        };

        /**
         *
         */
        function CompileHandler() {
            return {
                pre: function preLink(scope, iElement, iAttrs, pagerCtrl) {
                    pagerCtrl.setPagerTypeNumberScrollPager();
                },
                post: function postLink(scope, iElement, iAttrs, pagerCtrl) {
                }
            };
        }
    }

})();