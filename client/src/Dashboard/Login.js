// eslint-disable-next-line
import React, {Component} from "react";

import io from 'socket.io-client';

import {localserverhost} from '../secret.js';

//import io from "socketio";
class Login extends React.Component {

    constructor(props){
        super(props);
        this.baseUrl = localserverhost
        this.socket = io(this.baseUrl, {
          reconnectionDelay: 1000,
          reconnection:true,
          reconnectionAttempts: 10,
          transports: ['websocket'],
          agent: false, // [2] Please don't set this to true
          upgrade: false,
          rejectUnauthorized: false
      });

     this.socket.on('connect', () => {
        console.log('socket connected!')
      })

     this.socket.on('connect_error', (err) => {
        console.log('socket connected error --> ' + err);
      })

      this.socket.on('reconnect_attempt', () => {
        this.socket.io.opts.transports = ['websocket'];
      });

      this.socket.on('authres',(arg)=>{
        if (arg.wrong === true){
          alert("Key is incorrect");
        }
        if (arg.wrong === false){
          window.location.href = `/dashboard/homepage`;
          document.cookie = `key= ${arg.key}`;
          }

        });
        console.log("response")


        this.state = {
            key: ''

        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
      this.setState({key: event.target.value});
      console.log(this.state.key);

    }

    render (){
        return (
            <div>


            <div className = "authkey">
            <label htmlFor = "key">Auth-Key </label>

            <input className="u-full-width" type="text" id="key" value = {this.state.key} onChange={this.handleChange} name="key"></input>
            <button id="submit" type = "button" onClick={() => this.buttonclick()}>Submit</button>

            </div>


            </div>

        );
    }
    buttonclick(e){
          console.log(this.state.key);
          this.socket.emit('authreq',{
            key: this.state.key,
            });
        console.log("sent")


    }


}
export default Login;
