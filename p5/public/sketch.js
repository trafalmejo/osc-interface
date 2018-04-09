// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var socket;
var img;
var b1;
var b2;
var b3;

var xpos,ypos;
var x, y;
// function sendOsc(address, value) {
//   var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
//   socket.emit('message', [address].concat(value));
// }
function preload() {
  img = loadImage('/assets/background.png');
  b1 = loadImage('/assets/button01.png');
  b2 = loadImage('/assets/button02.png');
  b3 = loadImage('/assets/button03.png');

}
function setup() {
  x =windowWidth;
  y= windowHeight
  createCanvas(x , y);
  //createCanvas(width, height);
  background(0);
  setupOsc(12000, 3334);
  xpos = 2*(x/4);
  ypos = y/10 
  image(img, 0, 0, x, y);
  //image(b1, xpos, ypos*3, x/3, y/7);
  //image(b2, xpos, ypos*5, x/3, y/7);
  //image(b3, xpos, ypos*7, x/3, y/7);

  var buton1 = createImg('/assets/button01.png');
  buton1.attribute('width', x/3);
  buton1.attribute('height', y/7);
  buton1.position(xpos, ypos*3);
  buton1.mousePressed(boton1);

  var buton2 = createImg('/assets/button02.png');
  buton2.attribute('width', x/3);
  buton2.attribute('height', y/7);
  buton2.position(xpos, ypos*5);
  buton2.mousePressed(boton2);

  var buton3 = createImg('/assets/button03.png');
  buton3.attribute('width', x/3);
  buton3.attribute('height', y/7);
  buton3.position(xpos, ypos*7);
  buton3.mousePressed(boton3);


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
  //rect(0,0,width/3, height-10);
    fill(0,255,0);
  //rect(width/3, 0, width/3, height-10);
    fill(0,0,255);
  //rect(2*(width/3), 0, width/3, height-10);
}
function boton1(){
  sendOsc('/millumin/action/launchColumn', 1);
}
function boton2(){
  sendOsc('/millumin/action/launchColumn', 2);
}
function boton3(){
  sendOsc('/millumin/action/launchColumn', 3);
}

function mousePressed(){
  // if(mouseX < width/3){
  //     sendOsc('/millumin/action/launchColumn', 1);
  // }
  //  else if(width/3 < mouseX && mouseX < 2*(width/3)){
  //     sendOsc('/millumin/action/launchColumn', 2);
  // }
  //  else if(mouseX > 2*(width/3)){
  //     sendOsc('/millumin/action/launchColumn', 3);
  // }
  // //background(int(random(0,255)));
  // console.log("pressed")
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
  var socket = io.connect('http://192.168.1.6:8081', { port: 8081, rememberTransport: false });
  socket.emit('message', [address].concat(value));
}


function setupOsc(oscPortIn, oscPortOut) {
  var socket = io.connect('http://192.168.1.6:8081', { port: 8081, rememberTransport: false });
  socket.on('connect', function() {
    socket.emit('config', {
      server: { port: oscPortIn,  host: '192.168.1.6'},
      client: { port: oscPortOut, host: '192.168.1.6'}
    });
  });
}