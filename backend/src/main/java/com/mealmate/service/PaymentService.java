package com.mealmate.service;

import com.mealmate.dto.PaymentDto;

import java.util.List;

public interface PaymentService {
    List<PaymentDto> getAllPayments();
    PaymentDto getPaymentById(String id);
    PaymentDto createPayment(PaymentDto paymentDto);
    PaymentDto updatePayment(String id, PaymentDto paymentDto);
}
