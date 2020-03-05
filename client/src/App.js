import React from 'react';

import Login from "./components/Login.js"
import './App.css';

function App() {
  return (
    <div className="App">

      <Login></Login>
    </div>
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
