package com.mealmate.controller;

import com.mealmate.service.DeliveryService;
import com.mealmate.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/deliveries")
@CrossOrigin(origins = "http://localhost:3000")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> getDeliveryStatus(@PathVariable String id) {
        String status = deliveryService.getDeliveryStatus(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Delivery status retrieved", status));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Void>> updateDeliveryStatus(@PathVariable String id, @RequestParam String status) {
        deliveryService.updateDeliveryStatus(id, status);
        return ResponseEntity.ok(new ApiResponse<>(true, "Delivery status updated", null));
    }
}
