function connect(kindOfPlay) {
//    websocket = new WebSocket(wsUri);
//    setTimeout(function () {
//        websocket.send(kindOfPlay);
//    }, 2000);
//
//    websocket.onerror = function (evt) {
//        console.error(evt);
//    };
    websocket = io.connect({'sync disconnect on unload': true});

    websocket.on('gametick', function (data) {
        gameTick(data)
    });
    websocket.on('startgame', function (data) {
        startGame(data)
    });



}