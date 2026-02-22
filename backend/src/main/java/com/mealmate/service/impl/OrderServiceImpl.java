package com.mealmate.service.impl;

import com.mealmate.dto.OrderDto;
import com.mealmate.dto.OrderItemDto;
import com.mealmate.exception.ResourceNotFoundException;
import com.mealmate.model.Order;
import com.mealmate.model.OrderItem;
import com.mealmate.model.User;
import com.mealmate.model.Vendor;
import com.mealmate.repository.OrderRepository;
import com.mealmate.repository.UserRepository;
import com.mealmate.repository.VendorRepository;
import com.mealmate.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Override
    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDto getOrderById(String id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        return convertToDto(order);
    }

    @Override
    public OrderDto createOrder(OrderDto orderDto) {
        Order order = new Order();
        
        // Set user and vendor references
        if (orderDto.getUserId() != null) {
            User user = userRepository.findById(orderDto.getUserId()).orElse(null);
            if (user != null) {
                order.setUser(user);
            }
        }
        
        if (orderDto.getVendorId() != null) {
            Vendor vendor = vendorRepository.findById(orderDto.getVendorId()).orElse(null);
            if (vendor != null) {
                order.setVendor(vendor);
            }
        }
        
        // Convert order items
        if (orderDto.getItems() != null) {
            List<OrderItem> orderItems = orderDto.getItems().stream()
                    .map(this::convertToOrderItem)
                    .collect(Collectors.toList());
            order.setItems(orderItems);
        }
        
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(orderDto.getTotalAmount());
        order.setStatus(orderDto.getStatus() != null ? orderDto.getStatus() : "PENDING");
        order.setDeliveryAddress(orderDto.getDeliveryAddress());
        order.setPaymentMethod(orderDto.getPaymentMethod());
        order.setSpecialInstructions(orderDto.getSpecialInstructions());
        
        Order savedOrder = orderRepository.save(order);
        return convertToDto(savedOrder);
    }

    @Override
    public OrderDto updateOrder(String id, OrderDto orderDto) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        
        order.setStatus(orderDto.getStatus());
        order.setTotalAmount(orderDto.getTotalAmount());
        order.setDeliveryAddress(orderDto.getDeliveryAddress());
        
        Order updatedOrder = orderRepository.save(order);
        return convertToDto(updatedOrder);
    }

    @Override
    public void deleteOrder(String id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        orderRepository.delete(order);
    }

    private OrderDto convertToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setUserId(order.getUser() != null ? order.getUser().getId() : null);
        dto.setVendorId(order.getVendor() != null ? order.getVendor().getId() : null);
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setDeliveryAddress(order.getDeliveryAddress());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setSpecialInstructions(order.getSpecialInstructions());
        
        // Convert order items
        if (order.getItems() != null) {
            List<OrderItemDto> itemDtos = order.getItems().stream()
                    .map(this::convertToOrderItemDto)
                    .collect(Collectors.toList());
            dto.setItems(itemDtos);
        }
        
        return dto;
    }

    private OrderItem convertToOrderItem(OrderItemDto dto) {
        OrderItem item = new OrderItem();
        item.setMenuItemId(dto.getMenuItemId());
        item.setMenuItemName(dto.getMenuItemName());
        item.setQuantity(dto.getQuantity());
        item.setPrice(dto.getPrice());
        item.setSubtotal(dto.getSubtotal());
        return item;
    }

    private OrderItemDto convertToOrderItemDto(OrderItem item) {
        OrderItemDto dto = new OrderItemDto();
        dto.setMenuItemId(item.getMenuItemId());
        dto.setMenuItemName(item.getMenuItemName());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        dto.setSubtotal(item.getSubtotal());
        return dto;
    }
}
