'use strict';

angular.module('mainApp')

    .controller('discreteBarChartCtrl', function($scope, $interval, $http){

        $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10
                }
            }
        };

        /*Random Data Generator */
        function cleaner(response) {

            //Line chart data should be sent as an array of series objects.
            $scope.data = [
                {
                    key: "Cumulative Return",
                    values: [
                        {
                            "label" : "Temp" ,
                            "value" : response.data[0].temp
                        }
                        ,{
                            "label" : "Pressure" ,
                            "value" : response.data[0].pressure
                        },{
                            "label" : "Altitude" ,
                            "value" : response.data[0].altitude
                        },{
                            "label" : "Humidity" ,
                            "value" : response.data[0].humidity
                        }
                    ]
                }
            ];
        };



        function errorcb(){
            console.log('I am in the error callback');
        }

        $scope.getMoreData = function(){
            $http.get('/getData.php').then(cleaner, errorcb);
        };
        $scope.getMoreData();
        $interval($scope.getMoreData, 1000);
    });