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

app.use(express.static('public'));
app.use(express.static('view'));
app.use(express.static('assets'));


app.get('/', (req, res)=>{
	res.render('index.html');
})

io.on('connection', (socket)=>{
var authkey = Math.round(Math.random()*1000000);	
var spkey = keygenerator.session_id();
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
	socket.on('disconnect', (arg)=>{

	})
})
