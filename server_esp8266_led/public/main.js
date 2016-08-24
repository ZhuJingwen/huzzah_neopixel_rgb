var socket = io.connect('http://localhost:3000/');

socket.on('connect', function() {
  console.log("Connected");
});

var buttonR;
var buttonG;
var buttonB;
var buttonW;

function setup() {
  var canvasContainer = document.getElementById("canvasContainer");
  var myCanvas = createCanvas((windowWidth - 100), (windowHeight - 100));
  myCanvas.parent(canvasContainer);

  background(255);

  buttonR = createButton('Red');
  buttonR.position(200,100);
  buttonR.mousePressed(changeRed);

  buttonG = createButton('Green');
  buttonG.position(300,100);
  buttonG.mousePressed(changeGreen);

  buttonB = createButton('Blue');
  buttonB.position(400,100);
  buttonB.mousePressed(changeBlue);
  
  buttonW = createButton('White');
  buttonW.position(500,100);
  buttonW.mousePressed(changeWhite);

}

function draw(){
}

function changeRed(){
  socket.emit('led', {
    "red": 255,
    "green":0,
    "blue":0
  });
}

function changeGreen(){
    socket.emit('led', {
    "red": 0,
    "green":255,
    "blue":0
  });
}

function changeBlue(){
    socket.emit('led', {
    "red": 0,
    "green":0,
    "blue":255
  });
}

function changeWhite(){
    socket.emit('led', {
    "red": 255,
    "green":255,
    "blue":255
  });
}
