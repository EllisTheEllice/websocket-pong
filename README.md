# websocket-pong

This is a small Pong game based on JavaScript (server-side and client-side) with WebSockets.
It is possible to play this game against AI or against an opponent via network.
This game also has a lobby where players can find and challenge each other.

## Version
0.1



![alt text](https://github.com/simibimi/websocket-pong/blob/master/documentation/images/screen-capture.gif "Screenshot")


# Table of contents


1. [Used Tech](#techno)
2. [Installation using vanilla docker](#vanilla)
3. [Installation using Docker compose](#compose)
4. [Installation on Kubernetes](#kubernetes)
5. [Installation on Kubernetes using helm](#helm)
6. [Building images locally](#localbuild)
7. [Backing up your highscore](#highscore)
8. [Customizing application behavior](#customize)

# Used Tech<a name="techno"></a>

websocket-pong uses a number of open source projects to work properly:

* [jQuery] - The most popular JavaScript library!
* [WebSockets] - awesome technology to allow real-time communication between server and client
* [NodeJS] - the lightning-fast server-side JavaScript framework
* [express] - A framework based on NodeJS which adds numerous features
* [bootstrap] - A HTML/CSS framework to support responsive web applications
* [Docker] - Cool container stuff

# Installation

## Installation using vanilla docker<a name="vanilla"></a>

1. [Install docker](https://docs.docker.com/get-docker/)
<!--2. *Fulfill prerequisites*
   ```sh
   #create persistent volume
   $ mkdir /tmp/persdata
   # create a docker network
   $ docker network create pongnet
3. *Run the database*
   ```sh
   $ docker run -d --name pong-database --network pongnet -v $PWD/data:/docker-entrypoint-initdb.d -v /tmp/persdata:/var/lib/mysql ellistheellice/websocket-pong-db --character-set-server=utf8 --collation-server=utf8_general_ci
   ```-->
2. *Run the application*
   ```sh
   $ docker run -p 80:8081 -d --name pong-web --network pongnet ellistheellice/websocket-pong
   ```
3. *Verify the installation*
   ```sh
   $ docker ps
   $ curl http://localhost
   ```


## Installation using docker-compose<a name="compose"></a>

1. [Install docker-compose](https://docs.docker.com/compose/install/)
2. *Start*
   ```sh
   $ cd deployment/docker-compose
   $ docker compose up -d
   ```
3. *Verify the installation*
   ```sh
   $ docker ps
   $ curl http://localhost
   ```

## Installation on Kubernetes<a name="kubernetes"></a>

// Todo

## Installation on Kubernetes using helm<a name="helm"></a>

//Todo

## Building the images locally<a name="localbuild"></a>

   ```sh
   $ git clone https://github.com/EllisTheEllice/websocket-pong
   $ cd websocket-pong
   $ docker network create pongnet
   ```
   <!--#DB
   $ cd source/database
   $ mkdir /tmp/persdata
   $ docker build -t pong-db-image .
   $ docker run -d --name pong-database --network pongnet -v $PWD/data:/docker-entrypoint-initdb.d -v /tmp/persdata:/var/lib/mysql pong-db-image --character-set-server=utf8 --collation-server=utf8_general_ci-->
   ```sh
   #Web
   $ cd ../web
   $ docker build -t pong-web-image .
   $ docker run -p 80:8081 -d --name pong-web --network pongnet pong-web-image
   ```

<!--
# Backing up your highscore<a name="highscore"></a>

If you want to persist the highscore, you can simply create a backup of the /tmp/persdata folder which contains all the binary data of the MySQL database. Another way would be to use mysqldump. This approach is described here:

Create a crontask that runs once a day to create a dump. *Note:* This is a very simple example. Feel free to adapt this approach to your needs.
   ```sh
   $ crontab -e
   # add the following line to your crontab, then save and exit
   @daily $(which docker) exec pong-database mysqldump --user="ponguser" --password="pongpass" pong > <your-backup-path>/pong_$(date +%Y-%m-%d).sql
   ```
-->
# Customize the application<a name="customize"></a>

## Customize the applications port

In source/web/source folder you can find a config.json file. This file is used to set the port the NodeJS webserver listens to.


[jQuery]: <http://jquery.com>
[WebSockets]: <https://en.wikipedia.org/wiki/WebSocket>
[NodeJS]: <https://nodejs.org/en/>
[express]: <http://expressjs.com/>
[bootstrap]: <https://getbootstrap.com/>
[Docker]: <https://www.docker.com/>
