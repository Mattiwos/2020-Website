import React, {Component} from "react";
import io from "socket.io-client";
//import io from "socketio";
class Login extends React.Component {
    constructor(props){
        super(props);
        this.socket = io('http://localhost:8080');
        // this.socket = io(
        //     {transports: ['websocket']},
        //     { forceNew: true }
        //     );
          this.socket.on('reconnect_attempt', () => {
            this.socket.io.opts.transports = ['polling', 'websocket'];
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
    buttonclick(e){

      
        
          
          this.socket.emit('authreq',{
            key: this.key,
            });



        console.log("sent")
        
       
    }


}
export default Login;