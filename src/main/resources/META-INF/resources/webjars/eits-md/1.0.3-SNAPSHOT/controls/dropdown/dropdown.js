(function() {
    'use strict';

    /**
     * @ngdoc module
     * @name material.components.list
     * @description
     * List module
     */
    angular.module('eits.controls.dropdown', [
        'eits.material.core',
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
        var x = width > offsetRight ? 'left' : 'right';
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
        var menuHeight = menu.height();

        var buttonWidth = button.width();
        var buttonHeight = button.height();

        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        animationOrientation = animationOrientation.split('-');

        console.log(animationOrientation);

        var rect = button[0].getBoundingClientRect();

        var position = {};

        /**
         * Define a posição padrão de abrir para esquerda e para baixo
         */
        position.y = rect.left - menuWidth;
        position.x = rect.top;

        /*if( animationOrientation[0] == 'right' ) {
            position.y = rect.left;
        }*/

        /*if( animationOrientation[1] == 'top' ) {
            position.x = rect.top - menuHeight;
        }*/

        /**
         * Se distância da margem esquerda for menor que a largura do menu e orientação para direita, então abre para a direita
         */
        if( (windowWidth - position.y) > menuWidth && animationOrientation[0] == 'right' ) {
            position.y = rect.left;
        } else {
            position.y = rect.left - menuWidth;
        }

        /**
         * Se distância da margem topo for maior que a altura do menu e orientação para cima, então abre para cima
         */
        if( position.x > menuHeight && animationOrientation[1] == 'top' ) {
            position.x = rect.top - menuHeight;
        } else {
            position.x = rect.top;
        }

        console.log(position);

        menu.css({
            'left'  : (position.y + (rect.height/2) ) + 'px',
            'top'   : (position.x + (rect.width/2) ) + 'px'
        });
    }

    /**
	 *
	 */
    function CompileHandler( element, attributes, transclude ) {
        return {

            pre: function preLink( scope, element, attributes, controller ) {

                /**
                 * adiciona atributo identificador único para o dropdown
                 */
                element.find('.drop').attr('id', 'drop_down_' + scope.$id);

                //console.log(element);

            },
            post: function postLink( scope, element, attributes, controller, transclude ) {

                var ddMenu = element.find('.dd-menu');

                /**
                 * adiciona atributo identificador único para o dropdown
                 */
                ddMenu.attr('id', '_drop_down_' + scope.$id);

                /**
                 * adiciona o elemento menu antes no final do body
                 */
                ddMenu.appendTo('body');

                /**
                 * define o icone no template
                 */
                scope.iconMenu = attributes.iconMenu;

                /**
                 * define a orientação do menu do dropdown
                 */
                var animateOrientation = attributes.menuOrientation == undefined ? getAnimationClass(element.find('.dd'), ddMenu) : attributes.menuOrientation;

                /**
                 * define a orientacão do menu.
                 */
                scope.menuOrientation = attributes.menuOrientation == undefined ? animateOrientation : attributes.menuOrientation;

                definePosition(element.find('button'), ddMenu, animateOrientation);

                /**
                 * verifica se o evento do click está sendo feito pela div do ícone
                 */
                $document.bind('click', function(ev) {

                    if( $(ev.target).closest('.drop').length == 0){
                        $('.dd-menu').removeClass('active');

                    } else {
                        /**
                         * remove a classe ativa do menu caso existir, e adiciona novamente o menu a partir do icone que está sendo clicado
                         */
                        $('.dd-menu').removeClass('active');
                        if( $(ev.target).closest('eits-dropdown').length > 0 && !$(ev.target).is('li')) {
                            $(ev.target).closest('eits-dropdown').find('.dd-menu').addClass('active');


                            var id = $(ev.target).closest('eits-dropdown').find('button').attr('id');

                            definePosition($('#' + id), ddMenu, animateOrientation);

                            $('div#_' + id).addClass('active');

                            ev.stopPropagation();
                        }
                    }
                });

                ddMenu.on('click', function(e){
                    $(e.target).closest('eits-dropdown').find('.dd-menu').removeClass('active');
                });
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