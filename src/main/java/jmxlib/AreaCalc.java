package jmxlib;


import lombok.extern.slf4j.Slf4j;

public class AreaCalc implements AreaCalcMBean {
    double area = 0;

    @Override
    public void calcArea(double radius) {
        this.area = calcQuadArea(radius) + calcRectangleArea(radius) + calcTriangleArea(radius);
        System.out.println("Площадь фигуры: " + area);
    }

    private double calcQuadArea(double radius) {
        return Math.PI * radius * radius / 4;
    }

    private double calcTriangleArea(double radius) {
        return radius * radius / 16d;
    }

    private double calcRectangleArea(double radius) {
        return radius * radius / 2d;
    }
}
