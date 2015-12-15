/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package me.engbers.www.pong.logic;

/**
 *
 * @author simon
 */
public class Ball {

    private final int radius;
    private int x;
    private int y;
    private int vx = 10;
    private int vy = 0;
    private final int canvasWidth;
    private final int canvasHeight;

    public Ball(int radius, int x, int y, int vx, int canvasWidth, int canvasHeight) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getVx() {
        return vx;
    }

    public int getVy() {
        return vy;
    }

    public void setVy(int vy) {
        this.vy = vy;
    }

    public void setVx(int vx) {
        this.vx = vx;
    }

    public boolean isMovingRight() {
        return vx > 0;
    }

    public boolean isMovingDown() {
        return vy > 0;
    }

    public boolean collidesWith(Player p) {
        if (((y - radius) <= (p.getY() + p.getHeight())) && ((y + radius) >= p.getY())) {
            if (p.getX() == 0) {
                return (x - radius) <= 0;
            } else {
                return (x + radius) >= canvasWidth;
            }
        } else {
            return false;
        }
    }

    public void alternateYSpeed() {
        vy = -vy;
    }

    public void alternateXSpeed() {
        vx = -vx;
    }

    public boolean isTouchingTop() {
        return ((y - radius) <= 0);
    }

    public boolean isTouchingBottom() {
        return ((y + radius) >= canvasHeight);
    }

    public void calculateYSpeed(Player player) {
        if (y <= (player.getY() + (player.getHeight() * 0.25))) {
            vy -= 2;
        } else if (this.y <= (player.getY() + (player.getHeight() * 0.5))) {
            vy -= 1;
        } else if (this.y <= (player.getY() + (player.getHeight() * 0.75))) {
            vy += 1;
        } else {
            vy += 2;
        }
    }
}
