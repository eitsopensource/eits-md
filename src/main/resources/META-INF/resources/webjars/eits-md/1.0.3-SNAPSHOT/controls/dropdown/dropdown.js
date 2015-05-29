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
        var menuHeight = menu.height();

        var buttonWidth = button.width();
        var buttonHeight = button.height();

        var rect = button[0].getBoundingClientRect();


        var position = {};

        /*menu.css({
            'left'  : '0px',
            'top'   : '0px'
        })*/

        if( menuHeight > rect.height ) {
            position.x = rect.top;
            position.y = rect.left
        }

        menu.css({
            'left'  : position.y + 'px',
            'top'   : position.x + 'px'
        });

        /*if( animationOrientation == 'left-top' ){
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
        }*/
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
                console.log(element);

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
                var animateOrientation = getAnimationClass(element.find('.dd'), ddMenu)

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

                element.bind('click', function(ev){
                    console.log(ev.target);
                })

                ddMenu.on('click', function(e){
                    $(e.target).closest('eits-dropdown').find('.dd-menu').removeClass('active');
                        //e.stopPropagation();
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