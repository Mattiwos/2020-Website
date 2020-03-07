import {App} from "../testsecret";
var secret = new App.Secret;
import * as React from "react";

import io from "socket.io-client";


interface Props {//interface is used to make entities such as Property conform with
    products: string[]; //contains all the properies such as html tag
}

interface State {
    quantities: { [key: string]: number };  //represents elements of the page that could change
}

class Board extends React.Component<Props, State> {
    baseUrl: string;
   
    htmltxt: string;
    dom: HTMLDivElement | undefined;
    socket: SocketIOClient.Socket;
    

  constructor(props: Props,state: State) {
    super(props);
    this.baseUrl= secret.getLocalhost();
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

    this.socket.on("connect_error", (err: string) => {
      console.log("socket connected error --> " + err);
    });

    // this.socket.on("reconnect_attempt", () => {
    //   this.socket.io.opts.transports = ["websocket"];
    // }); Might not need it threw an error for .io

    this.socket.on("htmlpageres", (arg: { pagetxt: string; }) => {
      this.htmltxt = arg.pagetxt;
    });

    this.getPage = this.getPage.bind(this);
  }
  

  stringToHTML(str: string) {
    // this.parser = new DOMParser();
    // this.doc = this.parser.parseFromString(str, 'text/html');
    // return (this.doc.body);
    this.dom = document.createElement("div");
    this.dom.innerHTML = str;
    return this.dom;
  }
  getPage() {
    return ([this.stringToHTML(this.htmltxt)]);
  }

  render() {
    return (
      <div>
        <h1>Welcome Back!</h1>
        {this.getPage()}
        <button id="submit" type="button" onClick={() => this.htmlreq()}>Submit</button>
        {/* {this.htmltxt.innerHTML} */}
      </div>
    
    );
  }

  htmlreq() {
    this.socket.emit("homepagereq", {});
  }
}

export default Board;
//JSX allows you to use html in typescript .tsx makes it expect to encounter html 