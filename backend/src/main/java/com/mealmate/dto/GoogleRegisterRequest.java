package com.mealmate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoogleRegisterRequest {
    private String email;
    private String fullName;
    private String googleId;
    private String picture;
    private String role;  // "user", "vendor", or "rider"
    private String password;  // Will be generated randomly for Google auth
}
