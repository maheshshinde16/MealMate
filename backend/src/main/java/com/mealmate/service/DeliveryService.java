package com.mealmate.service;

public interface DeliveryService {
    String getDeliveryStatus(String id);
    void updateDeliveryStatus(String id, String status);
}
