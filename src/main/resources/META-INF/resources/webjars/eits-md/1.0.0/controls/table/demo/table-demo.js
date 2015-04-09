angular.module('eits.controls.table.sample', [
    'ngMaterial',
    'eits-material-core',
    'eits.controls.table',
])
    .controller('AppCtrl', function ($scope, $log, $http) {

        $scope.content = [
            {
                id: 1,
                thumbnail: 'http://www.eits.com.br/images/eits-topo.png',
                outra: 'http://static.ddmcdn.com/gif/earliest-dogs-660x433-130306-akita-660x433.jpg',
                name: 'Bruno Mars',
                description: 'Human',
                last_modified: 'Jun 5, 2014'
            },
            {
                id: 2,
                thumbnail: 'http://www.eits.com.br/images/eits-topo.png',
                outra: 'http://static.ddmcdn.com/gif/earliest-dogs-660x433-130306-akita-660x433.jpg',
                name: 'AT-AT',
                description: 'Robot',
                last_modified: 'Jun 5, 2014'
            },
            {
                id: 3,
                thumbnail: 'http://www.eits.com.br/images/eits-topo.png',
                outra: 'http://static.ddmcdn.com/gif/earliest-dogs-660x433-130306-akita-660x433.jpg',
                name: 'Mark Ronson',
                description: 'Human',
                last_modified: 'Jun 5, 2014'
            },
            {
                id: 4,
                thumbnail: 'http://www.eits.com.br/images/eits-topo.png',
                outra: 'http://static.ddmcdn.com/gif/earliest-dogs-660x433-130306-akita-660x433.jpg',
                name: 'Daft Punk',
                description: 'Human-Robot',
                last_modified: 'Jun 5, 2014'
            },
            {
                id: 5,
                thumbnail: 'http://www.eits.com.br/images/eits-topo.png',
                outra: 'http://static.ddmcdn.com/gif/earliest-dogs-660x433-130306-akita-660x433.jpg',
                name: 'Lady Gaga',
                description: 'Undefined',
                last_modified: 'Jun 5, 2014'
            },
            {
                id: 6,
                thumbnail: 'http://www.eits.com.br/images/eits-topo.png',
                outra: 'http://static.ddmcdn.com/gif/earliest-dogs-660x433-130306-akita-660x433.jpg',
                name: 'Mark Ronson',
                description: 'Human',
                last_modified: 'Jun 5, 2014'
            },
            {
                id: 7,
                thumbnail: 'http://www.eits.com.br/images/eits-topo.png',
                outra: 'http://static.ddmcdn.com/gif/earliest-dogs-660x433-130306-akita-660x433.jpg',
                name: 'Mark Ronson',
                description: 'Human',
                last_modified: 'Jun 5, 2014'
            }];


        // Evento disparado pela directiva ao selecionar ou deselecionar um item da table
        $scope.updateSelectedItens = function (selectedItens) {
            $log.log(selectedItens);
        };

        // Evento disparado pela table ao clicar em um item da table
        $scope.openDetail = function (item) {
            $log.log(item);
        };

        $scope.onFilterHandler = function (event, filter) {

            //meuService.listByFilters(stringDoPesquisar, filter.modalidade, filter.tipoGraducacao);
        };

        $scope.filter = {
            enabled: false,
            opa: "",
            modalidade: ""
        };

        // Evento disparado ao atingir o fundo da table através do scroll
        $scope.sendMoreData = function (size) {

            $http.get('http://echo.jsontest.com/id/8/name/Henrique' + size + '/description/Cara_legal/last_modified/June')
                .success(function (data, status, headers, config) {
                    var size = 20;
                    var result = new Array();
                    for (var i = 0; i < size; i++) {
                        result.push(angular.copy(data));
                    }
                    $scope.content = $scope.content.concat(result);
                })
                .error(function (data, status, headers, config) {

                });
        }

        $scope.modalidades = [
            {
                nome: 'Modalidade 1',
                valor: 'MODALIDADE_1'
            },
            {
                nome: 'Modalidade 2',
                valor: 'MODALIDADE_2'
            },
            {
                nome: 'Modalidade 3',
                valor: 'MODALIDADE_3'
            }
        ];

        $scope.tiposCursos = [
            {
                nome: 'Tipo 1',
                valor: 'TIPO_1'
            },
            {
                nome: 'Tipo 2',
                valor: 'TIPO_2'
            },
            {
                nome: 'Tipo 3',
                valor: 'TIPO_3'
            }
        ];

        // invoca o método da table que limpa a seleção atual de registros.
        $scope.clearSelection = function(){
            eitsTable.clearSelection();
        }

    });