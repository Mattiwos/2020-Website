"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App;
(function (App) {
    var Secret = /** @class */ (function () {
        function Secret() {
        }
        Secret.prototype.getLocalhost = function () {
            return "http://localhost:8080/";
        };
        return Secret;
    }());
    App.Secret = Secret;
})(App = exports.App || (exports.App = {}));
