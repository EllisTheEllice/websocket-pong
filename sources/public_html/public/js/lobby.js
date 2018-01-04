websocket = io.connect({'sync disconnect on unload': true});


websocket.on('servermessage', function (data) {
    var pclass = '';
    switch (data.class) {
        case 'server':
            pclass = 'text-success';
            break;
        case 'left':
            pclass = 'text-danger';
            break;
        case  'client':
        default:
            pclass = "text-primary";
    }
    $('#messages').append('<p class="' + pclass + '">[' + data.datetime + '] ' + data.user + ': ' + data.message + '</p>');
    $("#messages").stop().animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);
});

websocket.on('useradded', function (data) {
    $('#userlist').empty();
    for (var i = 0, max = data.users.length; i < max; i++) {
        if (data.users[i].ongame == true) {
            continue;
        }

        if (data.users[i].user == sessionStorage.getItem('user')) {
            $('#userlist').append('<li class="list-group-item active">' + data.users[i].user + '</li>');
        } else if (data.users[i].ongame == true) {
            continue;
        } else {
            $('#userlist').append('<li class="list-group-item">' + data.users[i].user + '</li>');
        }
    }
});

websocket.on('serverhandshake', function (data) {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem('user', data.user);
        sessionStorage.setItem('connectionId', data.connectionId);
    } else {
        alert('Sorry! No Web Storage support..');
    }
});

websocket.on('serverinvitation', function (data) {
    var confirmed = confirm(data.host + ' lädt Sie ein!');
    if (confirmed) {
        websocket.emit('initiatemultiplayer', {p1: data.host, p2: sessionStorage.user});
    }
});

websocket.on('gamestart', function (data) {
//    myLayout.close('east');
//    myLayout.close('north');
//    myLayout.close('south');
    $('#btn_leftgame').show();
    $('#gamearea').show();
    $('#chatarea').hide();
    $('#sidebar_container').hide();
});

websocket.on('gameend', function (data) {
//    myLayout.open('east');
//    myLayout.open('north');
//    myLayout.open('south');
    $('#btn_leftgame').hide();
    $('#btn_invite').attr('disabled', 'true');
    $('#chatarea').show();
    $('#gamearea').hide();
    $('#sidebar_container').show();
    $('#sp_p1score').text('');
    $('#sp_p2score').text('');
});

//Singleplayer-specific
websocket.on('gametick', function (data) {
    gameTick(data);
});

websocket.on('opponentleft', function () {
    alert('Dein Gegner hat das Spiel verlassen');
});




$('document').ready(function () {
    $('#gamearea').hide();
    $('#btn_leftgame').hide();


    //todo: Use a better solution
    var username = '';
    while (username == '') {
        username = prompt('Please enter your username!', '');
    }
    sessionStorage.setItem('username', username);

    websocket.emit('clienthandshake', {username: username});



    $('#btn_sendmessage').on('click', function (evt) {
        var msg = '';
        msg = $('#txt_chatmessage').val();

        if (msg == '') {
            return;
        }

        websocket.emit('clientmessage', {user: sessionStorage.getItem('username'), message: msg});
        $('#txt_chatmessage').val('');
    });

    $('#txt_chatmessage').on('keypress', function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('#btn_sendmessage').trigger('click');
        }
    });

    $('#userlist').on('click', 'li', function (data) {
        $('#userlist li').removeClass('selected');
        if ($(this).text() == sessionStorage.getItem('user')) {
            $('#btn_invite').attr('disabled', 'true');
        } else {
            $('#btn_invite').removeAttr('disabled');
            $(this).addClass('selected');
            sessionStorage.setItem('lastSelectedUser', $(this).text());
        }
    });

    $('#btn_invite').on('click', function () {
        var guest = sessionStorage.getItem('lastSelectedUser');
        websocket.emit('clientinvitation', {host: sessionStorage.getItem('user'), guest: guest});
    });

    $('#btn_singleplayer').on('click', function () {
        websocket.emit('initiatesingleplayer');
    });

    $('#btn_leftgame').on('click', function (e) {
//        if (e.keyCode == 27) { //ESC
//            alert('Escape');
        websocket.emit('cancelgame');
//        }
    });
});