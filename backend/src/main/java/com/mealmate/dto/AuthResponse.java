package com.mealmate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private UserDto user;
    
    public AuthResponse(String token, String email, String fullName) {
        this.token = token;
        this.user = new UserDto();
        this.user.setEmail(email);
        this.user.setFullName(fullName);
    }
}

