/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package me.engbers.www.pong.connection;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.TimerTask;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author simon
 */
//@ServerEndpoint(value = "/munchkin", encoders = {MonsterEncoder.class}, decoders = {MonsterDecoder.class})
@ServerEndpoint(value = "/pong")
public class Pong {

    private static final Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    private static String p1ID, p2ID;
    private static final MultiplayerStrategy logic = new MultiplayerStrategy();
    private static final ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
    private static ScheduledFuture future;
    private static ScheduledFuture futureBallSpeed;

    @OnMessage
    public void broadcastFigure(String s, Session session) throws IOException, EncodeException {
        switch (s) {
            case "Einzelspieler":
                logic.setSingleplayer(true);
                session.getBasicRemote().sendText("start");
                startInterval();
                break;
            case "Mehrspieler":
                break;
            default:
                if (session.getId().equals(p1ID)) {
                    logic.setPlayer1Y(Integer.parseInt(s));
                } else {
                    logic.setPlayer2Y(Integer.parseInt(s));
                }
                break;
        }
    }

    @OnOpen
    public void onOpen(Session peer) {
        if (peers.size() == 2 && !peers.contains(peer)) {
            return;
        }

        String player = "player1";
        if (peers.isEmpty()) {
            p1ID = peer.getId();
        } else if (peers.size() == 1) {
            player = "player2";
            p2ID = peer.getId();
        }
        peers.add(peer);
        try {
            peer.getBasicRemote().sendText(player);
            peer.getBasicRemote().sendText("Playercount:" + peers.size());

            if (peers.size() == 2) {
                for (Session session : peers) {
                    session.getBasicRemote().sendText("start");
                }
                startInterval();
            }
        } catch (IOException ex) {
            Logger.getLogger(Pong.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    @OnClose
    public void onClose(Session peer) {
        peers.remove(peer);
        if (!logic.isSingleplayer()) {
            peers.clear();
        }
        future.cancel(true);
        futureBallSpeed.cancel(true);
    }

    private void startInterval() {
        int delay = 0;   // delay for 5 sec.
        int interval = 16;  // iterate every sec.

        future = executor.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                try {
                    boolean isOk = logic.calculate();
                    if (!isOk) {
                        future.cancel(true);
                        futureBallSpeed.cancel(true);
                        logic.init();
                        executor.schedule(new TimerTask() {
                            @Override
                            public void run() {
                                startInterval();
                            }
                        }, 2000, TimeUnit.MILLISECONDS);
                        return;
                    }
                    for (Session peer : peers) {
                        peer.getBasicRemote().sendText(logic.toString());
                    }
                } catch (IOException ex) {
                    Logger.getLogger(Pong.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }, delay, interval, TimeUnit.MILLISECONDS);

        futureBallSpeed = executor.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                logic.increaseBallSpeed();
            }
        }, 0, 16000, TimeUnit.MILLISECONDS);
    }

}
