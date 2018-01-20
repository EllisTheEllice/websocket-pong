# websocket-pong

This is a small Pong game based on JavaScript (server-side and client-side) with WebSockets.
It is possible to play this game against AI or against an opponent via network.
This game also has a lobby where players can find and challenge eachother.

## Version
0.1



![alt text](https://github.com/simibimi/websocket-pong/blob/master/documentation/images/screen-capture.gif "Screenshot")


# Table of contents


1. [Used Tech](#techno)
2. [Installation using vanilla docker](#vanilla)



## Used Tech<a name="techno"></a>

websocket-pong uses a number of open source projects to work properly:

* [jQuery] - The most popular JavaScript library!
* [WebSockets] - awesome technology to allow real-time communication between server and client
* [NodeJS] - the lightning-fast server-side JavaScript framework
* [express framework] - A framework based on NodeJS which adds numerous features
* [Twitter bootstrap] - A HTML/CSS framework to support responsive web applications
* [Docker] - Cool container stuff

## Installation

### Installation using vanilla docker<a name="vanilla"></a>

1. *Install docker*

```sh
$ sudo yum update -y
$ sudo yum install -y docker
$ sudo service docker start
$ sudo usermod -a -G docker <username>
# from now on, docker should be runnable as non-root user
$ docker info
# Note: If you experience problems using docker command as a non-privileged user, try to log out and login again
```

2. *Fulfill prerequisites*

```sh
$ mkdir /tmp/persdata #create persistent volume
# create a docker network
$ docker network create pongnet
```

3. *The database*

```sh
$ docker pull sengbatz/websocket-pong-db
$ docker run -d --name pong-database --network pongnet -v $PWD/data:/docker-entrypoint-initdb.d -v /tmp/persdata:/var/lib/mysql sengbatz/websocket-pong-db --character-set-server=utf8 --collation-server=utf8_general_ci
```

4. *The NodeJS server*

```sh
$ docker pull sengbatz/websocket-pong-wen
$ docker run -p 80:8081 -d --name pong-web --network pongnet sengbatz/websocket-pong-web
# due to the network, we can connect to the DB using a DNS name
#$ docker exec -it pong-web mysql --host=pong-database --user=myuser --password
```

5. *Verify the installation*

```sh
# verify everything works as expected
$ docker ps
$ curl http://localhost
```


### Installation using docker-compose

//Todo


### Installation on Kubernetes



### Installation using AWS EKS

//Todo

### Installation using RedHat OpenShift

//Todo


## Building the images locally

```sh
$ git clone https://github.com/simibimi/websocket-pong
$ cd websocket-pong
$ docker network create pongnet

#DB
$ cd source/database
$ mkdir /tmp/persdata
$ docker build -t pong-db-image .
$ docker run -d --name pong-database --network pongnet -v $PWD/data:/docker-entrypoint-initdb.d -v /tmp/persdata:/var/lib/mysql pong-db-image --character-set-server=utf8 --collation-server=utf8_general_ci

#Web
$ cd ../web
$ docker build -t pong-web-image .
$ docker run -p 80:8081 -d --name pong-web --network pongnet pong-web-image
```


## Backing up your highscore

If you want to persist the highscore, you can simply create a backup of the /tmp/persdata folder. Another way would be to use mysql dump

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
