var canvas = document.getElementById("mycanvas");
var context2D = canvas.getContext("2d");
var ball = null;
var player1 = null;
var player2 = null;
var score = {player1: 0, player2: 0};
var particles = [];
var player = null;
var wsUri = "ws://" + document.location.host + document.location.pathname+"pong";
var websocket = null;

//singleplayer
var singlePlayer = false;
var enemySpeed = 11;
var increaseInterval = null;
var interval = null;

$(function () {
    // <editor-fold defaultstate="collapsed" desc=" User interaction ">
    $(document).on('mousemove', function (e) {
        if (player1 != null && player2 != null) {
            if (singlePlayer || player == "player1") {
                if (e.pageY <= canvas.height + 400) {
                    player1.y = (e.pageY - 400);
//                    if (!singlePlayer) {
                    websocket.send(player1.y);
//                    }
                }
            } else {
                if (e.pageY < canvas.height + 400) {
                    player2.y = (e.pageY - 400);
//                    if (!singlePlayer) {
                    websocket.send(player2.y);
//                    }
                }
            }
        }
    });

    $('#okbutton').on('click', function () {
        var kindOfPlay = $('input[name=kind_of_playing]:checked').val();
        log("---");
        log("Starte Spiel mit gewählten Einstellungen:");
        log("Spielart: " + kindOfPlay);

        if (kindOfPlay == "Einzelspieler") {
            singlePlayer = true;
        } else {
            singlePlayer = false;
        }
        connect(kindOfPlay);
        log("---");
    });
});

function log(text) {
    $('.console').html($('.console').html() + text + "<br />");
    console.log(text);
}

function draw() {
    context2D.clearRect(0, 0, canvas.width, canvas.height);

    //ball
    context2D.beginPath();
    context2D.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
//    context2D.fillStyle = 'green';
    context2D.fillStyle = '#fff';
    context2D.fill();
    context2D.lineWidth = 1;
    context2D.strokeStyle = '#003300';
    context2D.stroke();

    context2D.fillStyle = 'black';
    context2D.font = "14px Arial";
    context2D.fillText((ball.vx < 0 ? ball.vx * -1 : ball.vx), ball.x - 4, ball.y + 4);

    //player
    context2D.fillStyle = 'white';
    context2D.fillRect(player1.x, player1.y, player1.width, player1.height);
    context2D.fillRect(player2.x, player2.y, player2.width, player2.height);

    //particles
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        if (particle != null) {
            context2D.fillRect(particle.x, particle.y, particle.radius, particle.radius);
        }
    }
}