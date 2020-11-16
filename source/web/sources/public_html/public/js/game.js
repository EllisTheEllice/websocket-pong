var canvas = document.getElementById("mycanvas");
var context2D = canvas.getContext("2d");
var ball = null;
var player1 = null;
var player2 = null;
var particles = [];
var player = null;
var headerheight = 0;


$(function () {
    // <editor-fold defaultstate="collapsed" desc=" User interaction ">
    $('#mycanvas').on('mousemove', function (e) {
//        console.log(e.clientY);
//        console.log(e.pageY);
//        if (player1 != null && player2 != null) {
//            if (singlePlayer || player == "player1") {
//                if (e.pageY <= canvas.height + 400) {
//                    player1.y = (e.pageY - 400);
////                    if (!singlePlayer) {
//                    websocket.emit('move', {player: "player1", ypos: player1.y});
////                    }
//                }
//            } else {
//                if (e.pageY < canvas.height + 400) {
//                    player2.y = (e.pageY - 400);
////                    if (!singlePlayer) {
//                    websocket.emit('move', {player: "player2", ypos: player2.y});
////                    }
//                }
//            }
//        }
        websocket.emit('move', {ypos: e.pageY - headerheight - 25});
    });
    headerheight = $('#header').height();
});

function gameTick(data) {
//    console.log('Got gametick');
//    console.log(data);
//    if (data.data == "player1" || data.data == "player2") {
//        player = data.data;
//    } else if (data.data == "start") {
////        start();
//    } else if (data.data.indexOf("Playercount") === 0) {
//        var playerCount = data.data.substring(12, 13);
//        log("Spieler anwesend: " + playerCount);
//        if (playerCount == 1) {
//            log("Warte auf Spieler 2");
//        }
//    } 
//    else {
    //player = "player1";
    player1 = data.player1;
    player2 = data.player2;
    ball = data.ball;
    particles = data.particles;
    $('#sp_p1score').text(player1.score);
    $('#sp_p2score').text(player2.score);

    if(data.collided){
	var audio = new Audio('audio_file.mp3');
        audio.play();
   }
//    console.log(particles);
    draw();
//    }
}

function draw() {
    context2D.clearRect(0, 0, canvas.width, canvas.height);

    //court
    var padding = 10;
    context2D.lineWidth = 1;
    context2D.strokeStyle = 'white';

    context2D.beginPath();
    context2D.moveTo(player1.width + padding, padding);
    context2D.lineTo(canvas.width - player2.width - padding, padding);
    context2D.lineTo(canvas.width - player2.width - padding, canvas.height - padding);
    context2D.lineTo(player1.width + padding, canvas.height - padding);
    context2D.lineTo(player1.width + padding, padding);
    context2D.stroke();

    context2D.beginPath();
    context2D.lineWidth = 2;
    context2D.moveTo((canvas.width / 2) + (padding / 2), padding);
    context2D.lineTo((canvas.width / 2) + (padding / 2), canvas.height - padding);
    context2D.stroke();

    var quarter_left = player1.width + padding + Math.round((canvas.width - (player1.width + player2.width + padding + padding)) / 4);
    var quarter_right = canvas.width - player2.width - padding - Math.round((canvas.width - (player1.width + player2.width + padding + padding)) / 4);
    var eigth = Math.round((canvas.height - (padding * 2)) / 8);  //used for horizontal side-out lines
    context2D.lineWidth = 1;

    context2D.beginPath();
    context2D.moveTo(quarter_left, (canvas.height / 2) + (padding / 2));
    context2D.lineTo(quarter_right, (canvas.height / 2) + (padding / 2));
    context2D.stroke();

    context2D.beginPath();
    context2D.moveTo(quarter_left, canvas.height - (padding + eigth));
    context2D.lineTo(quarter_left, padding + eigth);
    context2D.stroke();

    context2D.beginPath();
    context2D.moveTo(quarter_right, canvas.height - (padding + eigth));
    context2D.lineTo(quarter_right, padding + eigth);
    context2D.stroke();

    context2D.beginPath();
    context2D.moveTo(player1.width + padding, canvas.height - (eigth + padding));
    context2D.lineTo(canvas.width - player2.width - padding, canvas.height - (eigth + padding));
    context2D.stroke();

    context2D.beginPath();
    context2D.moveTo(player1.width + padding, padding + eigth);
    context2D.lineTo(canvas.width - player2.width - padding, padding + eigth);
    context2D.stroke();


    //ball
    context2D.beginPath();
    context2D.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    context2D.fillStyle = '#fff';
    context2D.fill();
    context2D.lineWidth = 1;
    context2D.strokeStyle = '#003300';
    context2D.stroke();

//    context2D.fillStyle = 'black';
//    context2D.font = "14px Arial";
//    context2D.fillText((ball.vx < 0 ? ball.vx * -1 : ball.vx), ball.x - 4, ball.y + 4);

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
