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


//        id int4 not null,
//        currentTime varchar(255),
//        r float8,
//        status varchar(255),
//        x float8,
//        y float8,
//        primary key (id)

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "x")
    double x;
    @Column(name = "y")
    double y;
    @Column(name = "r")
    double r;
    @Column(name = "status")
    String status;
    @Column(name = "currentTime")
    String currentTime;

    public void generateStatus() {
        status = checkQuarters() ? "точка попала" : "точка не попала";
    }

    public void generateTime() {
        String timePattern = "HH:mm:ss";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(timePattern);
        currentTime = LocalDateTime.now().format(formatter);
    }

    private boolean checkQuarters() {
        return x <= 0 && y >= 0 && x * x + y * y <= r * r
                || x >= 0 && y >= 0 && x <= r && y <= r / 2
                || x <= 0 && y <= 0 && y >= -x - r;
    }

}


