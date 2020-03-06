import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import Dashboard from "./Dashboard/Dashboard.js"
import Home from "./Homepage/Home.js"

import './App.css';


function App() {
  return (
    <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Home />
            </div>
          )}/>
          <Route path='/dashboard' render={() => (
            <div className="App">
              <Dashboard />
            </div>
          )}/>
          
        </div>
      </BrowserRouter>
  );
}


export default App;

/*

<h1>Notes</h1>
      <p>By Mattiwos</p>


      <div class = "authkey">
      <label for = "key">Auth-Key </label>

      <input class="u-full-width" type="text" id="key" name="key">
      <button id="submit" type = "button" onclick="runswhenbuttonisclicked()">Submit</button>

      </div>
      <script>
      function runswhenbuttonisclicked(){
      /**
      const socket = io(
        {transports: ['websocket']},
        { forceNew: true }
        );
      socket.on('reconnect_attempt', () => {
        socket.io.opts.transports = ['polling', 'websocket'];
      });

     var input = document.getElementById("key").value.toString()
     socket.emit('authreq',{
   key: input,
   });
   }
   </script>
   <script>
   const socket = io(
     {transports: ['websocket']},
     { forceNew: true }
     );
   socket.on('reconnect_attempt', () => {
     socket.io.opts.transports = ['polling', 'websocket'];
   });
   socket.on('authres',(arg)=>{
   if (arg.wrong == true){
   alert("Key is incorrect");
   }
   if (arg.wrong == false){
    window.location.href = `note.html?key=${arg.key}`;

   }

   });

   </script>
*/
