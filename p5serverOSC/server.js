var express = require('express')
var app = express()
app.use(express.static('public'));
var osc = require('node-osc');
var io = require('socket.io')(8081);


//BRIDGE

var oscServer, oscClient;

var isConnected = false;

io.sockets.on('connection', function (socket) {
	console.log('connection');
	socket.on("config", function (obj) {
		//if (!isConnected) {
		isConnected = true;
    	oscServer = new osc.Server(obj.server.port, obj.server.host);
	    oscClient = new osc.Client(obj.client.host, obj.client.port);
	    oscClient.send('/status', socket.sessionId + ' connected');
		oscServer.on('message', function(msg, rinfo) {
			socket.emit("message", msg);
		});
		socket.emit("connected", 1);
		//}
	});
 	socket.on("message", function (obj) {
		oscClient.send.apply(oscClient, obj);
  	});
	socket.on('disconnect', function(){
		if (isConnected) {
			console.log("Disconnect");
			oscServer.kill();
			oscClient.kill();
			//isConnected = false;
		}
  	});
});


//SERVER
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(8080, '128.122.6.219', function () {
  console.log('Example app listening on port 8080!')
})
