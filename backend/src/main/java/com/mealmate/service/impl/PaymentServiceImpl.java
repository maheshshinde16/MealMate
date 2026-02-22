package com.mealmate.service.impl;

import com.mealmate.dto.PaymentDto;
import com.mealmate.exception.ResourceNotFoundException;
import com.mealmate.model.Payment;
import com.mealmate.repository.PaymentRepository;
import com.mealmate.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public List<PaymentDto> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentDto getPaymentById(String id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
        return convertToDto(payment);
    }

    @Override
    public PaymentDto createPayment(PaymentDto paymentDto) {
        Payment payment = new Payment();
        payment.setAmount(paymentDto.getAmount());
        payment.setPaymentMethod(paymentDto.getPaymentMethod());
        payment.setPaymentStatus(paymentDto.getPaymentStatus());
        
        Payment savedPayment = paymentRepository.save(payment);
        return convertToDto(savedPayment);
    }

    @Override
    public PaymentDto updatePayment(String id, PaymentDto paymentDto) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
        
        payment.setPaymentStatus(paymentDto.getPaymentStatus());
        
        Payment updatedPayment = paymentRepository.save(payment);
        return convertToDto(updatedPayment);
    }

    private PaymentDto convertToDto(Payment payment) {
        PaymentDto dto = new PaymentDto();
        dto.setId(payment.getId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setPaymentStatus(payment.getPaymentStatus());
        return dto;
    }
}
