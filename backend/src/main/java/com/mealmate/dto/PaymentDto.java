package com.mealmate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
    private String id;
    private String orderId;
    private Double amount;
    private String paymentMethod;
    private String paymentStatus;
    private LocalDateTime paymentDate;
}
