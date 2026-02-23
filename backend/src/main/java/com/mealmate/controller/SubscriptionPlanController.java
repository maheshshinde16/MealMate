package com.mealmate.controller;

import com.mealmate.util.ApiResponse;
import com.mealmate.dto.SubscriptionPlanDto;
import com.mealmate.service.SubscriptionPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(originPatterns = {
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173"
})
public class SubscriptionPlanController {

    @Autowired
    private SubscriptionPlanService subscriptionPlanService;

    @PostMapping
    public ResponseEntity<ApiResponse> createSubscription(
            @RequestParam String userId,
            @RequestBody SubscriptionPlanDto dto) {
        try {
            SubscriptionPlanDto result = subscriptionPlanService.createSubscription(userId, dto);
            return ResponseEntity.ok(new ApiResponse<>(true, "Subscription created successfully", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse> getUserSubscriptions(@PathVariable String userId) {
        try {
            List<SubscriptionPlanDto> subscriptions = subscriptionPlanService.getUserSubscriptions(userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Subscriptions retrieved", subscriptions));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/user/{userId}/active")
    public ResponseEntity<ApiResponse> getActiveSubscriptions(@PathVariable String userId) {
        try {
            List<SubscriptionPlanDto> subscriptions = subscriptionPlanService.getActiveSubscriptions(userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Active subscriptions retrieved", subscriptions));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getSubscription(@PathVariable String id) {
        try {
            SubscriptionPlanDto subscription = subscriptionPlanService.getSubscription(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Subscription retrieved", subscription));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateSubscription(
            @PathVariable String id,
            @RequestParam String userId,
            @RequestBody SubscriptionPlanDto dto) {
        try {
            SubscriptionPlanDto result = subscriptionPlanService.updateSubscription(id, userId, dto);
            return ResponseEntity.ok(new ApiResponse<>(true, "Subscription updated", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> cancelSubscription(
            @PathVariable String id,
            @RequestParam String userId) {
        try {
            subscriptionPlanService.cancelSubscription(id, userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Subscription cancelled", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<ApiResponse> activateSubscription(
            @PathVariable String id,
            @RequestParam String userId) {
        try {
            SubscriptionPlanDto result = subscriptionPlanService.activateSubscription(id, userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Subscription activated", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}
