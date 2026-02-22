package com.mealmate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItemDto {
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
