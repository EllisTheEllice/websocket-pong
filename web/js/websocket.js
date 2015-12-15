function connect(kindOfPlay) {
    websocket = new WebSocket(wsUri);
    setTimeout(function () {
        websocket.send(kindOfPlay);
    }, 2000);

    websocket.onerror = function (evt) {
        console.error(evt);
    };

    websocket.onmessage = function (evt) {

        if (evt.data == "player1" || evt.data == "player2") {
            player = evt.data;
        } else if (evt.data == "start") {
            log("Spiel startet");
            $('#playhover').hide();
            $('#settings').hide();
//        start();
        } else if (evt.data.indexOf("Playercount") === 0) {
            var playerCount = evt.data.substring(12, 13);
            log("Spieler anwesend: " + playerCount);
            if (playerCount == 1) {
                log("Warte auf Spieler 2");
            }
        } else {
            var parsed = JSON.parse(evt.data);
            player1 = parsed.player1;
            player2 = parsed.player2;
            ball = parsed.ball;
            particles = parsed.particles;
            $('#p1score').text(player1.score);
            $('#p2score').text(player2.score);
            console.log(particles);
            draw();
        }
    };



}