# websocket-pong

This is a small Pong game based on JavaScript (server-side and client-side) with WebSockets.
It is possible to play this game against AI or against an opponent via network.
This game also has a lobby where players can find and challenge eachother.

### Version
0.0.1



![alt text](https://github.com/simibimi/websocket-pong/blob/master/documentation/images/screen-capture.gif "Screenshot")




### Used Tech

websocket-pong uses a number of open source projects to work properly:

* [jQuery] - The most popular JavaScript library!
* [WebSockets] - awesome technology to allow real-time communication between server and client
* [NodeJS] - the lightning-fast server-side JavaScript framework
* [express framework] - A framework based on NodeJS which adds numerous features
* [Twitter bootstrap] - A HTML/CSS framework to support responsive web applications
* [Docker] - Cool container stuff


### Installation

1. Install docker

```sh
$ sudo yum update -y
$ sudo yum install -y docker
$ sudo service docker start
$ sudo usermod -a -G docker <username>
# from now on, docker should be runnable as non-root user
$ docker info
```

2. Clone this repository and build docker image

```sh
$ git clone https://github.com/simibimi/websocket-pong
$ cd websocket-pong
$ docker build -f docker/web/Dockerfile -t pong .
$ docker run --link pong-database  -p 80:8080 -d pong

#
through the link we have access to the env variables. Structured as follows:
PONG_DATABASE_PORT_3306_TCP_ADDR=172.17.0.2
PONG_DATABASE_ENV_MYSQL_DATABASE=pong
PONG_DATABASE_ENV_MYSQL_USER=ponguser
PONG_DATABASE_ENV_MYSQL_PASSWORD=pongpass
PONG_DATABASE_PORT_3306_TCP_PORT=3306



#verify everything is fine
$ docker ps
$ curl http://localhost

#now the database
cd docker/database
docker build -t mysql-5.5 .
docker run -d --name pong-database -v $PWD/data:/docker-entrypoint-initdb.d mysql-5.5
```



License
----

GNU/GPL


**Free Software, Hell Yeah!**



   [jQuery]: <http://jquery.com>
   [WebSockets]: <https://en.wikipedia.org/wiki/WebSocket>
   [NodeJS]: <https://nodejs.org/en/>
   [express framework]: <http://expressjs.com/>
   [Twitter bootstrap]: <https://getbootstrap.com/>
   [Docker]: <https://www.docker.com/>
