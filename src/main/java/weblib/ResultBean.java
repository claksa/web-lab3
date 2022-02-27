package weblib;

import lombok.Data;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@ManagedBean
@SessionScoped
public class ResultBean implements Serializable {
    private Result newResult = new Result();
    private List<Result> results = new ArrayList<>();

    public void addResult() {
        newResult.generateStatus();
        newResult.generateTime();
        results.add(newResult);
        newResult = new Result();
    }

}
