package weblib.servlets;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class Result {
    public static final double Y_MAX = 3;
    public static final double Y_MIN = -3;

    double x;
    double y;
    double r;
    boolean isCorrectData = false;
    String status;
    String currentTime;
    String workTime;

    public Result(double x, double y, double r, String workTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.status = generateStatus(x, y, r);
        this.currentTime = generateTime();
        this.workTime = workTime;
    }

    private String generateStatus(double x, double y, double r) {
        String status = "некорректные данные"; //impossible
        if (checkValues(x, y, r)) {
            isCorrectData = true;
            status = checkQuarters(x, y, r) ? "входит в ОДЗ" : "не входит в ОДЗ";
        }
        return status;
    }

    private String generateTime() {
        String timePattern = "HH:mm:ss";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(timePattern);
        return LocalDateTime.now().format(formatter);
    }


    private boolean checkQuarters(double x, double y, double r) {
        return checkFirstQuarter(x, y, r) || checkSecondQuarter(x, y, r) || checkFourthQuarter(x, y, r);
    }

    private boolean checkFirstQuarter(double x, double y, double r) {
        return x <= 0 && y >= 0 && x * x + y * y <= r / 2;
    }

    private boolean checkSecondQuarter(double x, double y, double r) {
        return x >= 0 && y >= 0 && x <= r / 2 && y <= r;
    }

    private boolean checkFourthQuarter(double x, double y, double r) {
        return x >= 0 && y <= 0 && y >= x - r / 2;
    }


    private boolean checkValues(double x, double y, double r) {
        Double[] x_values = {-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0};
        Double[] r_values = {1.0, 2.0, 3.0, 4.0, 5.0};
        return (y <= Y_MAX && y >= Y_MIN) && contain(x_values, x) && contain(r_values, r);
    }

    private boolean contain(Double[] doubles, double value) {
        return Arrays.asList(doubles).contains(value);
    }

    @Override
    public String toString() {
        return "<tr>" +
                "<td>" + x + "</td>" +
                "<td>" + y + "</td>" +
                "<td>" + r + "</td>" +
                "<td>" + currentTime + "</td>" +
                "<td>" + workTime + "</td>" +
                "<td>" + status + "</td>" +
                "</tr>";
    }
}
