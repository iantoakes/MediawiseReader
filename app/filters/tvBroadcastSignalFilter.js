(function() {
    "use strict";

    angular
        .module("mediawiseReader")
        .filter("tvBroadcastSignal", ["marketLookupService", function (marketLookupService) {
            return function (mediawiseCode) {
                var result = marketLookupService.getBroadcastSignal(mediawiseCode).shortDescription;
                return result;
            };
        }]);
}());