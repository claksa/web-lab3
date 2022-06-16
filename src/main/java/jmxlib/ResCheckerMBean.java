package jmxlib;

public interface ResCheckerMBean {
    void sendMessage();
    int getMishit();
    int getPointsAmount();
    void setPointsAmount(int pointsAmount);
}
