package com.mealmate.service.impl;

import com.mealmate.exception.ResourceNotFoundException;
import com.mealmate.model.Delivery;
import com.mealmate.repository.DeliveryRepository;
import com.mealmate.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryServiceImpl implements DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Override
    public String getDeliveryStatus(String id) {
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found with id: " + id));
        return delivery.getStatus();
    }

    @Override
    public void updateDeliveryStatus(String id, String status) {
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found with id: " + id));
        delivery.setStatus(status);
        deliveryRepository.save(delivery);
    }
}
