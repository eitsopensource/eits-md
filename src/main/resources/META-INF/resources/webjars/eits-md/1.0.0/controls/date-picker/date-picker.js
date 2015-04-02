(function( ) {
    'use strict';

    /**
     *
     */
    angular.module('eits.date.picker', ['eits-material-core','material.core'])

        .directive('datePicker', DatePickerDirective);

    /**
     *
     * @param $CONFIG
     * @param $timeout
     * @param $document
     * @returns {{restrict: string, scope: {model: string, label: string, fixedLabel: string}, compile: CompileHandler, templateUrl: Template, controller: Controller}}
     * @constructor
     */
    function DatePickerDirective( $CONFIG, $timeout, $document, $mdColorPalette, $mdTheming) {
        return {
            restrict: 'AE',
            scope: {
                model       : '=',
                label       : '@',
                dateFormat  : '@'
            },
            compile     : CompileHandler,
            templateUrl : Template,
            controller  : Controller
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

                    $mdColorPalette
                    $mdTheming

                    //Carrega a configuração padrão caso o atributo não conter valor adicionado
                    scope.options = {
                            dateFormat  : !attributes.dateFormat ? 'L' : attributes.dateFormat
                    };

                    controller.init(element, checkLocale(attributes.locale));

                    attributes.$observe('locale', function() {
                        controller.build(checkLocale(attributes.locale), false);
                    });

                    scope.$watch('model', function() {
                        controller.build(checkLocale(attributes.locale), true);
                    });

                    function checkLocale(locale) {
                        if (!locale){
                            return (navigator.language !== null ? navigator.language : navigator.browserLanguage).split("_")[0].split("-")[0] || 'en';
                        }

                        return locale;
                    }

                    //============================= Definição do tema conforme a configuração =============================

                    //var color500 = '#2196F3', color700 = '#1976D2';

                    var color500 = 'rgb('+$mdColorPalette.blue[500]['value'][0]+","+
                                          $mdColorPalette.blue[500]['value'][1]+","+
                                          $mdColorPalette.blue[500]['value'][2]+')' ,

                        color700 = 'rgb('+$mdColorPalette.blue[700]['value'][0]+","+
                                          $mdColorPalette.blue[700]['value'][1]+","+
                                          $mdColorPalette.blue[700]['value'][2]+')';

                    scope.hoverDay = function(){
                        //Adciona a cor de fundo do hover para os dias
                        angular.element('.date-picker-day a:hover').css({'background-color': color500, 'color': '#FFFFFF'});
                    };

                    scope.leaveDay = function(){
                        //Remove a cor de fundo do hover para os dias
                        angular.element('.date-picker-day a').css({'background-color': 'transparent', 'color': 'inherit'});
                        //Matem o dia corrente com a cor de texto
                        angular.element('.date-picker-day-is-today a').css('color',color700);
                        //Mantem a cor de fundo do dia selecionado
                        angular.element('.date-picker-day-is-selected a').css({'background-color': color500, 'color': '#FFFFFF'});
                    };

                    scope.hoverYear = function(){
                        //Adciona a cor de texto do hover para os anos
                        angular.element('.date-picker-year:hover span').css('color',color700);
                        //Mantem a cor de fundo e do texto do ano selecionado
                        angular.element('.date-picker-year-is-active span').css({'background-color': color500, 'color': '#FFFFFF'});
                    };

                    scope.leaveYear = function(){
                        //Remove a cor de texto do hover para os anos
                        angular.element('.date-picker-year span').css('color','inherit');
                        //Mantem a cor de fundo e do texto do ano selecionado
                        angular.element('.date-picker-year-is-active span').css({'background-color': color500, 'color': '#FFFFFF'});
                    };

                    //Define a cor de fundo do tema do dia da semana corrente
                    element.find('.date-picker-current-day-of-week').css('background-color',color700);

                    //Define a cor de fundo do tema do dia corrente
                    element.find('.date-picker-current-date').css('background-color',color500);

                    scope.setColors = function(){
                        //Define a cor de texto do dia corrente
                        angular.element('.date-picker-day-is-today a').css('color',color700);
                        //Define a cor de fundo do dia selecionado
                        angular.element('.date-picker-day-is-selected a').css({'background-color': color500, 'color': '#FFFFFF'});
                        //Define a cor de fundo do ano selecionado
                        angular.element('.date-picker-year-is-active span').css({'background-color': color500, 'color': '#FFFFFF'});
                    };

                    //=====================================================================================================
                }
            };
        }

        /**
         *
         * @returns {string}
         * @constructor
         */
        function Template() {
            return $CONFIG.path+'/controls/date-picker/date-picker-template.html';
        }

        /**
         *
         * @param $scope
         * @param $timeout
         * @param $window
         * @constructor
         */
        function Controller( $scope, $timeout, $window ) {

            var self = this,
                activeLocale,
                $datePicker,
                $datePickerFilter,
                $datePickerContainer;

            this.init = function(element, locale) {
                $datePicker = element.find('.date-picker');
                $datePickerContainer = element;

                self.build(locale, false);
            };

            this.build = function(locale, isNewModel) {

                if (locale === activeLocale && !isNewModel) {
                    return;
                }

                activeLocale = locale;

                moment.locale(activeLocale);

                if (angular.isDefined($scope.model)) {
                    $scope.selected = {
                        model: moment($scope.model).format($scope.options.dateFormat),
                        date: $scope.model
                    };

                    $scope.activeDate = moment($scope.model);
                }
                else {
                    $scope.selected = {
                        model: undefined,
                        date: new Date()
                    };

                    $scope.activeDate = moment();
                }

                $scope.moment = moment;

                $scope.days = [];
                $scope.daysOfWeek = [
                    moment.weekdaysShort(1),
                    moment.weekdaysShort(2),
                    moment.weekdaysShort(3),
                    moment.weekdaysShort(4),
                    moment.weekdaysShort(5),
                    moment.weekdaysShort(6),
                    moment.weekdaysShort(0)
                ];

                $scope.years = [];

                for (var y = moment().year() - 100; y <= moment().year() + 100; y++) {
                    $scope.years.push(y);
                }

                generateCalendar();
            };

            $scope.previousMonth = function() {
                $scope.activeDate = $scope.activeDate.subtract(1, 'month');
                generateCalendar();
            };

            $scope.nextMonth = function() {
                $scope.activeDate = $scope.activeDate.add(1, 'month');
                generateCalendar();
            };

            $scope.select = function(day) {
                $scope.selected = {
                    model: day.format($scope.options.dateFormat),
                    date: day.toDate()
                };

                $scope.model = day.toDate();

                generateCalendar();
            };

            $scope.selectYear = function(year) {
                $scope.yearSelection = false;

                $scope.selected.model = moment($scope.selected.date).year(year).format('L');
                $scope.selected.date  = moment($scope.selected.date).year(year).toDate();
                $scope.model          = moment($scope.selected.date).toDate();
                $scope.activeDate     = $scope.activeDate.add(year - $scope.activeDate.year(), 'year');

                generateCalendar();
            };

            $scope.openPicker = function() {

                $scope.yearSelection = false;

                $datePickerFilter = angular.element('<div/>', {
                    class: 'date-filter'
                });

                $datePickerFilter.appendTo('body').bind('click', function() {
                        $scope.closePicker();
                    });

                $datePicker.appendTo('body').show();

                $timeout(function() {
                    $datePickerFilter.addClass('date-filter-is-shown');
                    $datePicker.addClass('date-picker-is-shown');

                    $scope.setColors();
                }, 100);
            };

            $scope.closePicker = function() {
                $datePickerFilter.removeClass('date-filter-is-shown');
                $datePicker.removeClass('date-picker-is-shown');

                $timeout(function() {
                    $datePickerFilter.remove();

                    $datePicker
                        .hide()
                        .appendTo($datePickerContainer);
                }, 600);
            };

            $scope.displayYearSelection = function() {
                var calendarHeight = angular.element('.date-picker-calendar').outerHeight(),
                    $yearSelector = angular.element('.date-picker-year-selector');

                $yearSelector.css({ height: calendarHeight });

                $scope.yearSelection = true;

                $timeout(function() {
                    var $activeYear = angular.element('.date-picker-year-is-active');

                    $yearSelector.scrollTop($yearSelector.scrollTop() + $activeYear.position().top - $yearSelector.height()/2 + $activeYear.height()/2);

                    $scope.setColors();
                });
            };

            function generateCalendar() {
                var days = [],
                    previousDay = angular.copy($scope.activeDate).date(0),
                    firstDayOfMonth = angular.copy($scope.activeDate).date(1),
                    lastDayOfMonth = angular.copy(firstDayOfMonth).endOf('month'),
                    maxDays = angular.copy(lastDayOfMonth).date();

                $scope.emptyFirstDays = [];

                for (var i = firstDayOfMonth.day() === 0 ? 6 : firstDayOfMonth.day() - 1; i > 0; i--) {
                    $scope.emptyFirstDays.push({});
                }

                for (var j = 0; j < maxDays; j++) {
                    var date = angular.copy(previousDay.add(1, 'days'));

                    date.selected = angular.isDefined($scope.selected.model) && date.isSame($scope.selected.date, 'day');
                    date.today = date.isSame(moment(), 'day');

                    days.push(date);
                }

                $scope.emptyLastDays = [];

                for (var k = 7 - (lastDayOfMonth.day() === 0 ? 7 : lastDayOfMonth.day()); k > 0; k--) {
                    $scope.emptyLastDays.push({});
                }

                $timeout(function() {
                    if( $scope.setColors ) {
                        $scope.setColors();
                    }
                });

                $scope.days = days;
            }
        }
    }

})();