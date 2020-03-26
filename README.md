# Tello Video Stream with Node.js and WebSockets

I've been looking for a way to retrieve Tello's video stream from the SDK command streamon. I also wanted to do this with the bare minimum libraries/modules and keep it as simple as possible. This has been tested on Mac and Windows.

If you'd also like to learn how to do this in Node-RED then check out this YouTube video:



---
## Requirements

You'll need Node.js and npm installed. You can download and install the binaries from here:

https://nodejs.org/en/download/

You will also need FFmpeg installed. Here is a great resource for installing on Mac:

http://jollejolles.com/install-ffmpeg-on-mac-os-x/

and for Windows:

https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg

---

## Code

You'll need to clone this repository and install the necessary modules:

    $ git clone https://github.com/dbaldwin/tello-video-nodejs-websockets
    $ cd tello-video-nodejs-websockets
    $ npm install

---

## Running

Make sure you power up Tello and connect to its network first. The reason is that our script sends "command" and "streamon" SDK commands to start the stream. This will not work if Tello isn't connected. After connecting to Tello run the following command from witin the tello-video-nodejs-websockets directory:

    $ node index.js

## Accessing the Video Stream

Once the code is running you can access the following url in your browser and hopefully see Tello's video stream:

    $ http://localhost:3000/index.html

## Thank You

A special thanks to the JSMpeg developer for figuring out how to decode the video steam. More info on the project here:

https://github.com/phoboslab/jsmpeg