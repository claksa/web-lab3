package weblib;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Entity
@Table(name = "coordinates")
public class Result implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "x_value")
    double x_value;
    @Column(name = "y_value")
    double y_value;
    @Column(name = "r_value")
    double r_value;
    @Column(name = "status")
    String status;
    @Column(name = "time")
    String currentTime;

    public void generateStatus() {
        status = checkQuarters() ? "точка попала" : "точка не попала";
    }

    public void generateTime() {
        String timePattern = "HH:mm:ss";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(timePattern);
        currentTime = LocalDateTime.now().format(formatter);
    }

    public boolean checkQuarters() {
        return checkFirstQuarter()
                || checkSecondQuarter()
                || checkThirdQuarter();
    }

    public boolean checkFirstQuarter() {
        return x_value <= 0 && y_value >= 0 && x_value * x_value + y_value * y_value <= r_value * r_value;
    }

    public boolean checkSecondQuarter() {
        return x_value >= 0 && y_value >= 0 && x_value <= r_value && y_value <= r_value / 2;
    }

    public boolean checkThirdQuarter() {
        return x_value <= 0 && y_value <= 0 && y_value >= -x_value - r_value / 2;
    }

}


