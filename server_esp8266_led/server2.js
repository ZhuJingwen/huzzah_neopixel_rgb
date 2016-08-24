var express = require('express');  //to load express module
var app = express();  //create an express app
var http = require('http').Server(app);  //app starts a http server
var io = require('socket.io')(http);  //require socket.io module

//express.js part
app.use(express.static('public'));  //app serves static files inside public folder

http.listen(3000, function() {
  console.log('listening on *:3000');  //server listen on port 8080 for connections
});

//socket.io part
io.on('connection', function(socket) {

  console.log("We have a new client: " + socket.id);

  // socket.on('new stroke', function(data) {
  //   console.log("Received: 'new stroke' " + data.x + " " + data.y + " " + data.h + " " + data.r);
  //   socket.broadcast.emit('new stroke', data);     // Send it to all the other clients
  // });

	socket.on('led', function(data){
		console.log(data);
    socket.broadcast.emit('led', data);
	});
  socket.on('disconnect', function() {
    console.log("Client has disconnected " + socket.id);
  });
});
