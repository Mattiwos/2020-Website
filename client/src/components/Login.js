// eslint-disable-next-line
import React, {Component} from "react";

import fetch from "isomorphic-unfetch";
import io from 'socket.io-client';
//import io from "socketio";
class Login extends React.Component {

    constructor(props){

        super(props);


        this.baseUrl = "http://localhost:8080/ggetres"



        // this.ssocket = require('socket.io-client')(this.baseUrl);
        // this.ssocket.on('connect', function(){});
        // this.ssocket.on('event', function(data){});
        // this.ssocket.on('disconnect', function(){});


        this.socket = io('http://localhost:8080/', { // [1] Important as fuck
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

        // this.socket = io(
        //     {transports: ['websocket']},
        //     { forceNew: true }
        //     );
        // eslint-disable-next-line
          this.socket.on('reconnect_attempt', () => {
            this.socket.io.opts.transports = ['websocket'];
          });
    }
    render (){
        return (
            <div>


            <div className = "authkey">
            <label htmlFor = "key">Auth-Key </label>

            <input className="u-full-width" type="text" id="key" value = {this.key} name="key"></input>
            <button id="submit" type = "button" onClick={() => this.buttonclick()}>Submit</button>

            </div>


            </div>

        );
    }
    listentores(e){
        this.socket.on('authres',(arg)=>{
            if (arg.wrong === true){
            alert("Key is incorrect");
            }
            if (arg.wrong === false){
             window.location.href = `note.html?key=${arg.key}`;

            }

            });
            console.log("response")
    }
    async buttonclick(e){

        // await fetch(this.baseUrl,{
        //     model: 'GET'
        // }).then(response => {
        //     console.log(response);
        //     return response.json();
        //   }).then(data => {
        //     // Work with JSON data here
        //     console.log(data.txt);
        //   }).catch(err => {
        //     // Do something for an error here
        //     console.log("Error Reading data " + err);
        //   });




          this.socket.emit('authreq',{
            key: this.key,
            });



        console.log("sent")


    }


}
export default Login;
