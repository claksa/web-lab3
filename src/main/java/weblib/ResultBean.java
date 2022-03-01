package weblib;

import lombok.Data;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@ManagedBean
@SessionScoped
public class ResultBean implements Serializable {
    EntityManagerFactory entityManagerFactory;

    private EntityManager entityManager;
    private EntityTransaction transaction;
    private Result newResult;
    private List<Result> results;


    public ResultBean() {
        newResult = new Result();
        results = new ArrayList<>();

        entityManagerFactory = Persistence.createEntityManagerFactory("PostgresPU");
        entityManager = entityManagerFactory.createEntityManager();
        transaction = entityManager.getTransaction();

        getAll();
    }


    public void addResult() {
        newResult.generateStatus();
        newResult.generateTime();
        try {
            transaction.begin();
            entityManager.persist(newResult);
            transaction.commit();
            newResult = new Result();
        } catch (RuntimeException e) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            throw e;
        }
    }

    public void getAll() {
        try {
            transaction.begin();
            Query query = entityManager.createQuery("SELECT e FROM Result e");
            results = query.getResultList();
            transaction.commit();
        } catch (RuntimeException e) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            throw e;
        }
    }

    public void clearAll() {
        try {
            transaction.begin();
            Query query = entityManager.createQuery("DELETE FROM Result ");
            query.executeUpdate();
            results.clear();
            transaction.commit();
        } catch (RuntimeException e) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            throw e;
        }
    }

}
