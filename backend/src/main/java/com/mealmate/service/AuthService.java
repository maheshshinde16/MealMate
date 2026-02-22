package com.mealmate.service;

import com.mealmate.dto.AuthResponse;
import com.mealmate.dto.LoginRequest;
import com.mealmate.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
