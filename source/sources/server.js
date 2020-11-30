var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server)
//var conf = require('./config.json');
var port=process.env.PORT || 8080

var Ball = require('./gamelogic/Ball');
var Particle = require('./gamelogic/Particle');
var Player = require('./gamelogic/Player');
var Logic = require('./gamelogic/Logic');

server.listen(port);

// statische Dateien ausliefern
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    // so wird die Datei index.html ausgegeben
    res.sendFile(__dirname + '/public/index.html');
});


var gameloop, ballloop;
var lobbyUsers = new Array();
var pairs = new Array();

io.on('connection', function (socket) {

    socket.on('clienthandshake', function (data) {
        lobbyUsers.forEach(function (user) {
            var sock = getSocketById(user.connectionId);
            sock.emit('servermessage', {datetime: getFormattedDate(), user: 'Server', message: data.username + ' has joined the lobby', class: 'server'});
        });

        lobbyUsers.push({
            user: data.username,
            connectionId: socket.id,
            ongame: false
        });


//    lobbySockets.push(socket);
//    lobbyUsers.push({
//        user: socket.id,
//        connectionId: socket.id,
//        ongame: false});

        socket.emit('servermessage', {datetime: getFormattedDate(), user: 'Server', message: 'Welcome to the Lobby', class: 'server'});
        socket.emit('serverhandshake', {connectionId: socket.id, user: data.username});
        lobbyUsers.forEach(function (lobbyUser) {
            var sock = getSocketById(lobbyUser.connectionId);
            sock.emit('useradded', {users: lobbyUsers});
        });
    });


    socket.on('move', function (data) {
//        console.log('Move');
        for (var i = 0, max = pairs.length; i < max; i++) {
            var logic = pairs[i].logic;
            if (pairs[i].p1 == socket.id) {
//                console.log('set player1 pos:' + data.ypos);
                logic.setPlayer1Y(data.ypos);
                break;
            } else if (pairs[i].p2 == socket.id) {
                logic.setPlayer2Y(data.ypos);
//                console.log('set player2 pos:' + data.ypos);
                break;
            }
        }
    });

    socket.on('clientmessage', function (data) {
        lobbyUsers.forEach(function (user) {
            var sock = getSocketById(user.connectionId);
            sock.emit('servermessage', {datetime: getFormattedDate(), user: data.user, message: data.message, class: 'client'});
        });
    });

    socket.on('disconnect', function () {
        cancel(socket);
        //        console.log(lobbyUsers);
        for (var i = 0, max = lobbyUsers.length; i < max; i++) {
            if (lobbyUsers[i].connectionId === socket.id) {
                lobbyUsers.splice(i, 1);
                break;
            }
        }
        lobbyUsers.forEach(function (lobbyUser) {
            var sock = getSocketById(lobbyUser.connectionId);
            sock.emit('useradded', {users: lobbyUsers});
            sock.emit('servermessage', {datetime: getFormattedDate(), user: 'Server', message: lobbyUser.user + ' has left the lobby', class: 'left'});
        });
    });

    socket.on('cancelgame', function () {
        cancel(socket);
    });

    socket.on('clientinvitation', function (data) {
//        console.log(data.host + ' invites ' + data.guest);
        for (var i = 0, max = lobbyUsers.length; i < max; i++) {
            if (lobbyUsers[i].user === data.guest) {
                var guestSocket = getSocketById(lobbyUsers[i].connectionId);
                guestSocket.emit('serverinvitation', {host: data.host});
                break;
            }
        }
    });

    socket.on('initiatemultiplayer', function (data) {
        var p1Socket = null;
        var p2Socket = null;
        for (var i = 0, max = lobbyUsers.length; i < max; i++) {
            if (lobbyUsers[i].user === data.p1) {
                p1Socket = getSocketById(lobbyUsers[i].connectionId);
                lobbyUsers[i].ongame = true;
                continue;
            } else if (lobbyUsers[i].user === data.p2) {
                p2Socket = getSocketById(lobbyUsers[i].connectionId);
                lobbyUsers[i].ongame = true;
                continue;
            }
            if (p1Socket != null && p2Socket != null) {
                break;
            }
        }
        lobbyUsers.forEach(function (lobbyUser) {
            var sock = getSocketById(lobbyUser.connectionId);
            sock.emit('useradded', {users: lobbyUsers});
        });

        p1Socket.emit('gamestart', {player: 'Player 1'});
        p2Socket.emit('gamestart', {player: 'Player 2'});
        var sockets = new Array();
        sockets.push(p1Socket);
        sockets.push(p2Socket);
        var logic = new Logic(false);
        logic.init();
        var loops = startGameLoop(sockets, logic);
        pairs.push({
            p1: p1Socket.id,
            p2: p2Socket.id,
            logic: logic,
            loops: loops
        });

    });

    socket.on('initiatesingleplayer', function (data) {
        socket.emit('gamestart');
        var sockets = new Array();
        var logic = new Logic(true);
        sockets.push(socket);
        logic.init();
        var loops = startGameLoop(sockets, logic);

        for (var i = 0, max = lobbyUsers.length; i < max; i++) {
            console.log(lobbyUsers[i].connectionId + " " + socket.id);
            if (lobbyUsers[i].connectionId == socket.id) {
                lobbyUsers[i].ongame = true;
                break;
            }
        }
        lobbyUsers.forEach(function (lobbyUser) {
            var sock = getSocketById(lobbyUser.connectionId);
            sock.emit('useradded', {users: lobbyUsers});
        });

        pairs.push({
            p1: socket.id,
            p2: null,
            logic: logic,
            loops: loops
        });
    });
});

function startGameLoop(sockets, logic) {
    var gameloop = setInterval(function () {
        if (!logic.isOnPause()) {
            var ok = logic.calculate();

            if (logic.hasWon()) { //reached maxScore
                logic.pause();
                cancel(sockets[0]);
//                cancel(sockets[1]);
            }

            if (!ok) {
                console.log('Game end');
                logic.pause();
//            clearInterval(gameloop);
//            clearInterval(ballloop);
                setTimeout(function () {
                    //a(sockets, logic);
                    logic.unpause();
                    logic.init();
//                    b(sockets, logic);
//                    for (var i = 0, max = pairs.length; i < max; i++) {
//                        if (pairs[i].p1 == sockets[0].id || pairs[i].p2 == sockets[1].id) {
//                            pairs[i].loops = loops;
//                            console.log('Updated loops');
//                            break;
//                        }
//                    }
                }, 3000);
            }
            for (var i = 0, max = sockets.length; i < max; i++) {
                sockets[i].emit('gametick', {
                    player1: logic.getPlayer1(),
                    player2: logic.getPlayer2(),
                    ball: logic.getBall(),
		    collided: logic.isCollided(),
                    particles: logic.getParticles()
                });
            }
        }
    }, 33);

    var ballloop = setInterval(function () {
        logic.increaseBallSpeed();
        console.log("Ballspeed: " + logic.getBall().getVx());
    }, 10000);
//    // der Client ist verbunden
//    p1=new Player(0,150);
//    p2=new Player();
    return {ballloop: ballloop, gameloop: gameloop};
}

function cancel(socket) {
    for (var i = 0, max = pairs.length; i < max; i++) {
        var p1 = pairs[i].p1;
        var p2 = pairs[i].p2;

        if (p1 == socket.id && p2 == null) { //means singleplayer
//            console.log('Singleplayer cancel ' + pairs[i].loops.ballloop);
            clearInterval(pairs[i].loops.ballloop);
            clearInterval(pairs[i].loops.gameloop);
            pairs.splice(i, 1);
            socket.emit('gameend');
            for (var i = 0, max = lobbyUsers.length; i < max; i++) {
                if (lobbyUsers[i].connectionId == socket.id) {
//                    console.log('Setting ongame');
                    lobbyUsers[i].ongame = false;
                    break;
                }
            }
            break;
        }


        if (p1 == socket.id) {
            console.log('1');
            //find other player and send him a message
            for (var k = 0, max = lobbyUsers.length; k < max; k++) {
                var lobbySocket = getSocketById(lobbyUsers[k].connectionId);

                if (lobbyUsers[k].connectionId == p2) {
                    console.log('1.1');
                    lobbySocket.emit('opponentleft');
                    lobbySocket.emit('gameend');
                    lobbyUsers[k].ongame = false;
                } else if (lobbyUsers[k].connectionId == p1) {
                    console.log('1.2');
                    lobbySocket.emit('gameend');
                    lobbyUsers[k].ongame = false;
                }
            }
            console.log('Clearing intervals 1');
            console.log(pairs[i].loops.ballloop);
            console.log(pairs[i].loops.gameloop);
            clearInterval(pairs[i].loops.ballloop);
            clearInterval(pairs[i].loops.gameloop);
            pairs.splice(i, 1);
            break;
        } else if (p2 == socket.id) {
            console.log('2');
            for (var k = 0, max = lobbyUsers.length; k < max; k++) {
                var lobbySocket = getSocketById(lobbyUsers[k].connectionId);

                if (lobbyUsers[k].connectionId == p1) {
                    console.log('2.1');
                    lobbySocket.emit('opponentleft');
                    lobbySocket.emit('gameend');
                    lobbyUsers[k].ongame = false;
                } else if (lobbyUsers[k].connectionId == p2) {
                    console.log('2.2');
                    lobbySocket.emit('gameend');
                    lobbyUsers[k].ongame = false;
                }
            }
            console.log('Clearing intervals 2');
            console.log(pairs[i].loops.ballloop);
            console.log(pairs[i].loops.gameloop);
            clearInterval(pairs[i].loops.ballloop);
            clearInterval(pairs[i].loops.gameloop);
            pairs.splice(i, 1);
            break;
        }
    }


    lobbyUsers.forEach(function (lobbyUser) {
        var sock = getSocketById(lobbyUser.connectionId);
        if (typeof sock === 'undefined') {
            return;
        }
        sock.emit('useradded', {users: lobbyUsers});
    });
}

function getSocketById(socketId) {
    return io.of("/").sockets.get(socketId);
}

function getFormattedDate() {
    var d = new Date();
    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
}

console.log('Server runs on http://127.0.0.1:' + port + '/ now');
