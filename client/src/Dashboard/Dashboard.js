import { localserverhost } from "../secret.js";

// eslint-disable-next-line
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import io from "socket.io-client";
import Login from "./Login.js";
import Board from "./Board";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayboard: false
    };

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
    this.socket.on("connect", () => {
      console.log("socket connected!");
    });

    this.socket.on("connect_error", err => {
      console.log("socket connected error --> " + err);
    });

    this.socket.on("reconnect_attempt", () => {
      this.socket.io.opts.transports = ["websocket"];
    });

    this.socket.on("ressessionkey", arg => {
      if (arg.wrong === true) {
        //window.location.href = "/dashboard";
      } else {
        this.setState(state => {
          return { displayboard: true };
        });
      }
    });
  }
  render() {
    this.sendReq();
    return (
      <BrowserRouter>
        <div>
          <Route
            exact={true}
            path="/dashboard"
            render={() => (
              <div className="App">
                <Login></Login>
              </div>
            )}
          />
          <Route
            exact={true}
            path="/dashboard/homepage"
            render={() => <div className="App">{this.keyAuthentication()}</div>}
          />
        </div>
      </BrowserRouter>
    );
  }
  keyAuthentication() {
    if (this.state.displayboard === false) { //Important Note uncomment and delete -Mattiwos
      return <Board></Board>;
    } else return <Board></Board>;
  }
  sendReq() {
    console.log("Auth process started");
    this.socket.emit("sessionkey", {
      sesskey: getCookie("key")
    });
  }
}
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
export default Dashboard;
