(function() {
    'use strict';

    /**
     * @ngdoc module
     * @name material.components.list
     * @description
     * List module
     */
    angular.module('eits.controls.dropdown', [
        'eits-material-core',
        'material.core'
       ])
       

       .directive('eitsDropdown', DropDownDirective)


    /**
     * @ngdoc directive
     * @name eitsDropdown
     * @module eits.controls.dropdown
     *
     * @restrict E
     *
     * @description
     * The `<eits-dropdown>` directive is a list container for 1..n components.
     *
     * @usage
     */
    function DropDownDirective( $CONFIG , $compile, $document ) {
        return {

            restrict: 'AE',
            transclude: true,
            compile : CompileHandler,
            templateUrl: Template,
            controller: Controller,
            scope   : {}
        };
	/**
	 *
	 */
    function CompileHandler( element, attributes, transclude ) {
        return {

            pre: function preLink( scope, element, attributes, controller ) {

            },
            post: function postLink( scope, element, attributes,controller, transclude ) {

                var ddMenu = element.find('.dd-menu');

                /**
                 * define o icone no template
                 */
                scope.iconMenu = attributes.iconMenu;
                /**
                 * define a orientaçaão do menu do dropdown
                 */
                var animateOrientation = getAnimationClass(element.find('.dd'), ddMenu)

                /**
                 * define a orientacão do menu.
                 */
                scope.menuOrientation = attributes.menuOrientation == undefined ? animateOrientation : attributes.menuOrientation;

                /**
                 * verifica se existe width definido pelo usuário
                 */
                scope.menuWidth = attributes.menuWidth == undefined ? setWidth('250px') : setWidth(attributes.menuWidth);
                /**
                 * verifica se height width definido pelo usuário
                 */
                scope.menuHeight = attributes.menuHeight == undefined ? setHeight('250px') : setHeight(attributes.menuHeight);

                definePosition(element.find('.dd'), ddMenu,animateOrientation);

                /**
                 * verifica se o evento do click está sendo feio pela div do icone
                 */
                $document.bind('click', function(ev) {

                    if( $(ev.target).closest('.drop').length == 0){
                        $('.dd-menu').removeClass('active');

                    } else {
                        /**
                         * remove a classe ativa do menu caso existir, e adiciona novamente o menu a partir do icone que está sendo clicado
                         */
                        $('.dd-menu').removeClass('active');
                        if( $(ev.target).closest('eits-dropdown').length > 0 ) {
                            $(ev.target).closest('eits-dropdown').find('.dd-menu').addClass('active');

                            ev.stopPropagation();
                        }
                    }
                })

                ddMenu.on('click', function(e){
                        $(e.target).closest('eits-dropdown').find('.dd-menu').removeClass('active');
                        e.stopPropagation();
                });
            }
        }
        /**
         * Seta o valor do width quando definido pelo usuaário
         * @param menuWidth
         */
        function setWidth(menuWidth){
            element.find('.dd-menu').css({
                'width' : menuWidth
            });
        }

        /**
         * Seta o valor do height quando definido pelo usuaário
         * @param menuHeight
         */
        function setHeight(menuHeight){
            element.find('.dd-menu').css({
                'height' : menuHeight
            });
        }

        /**
         * monta o nome da classe css de acordo com a posição dele na tela
         * @param element
         * @param menuElement
         * @returns {string}
         */
        function getAnimationClass(element, menuElement) {
            var width = menuElement.parent().width();
            var height = menuElement.parent().height();
            var offsetBottom = $document.height() - ( height + angular.element(menuElement[0]).offset().top );
            var offsetRight = $document.width() - ( width + angular.element(menuElement[0]).offset().left );
            var x = width > offsetRight ? 'right' : 'left';
            var y = height > offsetBottom ? 'bottom' : 'top';

            return x + '-' + y;

        }

        /**
         * define a posição do menu em relação ao botão responsavel pelo evento de click
         * @param button
         * @param menu
         * @param animationOrientation
         */
        function definePosition(button, menu, animationOrientation) {
            var menuWidth = menu.width();
            var buttonWidth = button.width();
            var menuHeight = menu.height();
            var buttonHeight = button.height();

            if( animationOrientation == 'left-top' ){
                menu.css({
                    'left'  : '0px',
                    'top'   : '15px'
                })
            }
            else if( animationOrientation == 'right-top' ){
                menu.css({
                    'left'  : (menuHeight + buttonHeight) * -1,
                    'top'   : '15px'
                })
            }else if( animationOrientation == 'right-bottom' ){
                menu.css({
                    'left'  : (menuHeight + buttonHeight) * -1,
                    'top'   : (menuWidth + buttonWidth) * -1
                })
            }else if( animationOrientation == 'left-bottom'){
                menu.css({
                    'left'  : '0px',
                    'top'   : (menuWidth + buttonWidth) * -1
                })
            }
        }

    }
	function Template( element, attributes ) {
	    return $CONFIG.path+'/controls/dropdown/dropdown-template.html';
	}

        function Controller() {
        }

    };

})();