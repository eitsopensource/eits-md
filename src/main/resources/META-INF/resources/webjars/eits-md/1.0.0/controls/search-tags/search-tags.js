(function() {
    'use strict';

    /**
     * Teclas de atalho para a criação das tags {enter, space, comma} e o {backspace} para remover a tag criada
     * @type {{backspace: number, enter: number, space: number, comma: number}}
     */
    var KEYS = {
        backspace   : 8,
        enter       : 13,
        space       : 32,
        comma       : 188
    };

    /**
     * Valores padrões de inicialização
     * @type {{maxTags: number, minLength: number, maxLength: number}}
     */
    var DEFAULT = {
        maxTags     : 50,
        minLength   : 3,
        maxLength   : 144
    }

    /**
     *
     */
    angular.module('eits.search.tags', ['eits-material-core','material.core'])

        .directive('eitsSearchTags', SearchDirective);

    /**
     *
     * @param $CONFIG
     * @param $timeout
     * @param $document
     * @returns {{restrict: string, scope: {placeholder: string, minLength: string, maxLength: string, maxTags: string, changeTag: string}, compile: CompileHandler, templateUrl: Template, controller: Controller}}
     * @constructor
     */
    function SearchDirective( $CONFIG, $timeout, $document) {
        return {
            restrict: 'E',
            scope: {
                placeholder : '@',
                minLength   : '@',
                maxLength   : '@',
                maxTags     : '@',
                tags        : '=',
                changeTag   : '&'
            },
            compile: CompileHandler,
            templateUrl: Template,
            controller: Controller
        };

        /**
         *
         * @param scope
         * @param element
         * @param attributes
         * @param controller
         * @returns {{pre: Function, post: Function}}
         * @constructor
         */
        function CompileHandler( scope, element, attributes, controller ) {

            return {

                pre: function preLink( scope, element, attributes, controller ) {
                },
                post: function postLink( scope, element, attributes, controller ) {

                    function TagList(){

                        var self = {}, tagIsValid, getTagText, clearTagText, changeTag, resizeInput, options;

                        self.options = {};

                        //Carrega a configuração padrão caso o atributo não conter valor adicionado
                        options = function() {

                            self.options = {
                                maxTags   : !attributes.maxTags   ? DEFAULT.maxTags   : attributes.maxTags,
                                minLength : !attributes.minLength ? DEFAULT.minLength : attributes.minLength,
                                maxLength : !attributes.maxLength ? DEFAULT.maxLength : attributes.maxLength
                            };
                            return self.options;
                        };

                        //Pegamos texto do campo
                        getTagText = function() {
                            return scope.newTag.text;
                        };

                        //Limpamos o valor do campo
                        clearTagText = function() {
                            return scope.newTag.text = "";
                        };

                        //Verificamos se o valor do campo é valido
                        tagIsValid = function( ) {
                            var tag = getTagText();

                            return tag &&
                                tag.length >= self.options.minLength &&
                                tag.length <= self.options.maxLength &&
                                self.items.length < self.options.maxTags &&
                                !self.findTag(self.items, tag);
                        };

                        //Passamos por parametro a lista de tags para a controller da interface
                        changeTag = function () {


                            //Retorna a lista de tags para uma função criada no escopo da controller na interface
                            scope.changeTag( {tags : self.items} );

                            //Retorna a lista de tags para o escopo na interface
                            scope.tags = self.items;
                        };

                        self.items = [];

                        //Adicionamos o texto na lista para que seja criada as tags
                        self.add = function() {
                            var tag = getTagText();

                            if (tagIsValid(tag)) {
                                self.items.push(tag);
                                changeTag();
                                clearTagText();
                                self.resizeInput("");
                            }
                            else if (tag) {
                                scope.newTag.invalid = true;
                            }
                            return tag;
                        };

                        //Removemos a tag pelo índice
                        self.remove = function(index) {

                            var tag = self.items.splice(index, 1)[0];
                            changeTag();
                            self.resizeInput("");

                            return tag;
                        };

                        //Removemos a ultima tag (Função utilizada pelo backspace)
                        self.removeLast = function() {

                            return self.remove( self.items.length - 1 );
                        };

                        //Removemos todas as tags
                        self.removeAll = function() {

                            self.items = [];
                            changeTag();
                            self.resizeInput("");
                        };

                        //Devemos verificar se o texto adicionado já existe em alguma das tags já criadas
                        self.findTag = function( items, tag) {

                            var item = null;
                            for (var i = 0; i < items.length; i++) {

                                if ( items[i].toLowerCase() === tag.toLowerCase() ) {
                                    item = items[i];
                                    break;
                                }
                            }
                            return item;
                        };

                        //Função responsável por redimencionar o campo quando o texto for adicionado
                        self.resizeInput = function (text){

                            var span  = element.find('.span-text').text(text),
                                input = element.find('.search-tags-input'),
                                width;

                            width = span.prop('offsetWidth');
                            input.css('width', width > 0 ? width : 125  + 'px');
                        };

                        options();
                        return self;
                    }

                    scope.tagList = new TagList();

                    scope.newTag = {
                        text     : '',
                        invalid  : null
                    };

                    //=================== ANIMAÇÃO DO CAMPO ===================

                    var $input        = element.find('.search-tags-input'),
                        $label        = element.find('.search-tags-label'),
                        $searchFilter = element.find('.search-tags');

                    $input.on('blur', function() {
                        if ( !$input.val() && scope.tagList.items.length == 0 ){
                            $searchFilter.removeClass('search-tags-animation');
                        }
                    });

                    $label.on('click', function() {
                        $searchFilter.addClass('search-tags-animation');
                        $input.focus();
                    });
                    //=========================================================

                    //Responsável por limpar todas as tags e texto adicionado no campo
                    scope.clear = function() {
                        
                        scope.newTag.text    = undefined;
                        scope.newTag.invalid = null;
                        scope.tagList.removeAll();
                        $input.focus();
                    };

                    //Eventos do campo para a inserção do texto e criação da tag
                    scope.eventHandlers = {
                        input: {
                            change: function(text) {

                                scope.newTag.invalid = null;
                                scope.tagList.resizeInput(text);

                            },
                            keydown: function(event) {

                                var key = event.keyCode,
                                    hotkeys    = [KEYS.enter, KEYS.comma, KEYS.space, KEYS.backspace],
                                    isModifier = event.shiftKey || event.altKey || event.ctrlKey || event.metaKey,
                                    shouldAdd, shouldRemove;

                                if (isModifier || hotkeys.indexOf(key) === -1) {
                                    return;
                                }

                                shouldAdd    = key === KEYS.enter || key === KEYS.comma;
                                shouldRemove = key === KEYS.backspace && scope.newTag.text.length === 0;

                                if( shouldAdd ){

                                    scope.tagList.add(scope.newTag.text);
                                    event.preventDefault();

                                } else if( shouldRemove ){

                                    scope.tagList.removeLast();
                                    event.preventDefault();
                                }
                            },
                            focus: function() {

                            },
                            blur: function() {

                                $timeout(function() {
                                    var activeElement            = $document.prop('activeElement'),
                                        lostFocusToBrowserWindow = activeElement === $input[0],
                                        lostFocusToChildElement  = element[0].contains(activeElement);

                                    if (lostFocusToBrowserWindow || !lostFocusToChildElement) {
                                        scope.tagList.add(scope.newTag.text);
                                    }
                                });
                            },
                            paste: function($event) {

                            }
                        }
                    };
                }
            };
        }

        /**
         *
         * @returns {string}
         * @constructor
         */
        function Template() {
            return $CONFIG.path+'/controls/search-tags/search-tags-template.html';
        }

        /**
         *
         * @constructor
         */
        function Controller() {
        }
    }

})();