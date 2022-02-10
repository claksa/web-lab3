package weblib;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
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
        return checkFirstQuarter() || checkSecondQuarter() || checkFourthQuarter();
    }

    private boolean checkFirstQuarter() {
        return x <= 0 && y >= 0 && x * x + y * y <= r / 2;
    }

    private boolean checkSecondQuarter() {
        return x >= 0 && y >= 0 && x <= r / 2 && y <= r;
    }

    private boolean checkFourthQuarter() {
        return x >= 0 && y <= 0 && y >= x - r / 2;
    }

}


