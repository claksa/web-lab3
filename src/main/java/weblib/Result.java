package weblib;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

//@Data
public class Result {
    double x;
    double y;
    double r;
    String status;
    String currentTime;

    public void generateStatus() {
        status = checkQuarters() ? "входит в ОДЗ" : "не входит в ОДЗ";
    }

    public void generateTime() {
        String timePattern = "HH:mm:ss";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(timePattern);
        currentTime = LocalDateTime.now().format(formatter);
    }

    private boolean checkQuarters() {
        return x <= 0 && y >= 0 && x * x + y * y <= r / 2
                || x >= 0 && y >= 0 && x <= r / 2 && y <= r
                || x >= 0 && y <= 0 && y >= x - r / 2;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }
}


