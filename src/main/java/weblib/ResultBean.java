package weblib;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResultBean {
    private Result newResult = new Result();
    private List<Result> results = new ArrayList<>();

    public void addResult() {
        newResult.generateStatus();
        newResult.generateTime();
        results.add(newResult);
        newResult = new Result();
    }

}
