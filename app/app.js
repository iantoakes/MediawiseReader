(function () {
    "use strict";

    var app = angular.module("mediawiseReader", [
        "ngRoute",
        "ngAnimate",
        "ui.bootstrap",
        "ngFileUpload"
    ]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/mediawiseImport", {
                templateUrl: "app/mediawiseImport/mediawiseImportView.html",
                controller: "mediawiseImportController"
            })

            .otherwise({ redirectTo: "/mediawiseImport" });
    });

}());