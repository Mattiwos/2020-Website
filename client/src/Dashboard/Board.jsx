"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var testsecret_1 = require("../testsecret");
var secret = new testsecret_1.App.Secret;
var React = __importStar(require("react"));
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board(props, state) {
        var _this = _super.call(this, props) || this;
        _this.baseUrl = secret.getLocalhost();
        _this.socket = socket_io_client_1.default(_this.baseUrl, {
            reconnectionDelay: 1000,
            reconnection: true,
            reconnectionAttempts: 10,
            transports: ["websocket"],
            agent: false,
            upgrade: false,
            rejectUnauthorized: false
        });
        _this.htmltxt = "<h2>Mattiwos flag not here</h2>";
        _this.socket.on("connect", function () {
            console.log("socket connected!");
        });
        _this.socket.on("connect_error", function (err) {
            console.log("socket connected error --> " + err);
        });
        // this.socket.on("reconnect_attempt", () => {
        //   this.socket.io.opts.transports = ["websocket"];
        // }); Might not need it threw an error for .io
        _this.socket.on("htmlpageres", function (arg) {
            _this.htmltxt = arg.pagetxt;
        });
        _this.getPage = _this.getPage.bind(_this);
        return _this;
    }
    Board.prototype.stringToHTML = function (str) {
        // this.parser = new DOMParser();
        // this.doc = this.parser.parseFromString(str, 'text/html');
        // return (this.doc.body);
        this.dom = document.createElement("div");
        this.dom.innerHTML = str;
        return this.dom;
    };
    Board.prototype.getPage = function () {
        return ([this.stringToHTML(this.htmltxt)]);
    };
    Board.prototype.render = function () {
        var _this = this;
        return (<div>
        <h1>Welcome Back!</h1>
        {this.getPage()}
        <button id="submit" type="button" onClick={function () { return _this.htmlreq(); }}>Submit</button>
        
      </div>);
    };
    Board.prototype.htmlreq = function () {
        this.socket.emit("homepagereq", {});
    };
    return Board;
}(React.Component));
exports.default = Board;
//JSX allows you to use html in typescript .tsx makes it expect to encounter html 
