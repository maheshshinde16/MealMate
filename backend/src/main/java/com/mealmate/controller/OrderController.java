package com.mealmate.controller;

import com.mealmate.dto.OrderDto;
import com.mealmate.service.OrderService;
import com.mealmate.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(originPatterns = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderDto>>> getAllOrders() {
        List<OrderDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(new ApiResponse<>(true, "Orders retrieved successfully", orders));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderDto>> getOrderById(@PathVariable String id) {
        OrderDto order = orderService.getOrderById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Order retrieved successfully", order));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<OrderDto>> createOrder(@RequestBody OrderDto orderDto) {
        OrderDto createdOrder = orderService.createOrder(orderDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Order created successfully", createdOrder));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderDto>> updateOrder(@PathVariable String id, @RequestBody OrderDto orderDto) {
        OrderDto updatedOrder = orderService.updateOrder(id, orderDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Order updated successfully", updatedOrder));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Order deleted successfully", null));
    }
}
