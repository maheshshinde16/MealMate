package com.mealmate.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;

@Document(collection = "deliveries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {

    @Id
    private String id;

    @DBRef
    private Order order;

    private String status;
    private String deliveryPersonName;
    private String deliveryPersonPhone;
    private LocalDateTime estimatedDeliveryTime;
    private LocalDateTime actualDeliveryTime;
}
