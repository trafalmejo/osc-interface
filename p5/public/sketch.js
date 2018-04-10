var socket;
var img;
var b1;
var b2;
var b3;

var xpos,ypos;
var x, y;

function preload() {
  
  img = loadImage('/assets/background.png');
  b1 = loadImage('/assets/button01.png');
  b2 = loadImage('/assets/button02.png');
  b3 = loadImage('/assets/button03.png');

}
function setup() {
  console.log(config.ip);
  x =windowWidth;
  y= windowHeight
  createCanvas(x , y);
  background(0);
  setupOsc(12000, 3334);
  xpos = 2*(x/4);
  ypos = y/10 
  image(img, 0, 0, x, y);

  var buton1 = createImg('/assets/button01.png');
  buton1.attribute('width', x/3);
  buton1.attribute('height', y/7);
  buton1.attribute('onmouseover', "this.src='/assets/button01toggle.png'");
  buton1.attribute('onmouseout', "this.src='/assets/button01.png'");
  buton1.position(xpos, ypos*3);
  buton1.mousePressed(boton1);

  var buton2 = createImg('/assets/button02.png');
  buton2.attribute('onmouseover', "this.src='/assets/button02toggle.png'");
  buton2.attribute('onmouseout', "this.src='/assets/button02.png'");
  buton2.attribute('width', x/3);
  buton2.attribute('height', y/7);
  buton2.position(xpos, ypos*5);
  buton2.mousePressed(boton2);

  var buton3 = createImg('/assets/button03.png');
  buton3.attribute('onmouseover', "this.src='/assets/button03toggle.png'");
  buton3.attribute('onmouseout', "this.src='/assets/button03.png'");
  buton3.attribute('width', x/3);
  buton3.attribute('height', y/7);
  buton3.position(xpos, ypos*7);
  buton3.mousePressed(boton3);

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
  console.log("send 1");
}
function boton2(){
  sendOsc('/millumin/action/launchColumn', 2);
  console.log("send 2");
}
function boton3(){
  sendOsc('/millumin/action/launchColumn', 3);
  console.log("send 3");
}

function sendOsc(address, value) {
  socket.emit('message', [address].concat(value));
}


function setupOsc(oscPortIn, oscPortOut) {
  socket = io.connect('http://'+config.ip+':8081', { port: 8081, rememberTransport: false });
  console.log("SetUp");
  socket.emit('config', {
    server: { port: oscPortIn,  host: config.ip},
    client: { port: oscPortOut, host: config.ip}
  });
}