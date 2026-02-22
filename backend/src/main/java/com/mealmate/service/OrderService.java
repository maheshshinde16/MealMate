package com.mealmate.service;

import com.mealmate.dto.OrderDto;

import java.util.List;

public interface OrderService {
    List<OrderDto> getAllOrders();
    OrderDto getOrderById(String id);
    OrderDto createOrder(OrderDto orderDto);
    OrderDto updateOrder(String id, OrderDto orderDto);
    void deleteOrder(String id);
}
