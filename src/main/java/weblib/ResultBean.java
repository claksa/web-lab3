package weblib;

import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class ResultBean implements Serializable {
    private Result newResult = new Result();
    private List<Result> results = new ArrayList<>();

    public void addResult() {
        newResult.generateStatus();
        newResult.generateTime();
        results.add(newResult);
        System.out.println(newResult);
        newResult = new Result();
    }

}
