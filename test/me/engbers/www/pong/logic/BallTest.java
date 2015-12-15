/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package me.engbers.www.pong.logic;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author simon
 */
public class BallTest {

    private Ball ball;
    private final int CANVAS_HEIGHT = 300;
    private final int CANVAS_WIDTH = 300;

    public BallTest() {
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Before
    public void setUp() {
        ball = new Ball(10, 0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    }

    @After
    public void tearDown() {
    }

    /**
     * Test of getX method, of class Ball.
     */
    @Test
    public void testGetX() {
        System.out.println("getX");
        Ball instance = null;
        int expResult = 0;
        int result = instance.getX();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setX method, of class Ball.
     */
    @Test
    public void testSetX() {
        System.out.println("setX");
        int x = 0;
        Ball instance = null;
        instance.setX(x);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getY method, of class Ball.
     */
    @Test
    public void testGetY() {
        System.out.println("getY");
        Ball instance = null;
        int expResult = 0;
        int result = instance.getY();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setY method, of class Ball.
     */
    @Test
    public void testSetY() {
        System.out.println("setY");
        int y = 0;
        Ball instance = null;
        instance.setY(y);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getVx method, of class Ball.
     */
    @Test
    public void testGetVx() {
        System.out.println("getVx");
        Ball instance = null;
        int expResult = 0;
        int result = instance.getVx();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getVy method, of class Ball.
     */
    @Test
    public void testGetVy() {
        System.out.println("getVy");
        Ball instance = null;
        int expResult = 0;
        int result = instance.getVy();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setVy method, of class Ball.
     */
    @Test
    public void testSetVy() {
        System.out.println("setVy");
        int vy = 0;
        Ball instance = null;
        instance.setVy(vy);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setVx method, of class Ball.
     */
    @Test
    public void testSetVx() {
        System.out.println("setVx");
        int vx = 0;
        Ball instance = null;
        instance.setVx(vx);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isMovingRight method, of class Ball.
     */
    @Test
    public void testIsMovingRight() {
        System.out.println("isMovingRight");
        Ball instance = null;
        boolean expResult = false;
        boolean result = instance.isMovingRight();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isMovingDown method, of class Ball.
     */
    @Test
    public void testIsMovingDown() {
        System.out.println("isMovingDown");
        Ball instance = null;
        boolean expResult = false;
        boolean result = instance.isMovingDown();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of collidesWith method, of class Ball.
     */
    @Test
    public void testCollidesWith() {
        Player player1 = new Player(CANVAS_WIDTH, 100);
        assertFalse(ball.collidesWith(player1));

        //right
        ball.setX(CANVAS_WIDTH);
        assertTrue(ball.collidesWith(player1));

        //left
        ball.setX(0);
        assertFalse(ball.collidesWith(player1));
        
        //negative test
        ball.setX(CANVAS_WIDTH);
        ball.setY(10);
        assertFalse(ball.collidesWith(player1));
        
        ball.setY(player1.getY());
        assertTrue(ball.collidesWith(player1));
    }

    /**
     * Test of alternateYSpeed method, of class Ball.
     */
    @Test
    public void testAlternateYSpeed() {
        System.out.println("alternateYSpeed");
        Ball instance = null;
        instance.alternateYSpeed();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of alternateXSpeed method, of class Ball.
     */
    @Test
    public void testAlternateXSpeed() {
        System.out.println("alternateXSpeed");
        Ball instance = null;
        instance.alternateXSpeed();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isTouchingTop method, of class Ball.
     */
    @Test
    public void testIsTouchingTop() {
        System.out.println("isTouchingTop");
        Ball instance = null;
        boolean expResult = false;
        boolean result = instance.isTouchingTop();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isTouchingBottom method, of class Ball.
     */
    @Test
    public void testIsTouchingBottom() {
        System.out.println("isTouchingBottom");
        Ball instance = null;
        boolean expResult = false;
        boolean result = instance.isTouchingBottom();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of calculateYSpeed method, of class Ball.
     */
    @Test
    public void testCalculateYSpeed() {
        System.out.println("calculateYSpeed");
        Player player = null;
        Ball instance = null;
        instance.calculateYSpeed(player);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

}
