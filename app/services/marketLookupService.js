(function () {
    "use strict";

    angular
        .module("mediawiseReader")
        .service("marketLookupService", function () {
            var broadcastSignals = {
                "5209": { "marketCode": "0201", "stationCode": "TCN", "channelId": "91", "shortDescription": "TCN 9" },
                "5309": { "marketCode": "0301", "stationCode": "GTV", "channelId": "91", "shortDescription": "GTV 9" },
                "5709": { "marketCode": "0701", "stationCode": "QTQ", "channelId": "91", "shortDescription": "QTQ 9" },
                "5809": { "marketCode": "0801", "stationCode": "NWS", "channelId": "91", "shortDescription": "NWS 9" },
                "5909": { "marketCode": "0901", "stationCode": "STW", "channelId": "91", "shortDescription": "STW 9" },
                "5234": { "marketCode": "0201", "stationCode": "TCN", "channelId": "93", "shortDescription": "TCN GO!" },
                "5334": { "marketCode": "0301", "stationCode": "GTV", "channelId": "93", "shortDescription": "GTV GO!" },
                "5734": { "marketCode": "0701", "stationCode": "QTQ", "channelId": "93", "shortDescription": "QTQ GO!" },
                "5834": { "marketCode": "0801", "stationCode": "NWS", "channelId": "93", "shortDescription": "NWS GO!" },
                "5934": { "marketCode": "0901", "stationCode": "STW", "channelId": "93", "shortDescription": "STW GO!" },
                "5246": { "marketCode": "0201", "stationCode": "TCN", "channelId": "92", "shortDescription": "TCN Gem" },
                "5346": { "marketCode": "0301", "stationCode": "GTV", "channelId": "92", "shortDescription": "GTV Gem" },
                "5746": { "marketCode": "0701", "stationCode": "QTQ", "channelId": "92", "shortDescription": "QTQ Gem" },
                "5846": { "marketCode": "0801", "stationCode": "NWS", "channelId": "92", "shortDescription": "NWS Gem" },
                "5946": { "marketCode": "0901", "stationCode": "STW", "channelId": "92", "shortDescription": "STW Gem" },
                "5250": { "marketCode": "0201", "stationCode": "TCN", "channelId": "94", "shortDescription": "TCN 9Life" },
                "5350": { "marketCode": "0301", "stationCode": "GTV", "channelId": "94", "shortDescription": "GTV 9Life" },
                "5750": { "marketCode": "0701", "stationCode": "QTQ", "channelId": "94", "shortDescription": "QTQ 9Life" },
                "5850": { "marketCode": "0801", "stationCode": "NWS", "channelId": "94", "shortDescription": "NWS 9Life" },
                "5950": { "marketCode": "0901", "stationCode": "STW", "channelId": "94", "shortDescription": "STW 9Life" }
            };

            var stations = {
                "0301": { "stationCode": "GTV", "channels": ["5309", "5334", "5346", "5350"] },
                "0801": { "stationCode": "NWS", "channels": ["5809", "5834", "5846", "5850"] },
                "0701": { "stationCode": "QTQ", "channels": ["5709", "5734", "5746", "5750"] },
                "0901": { "stationCode": "STW", "channels": ["5909", "5934", "5946", "5950"] },
                "0201": { "stationCode": "TCN", "channels": ["5209", "5234", "5246", "5250"] }
            };

            this.getBroadcastSignals = function () {
                var signals = [];
                angular.forEach(broadcastSignals, function(value, key) {
                    var signal = angular.copy(value);
                    signal.mediawiseCode = key;
                    signals.push(signal);
                });
                return signals;
            };

            this.getBroadcastSignal = function(mediawiseCode) {
                var signal = angular.copy(broadcastSignals[mediawiseCode]);
                signal.mediawiseCode = mediawiseCode;
                return signal;
            }

            this.getStations = function() {
                var stns = [];
                angular.forEach(stations, function(value, key) {
                    var station = angular.copy(value);
                    station.mediawiseCode = key;
                    stns.push(station);
                });

                return stns;
            };

            this.getStation = function(mediawiseCode) {
                return stations[mediawiseCode];
            };
        });
}());