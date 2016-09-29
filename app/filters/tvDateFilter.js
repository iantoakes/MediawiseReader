(function() {
    "use strict";

    angular
        .module("mediawiseReader")
        .filter("tvDate", function () {
            return function (tvDateString) {
                if (tvDateString === undefined || tvDateString === null) return "";

                var year = tvDateString.substring(0, 4);
                var month = tvDateString.substring(4, 6);
                var day = tvDateString.substring(6, 8);

                var result = day + "-" + month + "-" + year;

                return result;
            };
        });
}());