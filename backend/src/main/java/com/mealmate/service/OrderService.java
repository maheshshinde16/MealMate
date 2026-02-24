package com.mealmate.service;

import com.mealmate.model.Order;
import java.util.List;

public interface OrderService {

	Order createOrder(Order order);
	Order getOrderById(String id);
	List<Order> getAllOrders();
	List<Order> getUserOrders(String userId);
	List<Order> getVendorOrders(String vendorId);
	List<Order> getAvailableOrdersForRiders();
	List<Order> getRiderOrders(String riderId);
	Order updateOrderStatus(String orderId, String status);
	Order updateOrder(String orderId, Order order);
	void cancelOrder(String orderId);
	void deleteOrder(String orderId);

}
