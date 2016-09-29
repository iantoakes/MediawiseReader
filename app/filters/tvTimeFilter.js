(function() {
    "use strict";

    angular
        .module("mediawiseReader")
        .filter("tvTime", function () {
            return function(time) {
                var b = ":";
                var position = 2;
                var output = [time.slice(0, position), b, time.slice(position)].join("");
                return output;
            };
        });
}());