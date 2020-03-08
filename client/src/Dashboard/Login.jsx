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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var testsecret_1 = require("../testsecret");
var secret = new testsecret_1.App.Secret;
// eslint-disable-next-line
//import React, { Component } from "react";
/* eslint-disable import/first */
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props, state) {
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
        _this.socket.on("connect", function () {
            console.log("socket connected!");
        });
        _this.socket.on("connect_error", function (err) {
            console.log("socket connected error --> " + err);
        });
        _this.socket.on("reconnect_attempt", function () {
            _this.socket.io.opts.transports = ["websocket"];
        });
        _this.socket.on("authres", function (arg) {
            if (arg.wrong === true) {
                alert("Key is incorrect");
            }
            if (arg.wrong === false) {
                window.location.href = "/dashboard/homepage";
                document.cookie = "key= " + arg.key;
            }
        });
        console.log("response");
        _this.state = {
            key: "None"
        };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    Login.prototype.handleChange = function (event) {
        this.setState({ key: event.target.value });
        console.log(this.state.key);
    };
    Login.prototype.render = function () {
        var _this = this;
        return (<div>
        <div className="authkey">
          <label htmlFor="key">Auth-Key </label>

          <input className="u-full-width" type="text" id="key" value={this.state.key} onChange={this.handleChange} name="key"></input>
          <button id="submit" type="button" onClick={function () { return _this.buttonclick(); }}>
            Submit
          </button>
        </div>
      </div>);
    };
    Login.prototype.buttonclick = function () {
        console.log(this.state.key);
        this.socket.emit("authreq", {
            key: this.state.key
        });
        console.log("sent");
    };
    return Login;
}(react_1.default.Component));
exports.default = Login;
