package jmxlib;

public interface ResCheckerMBean {
    void countPointsAmount(int size);
    void countOutPointsAmount(boolean pointStatus);
    void sendMessage();
}
