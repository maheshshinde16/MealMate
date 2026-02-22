package com.mealmate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String fullName;
    private String phoneNumber;
    private String address;
    private String role;  // "user", "vendor", "rider"
    
    // Vendor-specific fields
    private String restaurantName;
    private String cuisineType;
    private String description;
}
