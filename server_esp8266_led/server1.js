var net = require('net');
var socketio = require('socket.io-client')('http://localhost:3000');

var tcpsocket;
var connected = false;
var red = 0;
var blue = 0;
var green = 0;
var prevRed = 0;
var prevGreen = 0;
var prevBlue = 0;
/*
 * Callback method executed when a new TCP socket is opened.
 */

 socketio.on('connect', function(){
 	console.log("connected to socket.io server");
 	
 });

 socketio.on('led', function(data){
 	console.log(data);
 	// red = data.red;
 	// green = data.green;
 	// blue = data.blue;
 	if(connected == true){
 		tcpsocket.write(data.red+","+data.green+","+data.blue);
 	}

 });

 socketio.on('disconnect', function(){
 	console.log("Disconnected to socket.io server");
 });

function newSocket(socket) {
	console.log("new connection");
	//console.log(socket.address());
	socket.write('Welcome to the Telnet server!');

	tcpsocket = socket;
	connected = true;

	socket.on('end', function(){
		console.log("disconnected");
		connected = false;
	});
	// socket.on('data', function(data) {
	// 	console.log(data.toString('utf8'));

	// 	if(red == prevRed && blue == prevBlue && green == prevGreen){
	// 		console.log("nothing to change");
	// 	}else{
	// 		socket.write("red="+red);
	// 		socket.write("green="+green);
	// 		socket.write("blue="+blue);

	// 		prevRed = red;
	// 		prevGreen = green;
	// 		prevBlue = blue;
	// 	}
		// var inputString = data.toString('utf8');
		// var inputChar = inputString.split("");
		// var dataToSend;
		// //find data source
		// var indexSensor1 = inputString.indexOf("sensor1");
		// if(indexSensor1 > -1){
		// 	//the data is from sensor 1
		// 	dataToSend = inputChar.slice(indexSensor1+8, inputChar.length-indexSensor1);
		// 	dataToSend = dataToSend.join("");
		// }
		// if(connected == true){
		// 	socketio.emit('data1', dataToSend);
		// 	socket.write(dataToSend); //echo back
		// }else{
		// 	console.log("no socket io connection")
		// }	
	//});
}
 
// Create a new server and provide a callback for when a connection occurs
var server = net.createServer(newSocket);
 
// Listen on port 8888
server.listen(8080, function(){
	console.log('listening on *:8080'); 
});