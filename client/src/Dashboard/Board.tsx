import {App} from "../testsecret";
var secret = new App.Secret();
/* eslint-disable import/first */
import * as React from "react";

import io from "socket.io-client";




// this helps TypeScript to understand jQuery best !!!  otherwise It will confused .



interface Props {//interface is used to make entities such as Property conform with
    products: string[]; //contains all the properies such as html tag
}

interface State {
  hasError: boolean;
  htmltxt: string;
  //quantities: { [key: string]: number};  //represents elements of the page that could change
}

class Board extends React.Component<Props, State> {
    baseUrl: string;
   
    
    dom: HTMLDivElement | undefined;
    socket: SocketIOClient.Socket;
    getPageContainer: HTMLDivElement | null | undefined;
    
    

  constructor(props: Props,state: State) {
    super(props);
    // this.state = state;
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
    this.state = { hasError: false, htmltxt:"<h2>Mattiwos flag not here</h2>" };

  

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
      console.log(arg.pagetxt)
      this.setState(state => {
        this.componentDidMount ()
        return {htmltxt: arg.pagetxt};
      })
      
    });

    this.getPage = this.getPage.bind(this);
  }
  

  getPage() {
    console.log(this.stringToHTML(this.state.htmltxt).innerHTML)
    return ((this.stringToHTML(this.state.htmltxt)));
  }
  stringToHTML(str: string) {
    // this.parser = new DOMParser();
    // this.doc = this.parser.parseFromString(str, 'text/html');
    // return (this.doc.body);
    this.dom = document.createElement("div");
    this.dom.innerHTML = str;
    return this.dom;
  }

  componentDidMount () {

    if (this.getPageContainer != null)
      this.getPageContainer.appendChild(this.getPage());
    

  }

  render() {
    return (
      <div>
        
        
        <div ref={node => this.getPageContainer = node}>
            <div id="hiddenpage"></div>
        </div>

        <button id="submit" type="button" onClick={() => this.htmlreq()}>Load Page</button>
      
      </div>
    
    );
  }
  htmlreq() {
    this.sendReq()
    this.socket.emit("homepagereq", {});
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

export default Board;
//JSX allows you to use html in typescript .tsx makes it expect to encounter html 