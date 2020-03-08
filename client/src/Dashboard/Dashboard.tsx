import {App} from "../testsecret";
var secret = new App.Secret;

// eslint-disable-next-line
import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
  BrowserRouter
} from "react-router-dom";


import io from "socket.io-client";
import Login from "./Login";
import Board from "./Board";


interface Props {
    products: string[]; //contains all the properies such as html tag
}
interface State {
    displayboard: boolean;
}

class Dashboard extends React.Component<Props, State> {
    baseUrl: string;
    socket: SocketIOClient.Socket;

  constructor(props: Props,state: State) {
    super(props);

    this.state = {
      displayboard: false
    };

    this.baseUrl = secret.getLocalhost();
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

    this.socket.on("connect_error", (err: string) => {
      console.log("socket connected error --> " + err);
    });

    this.socket.on("reconnect_attempt", () => {
      this.socket.io.opts.transports = ["websocket"];
    });
    this.sendReq();

    this.socket.on("ressessionkey", (arg: {wrong: boolean}) => {
      if (arg.wrong === true) { //Mattiwos
        //window.location.href = "/dashboard";
        this.setState(state => {
          
        });
      } else {
        
        this.setState(state => {
          return { displayboard: true };
        });
      }
    });
  }
  render() {
    
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
    if (this.state.displayboard === false) {
       return <h1>Hm...</h1>;
    } else return <Board></Board>;
  }
  sendReq() {
    console.log("Auth process started");
    this.socket.emit("sessionkey", {
      sesskey: getCookie("key")
    });
  }
}

function getCookie(cname: string) {
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
