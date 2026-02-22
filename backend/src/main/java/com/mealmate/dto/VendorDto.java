package com.mealmate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorDto {
    private String id;
    private String name;
    private String description;
    private String address;
    private String phoneNumber;
    private String cuisineType;
    private Double rating;
}
