/*
 * Created on Tue 3/24/2020
 *
 * Copyright (c) 2020 - DroneBlocks, LLC
 * Author: Dennis Baldwin
 *
 */

// Import necessary modules for the project
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');
const spawn = require('child_process').spawn; // For spawning ffmpeg

// Ports that are used in the app
const HTTP_PORT = 3000;
const STREAM_PORT = 3001

/*
  Create the web server that the user can access at
  http://localhost:3000/index.html
*/
server = http.createServer(function(request, response) {

  // Log that an http connection has come through
  console.log(
		'HTTP Connection on ' + HTTP_PORT + ' from: ' + 
		request.socket.remoteAddress + ':' +
		request.socket.remotePort
	);

  // Read file from the local directory and serve to user
  // in this case it will be index.html
  fs.readFile(__dirname + '/www/' + request.url, function (err,data) {
    if (err) {
      response.writeHead(404);
      response.end(JSON.stringify(err));
      return;
    }
    response.writeHead(200);
    response.end(data);
  });

}).listen(HTTP_PORT); // Listen on port 3000

/*
  Create the stream server where the video stream will be sent
*/
const streamServer = http.createServer(function(request, response) {

  // Log that a stream connection has come through
  console.log(
		'Stream Connection on ' + STREAM_PORT + ' from: ' + 
		request.socket.remoteAddress + ':' +
		request.socket.remotePort
	);

  // When data comes from the stream (FFmpeg) we'll pass this to the web socket
  request.on('data', function(data) {
    // Now that we have data let's pass it to the web socket server
    webSocketServer.broadcast(data);
  });

}).listen(STREAM_PORT); // Listen for streams on port 3001

/*
  Begin web socket server
*/
const webSocketServer = new WebSocket.Server({
  server: streamServer
});

// Broadcast the stream via websocket to connected clients
webSocketServer.broadcast = function(data) {
  webSocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

/*
  Begin the ffmpeg stream. You must have Tello connected first
*/
var args = [
  "-i", "udp://0.0.0.0:11111",
  "-r", "30",
  "-s", "960x720",
  "-codec:v", "mpeg1video",
  "-b", "800k",
  "-f", "mpegts",
  "http://127.0.0.1:3001/stream"
];

// Spawn an ffmpeg instance
var streamer = spawn('ffmpeg', args);
// Uncomment if you want to see ffmpeg stream info
//streamer.stderr.pipe(process.stderr);
streamer.on("exit", function(code){
    console.log("Failure", code);
});
