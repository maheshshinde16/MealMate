package com.mealmate.controller;

import com.mealmate.dto.PaymentDto;
import com.mealmate.service.PaymentService;
import com.mealmate.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PaymentDto>>> getAllPayments() {
        List<PaymentDto> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(new ApiResponse<>(true, "Payments retrieved successfully", payments));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PaymentDto>> getPaymentById(@PathVariable String id) {
        PaymentDto payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Payment retrieved successfully", payment));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PaymentDto>> createPayment(@RequestBody PaymentDto paymentDto) {
        PaymentDto createdPayment = paymentService.createPayment(paymentDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Payment created successfully", createdPayment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PaymentDto>> updatePayment(@PathVariable String id, @RequestBody PaymentDto paymentDto) {
        PaymentDto updatedPayment = paymentService.updatePayment(id, paymentDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Payment updated successfully", updatedPayment));
    }
}
