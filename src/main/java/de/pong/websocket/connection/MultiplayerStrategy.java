package de.pong.websocket.connection;

import com.google.gson.Gson;
import de.pong.websocket.logic.Ball;
import de.pong.websocket.logic.Particle;
import de.pong.websocket.logic.Player;

/**
 *
 * @author simon
 */
public class MultiplayerStrategy {

    private final Particle[] particles = new Particle[35];
    private volatile int counter = 0;
    private final int enemySpeed = 11;
    private boolean isSingleplayer = false;
    protected Ball ball;
    protected Player player1, player2;
    protected final int canvasHeight = 500, canvasWidth = 960;
    private final int ballStartSpeed = 6;

    public MultiplayerStrategy() {
        init();
    }

    public void increaseBallSpeed() {
        if (ball.getVx() < 0) {
            ball.setVx(ball.getVx() - 1);
        } else {
            ball.setVx(ball.getVx() + 1);
        }
    }

    @Override
    public String toString() {
        Gson g = new Gson();
        return g.toJson(this);
    }

    public final void init() {
        if (player1 == null) {
            player1 = new Player(0, 150);
            player2 = new Player((canvasWidth - 10), 150);
            ball = new Ball(10, 30, 150, ballStartSpeed, canvasWidth, canvasHeight);
        } else {
            player1.setY(150);
            player2.setY(150);
            ball.setX(30);
            ball.setY(150);
            ball.setVy(0);
            ball.setVx(ballStartSpeed);
        }
    }

    public void setPlayer1Y(int y) {
        player1.setY(y);
    }

    public void setPlayer2Y(int y) {
        player2.setY(y);
    }

    public void setSingleplayer(boolean isSingleplayer) {
        this.isSingleplayer = isSingleplayer;
    }

    public boolean isSingleplayer() {
        return this.isSingleplayer;
    }

    public boolean calculate() {
        counter++;
        if (ball.isMovingRight()) {
            if (ball.collidesWith(player2)) {
                for (int i = 0; i < particles.length; i++) {
                    particles[i] = new Particle(ball, player2);
                }
                ball.alternateXSpeed();
                ball.calculateYSpeed(player2);
            } else if (ball.getX() >= canvasWidth) {
                player1.addScore();
                return false;
            }
        } else {
            if (ball.collidesWith(player1)) {
                for (int i = 0; i < particles.length; i++) {
                    particles[i] = new Particle(ball, player1);
                }
                ball.alternateXSpeed();
                ball.calculateYSpeed(player2);
            } else if (ball.getX() <= 0) {
                player2.addScore();
                return false;
            }
        }

        if (ball.isTouchingTop() || ball.isTouchingBottom()) {  //touching top or down?
            ball.alternateYSpeed();
        }

        ball.setX(ball.getX() + ball.getVx());
        ball.setY(ball.getY() + ball.getVy());

        if (isSingleplayer) {
            calculateAIMovement();
        }

        //particles
        if (counter >= 3) {
            for (int i = 0; i < particles.length; i++) {
                if (particles[i] != null) {
                    Particle p = particles[i];
                    p.decreaseRadius();
                    p.move();
                    if (p.getRadius() == 0) {
                        particles[i] = null;
                    }
                }
            }
            counter = 0;
        }

        return true;
    }

    private void calculateAIMovement() {
        // Berechnet die Mitte des Paddels
        int real_y_pos = player2.getY() + (player2.getHeight() / 2);
        int y_pos = player2.getY();


        /* Wenn sich Ball von Paddel wegbewegt, werden die Paddel in die Mitte zurückbewegt */
        if (ball.getVx() < 0) {
// Paddel oberhalb der Mitte
            if (real_y_pos < ((canvasHeight / 2) - 10)) {
                y_pos += enemySpeed;
            } // Paddel unterhalb der Mitte
            else if (real_y_pos > ((canvasHeight / 2) + 10)) {
                y_pos -= enemySpeed;
            }
        } else if (ball.getVx() > 0) {
// Solange Paddel nicht auf Höhe des Balles ist wird es bewegt
            if (real_y_pos != ball.getY()) {
// Ball oberhalb von Paddel
                if (ball.getY() < (real_y_pos - 10)) {
                    y_pos -= enemySpeed;
                } // Ball unterhalb von Paddel
                else if (ball.getY() > (real_y_pos + 10)) {
                    y_pos += enemySpeed;
                }
            }
        }
        player2.setY(y_pos);
    }
}
