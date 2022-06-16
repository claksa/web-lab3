package tests;


import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import weblib.Result;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;


public class MainTest {

    static Result result;


    @BeforeClass
    public static void init() {
        result = new Result();
    }


    @AfterClass
    public static void reset() {
        result.setX_value(0);
        result.setY_value(0);
        result.setR_value(0);
    }


    @Test
    public void testFirstQuarterIn() {
        result.setX_value(-1);
        result.setY_value(2);
        result.setR_value(5);
        assertTrue(result.checkFirstQuarter());
    }

    @Test
    public void testFirstQuarterOut() {
        result.setX_value(4);
        result.setY_value(5);
        result.setR_value(4);
        assertFalse(result.checkFirstQuarter());
    }


    @Test
    public void testFirstQuarterOyBoundary() {
        result.setX_value(0);
        result.setY_value(1);
        result.setR_value(1);
        assertTrue(result.checkFirstQuarter());
    }


    @Test
    public void testFirstQuarterOxBoundary() {
        result.setX_value(-1);
        result.setY_value(0);
        result.setR_value(1);
        assertTrue(result.checkFirstQuarter());
    }

    @Test
    public void testSecondQuarterIn() {
        result.setX_value(1);
        result.setY_value(2);
        result.setR_value(5);
        assertTrue(result.checkSecondQuarter());
    }

    @Test
    public void testSecondQuarterOut() {
        result.setX_value(3);
        result.setY_value(3);
        result.setR_value(2);
        assertFalse(result.checkSecondQuarter());
    }

    @Test
    public void testSecondQuarter0yBoundary() {
        result.setX_value(0);
        result.setY_value(1);
        result.setR_value(2);
        assertTrue(result.checkSecondQuarter());
    }

    @Test
    public void testSecondQuarterOxBoundary() {
        result.setX_value(2);
        result.setY_value(0);
        result.setR_value(2);
        assertTrue(result.checkSecondQuarter());
    }


    @Test
    public void testThirdQuarterIn() {
        result.setX_value(-1);
        result.setY_value(-1);
        result.setR_value(4);
        assertTrue(result.checkThirdQuarter());
    }


    @Test
    public void testThirdQuarterOut() {
        result.setX_value(-3);
        result.setY_value(-2);
        result.setR_value(5);
        assertFalse(result.checkThirdQuarter());
    }

    @Test
    public void testThirdQuarterOxBoundary() {
        result.setX_value(-2);
        result.setY_value(0);
        result.setR_value(4);
        assertTrue(result.checkThirdQuarter());
    }

    @Test
    public void testThirdQuarterOyBoundary() {
        result.setX_value(0);
        result.setY_value(-2);
        result.setR_value(4);
        assertTrue(result.checkThirdQuarter());
    }

    @Test
    public void testFourthQuarter() {
        result.setX_value(3);
        result.setY_value(-1);
        result.setR_value(5);
        assertFalse(result.checkQuarters());
    }

    @Test
    public void testRandomPointIn() {
        result.setX_value(-1);
        result.setY_value(3);
        result.setR_value(5);
        assertTrue(result.checkQuarters());
    }


}
