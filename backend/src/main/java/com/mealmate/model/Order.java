package com.mealmate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {

	@Id
	private String id;

	private String orderNumber;
	private String userId;
	private String vendorId;
    private String vendorName;
	private List<OrderItem> items;
	private Double subtotal;
	private Double tax;
	private Double deliveryFee;
	private Double discount;
	private Double totalAmount;
	private String deliveryAddress;
	private Map<String, Object> paymentDetails;
	private String status; // PENDING, CONFIRMED, PREPARING, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
	private List<Map<String, Object>> timeline; // status change history
	private String deliveryPartnerId;
	private LocalDateTime estimatedDeliveryTime;
	private LocalDateTime actualDeliveryTime;
	private String type; // single, group, subscription
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

}
