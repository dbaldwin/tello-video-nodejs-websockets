# Tello Video Stream with Node.js and WebSockets

I've been looking for a way to retrieve Tello's video stream from the SDK command streamon. I also wanted to do this with the bare minimum libraries/modules and keep it as simple as possible. This has been tested on Mac and Windows.

---
## Requirements

You'll need Node.js installed. You can download it from here:

https://nodejs.org/en/download/

You will also need FFmpeg installed. Here is a great resource for installing on Mac:

http://jollejolles.com/install-ffmpeg-on-mac-os-x/

and for Windows:

https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg

---

## Installing

You'll need to clone this repository and install the necessary modules:

    $ git clone https://github.com/dbaldwin/tello-video-nodejs-websockets
    $ cd tello-video-nodejs-websockets
    $ npm install

---

## Running

Make sure you power up Tello and connect to its network first. The reason is that our script sends "command" and "streamon" SDK commands to start the stream. This will not work if Tello isn't connected. After connecting to Tello run the following command:

    $ node index.js

## Accessing

    $ http://localhost:3000