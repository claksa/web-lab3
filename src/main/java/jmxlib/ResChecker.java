package jmxlib;


import lombok.extern.slf4j.Slf4j;

import javax.management.AttributeChangeNotification;
import javax.management.MBeanNotificationInfo;
import javax.management.Notification;
import javax.management.NotificationBroadcasterSupport;


public class ResChecker
        extends NotificationBroadcasterSupport
        implements ResCheckerMBean {

    int pointsAmount = 0;
    int mishit = 0; // Число точек, не попавших в область
    int mishitNum = 0; // сколько раз достигли 4-х промахов
    private long sequenceNumber = 1;
    String errorMsg = "Число промахов = 4";


    @Override
    public void countPointsAmount(int size) {
        this.pointsAmount = size;
        System.out.println("Текущее количество точек: " + pointsAmount);
    }

    @Override
    public void countOutPointsAmount(boolean pointStatus) {
        if (!pointStatus) {
            ++mishit;
            System.out.println("Точка не попала в область.\n" +
                    "Число промахов: " + mishit);
        } else {
            System.out.println("Отправленная пользователем точка попала\n" +
                    "Число промахов: " + mishit);
        }

        if (isEnoughMisHit()) sendMessage();
    }

    @Override
    public MBeanNotificationInfo[] getNotificationInfo() {
        String[] types = new String[]{
                AttributeChangeNotification.ATTRIBUTE_CHANGE
        };

        String name = AttributeChangeNotification.class.getName();
        String description = errorMsg;
        MBeanNotificationInfo info =
                new MBeanNotificationInfo(types, name, description);
        return new MBeanNotificationInfo[]{info};
    }

    @Override
    public void sendMessage() {
        int oldMishitNum = --mishitNum;
        Notification n = new AttributeChangeNotification(this,
                ++sequenceNumber, System.currentTimeMillis(),
                errorMsg, "mishit", "int",
                oldMishitNum, this.mishitNum);
        sendNotification(n);
    }

    private boolean isEnoughMisHit() {
        if (mishit % 4 == 0) {
            ++mishitNum;
            System.out.println("Достигнуто достаточное число промахов: "+ mishit);
            return true;
        } else return false;
    }

}
