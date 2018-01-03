# websocket-pong

This is a small Pong game based on JavaScript (server-side and client-side) with WebSockets.
It is possible to play this game against AI or against an opponent via network.
This game also has a lobby where players can find and challenge eachother.

### Version
0.0.1

### Used Tech

websocket-pong uses a number of open source projects to work properly:

* [jQuery] - The most popular JavaScript library!
* [WebSockets] - awesome technology to allow real-time communication between server and client
* [NodeJS] - the lightning-fast server-side JavaScript framework
* [express framework] - A framework based on NodeJS which adds numerous features
* [Twitter bootstrap] - A HTML/CSS framework to support responsive web applications


### Installation

1. Install dependencies
  - Go to the pong sources path
  - use npm install to install configured dependencies
  - use node server.js to make a test run

```sh
$ cd <source-path>/public_html
$ npm install
$ nodejs server.js
```

2. Create the service
  - place the pong.service file under /etc/systemd/system and adapt the paths if necessary
  - use systemctl enable pong.service to enable the service
  - use systemctl start pong to start pong

```sh
$ vi /etc/systemd/system
$ systemctl enable pong.service
$ systemctl start pong
```


### Known issues

 - No good-looking Web UI
 - Game continues after one player left the game
 - No sound

 ### Ideas

 - Create a docker container for easy usage with docker
 - Extend the UI of the Lobby

License
----

GNU/GPL


**Free Software, Hell Yeah!**



   [jQuery]: <http://jquery.com>
   [WebSockets]: <https://en.wikipedia.org/wiki/WebSocket>
   [NodeJS]: <https://nodejs.org/en/>
   [express framework]: <http://expressjs.com/>
   [Twitter bootstrap]: <https://getbootstrap.com/>