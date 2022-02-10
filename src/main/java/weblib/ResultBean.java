package weblib;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

//@Data
public class ResultBean {
    private Result newResult = new Result();
    private List<Result> results = new ArrayList<>();

    public void addResult() {
        newResult.generateStatus();
        newResult.generateTime();
        results.add(newResult);
        newResult = new Result();
    }

    public Result getNewResult() {
        return newResult;
    }

    public void setNewResult(Result newResult) {
        this.newResult = newResult;
    }

    public List<Result> getResults() {
        return results;
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }
}
