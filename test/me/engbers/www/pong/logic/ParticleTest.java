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
public class ParticleTest {
    
    public ParticleTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of getX method, of class Particle.
     */
    @Test
    public void testGetX() {
        System.out.println("getX");
        Particle instance = null;
        int expResult = 0;
        int result = instance.getX();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getY method, of class Particle.
     */
    @Test
    public void testGetY() {
        System.out.println("getY");
        Particle instance = null;
        int expResult = 0;
        int result = instance.getY();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getRadius method, of class Particle.
     */
    @Test
    public void testGetRadius() {
        System.out.println("getRadius");
        Particle instance = null;
        float expResult = 0.0F;
        float result = instance.getRadius();
        assertEquals(expResult, result, 0.0);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getVx method, of class Particle.
     */
    @Test
    public void testGetVx() {
        System.out.println("getVx");
        Particle instance = null;
        int expResult = 0;
        int result = instance.getVx();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getVy method, of class Particle.
     */
    @Test
    public void testGetVy() {
        System.out.println("getVy");
        Particle instance = null;
        int expResult = 0;
        int result = instance.getVy();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of decreaseRadius method, of class Particle.
     */
    @Test
    public void testDecreaseRadius() {
        System.out.println("decreaseRadius");
        Particle instance = null;
        instance.decreaseRadius();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of move method, of class Particle.
     */
    @Test
    public void testMove() {
        System.out.println("move");
        Particle instance = null;
        instance.move();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }
    
}
