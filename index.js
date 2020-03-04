const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
var server = app.listen(port);
var io = require('socket.io').listen(server);
const keygenerator = require('keygenerator');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
app.use(helmet());
app.use(morgan('common'));
app.use(cors());
const assert = require('assert');
const password = "Iag8m4arZ9ymTyPz";
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://notesapp:Iag8m4arZ9ymTyPz@notes-oczln.mongodb.net/test?retryWrites=true&w=majority";
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'NoteApp'
let db
const collname = 'Notes';




app.use(express.static('public'));
app.use(express.static('view'));
app.use(express.static('assets'));


app.get('/', (req, res)=>{
        res.render('index.html');
})



MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true }, (err, client) => {

  assert.equal(null, err);

  // Storing a reference to the database so you can use it later
  db = client.db(dbName)
  console.log(`Connected MongoDB: ${url}`)
  console.log(`Database: ${dbName}`)
  function addnote(name,strnote){
 	db.collection(collname).insertOne({
		name: name,
		note: strnote
	})

  }

  function updatenote(){
  db.collection(collname).find({}).toArray(function(err, result) {
    if (err) throw err;
    return result;
    
  });
  
  }

        console.log(updatenote());
        var spkey = keygenerator.session_id();
  io.on('connection', (socket)=>{
	var authkey = Math.round(Math.random()*1000000);
	
	console.log(authkey);
        socket.on('authreq',(arg)=>{
        if (arg.key ==  authkey){
                socket.emit('authres',{
                wrong: false,
                key: spkey
                })
                console.log('Redirect to website')
        }
        else{
        socket.emit('authres',{
                wrong: true
                });
                console.log('Attempt for authkey denied')
        }

        })
	socket.on('addtolist',(arg)=>{
		addnote(arg.name,arg.note);
	})
	socket.on('update',(arg)=>{
		socket.emit('currlist',updatenote());
	})
	socket.on('sessionkey',(arg)=>{
		if (arg.sesskey == spkey){
		spkey = keygenerator.session_id()
		socket.emit('ressessionkey',{
			wrong: false
		});
		}
		else{
		socket.emit('ressessionkey',{
                        wrong: true
                });
                spkey = keygenerator.session_id();
		}
	})
        socket.on('disconnect', (arg)=>{

        })
  })


})
