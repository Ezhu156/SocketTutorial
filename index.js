var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, "public")));


var username = "";
io.on('connection', function(socket){
	username = Math.random().toString(36).replace(/[^a-z]+/g, '') ;
  console.log('an user connected');
  io.emit('chat message', username + " connected");

  //disconnect
  socket.on('disconnect', function(){
  	io.emit('chat message', username + " disconnected");
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
  	io.emit('chat message', username + ": " + msg);
    console.log('message: ' + msg);
  });
});

io.emit('some event', { for: 'everyone' });



http.listen(3000, function(){
  console.log('listening on *:3000');
});