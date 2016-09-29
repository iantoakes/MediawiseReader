(function() {
    "use strict";

    angular
        .module("mediawiseReader")
        .filter("tvDays", function () {
            return function (dayMask) {
                if (dayMask.length !== 7) return dayMask;
                var result = dayMask.substring(0);

                var replaceAt = function(string, index, character) {
                    return string.substr(0, index) + character + string.substr(index + character.length);
                };

                var days = ["S", "M", "T", "W", "T", "F", "S"];
                for (var i = 0; i < dayMask.length; i++) {
                    if (result[i] === "0") {
                        result = replaceAt(result, i, "-");
                    } else {
                        result = replaceAt(result, i, days[i]);
                    }
                }

                return result;
            };
        });
}());