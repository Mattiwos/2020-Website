import { localserverhost } from "../secret.js";

import React, { Component } from "react";

import io from "socket.io-client";
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = localserverhost;
    this.socket = io(this.baseUrl, {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      transports: ["websocket"],
      agent: false, // [2] Please don't set this to true
      upgrade: false,
      rejectUnauthorized: false
    });
    this.htmltxt = "<h2>Mattiwos flag not here</h2>";

    this.socket.on("connect", () => {
      console.log("socket connected!");
    });

    this.socket.on("connect_error", err => {
      console.log("socket connected error --> " + err);
    });

    this.socket.on("reconnect_attempt", () => {
      this.socket.io.opts.transports = ["websocket"];
    });

    this.socket.on("htmlpageres", arg => {
      this.htmltxt = arg.pagetxt;
    });

    this.getPage = this.getPage.bind(this);
  }
  stringToHTML(str) {
    // this.parser = new DOMParser();
    // this.doc = this.parser.parseFromString(str, 'text/html');
    // return (this.doc.body);
    this.dom = document.createElement("div");
    this.dom.innerHTML = str;
    return this.dom;
  }
  getPage() {
    return this.stringToHTML(this.htmltxt);
  }

  render() {
    return (
      <div>
        <h1>Welcome Back!</h1>

        {this.getPage()[1]}

        <button id="submit" type="button" onClick={() => this.htmlreq()}>
          Submit
        </button>
        {/* {this.htmltxt.innerHTML} */}
        {console.log(this.stringToHTML(this.htmltxt))}
      </div>
    );
  }

  htmlreq() {
    this.socket.emit("homepagereq", {});
  }
}

export default Board;
