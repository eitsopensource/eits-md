(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name
     * @description
     */
    angular.module('eits.controls.table',
        ['eits.material.core', 'material.core'])
        .directive('eitsTable', TableDirective)
        .directive('columns', ColumnDirective)
        .directive('tableColumn', TableColumnDirective)
        .directive('pager', PagerDirective)
        .directive('infinityScrollPager', InfiniteScrollPagerDirective)
        .directive('numberPager', NumberPagerDirective)
        .directive('filter', FilterDirective)
        .directive('sideFilter', SideFilterDirective)
        .directive('fixedHeader', FixedHeaderDirective);

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
            transclude: true,
            scope: {
                content: '=',
                multiSelection: '=?',
                onSelectionChange: '&?',
                onItemClick: '&?',
                filterFlag: '=?'
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
                    iElement[0].clearSelection = function () {
                        scope.clearSelection();
                    }
                },
                post: function postLink(scope, iElement) {
                }
            };
        }

        /**
         *
         */
        function Controller($scope, $filter, $window, $templateCache, $element, $transclude) {

            // Tratamento inicial de atributos e variáveis.
            $scope.checkBoxControl = [];
            $scope.selectedItens = [];
            $scope.showLoadingCircle = true;
            $scope.multiSelection = $scope.multiSelection != undefined ? $scope.multiSelection : false;
            $scope.onItemClick = $scope.onItemClick != undefined ? $scope.onItemClick : function (element) {
            };
            $scope.onSelectionChange = $scope.onSelectionChange != undefined ? $scope.onSelectionChange : function (elements) {
            };

            $scope.sidebarFlag = false;
            $scope.sidebarTitle = "Filtros";

            // Instância de uma função de filtro
            var orderBy = $filter('orderBy');

            // Setter do atributo de colunas.
            this.setColumns = function (columns) {
                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].contentToRender != null) {
                        columns[i].columnId = i.toString();
                        $templateCache.put(columns[i].columnId, columns[i].contentToRender.html());
                    }
                }
                $scope.columns = columns;
            }

            //
            this.setFitlerCloseEvent = function (closeEvent) {
                $scope.sidebarCloseEvent = closeEvent;
            }

            //
            this.setFilterFlagEvents = function (filterFlagHandler, filterFlagStatusHandler) {
                $scope.filterFlagHandler = filterFlagHandler;
                $scope.filterFlagStatusHandler = filterFlagStatusHandler;
            }

            //
            this.setSidebarTitle = function (title) {
                $scope.sidebarTitle = title;
            }

            // Método que define a paginação por scroll.
            this.configPagerTypeInfiniteScroll = function (scrollEndFn) {

                $scope.onScrollEnd = scrollEndFn;
                $scope.pagerType = "scroll";

                var onScrollEvent = function (event) {

                    var $window = angular.element(window);
                    var docViewTop = $window.scrollTop();
                    var docViewBottom = docViewTop + $window.height();
                    var elemTop = $element.offset().top;
                    var elemBottom = elemTop + $element.height();

                    if (docViewBottom >= (elemBottom - 50) && !$scope.showLoadingCircle) {
                        $scope.onScrollEnd({size: $scope.content ? $scope.content.length : 0});
                        $scope.showLoadingCircle = true;
                        $scope.$apply();
                    }
                }

                // Método assíncrono que é ativado ao atingir o fundo da grid através do evento de scroll do mouse.
                // Ele faz uma requisição ao para a aplicação passando o número da próxima página do conteúdo.
                angular.element($window).on("scroll", onScrollEvent);

                $element.on("$destroy", function(){
                    angular.element($window).off("scroll", onScrollEvent);
                });
            };

            //
            this.getSidebarElement = function () {
                var sidebarTemplate = angular.element("eits-table-sidebar-content");
                return sidebarTemplate;
            }

            //
            this.enableSidebar = function () {
                $scope.sidebarFlag = true;
            }

            //
            this.disableSidebar = function () {
                $scope.sidebarFlag = false;
            }

            $scope.gridRowSelected = function(row, event) {
                var localName = event.target.localName;
                if (localName != 'button' && localName != 'a') {
                    $scope.onItemClick({item: row});
                }
            }

            $scope.showSideBar = false;

            //
            $scope.toggleSidebar = function () {
                $scope.showSideBar = !$scope.showSideBar;

                if (!$scope.showSideBar) {
                    $scope.sidebarCloseEvent();
                }
                //$scope.filterFlagStatusHandler($scope.showSideBar);
            }

            var contentWatcher = $scope.$watch('content', function () {
                $scope.showLoadingCircle = false;
            });

            // Ordena o conteúdo a partir do o campo e a ordem(reversa ou não)
            $scope.order = function (predicate, reverse) {
                $scope.content = orderBy($scope.content, predicate, reverse);
                $scope.predicate = predicate;
            };

            // Método que armazena os ítens selecionados em um array separado.
            $scope.selectItem = function (item, incluso) {
                if (incluso) {
                    var i = $scope.selectedItens.indexOf(item);
                    $scope.selectedItens.splice(i, 1);

                } else if (!incluso && $scope.selectedItens.length == 0) {
                    $scope.selectedItens.push(item);

                } else if (!incluso) {
                    $scope.selectedItens.push(item);
                }

                // Manda o array de itens selecionados para a aplicação.
                $scope.onSelectionChange({selectedItens: $scope.selectedItens});
            }

            // Método que limpa a seleção de registros marcados.
            $scope.clearSelection = function () {
                $scope.selectedItens = [];
                $scope.checkBoxControl = [];
                $scope.onSelectionChange({selectedItens: []});
            }

            // Descadastrar os $watch da directiva
            $element.on('$destroy', function() {
                contentWatcher()
            });
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
            restrict: 'E',
            scope: true,
            require: '^eitsTable',
            compile: LinkHandler,
            controller: Controller
        };

        /**
         *
         */
        function LinkHandler() {
            return {
                pre: function (scope, element, attrs, eitsTableController) {
                },
                post: function (scope, element, attrs, eitsTableController) {
                    eitsTableController.setColumns(scope.columns);
                }
            }
        }

        /**
         *
         */
        function Controller($scope) {
            $scope.columns = [];
            this.setColumn = function (column) {
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
            restrict: 'E',
            replace: true,
            require: '^columns',
            scope: {
                header: '@',
                field: '@',
                sortable: '=?',
                width: '@?'
            },
            compile: CompileHandler
        };

        /**
         *
         */
        function CompileHandler() {
            return {
                pre: function preLink(scope, iElement, iAttrs, columnGroupController) {
                    var header = scope.header;
                    var field = scope.field;
                    var sortable = scope.sortable != undefined ? scope.sortable : true;
                    var width = scope.width != undefined ? scope.width : '';

                    var contentToRender = null;

                    if (iElement.children() != null && iElement.children()[0] != undefined) {
                        contentToRender = iElement.children()[0].localName == "column-template" ? iElement.children() : null;
                    }

                    if (width.indexOf('%') < 0 && width.length > 0) {
                        width = width + "px";
                    }

                    columnGroupController.setColumn({
                        header: header,
                        field: field,
                        sortable: sortable,
                        width: width,
                        contentToRender: contentToRender
                    })
                },
                post: function postLink(scope, iElement, iAttrs, columnGroupController) {
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
            restrict: 'E',
            scope: true,
            require: '^eitsTable',
            compile: LinkHandler,
            controller: Controller
        };

        /**
         *
         */
        function LinkHandler() {
            return {
                pre: function (scope, element, attrs, eitsTableController) {
                },
                post: function (scope, element, attrs, eitsTableController) {
                    if (scope.pagerType == 'infinite-scroll') {
                        eitsTableController.configPagerTypeInfiniteScroll(scope.scrollEndFn);
                    }
                }
            }
        }

        /**
         *
         */
        function Controller($scope) {
            $scope.pagerType = 'number';
            $scope.scrollEndFn = function () {
            };

            this.setPagerTypeInfiniteScrollPager = function (scrollEndFn) {
                $scope.pagerType = 'infinite-scroll';
                $scope.scrollEndFn = scrollEndFn;
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
            restrict: 'E',
            require: '^pager',
            scope: {
                onScrollEnd: '&?'
            },
            compile: CompileHandler
        };

        /**
         *
         */
        function CompileHandler() {
            return {
                pre: function preLink(scope, iElement, iAttrs, pagerController) {
                    pagerController.setPagerTypeInfiniteScrollPager(scope.onScrollEnd);
                },
                post: function postLink(scope, iElement, iAttrs, pagerController) {
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
            restrict: 'E',
            require: '^pager',
            scope: true,
            compile: CompileHandler
        };

        /**
         *
         */
        function CompileHandler() {
            return {
                pre: function preLink(scope, iElement, iAttrs, pagerController) {
                    pagerController.setPagerTypeNumberScrollPager();
                },
                post: function postLink(scope, iElement, iAttrs, pagerController) {
                }
            };
        }
    }

    /**
     * @ngdoc directive
     *
     * @usage
     */
    function FilterDirective() {
        return {
            restrict: 'E',
            require: '^eitsTable',
            controller: Controller
        };

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
    function SideFilterDirective($compile) {
        return {
            restrict: 'E',
            require: ['^eitsTable', '^filter'],
            scope: {
                onClose: '&?',
                title: '@',
                onFilter: '&?',
                opened: '=?',
                filters: '='
                //enabled: '=?'
            },
            compile: CompileHandler
        };

        /**
         *
         */
        function CompileHandler() {
            return {
                pre: function preLink(scope, iElement, iAttrs) {
                },
                post: function postLink(scope, iElement, iAttrs, controllers) {

                    controllers[0].enableSidebar();

                    var filtersWacther = scope.$watchCollection('filters', function(newValue, oldValue){
                        if (newValue != oldValue) scope.onFilter({filters: newValue});
                    });

                    iElement.on('$destroy', function(){
                        filtersWacther();
                    })

                    //if (scope.enabled != undefined) {
                    //
                    //    var filterFlagHandler = function (value) {
                    //        scope.enabled = value;
                    //    }
                    //
                    //    var filterFlagStatusHandler = function (value) {
                    //        scope.opened = value;
                    //    }
                    //
                    //    controllers[0].setFilterFlagEvents(filterFlagHandler, filterFlagStatusHandler);
                    //}

                    var onCloseEvent = scope.onClose != undefined ? scope.onClose : function () {
                    };

                    controllers[0].setFitlerCloseEvent(onCloseEvent);
                    controllers[0].setSidebarTitle(scope.title);

                    var template = controllers[0].getSidebarElement();
                    var childrenElements = iElement.children();

                    for (var i = 0; i < childrenElements.length; i++) {

                        var filterHtml = childrenElements[i];
                        angular.element(filterHtml).addClass('filter-field');

                        if (filterHtml.getAttribute("label")) {
                            var labelString = '<p class="filter-label">' + filterHtml.getAttribute("label") + '</p>';
                            angular.element(filterHtml).prepend(labelString);
                        }

                        template.append(filterHtml);
                    }
                }
            };
        }
    }

    /**
     * @ngdoc directive
     *
     * @usage
     */
    function FixedHeaderDirective($timeout) {
        return {
            restrict: 'A',
            compile: CompileHandler
        };

        /**
         *
         */
        function CompileHandler() {
            return {
                pre: function preLink(scope, iElement, iAttrs) {
                },
                post: function postLink(scope, iElement, iAttrs) {

                    //
                    $timeout(function(){
                        var fixedHeader = angular.element(document.createElement("DIV"));

                        fixedHeader.addClass('fixed-header');

                        var childrenTh = iElement.children('thead').children().children();
                        var childrenTd = iElement.children('tbody').children().children();

                        for (var i = 0; childrenTh.length > i; i++) {

                            var thElement = angular.element(childrenTh[i]).clone();
                            thElement.css('width', angular.element(childrenTh[i]).width());
                            fixedHeader.append(thElement);
                        }

                        iElement.prepend(fixedHeader);
                    }, 0);

                    var onResizeFunction = function () {
                        var fixedHeaderDiv = angular.element(iElement.children('div'));

                        var childrenTh = fixedHeaderDiv.children();
                        var childrenTd = iElement.children('tbody').children().children();

                        for (var i = 0; childrenTd.length > i; i++) {
                            angular.element(childrenTh[i]).css('width', angular.element(childrenTd[i]).width());
                        }
                    }

                    //
                    var onScrollFunction = function(event) {
                        var isOutOfScreen =  function(elem) {
                            var $elem = angular.element(elem);
                            var $window = angular.element(window);

                            var docViewTop = $window.scrollTop();
                            var docViewBottom = docViewTop + $window.height();

                            var elemTop = $elem.offset().top;
                            var elemBottom = elemTop + $elem.height();

                            return ((elemTop >= docViewBottom) || (elemBottom <= docViewTop));
                        }

                        var isScrolledIntoView =  function(elem) {
                            var $elem = angular.element(elem);
                            var $window = angular.element(window);

                            var docViewTop = $window.scrollTop();
                            var docViewBottom = docViewTop + $window.height();

                            var elemTop = $elem.offset().top;
                            var elemBottom = elemTop + $elem.height();

                            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
                        }

                        var fixedHeaderDiv = angular.element(iElement.children('div'));

                        if (!isScrolledIntoView(iElement.children('thead')) && !isOutOfScreen(iElement[0]) && fixedHeaderDiv.css('visibility') == 'hidden') {
                            fixedHeaderDiv.addClass('visible');
                        } else if ((isScrolledIntoView(iElement.children('thead')) && fixedHeaderDiv.css('visibility') == 'visible') || isOutOfScreen(iElement[0])) {
                            fixedHeaderDiv.removeClass('visible');
                        }
                    }

                    //
                    angular.element(window).on("scroll", onScrollFunction);
                    angular.element(window).on("resize", onResizeFunction);

                    iElement.on('$destroy', function(){
                        angular.element(window).off("scroll", onScrollFunction);
                        angular.element(window).off("resize", onResizeFunction);
                    })
                }
            };
        }
    }

})();