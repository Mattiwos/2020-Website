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
      if (arg.wrong === true) { //Mattiwos
        //window.location.href = "/dashboard";
        this.setState(state => {
          return { displayboard: true }; //remove
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
    if (this.state.displayboard === false) {//Mattiwos 
       return <Board></Board> ///<h1>Hm...</h1>;
    } else return <Board></Board>;
  }
  
}

export default Dashboard;
