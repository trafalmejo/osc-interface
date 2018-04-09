// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var socket;
var value;
// function sendOsc(address, value) {
//   var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
//   socket.emit('message', [address].concat(value));
// }

function setup() {
  createCanvas(400, 400);
  background(0);
  setupOsc(12000, 3334);

  // Start a socket connection to the server
  // Some day we would run this server somewhere else
 // socket = io.connect('http://localhost:8081');

  // We make a named event called 'mouse' and write an
  // anonymous callback function
  // socket.on('mouse',
  //   // When we receive data
  //   function(data) {
  //     console.log("Got: " + data.x + " " + data.y);
  //     // Draw a blue circle
  //     fill(0,0,255);
  //     noStroke();
  //     ellipse(data.x, data.y, 20, 20);
  //   }
  // );
}

function draw() {
  // Nothing
  fill(255,0,0);
  rect(0,0,width/3, height);
    fill(0,255,0);
  rect(width/3, 0, width/3, height);
    fill(0,0,255);
  rect(2*(width/3), 0, width/3, height);
}

function mousePressed(){
  if(mouseX < width/3){
      sendOsc('/millumin/action/launchColumn', 1);
  }
   else if(width/3 < mouseX && mouseX < 2*(width/3)){
      sendOsc('/millumin/action/launchColumn', 2);
  }
   else if(mouseX > 2*(width/3)){
      sendOsc('/millumin/action/launchColumn', 3);
  }
  console.log("pressed")
}
function mouseDragged() {
  // Draw some white circles
  // fill(255);
  // noStroke();
  // ellipse(mouseX,mouseY,20,20);
  // // Send the mouse coordinates
  // sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };


  // Send that object to the socket
  //socket.emit('oscmessage',['message'].concat(50));
}

function sendOsc(address, value) {
  var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
  socket.emit('message', [address].concat(value));
}


function setupOsc(oscPortIn, oscPortOut) {
  var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
  socket.on('connect', function() {
    socket.emit('config', {
      server: { port: oscPortIn,  host: '127.0.0.1'},
      client: { port: oscPortOut, host: '127.0.0.1'}
    });
  });
}