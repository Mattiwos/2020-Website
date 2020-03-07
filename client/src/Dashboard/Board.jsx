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
//import * as $ from 'jquery'
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var jquery_1 = __importDefault(require("jquery"));
// this helps TypeScript to understand jQuery best !!!  otherwise It will confused .
var $ = jquery_1.default;
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board(props, state) {
        var _this = _super.call(this, props) || this;
        // this.state = state;
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
        _this.state = { hasError: false, htmltxt: "<h2>Mattiwos flag not here</h2>" };
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
            console.log(arg.pagetxt);
            _this.setState(function (state) {
                _this.componentDidMount();
                return { htmltxt: arg.pagetxt };
            });
        });
        _this.getPage = _this.getPage.bind(_this);
        return _this;
    }
    Board.prototype.getPage = function () {
        console.log(this.stringToHTML(this.state.htmltxt).innerHTML);
        return ((this.stringToHTML(this.state.htmltxt)));
    };
    Board.prototype.stringToHTML = function (str) {
        // this.parser = new DOMParser();
        // this.doc = this.parser.parseFromString(str, 'text/html');
        // return (this.doc.body);
        this.dom = document.createElement("div");
        this.dom.innerHTML = str;
        return this.dom;
    };
    Board.prototype.componentDidMount = function () {
        if (this.getPageContainer != null)
            this.getPageContainer.appendChild(this.getPage());
    };
    Board.prototype.render = function () {
        var _this = this;
        return (<div>
        
        
        <div ref={function (node) { return _this.getPageContainer = node; }}>
            <div id="hiddenpage"></div>
        </div>

        <button id="submit" type="button" onClick={function () { return _this.htmlreq(); }}>Load Page</button>
      
      </div>);
    };
    Board.prototype.htmlreq = function () {
        this.sendReq();
        this.socket.emit("homepagereq", {});
    };
    Board.prototype.sendReq = function () {
        console.log("Auth process started");
        this.socket.emit("sessionkey", {
            sesskey: getCookie("key")
        });
    };
    return Board;
}(React.Component));
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
exports.default = Board;
//JSX allows you to use html in typescript .tsx makes it expect to encounter html 
