package com.mealmate.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

    @Id
    private String id;

    private String vendorId;
    private String vendorName;
    private String name;
    private String category;
    private Double price;
    private String description;
    private Boolean available;
    private String imageUrl;
    private Instant createdAt;
}
