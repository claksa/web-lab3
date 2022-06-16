package jmxlib;


import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AreaCalc implements AreaCalcMBean {
    double area = 0;
    double radius = 0;

    @Override
    public double calcArea() {
        this.area = calcQuadArea(radius) + calcRectangleArea(radius) + calcTriangleArea(radius);
        log.info("Площадь фигуры: {}", area);
        return area;
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

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
