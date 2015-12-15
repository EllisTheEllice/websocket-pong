/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package de.pong.websocket.logic;

import java.util.Random;

/**
 *
 * @author simon
 */
public class Particle {

    private int x, y, vx, vy;
    private float radius;

    public Particle(Ball b, Player p) {
        Random r = new Random();

        x = b.getX();
        y = b.getY();
        radius = r.nextInt(5);
        if (p.getX() == 0) {
            vx = r.nextInt(12);
        } else {
            vx = r.nextInt(12) * -1;
        }
        int next = r.nextInt(10);
        if (next < 5) {
            vy = next * -1;
        } else {
            vy = next;
        }
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public float getRadius() {
        return radius;
    }

    public int getVx() {
        return vx;
    }

    public int getVy() {
        return vy;
    }

    public void decreaseRadius() {
        if (radius > 0) {
            radius -= 0.25;
        }
    }

    public void move() {
        x += vx;
        y += vy;
    }

}
