package com.mealmate.service.impl;

import com.mealmate.exception.ResourceNotFoundException;
import com.mealmate.model.Order;
import com.mealmate.repository.OrderRepository;
import com.mealmate.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Override
	public Order createOrder(Order order) {
		if (order.getOrderNumber() == null || order.getOrderNumber().isEmpty()) {
			order.setOrderNumber("ORD-" + System.currentTimeMillis());
		}
		if (order.getStatus() == null) {
			order.setStatus("PENDING");
		}
		if (order.getType() == null) {
			order.setType("single");
		}
		order.setCreatedAt(LocalDateTime.now());
		order.setUpdatedAt(LocalDateTime.now());
		
		// Initialize timeline
		if (order.getTimeline() == null) {
			order.setTimeline(new java.util.ArrayList<>());
		}
		Map<String, Object> initialStatus = new HashMap<>();
		initialStatus.put("status", "PENDING");
		initialStatus.put("timestamp", LocalDateTime.now());
		order.getTimeline().add(initialStatus);
		
		return orderRepository.save(order);
	}

	@Override
	public Order getOrderById(String id) {
		return orderRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
	}

	@Override
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	@Override
	public List<Order> getUserOrders(String userId) {
		return orderRepository.findByUserId(userId);
	}

	@Override
	public List<Order> getVendorOrders(String vendorId) {
		return orderRepository.findByVendorId(vendorId);
	}

	@Override
	public List<Order> getAvailableOrdersForRiders() {
		return orderRepository.findByStatusIn(java.util.Arrays.asList("CONFIRMED", "PREPARING"));
	}

	@Override
	public List<Order> getRiderOrders(String riderId) {
		return orderRepository.findByDeliveryPartnerId(riderId);
	}

	@Override
	public Order updateOrderStatus(String orderId, String status) {
		Order order = getOrderById(orderId);
		order.setStatus(status);
		order.setUpdatedAt(LocalDateTime.now());
		
		// Add to timeline
		Map<String, Object> statusEntry = new HashMap<>();
		statusEntry.put("status", status);
		statusEntry.put("timestamp", LocalDateTime.now());
		if (order.getTimeline() == null) {
			order.setTimeline(new java.util.ArrayList<>());
		}
		order.getTimeline().add(statusEntry);
		
		return orderRepository.save(order);
	}

	@Override
	public Order updateOrder(String orderId, Order orderData) {
		Order order = getOrderById(orderId);
		
		if (orderData.getStatus() != null && !orderData.getStatus().equals(order.getStatus())) {
			order.setStatus(orderData.getStatus());
			if (order.getTimeline() == null) {
				order.setTimeline(new java.util.ArrayList<>());
			}
			Map<String, Object> statusEntry = new HashMap<>();
			statusEntry.put("status", orderData.getStatus());
			statusEntry.put("timestamp", LocalDateTime.now());
			order.getTimeline().add(statusEntry);
			
			// Automatically set actualDeliveryTime when order is marked as DELIVERED
			if ("DELIVERED".equals(orderData.getStatus())) {
				order.setActualDeliveryTime(LocalDateTime.now());
			}
		}
		
		if (orderData.getDeliveryPartnerId() != null) {
			order.setDeliveryPartnerId(orderData.getDeliveryPartnerId());
		}
		
		if (orderData.getEstimatedDeliveryTime() != null) {
			order.setEstimatedDeliveryTime(orderData.getEstimatedDeliveryTime());
		}
		
		if (orderData.getActualDeliveryTime() != null) {
			order.setActualDeliveryTime(orderData.getActualDeliveryTime());
		}
		
		order.setUpdatedAt(LocalDateTime.now());
		return orderRepository.save(order);
	}

	@Override
	public void cancelOrder(String orderId) {
		Order order = getOrderById(orderId);
		order.setStatus("CANCELLED");
		order.setUpdatedAt(LocalDateTime.now());
		
		if (order.getTimeline() == null) {
			order.setTimeline(new java.util.ArrayList<>());
		}
		Map<String, Object> statusEntry = new HashMap<>();
		statusEntry.put("status", "CANCELLED");
		statusEntry.put("timestamp", LocalDateTime.now());
		order.getTimeline().add(statusEntry);
		
		orderRepository.save(order);
	}

	@Override
	public void deleteOrder(String orderId) {
		Order order = getOrderById(orderId);
		orderRepository.delete(order);
	}

}
