(function() {
    "use strict";

    angular
        .module("mediawiseReader")
        .controller("mediawiseImportController", [
            "$scope",
            "$location",
            "$uibModal",
            "uibDateParser",
            "marketLookupService",
            mediawiseImportController
        ]);

    function mediawiseImportController($scope, $location, $uibModal, uibDateParser, marketLookupService) {
        $scope.mediawiseContent = {};
        $scope.selectedSignal = "";
        $scope.selectedDate = {};
        $scope.currentSignal = {};
        $scope.currentMarket = {};
        $scope.dateList = [];
        $scope.fileName = "";
        $scope.timeStamp = "";

        var broadcastSignals = marketLookupService.getBroadcastSignals();
        $scope.broadcastSignals = broadcastSignals;

        var stations = marketLookupService.getStations();
        $scope.stations = stations;

        $scope.signalChanged = function () {
            var signal = marketLookupService.getBroadcastSignal($scope.selectedSignal);
            $scope.currentMarket = $scope.mediawiseContent.BmdScheduleExport.Schedule.Market.filter(function (item) {
                return item._mktCode === signal.marketCode
                    && item.C[0]._s === signal.mediawiseCode;
            })[0];
        };

        $scope.fileSelected = function (file) {
            if (file === null) return;

            $scope.fileName = file.name;

            var reader = new FileReader();

            reader.onload = function (e) {
                $scope.$apply(function() {
                    var x2js = new X2JS();
                    var jsonObj = x2js.xml_str2json(e.target.result);
                    var schedule = jsonObj.BmdScheduleExport.Schedule;

                    $scope.timeStamp = moment(jsonObj.BmdScheduleExport._timeStamp, "YYYYMMDD HHmmss").format("D-MM-YYYY HH:mm:ss");
                    //20160921 033514
                    if (!Array.isArray(schedule.Market)) {
                        schedule.Market = [schedule.Market];
                    }

                    var fromDate = moment(schedule._fromExpDate, "YYYYMMDD");
                    var toDate = moment(schedule._toExpDate, "YYYYMMDD");

                    $scope.dateList = [];

                    var date = fromDate.clone();
                    do  {
                        $scope.dateList.push(date.toDate());
                        date = moment(date).add(7, "day");
                    } while (date < toDate)

                    $scope.selectedDate = $scope.dateList[0];

                    $scope.broadcastSignals = broadcastSignals.filter(function (signal) {
                        return schedule.Market.filter(function(market) {
                            return market._mktCode === signal.marketCode && market.C[0]._s === signal.mediawiseCode;
                        }).length > 0;
                    });

                    var selectedDateFormatted = moment($scope.dateList[0]).format("YYYYMMDD");

                    var market = {};
                    market._mktCode = schedule.Market[0]._mktCode;
                    market.C = schedule.Market[0].C.filter(function(item) {
                        return item._w === selectedDateFormatted;
                    });

                    $scope.currentMarket = market;
                    $scope.selectedSignal = $scope.broadcastSignals[0].mediawiseCode;
                    $scope.mediawiseContent = jsonObj;
                });
            };

            reader.readAsText(file);
        };

        $scope.file = "";
    };
}());