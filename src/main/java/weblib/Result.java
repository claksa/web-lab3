package weblib;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Data
public class Result implements Serializable {
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
        return x >= 0 && y <= 0 && x * x + y * y <= r / 2
                || x <= 0 && y >= 0 && y <= x + r
                || x >= 0 && y >= 0 && x <= r && y <= r / 2;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Result result = (Result) o;
        return Double.compare(result.x, x) == 0 && Double.compare(result.y, y) == 0 && Double.compare(result.r, r) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, r);
    }

    @Override
    public String toString() {
        return "Result{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", status='" + status + '\'' +
                ", currentTime='" + currentTime + '\'' +
                '}';
    }
}


