package com.mealmate.controller;

import com.mealmate.model.Order;
import com.mealmate.service.OrderService;
import com.mealmate.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@PostMapping
	public ResponseEntity<ApiResponse<Order>> createOrder(@RequestBody Order order) {
		Order createdOrder = orderService.createOrder(order);
		return ResponseEntity.ok(new ApiResponse<>(true, "Order created successfully", createdOrder));
	}

	@GetMapping
	public ResponseEntity<ApiResponse<List<Order>>> getAllOrders() {
		List<Order> orders = orderService.getAllOrders();
		return ResponseEntity.ok(new ApiResponse<>(true, "Orders retrieved successfully", orders));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<Order>> getOrderById(@PathVariable String id) {
		Order order = orderService.getOrderById(id);
		return ResponseEntity.ok(new ApiResponse<>(true, "Order retrieved successfully", order));
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<ApiResponse<List<Order>>> getUserOrders(@PathVariable String userId) {
		List<Order> orders = orderService.getUserOrders(userId);
		return ResponseEntity.ok(new ApiResponse<>(true, "User orders retrieved successfully", orders));
	}

	@GetMapping("/vendor/{vendorId}")
	public ResponseEntity<ApiResponse<List<Order>>> getVendorOrders(@PathVariable String vendorId) {
		List<Order> orders = orderService.getVendorOrders(vendorId);
		return ResponseEntity.ok(new ApiResponse<>(true, "Vendor orders retrieved successfully", orders));
	}

	@GetMapping("/rider/{riderId}")
	public ResponseEntity<ApiResponse<List<Order>>> getRiderOrders(@PathVariable String riderId) {
		List<Order> orders = orderService.getRiderOrders(riderId);
		return ResponseEntity.ok(new ApiResponse<>(true, "Rider orders retrieved successfully", orders));
	}

	@GetMapping("/available/riders")
	public ResponseEntity<ApiResponse<List<Order>>> getAvailableOrdersForRiders() {
		List<Order> orders = orderService.getAvailableOrdersForRiders();
		return ResponseEntity.ok(new ApiResponse<>(true, "Available orders retrieved successfully", orders));
	}

	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<Order>> updateOrder(@PathVariable String id, @RequestBody Order order) {
		Order updatedOrder = orderService.updateOrder(id, order);
		return ResponseEntity.ok(new ApiResponse<>(true, "Order updated successfully", updatedOrder));
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<ApiResponse<Order>> updateOrderStatus(@PathVariable String id, @RequestParam String status) {
		Order updatedOrder = orderService.updateOrderStatus(id, status);
		return ResponseEntity.ok(new ApiResponse<>(true, "Order status updated successfully", updatedOrder));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteOrder(@PathVariable String id) {
		orderService.deleteOrder(id);
		return ResponseEntity.ok(new ApiResponse<>(true, "Order deleted successfully", null));
	}

	@PostMapping("/{id}/cancel")
	public ResponseEntity<ApiResponse<Void>> cancelOrder(@PathVariable String id) {
		orderService.cancelOrder(id);
		return ResponseEntity.ok(new ApiResponse<>(true, "Order cancelled successfully", null));
	}

}
